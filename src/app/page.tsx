import '@/styles/home.scss'
import { getDashboardStats, getPlants, getPosts } from '@/lib/wordpress'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import BrandReveal from '@/components/home/BrandReveal'
import Plants from '@/components/home/Plants'
import Why from '@/components/home/Why'
import HowItWorks from '@/components/home/HowItWorks'
import Blog from '@/components/home/Blog'
import Faq from '@/components/shared/Faq'

export const revalidate = 3600

export default async function HomePage() {
  const [plants, posts, stats] = await Promise.all([
    getPlants({ perPage: 7 }),
    getPosts(1, 4),
    getDashboardStats(),
  ])

  const numbers = [
    { value: stats.totalPlants, label: 'Plantas catalogadas' },
    { value: Object.keys(stats.categories).length, label: 'Categorias' },
    { value: stats.totalPosts, label: 'Artigos publicados' },
  ]
  const [featured, ...rest] = plants
  const storyImage = plants.find((p) => p.acf?.illustrative_image)?.acf.illustrative_image

  return (
    <main className="page-main">
      <Hero stats={numbers} featured={featured} />
      <About stats={numbers} storyImage={storyImage} />
      <BrandReveal />
      <Plants plants={rest.length >= 3 ? rest : plants} />
      <Why />
      <HowItWorks />
      <Blog posts={posts} />
      <Faq />
    </main>
  )
}
