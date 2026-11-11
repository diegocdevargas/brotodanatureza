// src/lib/wordpress.ts

const WP_API =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'http://localhost/broto/wp-json/wp/v2'

const WP_REVALIDATE_SECONDS = 300
const WP_PLANT_CATEGORIES = [
  'digestiva',
  'calmante',
  'anti-inflamatória',
  'imunológica',
  'circulatória',
  'respiratória',
  'outros',
]

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────

export interface Plant {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  acf: {
    popular_name: string
    scientific_name: string
    category: string
    medicinal_uses: string
    preparation_method: string
    used_parts: string
    contraindications: string
    illustrative_image: string
    plant_source?: string
    image_credit?: string
    image_source_url?: string
  }
}

export interface Post {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      caption?: { rendered: string }
    }>
    author?: Array<{ name: string }>
    'wp:term'?: Array<Array<{ name: string; taxonomy: string }>>
  }
}

/** Cover image, author and first category of an embedded post. */
export function postMeta(post: Post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const category = post._embedded?.['wp:term']?.flat().find((t) => t.taxonomy === 'category')?.name
  return {
    image: media?.source_url,
    imageAlt: media?.alt_text,
    imageCaption: media?.caption?.rendered,
    author: post._embedded?.author?.[0]?.name,
    category: category && category !== 'Uncategorized' && category !== 'Sem categoria' ? category : undefined,
  }
}

export interface WPMedia {
  id: number
  source_url: string
  alt_text: string
}

export interface DashboardStats {
  totalPlants: number
  totalPosts: number
  categories: Record<string, number>
}

export interface WPPage<T> {
  items: T[]
  total: number
  totalPages: number
}

// ───────────────────────────────────────────────────────────────
// Generic Fetch
// ───────────────────────────────────────────────────────────────

