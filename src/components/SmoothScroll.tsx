"use client";
// GSAP ScrollSmoother (smooth: 0.7) over #smooth-wrapper / #smooth-content from the root layout.
// Off under reduced motion (the wrapper then behaves as a plain div).
import { useLayoutEffect } from "react";
import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  // Layout effect: the smoother must exist before the page ScrollTriggers (BrandReveal) are created.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const smoother = ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.7 });
    // Content height changes (route changes, fonts, images): re-measure once things settle.
    let t = 0;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 150); });
    ro.observe(document.getElementById("smooth-content")!);
    return () => { clearTimeout(t); ro.disconnect(); smoother.kill(); };
  }, []);
  return null;
}
