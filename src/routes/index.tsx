import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/site/StudioPage";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    style: typeof search.style === "string" ? search.style : undefined,
    seed: typeof search.seed === "string" ? search.seed : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
  }),
  component: Home,
});

function Home() {
  const { style, seed, name } = Route.useSearch();
  const q = new URLSearchParams();
  if (style) q.set("style", style);
  if (name) q.set("name", name);
  else if (seed) q.set("seed", seed);
  const search = q.toString();
  return <StudioPage search={search ? `?${search}` : ""} />;
}
