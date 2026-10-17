import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "portfolio-db.json");

function ensureDbFile(): Record<string, any[]> {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2), "utf-8");
      return {};
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read local DB:", err);
    return {};
  }
}

function writeDbFile(data: Record<string, any[]>) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save local DB:", err);
  }
}

export class LocalQueryBuilder {
  private table: string;
  private filters: Array<(row: any) => boolean> = [];
  private sortFn: ((a: any, b: any) => number) | null = null;
  private limitCount: number | null = null;
  private isCountQuery = false;

  constructor(table: string) {
    this.table = table;
  }

  select(fields?: string, options?: { count?: string; head?: boolean }) {
    if (options?.count) {
      this.isCountQuery = true;
    }
    return this;
  }

  eq(col: string, val: any) {
    this.filters.push((row) => {
      if (val === true || val === false) {
        return Boolean(row[col]) === val;
      }
      return String(row[col]) === String(val);
    });
    return this;
  }

  like(col: string, pattern: string) {
    const regex = new RegExp(`^${pattern.replace(/%/g, ".*")}`, "i");
    this.filters.push((row) => regex.test(String(row[col] ?? "")));
    return this;
  }

  order(col: string, opts?: { ascending?: boolean; nullsFirst?: boolean }) {
    const asc = opts?.ascending !== false;
    this.sortFn = (a, b) => {
      const valA = a[col];
      const valB = b[col];
      if (valA === valB) return 0;
      if (valA == null) return opts?.nullsFirst ? -1 : 1;
      if (valB == null) return opts?.nullsFirst ? 1 : -1;
      if (valA > valB) return asc ? 1 : -1;
      return asc ? -1 : 1;
    };
    return this;
  }

  limit(n: number) {
    this.limitCount = n;
    return this;
  }

  async execute(): Promise<{ data: any[] | null; error: any; count?: number }> {
    const db = ensureDbFile();
    let rows = (db[this.table] ?? []) as any[];

    for (const f of this.filters) {
      rows = rows.filter(f);
    }

    const count = rows.length;

    if (this.sortFn) {
      rows = [...rows].sort(this.sortFn);
    }

    if (this.limitCount !== null) {
      rows = rows.slice(0, this.limitCount);
    }

    if (this.isCountQuery) {
      return { data: rows, error: null, count };
    }

    return { data: rows, error: null };
  }

  async maybeSingle(): Promise<{ data: any | null; error: any }> {
    const res = await this.execute();
    const item = res.data && res.data.length > 0 ? res.data[0] : null;
    return { data: item, error: null };
  }

  async single(): Promise<{ data: any | null; error: any }> {
    const res = await this.execute();
    if (!res.data || res.data.length === 0) {
      return { data: null, error: { message: "Row not found" } };
    }
    return { data: res.data[0], error: null };
  }

  // Promise-like then method so `await client.from(...).select(...)` works directly
  then(resolve: (value: any) => any, reject?: (reason: any) => any) {
    return this.execute().then(resolve, reject);
  }

  async insert(payload: Record<string, any> | Array<Record<string, any>>): Promise<{ data: any; error: any }> {
    const db = ensureDbFile();
    if (!db[this.table]) db[this.table] = [];

    const items = Array.isArray(payload) ? payload : [payload];
    const inserted: any[] = [];

    for (const item of items) {
      const row = {
        id: item.id || crypto.randomUUID(),
        created_at: item.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...item,
      };
      db[this.table].push(row);
      inserted.push(row);
    }

    writeDbFile(db);
    return { data: Array.isArray(payload) ? inserted : inserted[0], error: null };
  }

  async update(payload: Record<string, any>): Promise<{ data: any; error: any }> {
    const db = ensureDbFile();
    const rows = (db[this.table] ?? []) as any[];
    let updatedCount = 0;

    const newRows = rows.map((row) => {
      const matches = this.filters.every((f) => f(row));
      if (matches) {
        updatedCount++;
        return {
          ...row,
          ...payload,
          updated_at: new Date().toISOString(),
        };
      }
      return row;
    });

    db[this.table] = newRows;
    writeDbFile(db);
    return { data: { count: updatedCount }, error: null };
  }

  async delete(): Promise<{ data: any; error: any }> {
    const db = ensureDbFile();
    const rows = (db[this.table] ?? []) as any[];

    const remainingRows = rows.filter((row) => {
      const matches = this.filters.every((f) => f(row));
      return !matches;
    });

    db[this.table] = remainingRows;
    writeDbFile(db);
    return { data: null, error: null };
  }
}

export class LocalDbClient {
  from(table: string) {
    return new LocalQueryBuilder(table);
  }

  rpc(fnName: string) {
    if (fnName === "is_admin") {
      return Promise.resolve({ data: true, error: null });
    }
    return Promise.resolve({ data: null, error: null });
  }

  auth = {
    getUser: async () => ({
      data: {
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          email: "mollamasum764@gmail.com",
        },
      },
      error: null,
    }),
    signOut: async () => ({ error: null }),
  };
}

export function getLocalDbClient() {
  return new LocalDbClient();
}