async function fetchWPResponse(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<Response> {
  const url = new URL(`${WP_API}/${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    next: {
      revalidate: WP_REVALIDATE_SECONDS,
      tags: [`wordpress-${endpoint.split('/')[0]}`],
    },
  })

  if (!res.ok) {
    throw new Error(`WP API Error ${res.status}: ${endpoint}`)
  }

  return res
}

async function fetchWPPage<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<WPPage<T>> {
  const res = await fetchWPResponse(endpoint, params)
  const items = await res.json() as T[]
  return {
    items,
    total: Number(res.headers.get('X-WP-Total') ?? items.length),
    totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 1),
  }
}

async function fetchWP<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const res = await fetchWPResponse(endpoint, params)
  return res.json()
}

async function safeFetchWP<T>(
  endpoint: string,
  params: Record<string, string> = {},
  fallback: T
): Promise<T> {
  try {
    return await fetchWP<T>(endpoint, params)
  } catch (error) {
    console.error(error)
    return fallback
  }
}

// ───────────────────────────────────────────────────────────────
// Plantas
// ───────────────────────────────────────────────────────────────

function normalizePlantCategory(plant: Plant): Plant {
  if (!plant.acf?.category) return plant
  return { ...plant, acf: { ...plant.acf, category: plant.acf.category.toLowerCase() } }
}

export async function getPlants(params?: {
  search?: string
  category?: string
  page?: number
  perPage?: number
}): Promise<Plant[]> {
  const query: Record<string, string> = {
    per_page: String(params?.perPage ?? 24),
    page: String(params?.page ?? 1),
    _fields: 'id,slug,date,title,excerpt,featured_media,acf',
    orderby: 'date',
    order: 'desc',
  }

  if (params?.search) {
    query.plant_search = params.search
  }

  if (params?.category) {
    query.plant_category = params.category.toLowerCase()
  }

  const plants = await safeFetchWP<Plant[]>('plants', query, [])
  return plants.map(normalizePlantCategory)
}

export async function getPlantsPage(params?: {
  search?: string
  category?: string
  page?: number
  perPage?: number
  offset?: number
}): Promise<WPPage<Plant>> {
  const perPage = Math.max(1, Math.min(100, Math.floor(params?.perPage ?? 24)))
  const page = Math.max(1, Math.floor(params?.page ?? 1))
  const query: Record<string, string> = {
    per_page: String(perPage),
    page: String(page),
    _fields: 'id,slug,date,title,excerpt,featured_media,acf',
    orderby: 'date',
    order: 'desc',
  }

  if (params?.search?.trim()) query.plant_search = params.search.trim()
  if (params?.category) query.plant_category = params.category.toLowerCase()
  if (params?.offset !== undefined) query.offset = String(Math.max(0, Math.floor(params.offset)))

  const result = await fetchWPPage<Plant>('plants', query)
  return { ...result, items: result.items.map(normalizePlantCategory) }
}

export async function getPlantCount(): Promise<number> {
  const result = await fetchWPPage<{ id: number }>(
    'plants',
    { per_page: '1', _fields: 'id' }
  )
  return result.total
}

export async function getPlant(
  slug: string
): Promise<Plant | null> {
  const plants = await safeFetchWP<Plant[]>(
    'plants',
    {
      slug,
      _fields: 'id,slug,date,title,content,excerpt,featured_media,acf',
    },
    []
  )

  return plants[0] ? normalizePlantCategory(plants[0]) : null
}

export async function getAdjacentPlants(plant: Plant): Promise<{
  previous?: Plant
  next?: Plant
}> {
  const fields = 'id,slug,date,title,excerpt,featured_media,acf'
  const [newer, older] = await Promise.all([
    fetchWP<Plant[]>('plants', {
      per_page: '1',
      after: plant.date,
      orderby: 'date',
      order: 'asc',
      _fields: fields,
    }),
    fetchWP<Plant[]>('plants', {
      per_page: '1',
      before: plant.date,
      orderby: 'date',
      order: 'desc',
      _fields: fields,
    }),
  ])

  return {
    previous: newer[0] ? normalizePlantCategory(newer[0]) : undefined,
    next: older[0] ? normalizePlantCategory(older[0]) : undefined,
  }
}

// ───────────────────────────────────────────────────────────────
// Posts
// ───────────────────────────────────────────────────────────────

export async function getPosts(
  page = 1,
  perPage = 9
): Promise<Post[]> {
  return safeFetchWP<Post[]>(
    'posts',
    {
      page: String(page),
      per_page: String(perPage),
      orderby: 'date',
      order: 'desc',
      _embed: '1',
      _fields:
        'id,slug,title,excerpt,content,date,featured_media,_links,_embedded',
    },
    []
  )
}

export async function getPost(
  slug: string
): Promise<Post | null> {
  const posts = await safeFetchWP<Post[]>(
    'posts',
    {
      slug,
      _embed: '1',
    },
    []
  )

  return posts[0] ?? null
}

// ───────────────────────────────────────────────────────────────
// Media
// ───────────────────────────────────────────────────────────────

export async function getMedia(
  id: number
): Promise<WPMedia | null> {
  return safeFetchWP<WPMedia | null>(
    `media/${id}`,
    {},
    null
  )
}

// ───────────────────────────────────────────────────────────────
// Dashboard
// ───────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const [plants, posts, ...plantCategories] = await Promise.all([
    fetchWPPage<{ id: number }>('plants', { per_page: '1', _fields: 'id' }),
    fetchWPPage<{ id: number }>('posts', { per_page: '1', _fields: 'id' }),
    ...WP_PLANT_CATEGORIES.map((category) =>
      fetchWPPage<{ id: number }>('plants', {
        per_page: '1',
        plant_category: category,
        _fields: 'id',
      })
    ),
  ])
  const categories = Object.fromEntries(
    WP_PLANT_CATEGORIES
      .map((category, index) => [category, plantCategories[index].total] as const)
      .filter(([, count]) => count > 0)
  )

  return {
    totalPlants: plants.total,
    totalPosts: posts.total,
    categories,
  }
}

// ───────────────────────────────────────────────────────────────
// Utilities
// ───────────────────────────────────────────────────────────────

/**
 * Sanitizes HTML by removing script tags and other dangerous content
 * to prevent React warnings about script execution
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*{[^}]*}/gi, '')
}