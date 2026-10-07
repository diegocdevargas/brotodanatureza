"use client";
// Floating pill navigation with the Enciclopédia mega menu (desktop) and the full-screen menu (tablet/phone).
// Links hidden below 1200px (burger menu), "Pesquisar planta" hidden below 810px.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CaretDownIcon, XIcon, ListIcon } from "@phosphor-icons/react";
import { navLinks, categories, categoryHref, disclaimer } from "@/lib/site";
import { LogoMark, Arrow, CategoryIcon } from "./ui";
import ThemeToggle from "./ThemeToggle";
import CurrentYear from "./CurrentYear";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(false); setMega(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const open = () => { clearTimeout(closeTimer.current); setMega(true); };
  const close = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };
  const closeAll = () => { setMega(false); setMenu(false); };
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <nav className="nav" aria-label="Principal">
        <Link href="/" className="nav__logo" aria-label="O Broto da Natureza — página inicial" onClick={closeAll}>
          <LogoMark />
          <span className="nav__word">O Broto</span>
        </Link>
        <div className="nav__links">
          {navLinks.map((l) =>
            l.mega ? (
              <div key={l.label} className="nav__mega-wrap" onMouseEnter={open} onMouseLeave={close}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMega(false); }}>
                <Link href={l.href} className={`nav__link${mega ? " is-open" : ""}${isActive(l.href) ? " is-active" : ""}`}
                  aria-expanded={mega} aria-haspopup="true" onFocus={open} onClick={closeAll}>
                  {l.label} <CaretDownIcon size={12} weight="bold" className="nav__caret" aria-hidden />
                </Link>
                <AnimatePresence>
                  {mega && (
                    <motion.div className="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }} onMouseEnter={open} onMouseLeave={close}>
                      <div className="mega__panel">
                        <p className="mono muted">Categorias</p>
                        <div className="mega__list">
                          {categories.map((c) => (
                            <Link key={c.name} href={categoryHref(c.name)} className="mega__item" onClick={closeAll}>
                              <span className="mega__icon"><CategoryIcon icon={c.icon} size={22} /></span>
                              <span><b>{c.name}</b><small>{c.blurb}</small></span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="mega__feature">
                        <div>
                          <p className="mono lime">Não sabe por onde começar?</p>
                          <h5 className="d-25">Pesquise por sintoma, uso ou nome da planta.</h5>
                        </div>
                        <div className="mega__feature-links">
                          <Link href="/plantas" onClick={closeAll}>Abrir pesquisa <Arrow size={14} /></Link>
                          <Link href="/blog" onClick={closeAll}>Ler artigos <Arrow size={14} /></Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={l.label} href={l.href} className={`nav__link${isActive(l.href) ? " is-active" : ""}`}
                aria-current={path === l.href ? "page" : undefined}>{l.label}</Link>
            ),
          )}
        </div>
        <div className="nav__actions">
          <Link href="/plantas" className="nav__book">Pesquisar planta</Link>
          <ThemeToggle />
          <button className="nav__burger" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(true)}>
            <ListIcon size={20} aria-hidden />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div className="mmenu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="mmenu__card" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5, ease }}>
              <div className="mmenu__top">
                <p className="mono">Menu</p>
                <button className="mmenu__close" aria-label="Fechar menu" onClick={() => setMenu(false)} autoFocus><XIcon size={16} aria-hidden /></button>
              </div>
              <div className="mmenu__links">
                {navLinks.map((l, i) => (
                  <motion.div key={l.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.04 }}>
                    <Link href={l.href} className="mmenu__big" onClick={closeAll}>{l.label.toLowerCase()}</Link>
                    {l.mega && (
                      <div className="mmenu__services">
                        {categories.map((c) => <Link key={c.name} href={categoryHref(c.name)} onClick={closeAll}>{c.name}</Link>)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div className="mmenu__row" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
              <div className="mmenu__contact">
                <p className="mono">Aviso</p>
                <p className="t-13">{disclaimer}</p>
              </div>
              <div className="mmenu__booking">
                <div className="mmenu__status"><span className="mmenu__bars"><i /><i /></span><b>Enciclopédia aberta e gratuita</b></div>
                <Link href="/plantas" className="mmenu__book" onClick={closeAll}><span className="mono">Pesquisar planta</span><span className="mmenu__arrow"><Arrow size={14} /></span></Link>
              </div>
            </motion.div>
            <p className="mmenu__copy t-13">© <CurrentYear /> O Broto da Natureza</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
