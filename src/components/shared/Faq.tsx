"use client";
// Shared FAQ section. Accordion: one item open at a time, plus icon rotates 45°, spring { bounce .1, duration .45 }.
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon } from "@phosphor-icons/react";
import { Button, Eyebrow } from "../ui";
import { Reveal } from "../motion";

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  { q: "As informações do Broto substituem uma consulta médica?",
    a: "Não. O conteúdo tem caráter educativo: reúne usos tradicionais e o que a pesquisa científica já investigou. Antes de usar qualquer planta com fins terapêuticos — principalmente se você toma medicamentos, está grávida ou amamentando — converse com um médico, farmacêutico ou fitoterapeuta." },
  { q: "De onde vêm as informações sobre cada planta?",
    a: "De fontes históricas (farmacopeias, tratados de botânica e registros de uso popular) e de publicações científicas. Cada ficha reúne usos medicinais, partes utilizadas, modo de preparo e as contraindicações conhecidas." },
  { q: "Planta medicinal é sempre segura por ser natural?",
    a: "Não. Natural não quer dizer inofensivo: muitas plantas têm princípios ativos potentes, podem interagir com remédios e causar efeitos adversos em doses altas ou uso prolongado. Por isso toda ficha traz uma seção de contraindicações." },
  { q: "Como pesquiso uma planta pelo sintoma?",
    a: "Na Enciclopédia, digite o sintoma ou o uso que procura (por exemplo, “insônia” ou “digestão”). A busca considera nome popular, nome científico, usos medicinais, partes utilizadas e modo de preparo. Você também pode filtrar por categoria." },
  { q: "Qual a diferença entre chá por infusão e por decocção?",
    a: "Na infusão, a água fervente é despejada sobre a planta e o recipiente fica tampado por alguns minutos — ideal para folhas e flores. Na decocção, a planta ferve junto com a água — indicada para partes duras, como raízes, cascas e sementes. O modo de preparo de cada planta está indicado na sua ficha." },
  { q: "Com que frequência novas plantas são adicionadas?",
    a: "A enciclopédia é um arquivo vivo e cresce continuamente. Acompanhe o blog para saber das novidades e de artigos aprofundados sobre fitoterapia." },
];

const spring = { type: "spring" as const, bounce: 0.1, duration: 0.45 };

export function Accordion({ items = faqItems }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`acc__item${isOpen ? " is-open" : ""}`}>
            <button className="acc__q" aria-expanded={isOpen} aria-controls={`${id}-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              <h3 className="acc__title">{it.q}</h3>
              <motion.span className="acc__toggle" animate={{ rotate: isOpen ? 45 : 0 }} transition={spring}><PlusIcon size={18} aria-hidden /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${id}-${i}`} role="region" className="acc__a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={spring}>
                  <p className="t-15 soft">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Faq({ items }: { items?: FaqItem[] }) {
  return (
    <section className="faq wrap" aria-labelledby="faq-title">
      <Reveal className="faq__intro">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 id="faq-title" className="d-60">Dúvidas, <span className="accent">respondidas.</span></h2>
        <p className="t-15 soft">O essencial sobre o uso responsável de plantas medicinais e sobre como funciona a enciclopédia.</p>
        <div className="faq__help on-dark">
          <h3 className="d-32">Quer ir mais fundo?</h3>
          <p className="t-15 soft">Os artigos do blog aprofundam preparo, história e pesquisa de cada planta.</p>
          <Button href="/blog" small>Ler os artigos</Button>
        </div>
      </Reveal>
      <Reveal className="faq__list" delay={0.15}>
        <Accordion items={items} />
      </Reveal>
    </section>
  );
}
