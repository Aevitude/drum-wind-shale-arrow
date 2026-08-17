export const STYLE_IDS = [
  "night-jade",
  "clay-candy",
  "obsidian-gold",
  "cyber-neon",
  "ink-wash",
  "sea-salt",
  "sakura-wa",
  "magma",
  "aurora-snow",
  "dunhuang",
] as const;

export type StyleId = (typeof STYLE_IDS)[number];

export type DecorKind =
  | "lanterns"
  | "sprinkles"
  | "dust"
  | "scan"
  | "ink"
  | "foam"
  | "petals"
  | "embers"
  | "snow"
  | "pigment";

export type FoodKind =
  | "peach"
  | "berry"
  | "gem"
  | "cube"
  | "seal"
  | "shell"
  | "blossom"
  | "ember"
  | "crystal"
  | "lotus";

export type SnakeKind =
  | "jade"
  | "clay"
  | "gold"
  | "neon"
  | "ink"
  | "glass"
  | "lacquer"
  | "magma"
  | "ice"
  | "mineral";

export type Tone = "dark" | "light";

export type StyleFamily = {
  id: StyleId;
  label: string;
  english: string;
  tone: Tone;
  snake: SnakeKind;
  food: FoodKind;
  decor: DecorKind;
  bgImage: string;
  palette: {
    bg: string;
    surface: string;
    board: string;
    grid: string;
    snake: string;
    snakeHi: string;
    snakeLo: string;
    head: string;
    food: string;
    foodHi: string;
    text: string;
    muted: string;
    accent: string;
    glow: string;
  };
  feel: {
    roundness: number;
    glow: number;
    metal: number;
    cellGap: number;
  };
  titles: [string, string, string];
  subtitles: [string, string, string];
  foods: [string, string, string];
  deaths: [string, string, string];
  starts: [string, string, string];
};

export type ResolvedSkin = {
  id: StyleId;
  seed: string;
  label: string;
  english: string;
  tone: Tone;
  snake: SnakeKind;
  food: FoodKind;
  decor: DecorKind;
  bgImage: string;
  palette: StyleFamily["palette"];
  feel: StyleFamily["feel"];
  copy: {
    title: string;
    subtitle: string;
    food: string;
    die: string;
    start: string;
  };
  variant: {
    food: number;
    copy: number;
    deco: number;
  };
};
