import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// First line of defence for /admin/*
export async function middleware(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = req.nextUrl.pathname === "/admin/login";
  const toLogin = () => NextResponse.redirect(new URL("/admin/login", req.url));
  const toAdmin = () => NextResponse.redirect(new URL("/admin", req.url));

  let res = NextResponse.next({ request: req });

  // 1. Local Admin Mode (when Supabase is unconfigured)
  if (!url || !key) {
    const localSession = req.cookies.get("local_admin_session")?.value;
    const isAuthed = localSession === "authenticated";

    if (isLogin) {
      if (isAuthed) return toAdmin();
      return res;
    }

    if (!isAuthed) {
      return toLogin();
    }

    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // 2. Cloud Supabase Mode
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll(list: { name: string; value: string; options: CookieOptions }[]) {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isLogin) {
    if (user) return toAdmin();
    return res;
  }

  if (!user) return toLogin();

  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
