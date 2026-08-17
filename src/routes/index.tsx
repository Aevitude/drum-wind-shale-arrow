import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    theme: typeof search.theme === "string" ? search.theme : undefined,
  }),
  component: Home,
});

function Home() {
  const { theme } = Route.useSearch();
  useEffect(() => {
    const q = theme ? `?theme=${encodeURIComponent(theme)}` : "";
    window.location.replace(`/resume.html${q}`);
  }, [theme]);
  return null;
}
