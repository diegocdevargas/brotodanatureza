'use client'

import { useLayoutEffect } from 'react'
import { ScrollSmoother } from '@/lib/gsap'

export default function PlantScrollToTop({ slug }: { slug: string }) {
  useLayoutEffect(() => {
    if (window.location.hash) return

    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTop(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [slug])

  return null
}
