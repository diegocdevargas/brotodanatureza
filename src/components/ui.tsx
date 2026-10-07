// Small shared UI pieces: buttons, eyebrow, icons, logo, plant image.
import Link from "next/link";
import {
  ArrowUpRightIcon, BowlFoodIcon, MoonIcon, FireIcon, ShieldCheckIcon, HeartIcon, WindIcon, PlantIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { CategoryIcon as CategoryIconName } from "@/lib/site";

export function Arrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRightIcon size={size} weight="regular" aria-hidden />;
}

type BtnKind = "lime" | "dark" | "ghost" | "ghost-ink";

/** Pill button. lime/dark carry the round arrow badge; ghost variants are text only. */
export function Button({ href, kind = "lime", children, small, className = "" }: {
  href: string; kind?: BtnKind; children: React.ReactNode; small?: boolean; className?: string;
}) {
  const arrow = kind === "lime" || kind === "dark";
  return (
    <Link href={href} className={`btn btn--${kind}${small ? " btn--small" : ""} ${className}`}>
      <span>{children}</span>
      {arrow && <span className="btn__arrow"><Arrow /></span>}
    </Link>
  );
}

export function Eyebrow({ children, dark, className = "" }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return <span className={`eyebrow${dark ? " dark" : ""} ${className}`}>{children}</span>;
}

const categoryIcons = { bowl: BowlFoodIcon, moon: MoonIcon, fire: FireIcon, shield: ShieldCheckIcon, heart: HeartIcon, wind: WindIcon, plant: PlantIcon };
export function CategoryIcon({ icon, size = 24 }: { icon: CategoryIconName; size?: number }) {
  const I = categoryIcons[icon];
  return <I size={size} weight="regular" aria-hidden />;
}

/** The Broto sprout mark in a lime circle. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }}>
      <svg viewBox="0 0 512 512" width={size * 0.6} height={size * 0.6} fill="currentColor" aria-hidden>
        <path transform="matrix(1.5303 0 0 1.5303 -142.43 -163.19)" d="m406.47 155.03h-39.442c-47.453 0-88.387 28.427-106.68 69.146-18.29-40.718-59.226-69.146-106.68-69.146h-39.441c-5.633 0-10.199 4.567-10.199 10.199v39.442c0 64.447 52.431 116.88 116.88 116.88h29.242v61.066c1e-3 5.632 4.567 10.199 10.2 10.199s10.199-4.567 10.199-10.199v-61.066h29.242c64.447 0 116.88-52.431 116.88-116.88v-39.442c0-5.632-4.566-10.199-10.199-10.199zm-156.32 131.7-82.649-82.649c-3.983-3.982-10.441-3.982-14.425 0-3.983 3.983-3.983 10.441 0 14.425l82.65 82.649h-14.819c-53.198 0-96.478-43.28-96.478-96.479v-29.243h29.242c53.199 0 96.479 43.28 96.479 96.479zm146.12-82.055c0 53.199-43.28 96.479-96.479 96.479h-14.818l54.754-54.754c3.983-3.983 3.983-10.441 0-14.425-3.983-3.982-10.441-3.982-14.425 0l-54.753 54.753v-14.818c0-53.198 43.28-96.478 96.478-96.478h29.243z" />
        <path transform="matrix(1.5303 0 0 1.5303 -142.43 -163.19)" d="m367.62 204.07c-3.983-3.982-10.441-3.982-14.425 0l-4.008 4.008c-3.983 3.983-3.983 10.441 0 14.425 1.993 1.991 4.603 2.987 7.213 2.987s5.221-0.996 7.212-2.987l4.008-4.008c3.983-3.983 3.983-10.441 0-14.425z" />
      </svg>
    </span>
  );
}

/** Plant photo from WordPress, or a tinted placeholder with the category icon. */
export function PlantImage({ src, alt = "", icon = "plant", className, style }: {
  src?: string; alt?: string; icon?: CategoryIconName; className?: string; style?: React.CSSProperties;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={style} loading="lazy" />;
  }
  return <span className={`pl-ph ${className ?? ""}`} style={style} aria-hidden><CategoryIcon icon={icon} size={48} /></span>;
}
