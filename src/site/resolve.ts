import { parseStyleId, resolveSkin } from "@/skin/resolve";
import type { ResolvedSkin } from "@/skin/types";
import { STUDIOS, type StudioFamily } from "./catalog";

export type StudioSite = {
  skin: ResolvedSkin;
  studio: StudioFamily;
  name: string;
};

function pick<T>(list: readonly T[], n: number) {
  return list[Math.abs(n) % list.length]!;
}

export function resolveStudio(styleRaw: unknown, nameRaw: unknown): StudioSite {
  const skin = resolveSkin(styleRaw, String(nameRaw ?? "0"));
  const studio = STUDIOS[parseStyleId(styleRaw)] ?? STUDIOS["night-jade"];
  const given = String(nameRaw ?? "").trim();
  const looksLikeId = !given || /^[\d-]+$/.test(given) || given.length > 16;
  const name = looksLikeId
    ? pick(studio.names, skin.variant.copy)
    : given.slice(0, 12);
  return { skin, studio, name };
}

export function studioFromSearch(search: string | undefined): StudioSite {
  const q = new URLSearchParams(
    (search ?? "").startsWith("?") ? search!.slice(1) : (search ?? ""),
  );
  return resolveStudio(q.get("style"), q.get("name") ?? q.get("seed"));
}
