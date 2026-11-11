"use client";

import type { MouseEvent } from "react";
import { ScrollSmoother } from "@/lib/gsap";
import { Button } from "@/components/ui";

export default function PreparationLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById("preparo");
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== "#preparo") window.history.pushState(null, "", "#preparo");

    const smoother = ScrollSmoother.get();
    if (smoother) {
      const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      smoother.scrollTo(smoother.offset(target, "top top") - margin, true);
    } else {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  return <Button href="#preparo" kind="dark" className="ca-btn64" onClick={handleClick}>Ver modo de preparo</Button>;
}
