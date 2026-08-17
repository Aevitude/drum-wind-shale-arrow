import type { ResolvedSkin } from "@/skin/types";

export class SilkAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;

  unlock() {
    const ctx = this.ensure();
    if (ctx.state === "suspended") void ctx.resume();
  }

  eat(skin: ResolvedSkin) {
    this.blip(skin, 520, 0.07, "triangle");
    this.blip(skin, 780, 0.05, "sine", 0.03);
  }

  die(skin: ResolvedSkin) {
    this.blip(skin, 220, 0.22, "sine");
    this.blip(skin, 140, 0.28, "triangle", 0.04);
  }

  start(skin: ResolvedSkin) {
    this.blip(skin, 360, 0.08, "sine");
    this.blip(skin, 540, 0.1, "triangle", 0.06);
  }

  turn() {
    this.blip(null, 240, 0.03, "sine");
  }

  private blip(
    skin: ResolvedSkin | null,
    freq: number,
    dur: number,
    type: OscillatorType,
    delay = 0,
  ) {
    const ctx = this.ensure();
    if (ctx.state === "suspended") return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    const hueBias = skin ? (skin.variant.copy - 1) * 18 : 0;
    osc.frequency.setValueAtTime(freq + hueBias, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.72), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.045, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  private ensure() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }
}
