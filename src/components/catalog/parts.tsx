// Catalog building blocks (Enciclopédia index + plant detail): dark hero, featured card, section head,
// plant grid, "what every page includes" grid and the centered closing CTA.
// Appear timings from the template: eyebrow 0, title .08, copy .16, buttons .24, facts .24/.32 (tween .9s, y 28).
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Plant } from "@/lib/wordpress";
import { categoryIcon } from "@/lib/site";
import { decodeEntities, summary } from "@/lib/format";
import { Arrow, Button, PlantImage } from "../ui";
import { Reveal } from "../motion";

export type Fact = { icon: React.ReactNode; label: string };

export function CaHero({ eyebrow, line1, line2, copy, facts, children }: {
  eyebrow: string; line1: string; line2: string; copy: string; facts?: Fact[]; children?: React.ReactNode;
}) {
  return (
    <section className="ca-hero ca-hero--left ca-hero--image on-dark">
      <div className="ca-hero__media" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/forest.jpg" alt="" />
        <div className="ca-hero__tint" />
        <div className="ca-hero__shade" />
      </div>
      <div className="ca-hero__inner">
        <Reveal y={28}><span className="ca-eyebrow">{eyebrow}</span></Reveal>
        <Reveal as="h1" y={28} delay={0.08} className="ca-h78 ca-hero__title">
          <span>{line1}</span><span className="lime">{line2}</span>
        </Reveal>
        <Reveal as="p" y={28} delay={0.16} className="ca-lede ca-hero__copy soft">{copy}</Reveal>
        {children && <Reveal y={28} delay={0.24} className="ca-hero__slot">{children}</Reveal>}
        {facts && facts.length > 0 && (
          <Reveal y={28} delay={children ? 0.32 : 0.24} className="ca-hero__facts">
            {facts.map((f) => <span key={f.label} className="ca-hero__fact">{f.icon}{f.label}</span>)}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Section title row: serif title left, small note or link right. */
export function CaHead({ title, note, link, id, className = "" }: {
  title: string; note?: string; link?: { label: string; href: string }; id?: string; className?: string;
}) {
  return (
    <div className={`ca-head ${className}`}>
      <h2 id={id} className="ca-h40">{title}</h2>
      {note && <p className="t-13 muted ca-head__note">{note}</p>}
      {link && <Link href={link.href} className="ca-head__link">{link.label}</Link>}
    </div>
  );
}

export function RoundArrow({ size = 34, icon = 14, className = "" }: { size?: number; icon?: number; className?: string }) {
  return <span className={`ca-rarrow ${className}`} style={{ width: size, height: size }}><ArrowUpRightIcon size={icon} aria-hidden /></span>;
}

const plantName = (p: Plant) => decodeEntities(p.title.rendered);

/** Large card with the photo on the left (the template's "Most booked"). The whole card is a link. */
export function FeaturedPlant({ plant, tag = "Em destaque" }: { plant: Plant; tag?: string }) {
  const { acf } = plant;
  return (
    <Link href={`/plantas/${plant.slug}`} className="ca-feat">
      <div className="ca-feat__img">
        <PlantImage src={acf?.illustrative_image} icon={categoryIcon(acf?.category)} />
        {acf?.category && <span className="ca-chip ca-chip--date">{acf.category}</span>}
      </div>
      <div className="ca-feat__copy">
        <span className="ca-feat__tag">{tag}</span>
        <h3 className="ca-h60">{plantName(plant)}</h3>
        {acf?.scientific_name && <p className="ca-sci">{acf.scientific_name}</p>}
        <p className="ca-lede soft ca-feat__p">{summary(acf?.medicinal_uses || plant.excerpt?.rendered, 220)}</p>
        {acf?.used_parts && (
          <div className="ca-feat__meta"><span className="ca-feat__chip">Partes usadas</span><span className="ca-feat__div" /><span className="t-15 soft">{acf.used_parts}</span></div>
        )}
        <div className="ca-feat__btns">
          <span className="ca-darkbtn">Ver ficha completa<span className="ca-darkbtn__arrow"><Arrow size={15} /></span></span>
        </div>
      </div>
    </Link>
  );
}

/** Plant cards: photo with category chip, name, scientific name, summary. */
export function PlantGrid({ plants }: { plants: Plant[] }) {
  return (
    <ul className="ca-sgrid ca-sgrid--3">
      {plants.map((p) => (
        <li key={p.id}>
          <Link href={`/plantas/${p.slug}`} className="ca-scard">
            <div className="ca-scard__img">
              <PlantImage src={p.acf?.illustrative_image} icon={categoryIcon(p.acf?.category)} />
              {p.acf?.category && <span className="ca-chip">{p.acf.category}</span>}
            </div>
            <div className="ca-scard__copy">
              <h3 className="ca-h32">{plantName(p)}</h3>
              {p.acf?.scientific_name && <p className="ca-sci ca-sci--sm">{p.acf.scientific_name}</p>}
              <p className="t-15 soft ca-clamp">{summary(p.acf?.medicinal_uses || p.excerpt?.rendered, 140)}</p>
              <span className="ca-scard__sep" />
              <div className="ca-scard__foot">
                <span className="ca-kicker">{p.acf?.used_parts ? `Partes: ${p.acf.used_parts}` : "Ficha completa"}</span>
                <span className="ca-scard__view">Ver<RoundArrow /></span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type IncludedItem = { icon: React.ReactNode; title: string; copy: string };

/** Dark section with a 4-up grid of glass cards. */
export function Included({ title, items }: { title: string; items: IncludedItem[] }) {
  return (
    <section className="ca-incl ca-incl--round on-dark" aria-label={title}>
      <div className="ca-incl__wrap">
        <Reveal y={28}><h2 className="ca-h40 ca-incl__title">{title}</h2></Reveal>
        <div className="ca-incl__grid">
          {items.map((it, i) => (
            <Reveal key={it.title} y={20} delay={[0, 0.06, 0.12, 0.18][i % 4]} className="ca-incl__card">
              <span className="ca-incl__icon">{it.icon}</span>
              <h3 className="ca-h6">{it.title}</h3>
              <p className="t-13 soft">{it.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Centered closing call to action. Appear: title 0, copy .08, buttons .16 (y 28). */
export function CenterCta({ title, copy, primary, secondary }: {
  title: string; copy: string; primary: { label: string; href: string }; secondary?: { label: string; href: string };
}) {
  return (
    <section className="ca-ccta">
      <Reveal as="h2" y={28} className="ca-h60">{title}</Reveal>
      <Reveal as="p" y={28} delay={0.08} className="ca-lede soft ca-ccta__p">{copy}</Reveal>
      <Reveal y={28} delay={0.16} className="ca-ccta__btns">
        <Button href={primary.href} kind="dark" className="btn--cta">{primary.label}</Button>
        {secondary && <Link href={secondary.href} className="ca-pill">{secondary.label}</Link>}
      </Reveal>
    </section>
  );
}
