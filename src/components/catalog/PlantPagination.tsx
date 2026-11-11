'use client'

import Link from 'next/link'
import { Fragment, useLayoutEffect, useRef, type MouseEvent } from 'react'
import { ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

interface Props {
  page: number
  totalPages: number
  links: { page: number; href: string }[]
  previousHref?: string
  nextHref?: string
}

export default function PlantPagination({ page, totalPages, links, previousHref, nextHref }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const pending = useRef<{ page: number; top: number; keyboard: boolean } | null>(null)

  const rememberPosition = (event: MouseEvent<HTMLAnchorElement>, targetPage: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || targetPage === page) return
    const nav = navRef.current
    if (nav) pending.current = { page: targetPage, top: nav.getBoundingClientRect().top, keyboard: event.detail === 0 }
  }

  useLayoutEffect(() => {
    const nav = navRef.current
    const navigation = pending.current
    if (!nav || !navigation || navigation.page !== page) return
    pending.current = null

    const smoother = ScrollSmoother.get()
    if (smoother) ScrollTrigger.refresh()
    const offset = nav.getBoundingClientRect().top - navigation.top
    if (smoother) {
      smoother.scrollTop(smoother.scrollTop() + offset)
    } else {
      window.scrollBy({ top: offset, behavior: 'instant' })
    }
    if (navigation.keyboard) nav.querySelector<HTMLAnchorElement>('[aria-current="page"]')?.focus({ preventScroll: true })
  }, [page])

  return (
    <nav ref={navRef} className="pl-pagination" aria-label="Paginação do catálogo">
      {previousHref
        ? <Link href={previousHref} scroll={false} onClick={(event) => rememberPosition(event, page - 1)} className="ca-pill ca-pill--sm">Anterior</Link>
        : <button type="button" className="ca-pill ca-pill--sm" disabled>Anterior</button>}
      {links.map(({ page: pageNumber, href }, index) => (
        <Fragment key={pageNumber}>
          {index > 0 && pageNumber - links[index - 1].page > 1 && <span aria-hidden="true">…</span>}
          <Link
            href={href}
            scroll={false}
            onClick={(event) => rememberPosition(event, pageNumber)}
            className="pl-pagination__page"
            aria-label={`Página ${pageNumber}`}
            aria-current={pageNumber === page ? 'page' : undefined}
          >
            {pageNumber}
          </Link>
        </Fragment>
      ))}
      {nextHref
        ? <Link href={nextHref} scroll={false} onClick={(event) => rememberPosition(event, page + 1)} className="ca-pill ca-pill--sm">Próxima</Link>
        : <button type="button" className="ca-pill ca-pill--sm" disabled>Próxima</button>}
      <span className="pl-pagination__status t-13 muted">Página {page} de {totalPages}</span>
    </nav>
  )
}
