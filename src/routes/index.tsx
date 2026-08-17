import { createFileRoute } from "@tanstack/react-router";
import { SnakeApp } from "@/game/SnakeApp";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    style: typeof search.style === "string" ? search.style : undefined,
    seed: typeof search.seed === "string" ? search.seed : undefined,
  }),
  component: Home,
});

function Home() {
  const { style, seed } = Route.useSearch();
  const q = new URLSearchParams();
  if (style) q.set("style", style);
  if (seed) q.set("seed", seed);
  const search = q.toString();
  return <SnakeApp search={search ? `?${search}` : ""} />;
}
