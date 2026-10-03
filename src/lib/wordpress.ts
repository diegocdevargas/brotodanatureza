// src/lib/wordpress.ts

const WP_API =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'http://broto.local/wp-json/wp/v2'

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────

export interface Plant {
  id: number
  slug: string
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
    }>
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

// ───────────────────────────────────────────────────────────────
// Generic Fetch
// ───────────────────────────────────────────────────────────────

async function fetchWP<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${WP_API}/${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`WP API Error ${res.status}: ${endpoint}`)
  }

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

export async function getPlants(params?: {
  search?: string
  category?: string
  page?: number
  perPage?: number
}): Promise<Plant[]> {
  const query: Record<string, string> = {
    per_page: String(params?.perPage ?? 24),
    page: String(params?.page ?? 1),
    _fields: 'id,slug,title,excerpt,featured_media,acf',
    orderby: 'date',
    order: 'desc',
  }

  if (params?.search) {
    query.search = params.search
  }

  if (params?.category) {
    query['filter[acf_categoria]'] = params.category
  }

  return safeFetchWP('plants', query, [])
}

export async function getPlant(
  slug: string
): Promise<Plant | null> {
  const plants = await safeFetchWP<Plant[]>(
    'plants',
    {
      slug,
      _embed: '1',
    },
    []
  )

  return plants[0] ?? null
}

export async function getAllPlantSlugs(): Promise<string[]> {
  const plants = await safeFetchWP<Plant[]>(
    'plants',
    {
      per_page: '100',
      _fields: 'slug',
    },
    []
  )

  return plants.map((plant) => plant.slug)
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
        'id,slug,title,excerpt,content,date,featured_media,_embedded',
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
  const plants = await safeFetchWP<Plant[]>(
    'plants',
    {
      per_page: '100',
      _fields: 'id,acf',
    },
    []
  )

  const postsResponse = await fetch(
    `${WP_API}/posts?per_page=1`,
    {
      cache: 'no-store',
    }
  )

  const totalPosts = Number(
    postsResponse.headers.get('X-WP-Total') ?? 0
  )

  const categories = plants.reduce<Record<string, number>>(
    (acc, plant) => {
      const category = plant.acf?.category || 'Outros'
      acc[category] = (acc[category] ?? 0) + 1
      return acc
    },
    {}
  )

  return {
    totalPlants: plants.length,
    totalPosts,
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