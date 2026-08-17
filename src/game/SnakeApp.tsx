import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { skinFromSearch } from "@/skin/resolve";
import type { ResolvedSkin } from "@/skin/types";
import { SilkAudio } from "./audio";
import { COLS, ROWS, SnakeGame, type Dir } from "./engine";
import { loadBg, paintFrame, spawnBurst, type Particle } from "./render";

type Phase = "title" | "play" | "dead";

const KEY_DIR: Record<string, Dir> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};

function bestKey(skin: ResolvedSkin) {
  return `silk-snake:${skin.id}`;
}

export function SnakeApp({ search }: { search?: string }) {
  const skin = skinFromSearch(search);
  return <SilkTable skin={skin} />;
}

function SilkTable({ skin }: { skin: ResolvedSkin }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef(new SnakeGame());
  const audioRef = useRef(new SilkAudio());
  const partsRef = useRef<Particle[]>([]);
  const phaseRef = useRef<Phase>("title");
  const accRef = useRef(0);
  const lastRef = useRef(0);
  const traumaRef = useRef(0);
  const pulseRef = useRef(0);
  const bestRef = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  const [phase, setPhase] = useState<Phase>("title");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    loadBg(skin.bgImage);
    const stored = Number(localStorage.getItem(bestKey(skin)) ?? 0);
    const n = Number.isFinite(stored) ? stored : 0;
    setBest(n);
    bestRef.current = n;
    const root = document.documentElement;
    const p = skin.palette;
    root.style.setProperty("--skin-bg", p.bg);
    root.style.setProperty("--skin-surface", p.surface);
    root.style.setProperty("--skin-fg", p.text);
    root.style.setProperty("--skin-muted", p.muted);
    root.style.setProperty("--skin-accent", p.accent);
    root.style.setProperty("--skin-food", p.food);
    root.style.setProperty("--skin-glow", p.glow);
    root.dataset.tone = skin.tone;
    document.title = `${skin.copy.title} · ${skin.label}`;
  }, [skin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const game = gameRef.current;
    game.reset();
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - (lastRef.current || now)) / 1000);
      lastRef.current = now;
      const t = now / 1000;

      if (phaseRef.current === "play" && game.alive) {
        accRef.current += dt * 1000;
        while (accRef.current >= game.tickMs) {
          accRef.current -= game.tickMs;
          const res = game.step();
          setScore(res.score);
          if (res.ate) {
            pulseRef.current = 1;
            traumaRef.current = Math.min(1, traumaRef.current + 0.22);
            const bite = res.eaten ?? game.food;
            const cell = Math.min(canvas.clientWidth / COLS, canvas.clientHeight / ROWS);
            spawnBurst(partsRef.current, bite, cell, skin.palette.foodHi);
            audioRef.current.eat(skin);
            if (res.score > bestRef.current) {
              bestRef.current = res.score;
              setBest(res.score);
              localStorage.setItem(bestKey(skin), String(res.score));
            }
          }
          if (res.died) {
            traumaRef.current = 0.7;
            audioRef.current.die(skin);
            setPhase("dead");
          }
        }
      }

      traumaRef.current = Math.max(0, traumaRef.current - dt * 1.8);
      pulseRef.current = Math.max(0, pulseRef.current - dt * 2.4);

      const parts = partsRef.current;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]!;
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.92;
        p.vy *= 0.92;
        if (p.life <= 0) parts.splice(i, 1);
      }

      const alpha =
        phaseRef.current === "play" && game.alive
          ? Math.min(1, accRef.current / game.tickMs)
          : 1;
      const body = phaseRef.current === "play" ? game.interpolated(alpha) : game.snake;

      paintFrame({
        ctx,
        w: canvas.clientWidth,
        h: canvas.clientHeight,
        skin,
        body,
        food: game.food,
        cols: game.cols,
        rows: game.rows,
        time: t,
        pulse: pulseRef.current,
        particles: parts,
        trauma: traumaRef.current,
        phase: phaseRef.current,
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [skin]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        if (phaseRef.current !== "play") {
          e.preventDefault();
          begin();
        }
        return;
      }
      const dir = KEY_DIR[e.code];
      if (!dir) return;
      e.preventDefault();
      if (phaseRef.current !== "play") begin();
      gameRef.current.queue(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const begin = () => {
    audioRef.current.unlock();
    audioRef.current.start(skin);
    gameRef.current.reset();
    accRef.current = 0;
    setScore(0);
    setPhase("play");
  };

  const steer = (dir: Dir) => {
    if (phase !== "play") begin();
    gameRef.current.queue(dir);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.hypot(dx, dy) < 24) {
      if (phase !== "play") begin();
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? "right" : "left");
    else steer(dy > 0 ? "down" : "up");
  };

  return (
    <main className="silk-root" data-tone={skin.tone}>
      <div className="silk-bg" style={{ backgroundImage: `url(${skin.bgImage})` }} />
      <div className="silk-wash" />
      <canvas
        ref={canvasRef}
        className="silk-canvas"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeRef.current = null;
        }}
      />

      <header className="silk-hud">
        <div className="silk-stat">
          <span className="silk-k">分数</span>
          <span className="silk-v">{score}</span>
        </div>
        <div className="silk-brand">
          <p className="silk-en">{skin.english}</p>
          <p className="silk-food">{skin.copy.food}</p>
        </div>
        <div className="silk-stat silk-stat-right">
          <span className="silk-k">最好</span>
          <span className="silk-v">{best}</span>
        </div>
      </header>

      {phase !== "play" && (
        <section className="silk-veil" aria-live="polite">
          <p className="silk-eyebrow">{skin.label}</p>
          <h1 className="silk-title">{phase === "dead" ? skin.copy.die : skin.copy.title}</h1>
          <p className="silk-sub">
            {phase === "dead" ? `这一夜走了 ${score} 步` : skin.copy.subtitle}
          </p>
          <button type="button" className="silk-cta" onClick={begin}>
            {phase === "dead" ? "再走一次" : skin.copy.start}
          </button>
          <p className="silk-hint">方向键或滑动</p>
        </section>
      )}

      {phase === "play" && (
        <nav className="silk-pad" aria-label="方向">
          <button type="button" className="silk-dir" aria-label="上" onClick={() => steer("up")}>
            <ChevronUp size={20} strokeWidth={1.5} />
          </button>
          <div className="silk-pad-mid">
            <button type="button" className="silk-dir" aria-label="左" onClick={() => steer("left")}>
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button type="button" className="silk-dir" aria-label="下" onClick={() => steer("down")}>
              <ChevronDown size={20} strokeWidth={1.5} />
            </button>
            <button type="button" className="silk-dir" aria-label="右" onClick={() => steer("right")}>
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      )}
    </main>
  );
}
