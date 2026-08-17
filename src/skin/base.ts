export function withBase(path: string) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL ?? "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${path.replace(/^\/+/, "")}`;
}
