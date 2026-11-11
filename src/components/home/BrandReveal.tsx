"use client";
// Brand Reveal: scroll-linked logo mask over a photo.
// Section is 600vh; a 100vh frame (pinned, snapping to start / copy / last) holds the photo, a plate (#0F1511) with the Guabiju logo cut out
// of it as an SVG mask, an accent line and the copy.
// Progress p = scrolled / (section height - viewport):
//   a (zoom)      = p < .76 ? ease(p in .06–.30) : 1 - ease(p in .76–.94)     (ease = cosine in-out)
//   logo          fits within 68% width / 68% height (86% width below 810px), preserving its aspect ratio
//                 with the existing wordmark zoom range and moving its centre to the frame centre
//   plate opacity = 1 - (p in .31–.34) + (p in .72–.75)
//   copy opacity  = (p in .34–.40) - (p in .66–.72), y = 24 * (1 - in) - 24 * out
//   video scale   = 1.15 - .15 * a, accent line opacity = 1 - clamp(5a)
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const IMAGE = "https://images.unsplash.com/photo-1695729812323-b0d9e3f2f97e?auto=format&fit=crop&w=2400&q=75"; // Inside the Mata Atlântica, Praia do Sono (RJ) — Caio Arbulu
const LOGO_W = 193.15, LOGO_H = 238.13;
const WORD_W = 1142, WORD_H = 100, STEM = 16;
// Scroll-progress stops the reveal snaps to: start, copy fully shown, last.
const SNAPS = [0, 0.52, 1];
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const ease = (v: number) => 0.5 - Math.cos(Math.PI * v) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function frame(p: number, W: number, H: number, wordWidth: number, vpos: number) {
  const a = p < 0.76 ? ease(range(p, 0.06, 0.3)) : 1 - ease(range(p, 0.76, 0.94));
  const s = Math.min((W * wordWidth) / LOGO_W, (H * 0.68) / LOGO_H);
  const ox = W / 2 - (LOGO_W / 2) * s;
  const oy = H * vpos - (LOGO_H / 2) * s;
  const ax = ox + (LOGO_W / 2) * s, ay = oy + (LOGO_H * 0.62) * s;
  const wordmarkScale = (W * wordWidth) / WORD_W;
  const zoom = Math.max((W * 0.6) / (STEM * wordmarkScale), (H * 0.6) / ((WORD_H / 2) * wordmarkScale), 2) ** a;
  const fx = lerp(ax, W / 2, a), fy = lerp(ay, H / 2, a);
  const cin = range(p, 0.34, 0.4), cout = range(p, 0.66, 0.72);
  return {
    group: `translate(${fx} ${fy}) scale(${zoom}) translate(${-ax} ${-ay}) translate(${ox} ${oy}) scale(${s})`,
    plate: 1 - range(p, 0.31, 0.34) + range(p, 0.72, 0.75),
    copyOpacity: cin - cout,
    copyY: 24 * (1 - cin) - 24 * cout,
    videoScale: 1.15 - 0.15 * a,
    line: 1 - clamp01(a * 5),
  };
}

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function BrandReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const plateRef = useRef<SVGRectElement>(null);
  const lineRef = useRef<SVGPolylineElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const renderCurrentRef = useRef<(() => void) | null>(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const maskId = `ho-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Track the frame size (the SVG viewBox follows it)
  useIso(() => {
    const el = stickRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width), h = Math.round(e.contentRect.height);
      if (w > 0 && h > 0) setSize((prev) => prev.w === w && prev.h === h ? prev : { w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll-linked update: one ScrollTrigger maps the 600vh track to progress p (0–1).
  // With motion allowed it snaps to three states: start (wordmark), copy shown, last (wordmark again).
  useIso(() => {
    const section = sectionRef.current, stick = stickRef.current;
    const group = groupRef.current, plate = plateRef.current, line = lineRef.current, copy = copyRef.current, image = imageRef.current;
    if (!section || !stick || !group || !plate || !line || !copy || !image) return;
    const setLine = gsap.quickSetter(line, "opacity");
    const setCopyOpacity = gsap.quickSetter(copy, "opacity");
    const setCopyY = gsap.quickSetter(copy, "y", "px");
    const setImage = gsap.quickSetter(image, "scale");
    let W = stick.clientWidth, H = stick.clientHeight;
    const render = (p: number) => {
      const f = frame(p, W, H, W < 810 ? 0.86 : 0.68, 0.6);
      group.setAttribute("transform", f.group);
      plate.setAttribute("opacity", String(f.plate));
      setLine(f.line);
      setCopyOpacity(f.copyOpacity);
      setCopyY(f.copyY);
      setImage(f.videoScale);
    };
    const mm = gsap.matchMedia();
    mm.add({
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
      mobileTouch: "(width < 810px) and (hover: none)",
    }, (ctx) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: ctx.conditions?.mobileTouch ? false : stick,
        pinSpacing: false,
        snap: ctx.conditions?.motion ? { snapTo: SNAPS, duration: { min: 0.6, max: 1.4 }, delay: 0.1, ease: "power2.inOut" } : undefined,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => { W = stick.clientWidth; H = stick.clientHeight; render(self.progress); },
      });
      renderCurrentRef.current = () => {
        W = stick.clientWidth;
        H = stick.clientHeight;
        render(trigger.progress);
      };
      return () => { renderCurrentRef.current = null; };
    });
    return () => mm.revert();
  }, []);

  // React reapplies the initial SVG transform after a size change; restore scroll progress before paint.
  useIso(() => {
    renderCurrentRef.current?.();
  }, [size]);

  const { w: W, h: H } = size;
  const f0 = frame(0, W, H, W < 810 ? 0.86 : 0.68, 0.6);
  return (
    <section ref={sectionRef} className="ho ho-reveal" aria-label="A natureza, vista de perto.">
      <div ref={stickRef} className="ho-reveal__stick">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imageRef} className="ho-reveal__video" src={IMAGE} alt="" loading="lazy" style={{ transform: `scale(${f0.videoScale})` }} />
        <svg className="ho-reveal__svg" aria-hidden width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x={-10} y={-10} width={W + 20} height={H + 20}>
              <rect x={-10} y={-10} width={W + 20} height={H + 20} fill="white" />
              <g ref={groupRef} transform={f0.group}>
                <image href="/media/guabiju_ofi.svg" width={LOGO_W} height={LOGO_H} style={{ filter: "brightness(0)" }} />
              </g>
            </mask>
          </defs>
          <rect ref={plateRef} x={-2} y={-2} width={W + 4} height={H + 4} fill="rgb(15, 21, 17)" mask={`url(#${maskId})`} opacity={f0.plate} />
          <polyline ref={lineRef} points={`${W * 0.82},-2 ${W * 0.91},${H * 0.13} ${W + 2},${H * 0.105}`} fill="none" stroke="rgba(255, 255, 255, 0.28)" strokeWidth={1.5} style={{ opacity: f0.line }} />
        </svg>
        <div ref={copyRef} className="ho-reveal__copy" style={{ opacity: f0.copyOpacity, transform: `translate3d(0, ${f0.copyY}px, 0)` }}>
          <p className="ho-reveal__eyebrow">Da raiz à folha</p>
          <h2>A natureza, vista <em>de perto.</em></h2>
          <p>Cada planta tem uma história, um princípio ativo e um jeito certo de usar. Aqui você conhece os três.</p>
        </div>
      </div>
    </section>
  );
}
