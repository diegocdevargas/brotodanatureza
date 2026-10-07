import '@/styles/catalog.scss'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  PlantIcon, CookingPotIcon, WarningIcon, LeafIcon, BookOpenIcon, TagIcon, FlaskIcon, CheckIcon, ArrowUpRightIcon,
} from '@phosphor-icons/react/dist/ssr'
import { getAllPlantSlugs, getPlant, getPlants, sanitizeHtml, type Plant } from '@/lib/wordpress'
import { categoryIcon, categoryHref, disclaimer } from '@/lib/site'
import { decodeEntities, summary } from '@/lib/format'
import { Button, CategoryIcon, PlantImage } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { CaHead, RoundArrow } from '@/components/catalog/parts'
import CtaCard from '@/components/shared/CtaCard'

export const dynamicParams = true
export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPlantSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const plant = await getPlant(slug)
  if (!plant) return {}
  const name = decodeEntities(plant.title.rendered)
  const description = summary(plant.acf?.medicinal_uses, 155)
  return {
    title: plant.acf?.scientific_name ? `${name} (${plant.acf.scientific_name})` : name,
    description,
    openGraph: { title: name, description, images: plant.acf?.illustrative_image ? [plant.acf.illustrative_image] : undefined },
  }
}

const splitList = (text = '') => text.split(/[,;]|\s+e\s+/).map((s) => s.trim()).filter(Boolean)

