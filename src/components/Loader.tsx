"use client";
// Site loader: wordmark + percent counter, a lime progress bar with glow, plant categories cycling with blur,
// then the panel slides up. 2.6s ease-out cubic, leaves after 280ms with transform 0.9s cubic-bezier(0.76, 0, 0.24, 1).
// Shown once per browser session: LOADER_SCRIPT (inlined in <head> by the layout) hides it before first paint
// on later visits, so there is no flash.
import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/site";

const DURATION = 2600;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const KEY = "broto-loader-seen";
const NAMES = categories.map((c) => c.name);

export const LOADER_SCRIPT = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.classList.add("loader-seen")}catch(e){}`;

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");
  const raf = useRef(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen) {
      timers.push(setTimeout(() => setPhase("done"), 0));
      return () => timers.forEach(clearTimeout);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 500 : DURATION;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const start = performance.now();
    const ease = (t: number) => 1 - (1 - t) ** 3;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total), e = ease(t);
      setPct(Math.round(e * 100));
      setIdx(Math.min(NAMES.length - 1, Math.floor(e * NAMES.length)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else {
        timers.push(setTimeout(() => setPhase("leaving"), reduced ? 0 : 280));
        timers.push(setTimeout(() => { setPhase("done"); root.style.overflow = prev; }, reduced ? 250 : 1180));
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); timers.forEach(clearTimeout); root.style.overflow = prev; };
  }, []);

  if (phase === "done") return null;
  const leaving = phase === "leaving";
  return (
    <div className="loader" role="status" aria-live="polite" aria-label={`Carregando ${pct}%`}
      style={{ transform: leaving ? "translate3d(0,-100%,0)" : "none", transition: `transform 0.9s ${EASE}` }}>
      <div className="loader__glow" style={{ left: `calc(50% - 370px + ${(pct / 100) * 320}px)`, opacity: leaving ? 0 : 1 }} />
      <div className="loader__box" style={{ opacity: leaving ? 0 : 1, transform: leaving ? "translate3d(0,-14px,0)" : "none", transition: `opacity .45s ease, transform .6s ${EASE}` }}>
        <div className="loader__row">
          <span className="loader__word">O Broto da Natureza</span>
          <span className="loader__pct">{String(pct).padStart(3, "0")}%</span>
        </div>
        <div className="loader__track"><div className="loader__bar" style={{ width: `${pct}%` }} /></div>
        <div className="loader__row loader__row--small">
          <span className="loader__label">Preparando</span>
          <div className="loader__names">
            {NAMES.map((n, i) => {
              const d = i - idx;
              return <span key={n} style={{ opacity: d === 0 ? 1 : 0, filter: d === 0 ? "blur(0)" : "blur(4px)", transform: `translate3d(0, ${d === 0 ? 0 : d > 0 ? 14 : -14}px, 0)` }}>{n}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
