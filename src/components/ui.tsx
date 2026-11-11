// Small shared UI pieces: buttons, eyebrow, icons, logo, plant image.
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRightIcon, BowlFoodIcon, MoonIcon, FireIcon, ShieldCheckIcon, HeartIcon, WindIcon, PlantIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { CategoryIcon as CategoryIconName } from "@/lib/site";

export function Arrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRightIcon size={size} weight="regular" aria-hidden />;
}

type BtnKind = "lime" | "dark" | "ghost" | "ghost-ink";

/** Pill button. lime/dark carry the round arrow badge; ghost variants are text only. */
export function Button({ href, kind = "lime", children, small, className = "", onClick }: {
  href: string; kind?: BtnKind; children: React.ReactNode; small?: boolean; className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const arrow = kind === "lime" || kind === "dark";
  return (
    <Link href={href} onClick={onClick} className={`btn btn--${kind}${small ? " btn--small" : ""} ${className}`}>
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

/** The Broto da Natureza mark in a lime circle. */
export function LogoMark({ size = 70 }: { size?: number }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }}>
      <Image src="/media/guabiju_ofi.svg" alt="" width={Math.round(size * 0.6)} height={Math.round(size * 0.74)} aria-hidden />
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
