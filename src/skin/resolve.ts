import { STYLE as RAW_STYLE, SEED as RAW_SEED } from "./choice";
import { CATALOG } from "./catalog";
import { hashSeed, shiftHex } from "./color";
import { STYLE_IDS, type ResolvedSkin, type StyleId } from "./types";
import { withBase } from "./base";

const ALIASES: Record<string, StyleId> = {
  夜园玉蛇: "night-jade",
  夜园: "night-jade",
  软糖黏土: "clay-candy",
  软糖: "clay-candy",
  黑金珠宝: "obsidian-gold",
  黑金: "obsidian-gold",
  赛博霓虹: "cyber-neon",
  霓虹: "cyber-neon",
  水墨山水: "ink-wash",
  水墨: "ink-wash",
  海边盐风: "sea-salt",
  海边: "sea-salt",
  樱花和风: "sakura-wa",
  樱花: "sakura-wa",
  熔岩黑曜: "magma",
  熔岩: "magma",
  雪原极光: "aurora-snow",
  极光: "aurora-snow",
  敦煌壁画: "dunhuang",
  敦煌: "dunhuang",
};

export function parseStyleId(raw: unknown): StyleId {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
  if ((STYLE_IDS as readonly string[]).includes(s)) return s as StyleId;
  const alias = ALIASES[String(raw ?? "").trim()] ?? ALIASES[s];
  return alias ?? "night-jade";
}

export function resolveSkin(styleRaw: unknown, seedRaw: unknown): ResolvedSkin {
  const id = parseStyleId(styleRaw);
  const family = CATALOG[id] ?? CATALOG["night-jade"];
  const seed = String(seedRaw ?? "0").trim() || "0";
  const h = hashSeed(`${id}:${seed}`);
  const food = h % 3;
  const copy = (h >>> 3) % 3;
  const deco = (h >>> 6) % 3;
  const hue = (((h >>> 9) % 21) - 10) * 0.9;
  const glowMul = 0.82 + ((h >>> 15) % 40) / 100;
  const sat = ((h >>> 20) % 9) / 100 - 0.04;
  const lit = ((h >>> 24) % 9) / 140 - 0.03;

  const shift = (hex: string, extra = 0) => shiftHex(hex, hue + extra, sat, lit);

  return {
    id: family.id,
    seed,
    label: family.label,
    english: family.english,
    tone: family.tone,
    snake: family.snake,
    food: family.food,
    decor: family.decor,
    bgImage: withBase(family.bgImage),
    palette: {
      bg: shift(family.palette.bg, 0),
      surface: shift(family.palette.surface, 0),
      board: shift(family.palette.board, 0),
      grid: shift(family.palette.grid, 0),
      snake: shift(family.palette.snake, hue * 0.15),
      snakeHi: shift(family.palette.snakeHi, hue * 0.1),
      snakeLo: shift(family.palette.snakeLo, 0),
      head: shift(family.palette.head, hue * 0.2),
      food: shift(family.palette.food, ((h >>> 12) % 13) - 6),
      foodHi: shift(family.palette.foodHi, 0),
      text: family.palette.text,
      muted: shift(family.palette.muted, 0),
      accent: shift(family.palette.accent, hue * 0.1),
      glow: shift(family.palette.glow, 0),
    },
    feel: {
      roundness: family.feel.roundness,
      glow: Math.max(0.05, Math.min(1.15, family.feel.glow * glowMul)),
      metal: family.feel.metal,
      cellGap: family.feel.cellGap + deco * 0.01,
    },
    copy: {
      title: family.titles[copy],
      subtitle: family.subtitles[copy],
      food: family.foods[food],
      die: family.deaths[copy],
      start: family.starts[copy],
    },
    variant: { food, copy, deco },
  };
}

export function skinFromChoice(): ResolvedSkin {
  return resolveSkin(RAW_STYLE, RAW_SEED);
}

export function skinFromSearch(search: string | undefined): ResolvedSkin {
  if (!search) return skinFromChoice();
  try {
    const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const style = q.get("style");
    const seed = q.get("seed");
    if (!style && !seed) return skinFromChoice();
    return resolveSkin(style ?? RAW_STYLE, seed ?? RAW_SEED);
  } catch {
    return skinFromChoice();
  }
}
