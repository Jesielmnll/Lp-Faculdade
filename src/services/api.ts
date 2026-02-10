import { API_BASE_URL, WP_API, I9_API } from '@/config/api';

// ── Types ──────────────────────────────────────────────

export interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: Record<string, string>;
    }>;
  };
  categories?: number[];
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface HomeData {
  hero?: Record<string, unknown>;
  about?: Record<string, unknown>;
  courses?: Record<string, unknown>;
  stats?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface EstagioItem {
  estado_uf: string;
  nome_orgao: string;
  contato: string;
  email: string;
}

export interface OuvidoriaPayload {
  nome: string;
  email: string;
  mensagem: string;
  recaptcha_token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// ── Fetch Helper ───────────────────────────────────────

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

// ── WordPress REST API ─────────────────────────────────

export async function fetchPosts(page = 1, perPage = 9): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const url = `${WP_API}/posts?_embed&page=${page}&per_page=${perPage}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);

  const posts: WPPost[] = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);

  return { posts, total, totalPages };
}

export async function fetchPost(slug: string): Promise<WPPost> {
  const posts = await apiFetch<WPPost[]>(`${WP_API}/posts?_embed&slug=${slug}`);
  if (!posts.length) throw new Error('Post not found');
  return posts[0];
}

export async function fetchCategories(): Promise<WPCategory[]> {
  return apiFetch<WPCategory[]>(`${WP_API}/categories`);
}

// ── i9 Custom Endpoints ────────────────────────────────

export async function fetchHomeData(): Promise<HomeData> {
  return apiFetch<HomeData>(`${I9_API}/home`);
}

export async function fetchEstagios(): Promise<EstagioItem[]> {
  return apiFetch<EstagioItem[]>(`${I9_API}/estagios`);
}

export async function submitOuvidoria(payload: OuvidoriaPayload): Promise<ApiResponse<unknown>> {
  return apiFetch<ApiResponse<unknown>>(`${I9_API}/ouvidoria`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
