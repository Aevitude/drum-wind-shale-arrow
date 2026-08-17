import { hashSeed, hexToRgb, mixHex, mulberry32, withAlpha } from "@/skin/color";
import type { ResolvedSkin } from "@/skin/types";
import type { Cell } from "./engine";

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  color: string;
  kind: "burst" | "mote";
};

type BoardRect = { x: number; y: number; w: number; h: number; cell: number };

const images = new Map<string, HTMLImageElement | "bad">();

export function loadBg(src: string) {
  if (images.has(src)) return;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => images.set(src, img);
  img.onerror = () => images.set(src, "bad");
  img.src = src;
  images.set(src, img);
}

export function paintFrame(opts: {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  skin: ResolvedSkin;
  body: Cell[];
  food: Cell;
  cols: number;
  rows: number;
  time: number;
  pulse: number;
  particles: Particle[];
  trauma: number;
  phase: "title" | "play" | "dead";
}) {
  const { ctx, w, h, skin, body, food, cols, rows, time, pulse, particles, trauma, phase } = opts;
  const shake = trauma * trauma;
  const rng = mulberry32(hashSeed(skin.seed) ^ 0x9e3779b9);
  const ox = (rng() - 0.5) * 10 * shake;
  const oy = (rng() - 0.5) * 10 * shake;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  drawAtmosphere(ctx, w, h, skin, time);
  ctx.save();
  ctx.translate(ox, oy);

  const board = layoutBoard(w, h, cols, rows);
  drawBoard(ctx, board, cols, rows, skin, time);
  drawDecor(ctx, board, skin, time, rng);
  if (phase !== "title") {
    drawFood(ctx, board, food, skin, time, pulse);
    drawSnake(ctx, board, body, skin, time);
  }
  drawParticles(ctx, board, particles);
  ctx.restore();
  drawVignette(ctx, w, h, skin);
}

function layoutBoard(w: number, h: number, cols: number, rows: number): BoardRect {
  const padX = Math.max(18, w * 0.07);
  const padTop = Math.max(88, h * 0.14);
  const padBot = Math.max(92, h * 0.16);
  const availW = w - padX * 2;
  const availH = h - padTop - padBot;
  const cell = Math.min(availW / cols, availH / rows);
  const bw = cell * cols;
  const bh = cell * rows;
  return { x: (w - bw) / 2, y: padTop + (availH - bh) / 2, w: bw, h: bh, cell };
}

function drawAtmosphere(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  skin: ResolvedSkin,
  time: number,
) {
  const img = images.get(skin.bgImage);
  if (img && img !== "bad" && img.complete && img.naturalWidth) {
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let dw = w;
    let dh = h;
    if (ir > cr) {
      dh = h;
      dw = h * ir;
    } else {
      dw = w;
      dh = w / ir;
    }
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.fillStyle = withAlpha(skin.palette.bg, skin.tone === "light" ? 0.28 : 0.42);
    ctx.fillRect(0, 0, w, h);
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, mixHex(skin.palette.bg, skin.palette.accent, 0.08));
    g.addColorStop(1, skin.palette.bg);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  if (skin.decor === "lanterns") drawMoon(ctx, w, h, skin, time);
  if (skin.decor === "scan") drawScan(ctx, w, h, skin, time);
  if (skin.decor === "snow" || skin.decor === "petals" || skin.decor === "embers" || skin.decor === "foam") {
    drawDrift(ctx, w, h, skin, time);
  }
}

