// Hero: full-bleed photo, copy, live stats and the glass "featured plant" card. Appears on load (.1 / .3 / .5).
import Link from "next/link";
import { SealCheckIcon, LeafIcon } from "@phosphor-icons/react/dist/ssr";
import { LoadIn } from "@/components/motion";
import { CategoryIcon } from "@/components/ui";
import { categoryIcon } from "@/lib/site";
import { decodeEntities } from "@/lib/format";
import type { Plant } from "@/lib/wordpress";
import { Cta } from "./bits";

export default function Hero({ stats, featured }: {
  stats: { value: number; label: string }[];
  featured?: Plant;
}) {
  const shown = stats.filter((s) => s.value > 0);
  return (
    <section className="ho ho-bleed ho-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ho-hero__bg" src="/media/hero.jpg" alt="" fetchPriority="high" />
      <div className="ho-hero__shade ho-hero__shade--l" />
      <div className="ho-hero__shade ho-hero__shade--v" />
      <div className="ho-hero__content">
        <LoadIn delay={0.1} className="ho-hero__intro">
          <span className="ho-hero__eyebrow">
            <span className="ho-hero__badge"><SealCheckIcon size={14} aria-hidden /></span>
            {"Fontes históricas e científicas  ·  Acesso livre"}
          </span>
          <h1 className="d-78">O saber das plantas,<br />ao seu <span className="lime">alcance.</span></h1>
          <p className="ho-hero__lede">Uma enciclopédia de plantas medicinais com usos, modo de preparo e contraindicações — do campo à sua saúde, com responsabilidade.</p>
          <div className="ho-hero__btns">
            <Cta href="/plantas" kind="lime">Explorar enciclopédia</Cta>
            <Cta href="/blog" kind="ghost">Ler artigos</Cta>
          </div>
        </LoadIn>
        <div className="ho-hero__proof">
          <LoadIn delay={0.3} className="ho-hero__stats">
            {shown.map((s, i) => (
              <div key={s.label} style={{ display: "contents" }}>
                {i > 0 && <span className="ho-hero__div" />}
                <div className="ho-hero__stat">
                  <p className="stat">{s.value}</p>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}
          </LoadIn>
          {featured && (
            <LoadIn delay={0.5}>
              <Link href={`/plantas/${featured.slug}`} className="ho-snap">
                <div className="ho-snap__head">
                  <div className="ho-snap__tg">
                    <span className="ho-snap__icon"><CategoryIcon icon={categoryIcon(featured.acf?.category)} size={18} /></span>
                    <div className="ho-snap__titles">
                      <p className="t-15b">Planta em destaque</p>
                      <span>Da enciclopédia</span>
                    </div>
                  </div>
                  {featured.acf?.category && <span className="ho-snap__status">{featured.acf.category}</span>}
                </div>
                <div className="ho-snap__val">
                  <p className="ho-snap__name">{decodeEntities(featured.title.rendered)}</p>
                  {featured.acf?.scientific_name && <span className="ho-snap__muted italic">{featured.acf.scientific_name}</span>}
                </div>
                {featured.acf?.used_parts && (
                  <>
                    <div className="ho-snap__sep" />
                    <div className="ho-snap__foot">
                      <LeafIcon size={16} aria-hidden />
                      <span className="t-13">Partes usadas: {featured.acf.used_parts}</span>
                    </div>
                  </>
                )}
              </Link>
            </LoadIn>
          )}
        </div>
      </div>
    </section>
  );
}
