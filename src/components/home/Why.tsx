// Why the Broto: three reasons + comparison table against a typical web search.
import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion";
import { LogoMark } from "@/components/ui";

const reasons = [
  { n: "01", title: "Informação organizada", copy: "Cada planta segue a mesma ficha — nomes, partes usadas, usos, preparo e cuidados — para você comparar e encontrar rápido." },
  { n: "02", title: "Linguagem clara", copy: "Explicamos termos de botânica e fitoterapia sem jargão, para que qualquer pessoa entenda o que está lendo." },
  { n: "03", title: "Segurança em primeiro lugar", copy: "Contraindicações e alertas aparecem com destaque, porque saber quando não usar é tão importante quanto saber usar." },
];

const comparison: { label: string; broto: true; typical: string | false }[] = [
  { label: "Nome científico em cada planta", broto: true, typical: "Às vezes" },
  { label: "Partes utilizadas indicadas", broto: true, typical: "Raramente" },
  { label: "Modo de preparo detalhado", broto: true, typical: "Varia" },
  { label: "Contraindicações em destaque", broto: true, typical: false },
  { label: "Busca por sintoma e categoria", broto: true, typical: false },
];

export default function Why() {
  return (
    <section className="ho ho-narrow ho-why" aria-labelledby="why-title">
      <Reveal className="ho-why__head" y={32} amount={0.3}>
        <span className="eyebrow">Por que o Broto</span>
        <h2 id="why-title" className="d-60">Menos achismo, mais clareza<br />e <span className="accent">mais cuidado.</span></h2>
        <p>Receitas soltas na internet raramente dizem de qual planta estão falando, nem quando ela pode fazer mal. O Broto reúne tudo em um só lugar, com método.</p>
      </Reveal>
      <div className="ho-why__body">
        <Reveal className="ho-why__reasons" delay={0.1} y={32}>
          {reasons.map((r) => (
            <div key={r.n} className="ho-reason">
              <p className="stat" aria-hidden>{r.n}</p>
              <div className="ho-reason__copy">
                <h3 className="ho-reason__title">{r.title}</h3>
                <p className="t-15 soft">{r.copy}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="ho-why__cmp" delay={0.2} y={32}>
          <table className="ho-table">
            <caption className="sr-only">Comparação entre o Broto e uma busca comum na internet</caption>
            <thead>
              <tr>
                <th scope="col" className="ho-table__head ho-table__head--labels"><span className="ho-label">O que você encontra</span></th>
                <th scope="col" className="ho-table__head ho-table__head--broto"><LogoMark size={28} /><span className="d-25">Broto</span></th>
                <th scope="col" className="ho-table__head">Busca comum</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="ho-table__cell ho-table__cell--label">{r.label}</th>
                  <td className="ho-table__cell ho-table__cell--broto">
                    <span className="ho-table__check"><CheckIcon size={16} aria-label="Sim" /></span>
                  </td>
                  <td className="ho-table__cell">
                    {r.typical === false ? <span className="ho-table__cross"><XIcon size={14} aria-label="Não" /></span> : r.typical}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="t-13 muted">Comparação com resultados típicos de buscas genéricas por remédios caseiros.</p>
        </Reveal>
      </div>
    </section>
  );
}
