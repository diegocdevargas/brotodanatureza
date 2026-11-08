"use client";
// Brand Reveal: scroll-linked wordmark mask over a photo.
// Section is 400vh; a 100vh frame (pinned by GSAP ScrollTrigger, snapping to start / copy / last) holds the photo, a plate (#0F1511) with the BROTO wordmark cut out
// of it as an SVG mask, an accent line and the copy. The zoom dives through the stem of the T.
// Progress p = scrolled / (section height - viewport):
//   a (zoom)      = p < .66 ? ease(p in .08–.42) : 1 - ease(p in .66–.94)     (ease = cosine in-out)
//   wordmark      scales from its resting size (68% width, centre at 60% height; 86% width below 810px)
//                 by max(.6W / (16 * s), .6H / (50 * s), 2) ** a, moving its zoom anchor to the frame centre
//   plate opacity = 1 - (p in .43–.47) + (p in .61–.65)
//   copy opacity  = (p in .47–.53) - (p in .56–.61), y = 24 * (1 - in) - 24 * out
//   video scale   = 1.15 - .15 * a, accent line opacity = 1 - clamp(5a)
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const IMAGE = "https://images.unsplash.com/photo-1695729812323-b0d9e3f2f97e?auto=format&fit=crop&w=2400&q=75"; // Inside the Mata Atlântica, Praia do Sono (RJ) — Caio Arbulu
// B R O T O drawn on a 100-unit grid (32-unit stems, 60-unit gaps); the zoom anchor is the centre of the T stem.
const WORD_W = 1142, WORD_H = 100, ANCHOR_X = 812, ANCHOR_Y = 60, STEM = 16;
const O = (x: number) =>
  `M${x + 40} 0H${x + 140}Q${x + 180} 0 ${x + 180} 40V60Q${x + 180} 100 ${x + 140} 100H${x + 40}Q${x} 100 ${x} 60V40Q${x} 0 ${x + 40} 0Z` +
  `M${x + 46} 20H${x + 134}Q${x + 148} 20 ${x + 148} 34V66Q${x + 148} 80 ${x + 134} 80H${x + 46}Q${x + 32} 80 ${x + 32} 66V34Q${x + 32} 20 ${x + 46} 20Z`;
const LETTERS: { d: string; evenOdd?: boolean }[] = [
  { d: "M0 0H142Q180 0 180 26Q180 42 166 50Q180 58 180 74Q180 100 142 100H0ZM32 20H134Q148 20 148 30Q148 40 134 40H32ZM32 60H136Q150 60 150 70Q150 80 136 80H32Z", evenOdd: true },
  { d: "M240 0H382Q420 0 420 31Q420 56 394 61L422 100H386L360 62H272V100H240ZM272 20H376Q388 20 388 31Q388 42 376 42H272Z", evenOdd: true },
  { d: O(482), evenOdd: true },
  { d: "M722 0H902V20H828V100H796V20H722Z" },
  { d: O(962), evenOdd: true },
];
// Scroll-progress stops the reveal snaps to: start, copy fully shown, last.
const SNAPS = [0, 0.545, 1];
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const ease = (v: number) => 0.5 - Math.cos(Math.PI * v) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function frame(p: number, W: number, H: number, wordWidth: number, vpos: number) {
  const a = p < 0.66 ? ease(range(p, 0.08, 0.42)) : 1 - ease(range(p, 0.66, 0.94));
  const s = (W * wordWidth) / WORD_W;
  const ox = W / 2 - (WORD_W / 2) * s;
  const oy = H * vpos - (WORD_H / 2) * s;
  const ax = ox + ANCHOR_X * s, ay = oy + ANCHOR_Y * s;
  const zoom = Math.max((W * 0.6) / (STEM * s), (H * 0.6) / ((WORD_H / 2) * s), 2) ** a;
  const fx = lerp(ax, W / 2, a), fy = lerp(ay, H / 2, a);
  const cin = range(p, 0.47, 0.53), cout = range(p, 0.56, 0.61);
  return {
    group: `translate(${fx} ${fy}) scale(${zoom}) translate(${-ax} ${-ay}) translate(${ox} ${oy}) scale(${s})`,
    plate: 1 - range(p, 0.43, 0.47) + range(p, 0.61, 0.65),
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
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const maskId = `ho-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Track the frame size (the SVG viewBox follows it)
  useIso(() => {
    const el = stickRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width), h = Math.round(e.contentRect.height);
      if (w > 0 && h > 0) setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll-linked update: ONE GSAP ScrollTrigger pins the stage and maps the 400vh track to progress p (0–1).
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
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: stick,
        pinSpacing: false,
        snap: ctx.conditions?.motion ? { snapTo: SNAPS, duration: { min: 0.3, max: 0.8 }, delay: 0.1, ease: "power2.inOut" } : undefined,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => { W = stick.clientWidth; H = stick.clientHeight; render(self.progress); },
      });
    });
    return () => mm.revert();
  }, []);

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
                {LETTERS.map((l, i) => <path key={i} d={l.d} fill="black" fillRule={l.evenOdd ? "evenodd" : "nonzero"} />)}
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
