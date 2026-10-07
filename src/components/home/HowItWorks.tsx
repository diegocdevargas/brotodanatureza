// How to use the encyclopedia: timeline + four step cards. Step 1 appears in view; steps 2-4 use the
// scroll-linked rise (y 300 / 600 / 900 -> 0, spring damping 40 stiffness 180) via RiseIn.
import { MagnifyingGlassIcon, LeafIcon, CookingPotIcon, StethoscopeIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RiseIn } from "@/components/motion";
import { Cta, Head } from "./bits";

const steps = [
  { n: "01", icon: MagnifyingGlassIcon, timing: "Busca", title: "Pesquise", copy: "Digite um sintoma, um uso ou o nome da planta — popular ou científico — ou navegue pelas categorias." },
  { n: "02", icon: LeafIcon, timing: "Ficha", title: "Conheça a planta", copy: "Veja para que ela é tradicionalmente usada, quais partes se aproveitam e o que diz a pesquisa." },
  { n: "03", icon: CookingPotIcon, timing: "Preparo", title: "Prepare com cuidado", copy: "Infusão, decocção, compressa: siga o modo de preparo indicado e respeite as quantidades." },
  { n: "04", icon: StethoscopeIcon, timing: "Segurança", title: "Converse com um profissional", copy: "Leia as contraindicações e confirme com um médico ou farmacêutico antes de começar qualquer uso." },
];

function Step({ s, dark }: { s: (typeof steps)[number]; dark?: boolean }) {
  const I = s.icon;
  return (
    <div className={`ho-step ho-lift${dark ? " ho-step--dark" : ""}`}>
      <div className="ho-step__top">
        <span className="ho-ic52"><I size={24} aria-hidden /></span>
        <span className="ho-pill">{s.timing}</span>
      </div>
      <div className="ho-step__copy">
        <p className="ho-label muted">{s.n}</p>
        <h3 className="d-32">{s.title}</h3>
        <p className="t-15 soft">{s.copy}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="ho ho-narrow ho-how" aria-labelledby="how-title">
      <Reveal y={32} amount={0.3}>
        <Head id="how-title" eyebrow="Como usar" title={<>Da dúvida ao <span className="accent">chá certo</span><br />em quatro passos.</>}
          copy="A enciclopédia foi pensada para responder rápido e com responsabilidade: encontrar, entender, preparar e usar com segurança."
          cta={<Cta href="/plantas">Começar a pesquisa</Cta>} />
      </Reveal>
      <div className="ho-how__steps">
        <Reveal className="ho-timeline" delay={0.1} y={32}>
          <span className="ho-timeline__line" />
          {steps.map((s) => <div key={s.n} className="ho-timeline__mark"><div className="ho-timeline__dot" /></div>)}
        </Reveal>
        <div className="ho-how__cards">
          <Reveal delay={0.15} y={32} amount={0.25}><Step s={steps[0]} /></Reveal>
          <RiseIn offset={300}><Step s={steps[1]} /></RiseIn>
          <RiseIn offset={600}><Step s={steps[2]} /></RiseIn>
          <RiseIn offset={900}><Step s={steps[3]} dark /></RiseIn>
        </div>
      </div>
    </section>
  );
}
