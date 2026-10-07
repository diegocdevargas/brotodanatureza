// About: intro statement + three columns (photo with badge, dark stats card, story column).
import { BooksIcon, ScrollIcon, FlaskIcon, CookingPotIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion";
import { PlantImage } from "@/components/ui";
import { Cta } from "./bits";

const points = [
  { icon: FlaskIcon, label: "Nome popular e científico" },
  { icon: CookingPotIcon, label: "Modo de preparo explicado" },
  { icon: WarningIcon, label: "Contraindicações em destaque" },
];

export default function About({ stats, storyImage }: { stats: { value: number; label: string }[]; storyImage?: string }) {
  const shown = stats.filter((s) => s.value > 0);
  return (
    <section className="ho ho-narrow ho-about" aria-labelledby="about-title">
      <Reveal className="ho-about__intro" y={32} amount={0.3}>
        <div className="ho-about__label"><span className="eyebrow">Sobre o Broto</span></div>
        <h2 id="about-title" className="d-40">
          Durante séculos, o conhecimento sobre plantas que curam passou de mão em mão — e muito dele{" "}
          <span className="accent">se perdeu pelo caminho.</span> <span className="muted">O Broto existe para reunir, organizar e explicar esse saber.</span>
        </h2>
      </Reveal>
      <div className="ho-about__body">
        <Reveal className="ho-doc" delay={0.1} y={32}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/forest.jpg" alt="Floresta coberta por névoa" loading="lazy" />
          <div className="ho-doc__badge">
            <span className="ho-doc__icon"><ScrollIcon size={20} aria-hidden /></span>
            <div className="ho-doc__copy">
              <p className="t-15b">Tradição e ciência lado a lado</p>
              <p className="t-13 muted">Saber popular, registros históricos e pesquisa</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="ho-statcard" delay={0.2} y={32}>
          <span className="ho-statcard__glow" />
          <div className="ho-statcard__top">
            <span className="ho-statcard__icon"><BooksIcon size={22} aria-hidden /></span>
            <h3 className="d-32">Conhecimento antigo, olhar atual.</h3>
          </div>
          <div className="ho-statcard__stats">
            {shown.map((s) => (
              <div key={s.label} style={{ display: "contents" }}>
                <div className="ho-statcard__sep" />
                <div className="ho-statcard__row">
                  <p className="stat">{s.value}</p>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="ho-story" delay={0.3} y={32}>
          <PlantImage className="ho-story__photo" src={storyImage} />
          <p className="t-15 soft">Cada planta ganha uma ficha completa: para que serve, quais partes se usam, como preparar e, principalmente, quando evitar. Informação clara para quem quer cuidar da saúde com mais consciência.</p>
          <div className="ho-story__points">
            {points.map(({ icon: I, label }) => (
              <div key={label} className="ho-point">
                <span className="ho-point__icon"><I size={16} aria-hidden /></span>
                <p className="t-15b">{label}</p>
              </div>
            ))}
          </div>
          <Cta href="/plantas">Conhecer as plantas</Cta>
        </Reveal>
      </div>
    </section>
  );
}
