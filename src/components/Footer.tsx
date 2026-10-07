// Shared footer: CTA, link columns, giant gradient wordmark, legal row.
import Link from "next/link";
import { categories, categoryHref, footerCols, disclaimer } from "@/lib/site";
import { Button, LogoMark } from "./ui";
import { Reveal } from "./motion";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__glow" aria-hidden />
      <div className="footer__cta">
        <Reveal className="footer__cta-copy">
          <p className="caps muted">Conhecimento que brota da terra</p>
          <h2 className="d-60">Cuidar da saúde começa<br />por <span className="lime">conhecer as plantas.</span></h2>
        </Reveal>
        <Reveal className="footer__cta-btns" delay={0.15}>
          <Button href="/plantas">Explorar enciclopédia</Button>
          <Button href="/blog" kind="ghost">Ler artigos</Button>
        </Reveal>
      </div>
      <div className="footer__sep" />
      <div className="footer__cols">
        <div className="footer__brand">
          <Link href="/" className="footer__logo"><LogoMark /><span className="d-32">O Broto da Natureza</span></Link>
          <p className="t-15 soft">Um arquivo vivo de conhecimento sobre plantas medicinais, reunido com cuidado e baseado em fontes históricas e científicas.</p>
        </div>
        <nav className="footer__col" aria-label="Categorias">
          <p className="caps muted">Categorias</p>
          <ul>{categories.map((c) => <li key={c.name}><Link href={categoryHref(c.name)}>{c.name}</Link></li>)}</ul>
        </nav>
        {footerCols.map((c) => (
          <nav className="footer__col" key={c.title} aria-label={c.title}>
            <p className="caps muted">{c.title}</p>
            <ul>{c.links.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </nav>
        ))}
        <div className="footer__col">
          <p className="caps muted">Aviso</p>
          <p className="t-15 soft">{disclaimer}</p>
        </div>
      </div>
      <svg className="footer__word" viewBox="0 0 30.5 14" aria-hidden>
        <defs>
          <linearGradient id="broto-word" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#d8f28a" stopOpacity="0.95" />
            <stop offset="1" stopColor="#d8f28a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <text x="15.25" y="12.25" textAnchor="middle" fontFamily="var(--serif)" fontSize="16.28" letterSpacing="-0.49" fill="url(#broto-word)">Broto</text>
      </svg>
      <div className="footer__bottom">
        <div className="footer__sep" />
        <div className="footer__legal">
          <p className="t-13 muted">© <CurrentYear /> O Broto da Natureza — fins educativos.</p>
          <p className="t-13 muted">feito com cuidado</p>
        </div>
      </div>
    </footer>
  );
}
