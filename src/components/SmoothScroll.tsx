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
    const wrapper = document.getElementById("smooth-wrapper")!;
    // Native anchor and focus scrolling can move the wrapper independently of ScrollSmoother.
    const syncWrapperScroll = () => {
      const offset = wrapper.scrollTop;
      if (!offset) return;
      wrapper.scrollTop = 0;
      smoother.scrollTop(smoother.scrollTop() + offset);
    };
    wrapper.addEventListener("scroll", syncWrapperScroll);
    syncWrapperScroll();
    // Content height changes (route changes, fonts, images): re-measure once things settle.
    let t = 0;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 150); });
    ro.observe(document.getElementById("smooth-content")!);
    return () => { clearTimeout(t); ro.disconnect(); wrapper.removeEventListener("scroll", syncWrapperScroll); smoother.kill(); };
  }, []);
  return null;
}
