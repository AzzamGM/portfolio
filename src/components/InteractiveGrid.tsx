import { useEffect, useRef } from "react";

const CELL = 46;
const SQUARE = 38;
const RADIUS = 32;
const DECAY = 0.92;
const BASE_ALPHA = 0.01;
const KEY_STRIDE = 4096;

const PULSE_SPEED = 340;
const PULSE_LIFE = 0.9;
const PULSE_BAND = 30;

const TRACER_MAX = 3;
const TRACER_SPEED = [32, 48];
const TRACER_GAP = [2400, 5200];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

type Tracer = {
  axis: "h" | "v";
  line: number;
  pos: number;
  prev: number;
  dir: 1 | -1;
  speed: number;
  length: number;
  travelled: number;
};

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const intensity = new Map<number, number>();

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };

    let pulses: { x: number; y: number; start: number }[] = [];

    let tracers: Tracer[] = [];
    let nextSpawn = performance.now() + rand(TRACER_GAP[0], TRACER_GAP[1]);
    let lastTime = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      if (!mouse.active) {

        mouse.px = e.clientX;
        mouse.py = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e: PointerEvent) => {
      pulses.push({
        x: e.clientX,
        y: e.clientY + window.scrollY,
        start: performance.now(),
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    const offset = SQUARE / 2;

    const render = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const scrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      ctx.clearRect(0, 0, w, h);

      if (mouse.active && !reduceMotion) {
        const seed = (px: number, docY: number) => {
          const minCol = Math.max(0, Math.floor((px - RADIUS) / CELL));
          const maxCol = Math.floor((px + RADIUS) / CELL);
          const minRow = Math.floor((docY - RADIUS) / CELL);
          const maxRow = Math.floor((docY + RADIUS) / CELL);
          for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
              const cx = c * CELL + offset;
              const cy = r * CELL + offset;
              const dist = Math.hypot(cx - px, cy - docY);
              if (dist < RADIUS) {
                const v = 1 - dist / RADIUS;
                const key = r * KEY_STRIDE + c;
                if (v > (intensity.get(key) || 0)) intensity.set(key, v);
              }
            }
          }
        };

        const dx = mouse.x - mouse.px;
        const dy = mouse.y - mouse.py;
        const travelled = Math.hypot(dx, dy);
        const steps = Math.min(64, Math.ceil(travelled / (RADIUS * 0.5)));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          seed(mouse.px + dx * t, mouse.py + dy * t + scrollY);
        }
        seed(mouse.x, mouse.y + scrollY);

        mouse.px = mouse.x;
        mouse.py = mouse.y;
      }

      if (pulses.length) {
        for (const p of pulses) {
          const age = (now - p.start) / 1000;
          const life = 1 - age / PULSE_LIFE;
          if (life <= 0) continue;
          const ring = age * PULSE_SPEED;
          const reach = ring + PULSE_BAND;
          const minCol = Math.max(0, Math.floor((p.x - reach) / CELL));
          const maxCol = Math.floor((p.x + reach) / CELL);
          const minRow = Math.floor((p.y - reach) / CELL);
          const maxRow = Math.floor((p.y + reach) / CELL);
          for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
              const cx = c * CELL + offset;
              const cy = r * CELL + offset;
              const dist = Math.hypot(cx - p.x, cy - p.y);
              const edge = Math.abs(dist - ring);
              if (edge < PULSE_BAND) {
                const v = life * (1 - edge / PULSE_BAND);
                const key = r * KEY_STRIDE + c;
                if (v > (intensity.get(key) || 0)) intensity.set(key, v);
              }
            }
          }
        }
        pulses = pulses.filter((p) => (now - p.start) / 1000 < PULSE_LIFE);
      }

      const startRow = Math.floor(scrollY / CELL);
      const endRow = Math.ceil((scrollY + h) / CELL);
      const endCol = Math.ceil(w / CELL);

      if (!reduceMotion) {
        if (now >= nextSpawn && tracers.length < TRACER_MAX) {
          const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
          const speed = rand(TRACER_SPEED[0], TRACER_SPEED[1]);
          if (Math.random() < 0.5) {
            const line = startRow + Math.floor(rand(0, endRow - startRow + 1));
            const start = dir === 1 ? -1 : endCol + 1;
            const length = endCol + 2;
            tracers.push({ axis: "h", line, pos: start, prev: start, dir, speed, length, travelled: 0 });
          } else {
            const totalRows = Math.ceil(
              document.documentElement.scrollHeight / CELL,
            );
            const line = Math.floor(rand(0, endCol + 1));
            const start = dir === 1 ? -1 : totalRows + 1;
            const length = totalRows + 2;
            tracers.push({ axis: "v", line, pos: start, prev: start, dir, speed, length, travelled: 0 });
          }
          nextSpawn = now + rand(TRACER_GAP[0], TRACER_GAP[1]);
        }

        for (const tr of tracers) {
          tr.prev = tr.pos;
          tr.pos += tr.dir * tr.speed * dt;
          tr.travelled += tr.speed * dt;
          const from = Math.round(tr.prev);
          const to = Math.round(tr.pos);
          const step = to >= from ? 1 : -1;
          for (let p = from; p !== to + step; p += step) {
            const key =
              tr.axis === "h" ? tr.line * KEY_STRIDE + p : p * KEY_STRIDE + tr.line;
            intensity.set(key, 1);
          }
        }
        tracers = tracers.filter((tr) => tr.travelled < tr.length);
      }

      for (let r = startRow; r <= endRow; r++) {
        for (let c = 0; c <= endCol; c++) {
          const lit = intensity.get(r * KEY_STRIDE + c) || 0;
          const alpha = BASE_ALPHA + lit * 0.85;

          const x = c * CELL;
          const y = r * CELL - scrollY;

          if (lit > 0.04) {
            ctx.shadowColor = `rgba(0, 230, 110, ${lit * 0.8})`;
            ctx.shadowBlur = 18 * lit;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillStyle = `rgba(0, 196, 94, ${alpha})`;
          ctx.fillRect(x, y, SQUARE, SQUARE);
        }
      }
      ctx.shadowBlur = 0;

      for (const [key, v] of intensity) {
        const next = v * DECAY;
        if (next < 0.02) intensity.delete(key);
        else intensity.set(key, next);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-grid" aria-hidden="true" />;
}
