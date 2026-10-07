// Featured plants (template "Services" cards). Falls back to the category cards when WordPress has no plants yet.
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Arrow, CategoryIcon } from "@/components/ui";
import { categories, categoryHref, categoryIcon } from "@/lib/site";
import { decodeEntities, summary } from "@/lib/format";
import type { Plant } from "@/lib/wordpress";
import { Cta, Head } from "./bits";

type Card = { key: string; href: string; icon: ReturnType<typeof categoryIcon>; chip?: string; title: string; copy: string; foot: string; italic?: boolean };

export default function Plants({ plants }: { plants: Plant[] }) {
  const cards: Card[] = plants.length >= 3
    ? plants.slice(0, 6).map((p) => ({
        key: p.slug, href: `/plantas/${p.slug}`, icon: categoryIcon(p.acf?.category), chip: p.acf?.category,
        title: decodeEntities(p.title.rendered),
        copy: summary(p.acf?.medicinal_uses || p.excerpt?.rendered, 130),
        foot: p.acf?.scientific_name || "Ver ficha completa", italic: !!p.acf?.scientific_name,
      }))
    : categories.map((c) => ({
        key: c.name, href: categoryHref(c.name), icon: c.icon, chip: "Categoria",
        title: c.name, copy: `Plantas tradicionalmente usadas para ${c.blurb.toLowerCase()}.`, foot: "Ver plantas",
      }));

  return (
    <section className="ho ho-bleed ho-svc" aria-labelledby="plants-title">
      <div className="ho-in ho-svc__in">
        <Reveal y={32} amount={0.3}>
          <Head id="plants-title" eyebrow="Enciclopédia" title={<>Plantas que cuidam<br />do seu <span className="accent">bem-estar.</span></>}
            copy="Do boldo à camomila: cada ficha reúne usos medicinais, partes utilizadas, modo de preparo e contraindicações."
            cta={<Cta href="/plantas">Ver todas as plantas</Cta>} />
        </Reveal>
        <Reveal className="ho-svc__grid" delay={0.15} y={32} amount={0.15}>
          {cards.map((c) => (
            <Link key={c.key} href={c.href} className="ho-svc__card ho-lift">
              <div className="ho-svc__top">
                <div className="ho-svc__row">
                  <span className="ho-ic52"><CategoryIcon icon={c.icon} /></span>
                  {c.chip && <span className="ho-pill">{c.chip}</span>}
                </div>
                <div className="ho-svc__copy">
                  <h3 className="d-40 ho-h16">{c.title}</h3>
                  <p className="t-15 soft ho-clamp3">{c.copy}</p>
                </div>
              </div>
              <div className="ho-svc__bottom">
                <div className="ho-sep" />
                <div className="ho-svc__price">
                  <p className={`t-15b${c.italic ? " italic soft" : ""}`}>{c.foot}</p>
                  <span className="round"><Arrow /></span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