export default async function PlantaPage({ params }: Props) {
  const { slug } = await params
  const [plant, all] = await Promise.all([getPlant(slug), getPlants({ perPage: 100 })])
  if (!plant) notFound()

  const { acf, content } = plant
  const name = decodeEntities(plant.title.rendered)
  const icon = categoryIcon(acf?.category)
  const parts = splitList(acf?.used_parts)

  const i = all.findIndex((p) => p.slug === plant.slug)
  const prev = i > 0 ? all[i - 1] : undefined
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : undefined

  const rows = [
    { icon: <LeafIcon size={15} aria-hidden />, label: 'Nome popular', value: acf?.popular_name || name },
    { icon: <FlaskIcon size={15} aria-hidden />, label: 'Nome científico', value: acf?.scientific_name },
    { icon: <TagIcon size={15} aria-hidden />, label: 'Categoria', value: acf?.category },
    { icon: <PlantIcon size={15} aria-hidden />, label: 'Partes usadas', value: acf?.used_parts },
  ].filter((r) => r.value)

  return (
    <main className="page-main ca-detail ca-detail--service">
      {/* ---------- Hero ---------- */}
      <section className="ca-dhero">
        <div className="ca-dhero__wrap">
          <Reveal y={28}>
            <nav aria-label="Trilha de navegação" className="ca-crumb">
              <Link href="/">Início</Link><span aria-hidden>/</span>
              <Link href="/plantas">Enciclopédia</Link><span aria-hidden>/</span>
              <span className="ca-crumb__cur" aria-current="page">{name}</span>
            </nav>
          </Reveal>
          <div className="ca-dhero__row">
            <div className="ca-dhero__copy">
              {acf?.category && (
                <Reveal y={22}>
                  <Link href={categoryHref(acf.category)} className="ca-dchip"><CategoryIcon icon={icon} size={14} />{acf.category}</Link>
                </Reveal>
              )}
              <Reveal as="h1" y={28} delay={0.08} className="ca-h78">{name}</Reveal>
              {acf?.scientific_name && <Reveal as="p" y={24} delay={0.12} className="ca-sci">{acf.scientific_name}</Reveal>}
              {acf?.medicinal_uses && <Reveal as="p" y={24} delay={0.16} className="ca-lede soft ca-dhero__p">{summary(acf.medicinal_uses, 200)}</Reveal>}
              {parts.length > 0 && (
                <Reveal y={20} delay={0.22} className="ca-dmeta">
                  {parts.slice(0, 3).map((p) => <span key={p} className="ca-dmeta__fact"><LeafIcon size={15} aria-hidden />{p}</span>)}
                </Reveal>
              )}
              <Reveal y={20} delay={0.28} className="ca-dhero__btns">
                {acf?.preparation_method && <Button href="#preparo" kind="dark" className="ca-btn64">Ver modo de preparo</Button>}
                <Link href="/plantas" className="ca-pill">Todas as plantas</Link>
              </Reveal>
            </div>
            <Reveal y={26} delay={0.1} className="ca-dhero__img">
              <PlantImage src={acf?.illustrative_image} alt={name} icon={icon} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Body + sticky sidebar ---------- */}
      <section className="ca-dbody">
        <div className="ca-dbody__wrap">
          <div className="ca-dbody__main">
            {acf?.medicinal_uses && (
              <Reveal y={24} className="ca-block">
                <div className="ca-block__head"><span className="ca-block__icon"><PlantIcon size={20} aria-hidden /></span><h2 className="ca-h40">Usos medicinais</h2></div>
                <p className="ca-lede soft">{acf.medicinal_uses}</p>
              </Reveal>
            )}

            {parts.length > 0 && (
              <Reveal y={24} className="ca-incs">
                <h2 className="ca-h32">Partes utilizadas</h2>
                <ul className="ca-incs__list">
                  {parts.map((t) => <li key={t} className="ca-incs__item"><span className="ca-tick"><CheckIcon size={12} aria-hidden /></span><span>{t}</span></li>)}
                </ul>
              </Reveal>
            )}

            {acf?.preparation_method && (
              <Reveal y={24} className="ca-block">
                <div id="preparo" className="ca-block__head"><span className="ca-block__icon"><CookingPotIcon size={20} aria-hidden /></span><h2 className="ca-h40">Modo de preparo</h2></div>
                <p className="ca-lede soft">{acf.preparation_method}</p>
              </Reveal>
            )}

            {acf?.contraindications && (
              <Reveal y={24} className="ca-block ca-warn" role="note">
                <div className="ca-block__head"><span className="ca-block__icon"><WarningIcon size={20} aria-hidden /></span><h2 className="ca-h32">Contraindicações</h2></div>
                <p className="ca-lede">{acf.contraindications}</p>
              </Reveal>
            )}

            {content?.rendered && (
              <Reveal y={24} className="ca-block">
                <div className="ca-block__head"><span className="ca-block__icon"><BookOpenIcon size={20} aria-hidden /></span><h2 className="ca-h40">Sobre a planta</h2></div>
                <div className="wp-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.rendered) }} />
              </Reveal>
            )}
          </div>

          <Reveal y={26} delay={0.1} className="ca-side">
            <aside aria-label="Ficha da planta" style={{ display: 'contents' }}>
              <p className="ca-kicker">Ficha da planta</p>
              <h2 className="ca-h40">{name}</h2>
              {acf?.scientific_name && <p className="ca-sci">{acf.scientific_name}</p>}
              <span className="ca-side__sep" />
              <dl className="ca-side__rows">
                {rows.map((r) => (
                  <div key={r.label} className="ca-side__row">
                    <dt>{r.icon}{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/plantas" className="ca-side__btn">Pesquisar outras plantas<ArrowUpRightIcon size={16} aria-hidden /></Link>
              <p className="t-13 ca-side__note">{disclaimer}</p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---------- Previous / next ---------- */}
      {(prev || next) && (
        <section className="ca-other" aria-labelledby="outras">
          <div className="ca-other__wrap">
            <Reveal y={20}><CaHead id="outras" title="Continue explorando" link={{ label: 'Ver enciclopédia', href: '/plantas' }} /></Reveal>
            <div className="ca-other__grid">
              {prev && <OtherCard plant={prev} label="Planta anterior" delay={0} />}
              {next && <OtherCard plant={next} label="Próxima planta" delay={0.06} />}
            </div>
          </div>
        </section>
      )}

      <div className="ca-ctawrap ca-ctawrap--service">
        <CtaCard band="mint" title="Quer entender melhor a fitoterapia?"
          copy="Nos artigos do blog você encontra a história, o preparo e o que a ciência diz sobre as plantas da enciclopédia."
          primary={{ label: 'Ler os artigos', href: '/blog' }} pad="64px 48px" radius={16} />
      </div>
    </main>
  )
}

function OtherCard({ plant, label, delay }: { plant: Plant; label: string; delay: number }) {
  const name = decodeEntities(plant.title.rendered)
  return (
    <Reveal y={20} delay={delay}>
      <Link href={`/plantas/${plant.slug}`} className="ca-ocard">
        <div className="ca-ocard__img"><PlantImage src={plant.acf?.illustrative_image} icon={categoryIcon(plant.acf?.category)} /></div>
        <div className="ca-ocard__copy">
          <p className="ca-kicker">{label}</p>
          <h3 className="ca-h25">{name}</h3>
          <p className="t-13 muted">{plant.acf?.scientific_name || plant.acf?.category || 'Ver ficha'}</p>
        </div>
        <RoundArrow className="ca-ocard__arrow" />
      </Link>
    </Reveal>
  )
}
