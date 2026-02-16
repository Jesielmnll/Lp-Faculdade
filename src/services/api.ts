import { WP_API, I9_API, WP_API_KEY } from '@/config/api';

// ── Types ──────────────────────────────────────────────

export interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  featured_media: number;
  featured_image_url?: string;
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

function getHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (WP_API_KEY) {
    headers['X-I9-API-KEY'] = WP_API_KEY;
  }
  return { ...headers, ...(extra as Record<string, string>) };
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: getHeaders(options?.headers as HeadersInit),
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
    headers: getHeaders(),
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

/**
 * Envia dados da Ouvidoria.
 * Em produção com Node.js/Serverless, aponte VITE_OUVIDORIA_API para /api/ouvidoria.
 * Fallback: envia direto para o WordPress /i9/v1/ouvidoria.
 */
const OUVIDORIA_ENDPOINT = import.meta.env.VITE_OUVIDORIA_API || `${I9_API}/ouvidoria`;

export async function submitOuvidoria(payload: OuvidoriaPayload): Promise<ApiResponse<unknown>> {
  try {
    const res = await fetch(OUVIDORIA_ENDPOINT, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[submitOuvidoria] Erro do servidor:', { status: res.status, body: data });
      throw new Error(data?.message || `Erro ${res.status}: ${res.statusText}`);
    }

    return data as ApiResponse<unknown>;
  } catch (err) {
    console.error('[submitOuvidoria] Exceção completa:', err);
    throw err;
  }
}
