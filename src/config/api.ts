// WordPress API Configuration
// Reads from environment variables with fallbacks
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://admin.faculdade.i9educacao.edu.br/wp-json';
export const WP_API = `${API_BASE_URL}/wp/v2`;
export const I9_API = `${API_BASE_URL}/i9/v1`;

// API Key for authenticated requests (header X-I9-API-KEY)
export const WP_API_KEY = import.meta.env.VITE_WP_API_KEY || '';

// reCAPTCHA Site Key (publishable/public key)
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
