import "server-only";
import { revalidatePath } from "next/cache";
import type { ModuleKey } from "./modules";

// Which public routes show data from each admin module. Detail routes use the dynamic pattern with type "page",
// which invalidates every slug at once (so renamed, unpublished and deleted items disappear immediately).
export const PUBLIC_PATHS: Record<ModuleKey, { path: string; type?: "page" }[]> = {
  projects: [{ path: "/projects" }, { path: "/projects/[slug]", type: "page" }],
  research: [{ path: "/research" }, { path: "/research/[slug]", type: "page" }],
  certificates: [{ path: "/certificates" }],
  achievements: [{ path: "/achievements" }],
  blog: [{ path: "/blog" }, { path: "/blog/[slug]", type: "page" }],
  skills: [{ path: "/about" }],
  profile: [{ path: "/about" }, { path: "/contact" }],
};

// Call after a successful write, before redirect() (redirect throws, so nothing after it runs).
export function revalidatePublic(key: ModuleKey) {
  for (const { path, type } of PUBLIC_PATHS[key]) revalidatePath(path, type);
  revalidatePath("/"); // home page; also keeps the future sitemap fresh
}
