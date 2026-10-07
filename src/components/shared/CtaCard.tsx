// Dark call-to-action card inside a full-width band (used at the bottom of inner pages).
import { Button } from "../ui";
import { Reveal } from "../motion";

export default function CtaCard({ title, copy, primary, secondary, band = "cream", pad = "48px 48px 104px", radius = 0, className = "" }: {
  title: React.ReactNode; copy: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  band?: "cream" | "mint" | "white"; pad?: string; radius?: number; className?: string;
}) {
  return (
    <section className={`ctaband ctaband--${band} ${className}`.trim()} style={{ padding: pad || undefined, borderRadius: radius }}>
      <Reveal className="ctacard on-dark">
        <div className="ctacard__copy">
          <h2 className="d-40">{title}</h2>
          <p className="t-15 soft">{copy}</p>
        </div>
        <div className="ctacard__btns">
          <Button href={primary.href} className="btn--cta">{primary.label}</Button>
          {secondary && <Button href={secondary.href} kind="ghost" className="btn--cta-ghost">{secondary.label}</Button>}
        </div>
      </Reveal>
    </section>
  );
}
