export type Dir = "up" | "down" | "left" | "right";
export type Cell = { x: number; y: number };

export const COLS = 13;
export const ROWS = 17;

const OPPOSITE: Record<Dir, Dir> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const STEP: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export type TickResult = {
  ate: boolean;
  died: boolean;
  score: number;
  eaten?: Cell;
};

export class SnakeGame {
  cols = COLS;
  rows = ROWS;
  snake: Cell[] = [];
  prev: Cell[] = [];
  dir: Dir = "right";
  queued: Dir[] = [];
  food: Cell = { x: 8, y: 8 };
  score = 0;
  alive = true;
  tickMs = 148;

  reset() {
    const cx = Math.floor(this.cols / 2);
    const cy = Math.floor(this.rows / 2);
    this.snake = [
      { x: cx, y: cy },
      { x: cx - 1, y: cy },
      { x: cx - 2, y: cy },
    ];
    this.prev = this.snake.map((c) => ({ ...c }));
    this.dir = "right";
    this.queued = [];
    this.score = 0;
    this.alive = true;
    this.tickMs = 148;
    this.placeFood();
  }

  queue(dir: Dir) {
    if (!this.alive) return;
    const last = this.queued[this.queued.length - 1] ?? this.dir;
    if (dir === last || dir === OPPOSITE[last]) return;
    if (this.queued.length >= 2) this.queued.shift();
    this.queued.push(dir);
  }

  step(): TickResult {
    if (!this.alive) return { ate: false, died: true, score: this.score };
    this.prev = this.snake.map((c) => ({ ...c }));
    if (this.queued.length) this.dir = this.queued.shift()!;
    const head = this.snake[0]!;
    const d = STEP[this.dir];
    const next = { x: head.x + d.x, y: head.y + d.y };
    if (next.x < 0 || next.y < 0 || next.x >= this.cols || next.y >= this.rows) {
      this.alive = false;
      return { ate: false, died: true, score: this.score };
    }
    const willEat = next.x === this.food.x && next.y === this.food.y;
    const body = willEat ? this.snake : this.snake.slice(0, -1);
    if (body.some((c) => c.x === next.x && c.y === next.y)) {
      this.alive = false;
      return { ate: false, died: true, score: this.score };
    }
    this.snake = [next, ...this.snake];
    if (willEat) {
      this.score += 1;
      this.tickMs = Math.max(92, 148 - this.score * 1.6);
      this.placeFood();
      return { ate: true, died: false, score: this.score, eaten: next };
    }
    this.snake.pop();
    return { ate: false, died: false, score: this.score };
  }

  interpolated(t: number): Cell[] {
    const k = t * t * (3 - 2 * t);
    const n = Math.max(this.snake.length, this.prev.length);
    const out: Cell[] = [];
    for (let i = 0; i < n; i++) {
      const a = this.prev[Math.min(i, this.prev.length - 1)] ?? this.snake[0]!;
      const b = this.snake[Math.min(i, this.snake.length - 1)] ?? a;
      out.push({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
    }
    return out;
  }

  private placeFood() {
    const taken = new Set(this.snake.map((c) => `${c.x},${c.y}`));
    const free: Cell[] = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (!taken.has(`${x},${y}`)) free.push({ x, y });
      }
    }
    this.food = free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
  }
}
