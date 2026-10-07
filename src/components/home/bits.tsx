// Small Home helpers.
import Link from "next/link";
import { Arrow } from "@/components/ui";

type Kind = "lime" | "dark" | "ghost";

/** Pill button with the round arrow badge (ghost has none). */
export function Cta({ href, kind = "dark", children }: { href: string; kind?: Kind; children: React.ReactNode }) {
  return (
    <Link href={href} className={`btn btn--${kind}`}>
      <span>{children}</span>
      {kind !== "ghost" && <span className="btn__arrow"><Arrow /></span>}
    </Link>
  );
}

/** Section head: eyebrow + title on the left, copy + button on the right. */
export function Head({ eyebrow, title, copy, cta, dark, id, className = "" }: {
  eyebrow: string; title: React.ReactNode; copy: string; cta?: React.ReactNode; dark?: boolean; id?: string; className?: string;
}) {
  return (
    <div className={`ho-head ${className}`}>
      <div className="ho-head__title">
        <span className={`eyebrow${dark ? " dark" : ""}`}>{eyebrow}</span>
        <h2 id={id} className="d-60">{title}</h2>
      </div>
      <div className="ho-head__aside">
        <p className="t-15 soft">{copy}</p>
        {cta}
      </div>
    </div>
  );
}