function drawMoon(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  skin: ResolvedSkin,
  time: number,
) {
  const x = w * 0.78;
  const y = h * 0.16;
  const r = Math.min(w, h) * 0.11;
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.4);
  g.addColorStop(0, withAlpha(skin.palette.text, 0.28));
  g.addColorStop(1, withAlpha(skin.palette.text, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = withAlpha("#f4f1e6", 0.88);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = withAlpha(skin.palette.bg, 0.08 + Math.sin(time * 0.2) * 0.02);
  ctx.beginPath();
  ctx.arc(x - r * 0.18, y - r * 0.08, r * 0.92, 0, Math.PI * 2);
  ctx.fill();
}

function drawScan(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  skin: ResolvedSkin,
  time: number,
) {
  ctx.fillStyle = withAlpha(skin.palette.glow, 0.04);
  const y = ((time * 48) % (h + 80)) - 40;
  ctx.fillRect(0, y, w, 18);
}

function drawDrift(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  skin: ResolvedSkin,
  time: number,
) {
  const n = 22;
  for (let i = 0; i < n; i++) {
    const s = (i * 97 + hashSeed(skin.seed)) % 1000;
    const x = ((s * 12.7 + time * (12 + (i % 5) * 6)) % (w + 40)) - 20;
    const y = ((s * 8.3 + time * (10 + (i % 7) * 4)) % (h + 40)) - 20;
    const r = 1.2 + (i % 4);
    if (skin.decor === "petals") {
      ctx.fillStyle = withAlpha(skin.palette.foodHi, 0.45);
      ctx.beginPath();
      ctx.ellipse(x, y, r * 1.6, r * 0.7, time + i, 0, Math.PI * 2);
      ctx.fill();
    } else if (skin.decor === "embers") {
      ctx.fillStyle = withAlpha(skin.palette.food, 0.55);
      ctx.beginPath();
      ctx.arc(x, h - y, r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = withAlpha(skin.palette.text, skin.decor === "foam" ? 0.22 : 0.35);
      ctx.beginPath();
      ctx.arc(x, y, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  b: BoardRect,
  cols: number,
  rows: number,
  skin: ResolvedSkin,
  time: number,
) {
  const r = Math.min(28, b.cell * 0.9);
  ctx.save();
  roundRect(ctx, b.x - 10, b.y - 10, b.w + 20, b.h + 20, r + 10);
  ctx.fillStyle = withAlpha(skin.palette.surface, skin.tone === "light" ? 0.55 : 0.62);
  ctx.fill();
  ctx.strokeStyle = withAlpha(skin.palette.accent, 0.22);
  ctx.lineWidth = 1;
  ctx.stroke();

  roundRect(ctx, b.x, b.y, b.w, b.h, r);
  ctx.clip();
  ctx.fillStyle = withAlpha(skin.palette.board, 0.72);
  ctx.fillRect(b.x, b.y, b.w, b.h);

  const gap = skin.feel.cellGap;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = b.x + x * b.cell;
      const py = b.y + y * b.cell;
      const inset = b.cell * gap;
      const cr = b.cell * (0.18 + skin.feel.roundness * 0.16);
      ctx.fillStyle =
        (x + y) % 2 === 0
          ? withAlpha(skin.palette.grid, skin.tone === "light" ? 0.28 : 0.22)
          : withAlpha(skin.palette.grid, skin.tone === "light" ? 0.12 : 0.1);
      roundRect(ctx, px + inset, py + inset, b.cell - inset * 2, b.cell - inset * 2, cr);
      ctx.fill();
    }
  }

  if (skin.feel.glow > 0.4) {
    const g = ctx.createRadialGradient(
      b.x + b.w / 2,
      b.y + b.h / 2,
      b.w * 0.1,
      b.x + b.w / 2,
      b.y + b.h / 2,
      b.w * 0.72,
    );
    g.addColorStop(0, withAlpha(skin.palette.glow, 0.05 + Math.sin(time * 0.8) * 0.015));
    g.addColorStop(1, withAlpha(skin.palette.glow, 0));
    ctx.fillStyle = g;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }
  ctx.restore();
}

function drawDecor(
  ctx: CanvasRenderingContext2D,
  b: BoardRect,
  skin: ResolvedSkin,
  time: number,
  rng: () => number,
) {
  if (skin.decor === "lanterns") {
    for (let i = 0; i < 3 + skin.variant.deco; i++) {
      const x = b.x + b.w * (0.12 + i * 0.28);
      const y = b.y - 18;
      const flick = 0.55 + Math.sin(time * 2.1 + i) * 0.12;
      ctx.fillStyle = withAlpha(skin.palette.accent, 0.18 * flick);
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = withAlpha(skin.palette.accent, 0.7);
      ctx.beginPath();
      ctx.ellipse(x, y, 4.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (skin.decor === "dust") {
    for (let i = 0; i < 14; i++) {
      const x = b.x + rng() * b.w;
      const y = b.y + rng() * b.h;
      ctx.fillStyle = withAlpha(skin.palette.accent, 0.08 + rng() * 0.08);
      ctx.fillRect(x, y, 1.2, 1.2);
    }
  }
}

function drawFood(
  ctx: CanvasRenderingContext2D,
  b: BoardRect,
  food: Cell,
  skin: ResolvedSkin,
  time: number,
  pulse: number,
) {
  const cx = b.x + (food.x + 0.5) * b.cell;
  const cy = b.y + (food.y + 0.5) * b.cell;
  const s = b.cell * (0.28 + pulse * 0.05);
  const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, s * 3.2);
  g.addColorStop(0, withAlpha(skin.palette.food, 0.45 * skin.feel.glow + 0.15));
  g.addColorStop(1, withAlpha(skin.palette.food, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, s * 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.sin(time * 1.4) * 0.08);

  if (skin.food === "cube") {
    ctx.fillStyle = skin.palette.food;
    ctx.shadowColor = skin.palette.food;
    ctx.shadowBlur = 16;
    const q = s * 1.15;
    ctx.fillRect(-q, -q, q * 2, q * 2);
  } else if (skin.food === "gem") {
    ctx.fillStyle = skin.palette.food;
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.3);
    ctx.lineTo(s, 0);
    ctx.lineTo(0, s * 1.3);
    ctx.lineTo(-s, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = withAlpha(skin.palette.foodHi, 0.7);
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.6);
    ctx.lineTo(s * 0.35, 0);
    ctx.lineTo(0, s * 0.2);
    ctx.closePath();
    ctx.fill();
  } else if (skin.food === "seal") {
    ctx.fillStyle = skin.palette.food;
    ctx.beginPath();
    ctx.arc(0, 0, s * 1.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = withAlpha(skin.palette.foodHi, 0.7);
    ctx.lineWidth = 1.4;
    ctx.strokeRect(-s * 0.35, -s * 0.35, s * 0.7, s * 0.7);
  } else if (skin.food === "blossom" || skin.food === "lotus") {
    ctx.fillStyle = skin.palette.food;
    for (let i = 0; i < 5; i++) {
      ctx.rotate((Math.PI * 2) / 5);
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.7, s * 0.38, s * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = skin.palette.foodHi;
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = skin.palette.food;
    ctx.beginPath();
    ctx.arc(0, 0, s * 1.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = withAlpha(skin.palette.foodHi, 0.85);
    ctx.beginPath();
    ctx.arc(-s * 0.28, -s * 0.28, s * 0.32, 0, Math.PI * 2);
    ctx.fill();
    if (skin.food === "peach" || skin.food === "berry") {
      ctx.strokeStyle = mixHex(skin.palette.snakeLo, "#3a6a3a", 0.5);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.9);
      ctx.quadraticCurveTo(s * 0.4, -s * 1.4, s * 0.15, -s * 1.7);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawSnake(
  ctx: CanvasRenderingContext2D,
  b: BoardRect,
  body: Cell[],
  skin: ResolvedSkin,
  time: number,
) {
  if (!body.length) return;
  const pts = body.map((c) => ({
    x: b.x + (c.x + 0.5) * b.cell,
    y: b.y + (c.y + 0.5) * b.cell,
  }));

  if (skin.feel.glow > 0.35) {
    ctx.save();
    ctx.strokeStyle = withAlpha(skin.palette.glow, 0.22 * skin.feel.glow);
    ctx.lineWidth = b.cell * (0.72 + skin.feel.glow * 0.15);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = skin.palette.glow;
    ctx.shadowBlur = 18 * skin.feel.glow;
    strokePath(ctx, pts);
    ctx.restore();
  }

  const n = pts.length;
  for (let i = n - 1; i >= 0; i--) {
    const p = pts[i]!;
    const t = n === 1 ? 1 : 1 - i / (n - 1);
    const taper = 0.55 + t * 0.45;
    const rad = (b.cell * (0.36 + skin.feel.roundness * 0.08)) * taper;
    const col = mixHex(skin.palette.snakeLo, mixHex(skin.palette.snake, skin.palette.snakeHi, t * 0.65), t);
    const g = ctx.createRadialGradient(p.x - rad * 0.28, p.y - rad * 0.32, rad * 0.1, p.x, p.y, rad);
    g.addColorStop(0, mixHex(col, skin.palette.snakeHi, 0.55 + skin.feel.metal * 0.25));
    g.addColorStop(0.55, col);
    g.addColorStop(1, mixHex(col, skin.palette.snakeLo, 0.55));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
    ctx.fill();

    if (skin.feel.metal > 0.4 && i % 2 === 0) {
      ctx.strokeStyle = withAlpha(skin.palette.snakeHi, 0.25);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  const head = pts[0]!;
  const neck = pts[1] ?? { x: head.x - 8, y: head.y };
  const ang = Math.atan2(head.y - neck.y, head.x - neck.x);
  const hr = b.cell * (0.4 + skin.feel.roundness * 0.06);
  ctx.save();
  ctx.translate(head.x, head.y);
  ctx.rotate(ang);

  const hg = ctx.createRadialGradient(-hr * 0.2, -hr * 0.25, 2, 0, 0, hr);
  hg.addColorStop(0, skin.palette.snakeHi);
  hg.addColorStop(0.55, mixHex(skin.palette.head, skin.palette.snake, 0.35));
  hg.addColorStop(1, skin.palette.snakeLo);
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.ellipse(hr * 0.08, 0, hr * 1.05, hr * 0.92, 0, 0, Math.PI * 2);
  ctx.fill();

  if (skin.snake === "jade" || skin.snake === "gold" || skin.snake === "mineral") {
    ctx.fillStyle = skin.palette.head;
    ctx.beginPath();
    ctx.moveTo(hr * 0.15, -hr * 0.95);
    ctx.lineTo(hr * 0.05, -hr * 1.45);
    ctx.lineTo(-hr * 0.12, -hr * 0.85);
    ctx.closePath();
    ctx.fill();
  }

  const blink = (Math.sin(time * 0.7) + 1) * 0.5 > 0.96 ? 0.15 : 1;
  ctx.fillStyle = skin.tone === "light" ? "#1a1614" : "#0b0c10";
  ctx.beginPath();
  ctx.ellipse(hr * 0.38, -hr * 0.28, hr * 0.13, hr * 0.16 * blink, 0, 0, Math.PI * 2);
  ctx.ellipse(hr * 0.38, hr * 0.28, hr * 0.13, hr * 0.16 * blink, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = withAlpha("#ffffff", 0.85);
  ctx.beginPath();
  ctx.arc(hr * 0.44, -hr * 0.32, hr * 0.045, 0, Math.PI * 2);
  ctx.arc(hr * 0.44, hr * 0.24, hr * 0.045, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function strokePath(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0]!.x, pts[0]!.y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
  ctx.stroke();
}

function drawParticles(ctx: CanvasRenderingContext2D, b: BoardRect, parts: Particle[]) {
  for (const p of parts) {
    const a = p.life / p.max;
    ctx.fillStyle = withAlpha(p.color, a * (p.kind === "burst" ? 0.9 : 0.45));
    ctx.beginPath();
    ctx.arc(b.x + p.x, b.y + p.y, p.r * (0.6 + a), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVignette(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  skin: ResolvedSkin,
) {
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.72);
  g.addColorStop(0, withAlpha(skin.palette.bg, 0));
  g.addColorStop(1, withAlpha(skin.palette.bg, skin.tone === "light" ? 0.18 : 0.46));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function spawnBurst(parts: Particle[], cell: Cell, boardCell: number, color: string, n = 14) {
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
    const sp = 40 + Math.random() * 80;
    parts.push({
      x: (cell.x + 0.5) * boardCell,
      y: (cell.y + 0.5) * boardCell,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 0.45 + Math.random() * 0.25,
      max: 0.7,
      r: 1.6 + Math.random() * 2.2,
      color,
      kind: "burst",
    });
  }
}

export function hexRgb(hex: string) {
  return hexToRgb(hex);
}
