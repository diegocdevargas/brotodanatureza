"use client";
// Lubrix motion language, read from the Framer page modules:
// - In-view appear: opacity 0.001 -> 1, y 24 -> 0, tween 0.9s, ease [0.22, 1, 0.36, 1],
//   delays 0 / 0.1 / 0.12 / 0.15 / 0.2 / 0.25 / 0.3, once, threshold 0.2–0.3.
// - Page-load appear (hero copy): same tween with delays 0.1 / 0.3 / 0.5.
// - "onInView" transform (scroll-linked, see RiseIn): y offset (300 / 600 / 900) -> 0 smoothed by spring { damping 40, stiffness 180 }.
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type HTMLMotionProps } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const tween = (delay = 0, duration = 0.9) => ({ type: "tween" as const, duration, ease: EASE, delay });

type Tag = "div" | "section" | "li" | "article" | "header" | "p" | "h1" | "h2" | "h3" | "span" | "a";

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "animate" | "onLoad"> & {
  as?: Tag; delay?: number; y?: number; amount?: number; onLoad?: boolean;
};

/** Fade + rise. `onLoad` runs on mount (hero); otherwise once when 20% is in view. */
export function Reveal({ as = "div", delay = 0, y = 24, amount = 0.2, onLoad, children, ...rest }: RevealProps) {
  const M = motion[as] as typeof motion.div;
  const trigger = onLoad ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount } };
  return (
    <M initial={{ opacity: 0.001, y }} {...trigger} transition={tween(delay)} {...rest}>
      {children}
    </M>
  );
}

/** Page-load appear for heroes (Reveal's `onLoad?: boolean` clashes with the DOM onLoad type). */
export function LoadIn({ delay, className, children }: { delay: number; className?: string; children: React.ReactNode }) {
  return <motion.div className={className} initial={{ opacity: 0.001, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={tween(delay)}>{children}</motion.div>;
}

/** Framer "transform on layer in view": scroll-linked. Progress runs from the element's top meeting the
 *  viewport bottom to its bottom meeting the viewport bottom (offset ["start end", "end end"]), mapped from the
 *  start values to 0 and smoothed by the spring { damping 40, stiffness 180 }. Used e.g. by the How it works
 *  step cards (y 300 / 600 / 900 -> 0). */
export function RiseIn({ offset, x = 0, children, className, style }: { offset: number; x?: number; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const spring = { damping: 40, stiffness: 180, mass: 1 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [offset, 0]), spring);
  const xv = useSpring(useTransform(scrollYProgress, [0, 1], [x, 0]), spring);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, x: xv }}>
      {children}
    </motion.div>
  );
}
