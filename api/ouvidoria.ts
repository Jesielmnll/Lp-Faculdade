/**
 * POST /api/ouvidoria
 *
 * Rota Node.js/Serverless para processar mensagens da Ouvidoria.
 * Valida reCAPTCHA com o Google e repassa os dados para o WordPress
 * (ou envia diretamente via SMTP/SendPulse no futuro).
 *
 * Variáveis de ambiente necessárias (.env):
 *   - WP_API_BASE_URL  → ex: https://admin.faculdade.i9educacao.edu.br/wp-json
 *   - WP_API_KEY        → chave do plugin i9 (X-I9-API-KEY)
 *   - RECAPTCHA_SECRET  → chave secreta do Google reCAPTCHA v3
 *
 * Para rodar localmente:
 *   npx ts-node api/ouvidoria.ts   (ou integrar com Express/Vercel/Netlify Functions)
 */

interface OuvidoriaBody {
  nome: string;
  email: string;
  mensagem: string;
  recaptcha_token: string;
}

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

// ── Handler principal ──────────────────────────────────

export default async function handler(req: { method: string; body: OuvidoriaBody }, res: {
  status: (code: number) => { json: (data: unknown) => void };
}) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { nome, email, mensagem, recaptcha_token } = req.body;

  // 1. Validação básica
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios: nome, email, mensagem' });
  }

  // 2. Validar reCAPTCHA com o Google
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
  if (RECAPTCHA_SECRET && recaptcha_token) {
    try {
      const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${RECAPTCHA_SECRET}&response=${recaptcha_token}`,
      });
      const recaptchaData: RecaptchaResponse = await recaptchaRes.json();

      if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5)) {
        return res.status(403).json({ success: false, message: 'Falha na verificação de segurança (reCAPTCHA)' });
      }
    } catch (err) {
      console.error('[api/ouvidoria] Erro ao validar reCAPTCHA:', err);
      return res.status(500).json({ success: false, message: 'Erro ao validar reCAPTCHA' });
    }
  }

  // 3. Repassar para o WordPress (ou substituir por SMTP/SendPulse)
  const WP_API_BASE_URL = process.env.WP_API_BASE_URL || 'https://admin.faculdade.i9educacao.edu.br/wp-json';
  const WP_API_KEY = process.env.WP_API_KEY || '';

  try {
    const wpRes = await fetch(`${WP_API_BASE_URL}/i9/v1/ouvidoria`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-I9-API-KEY': WP_API_KEY,
      },
      body: JSON.stringify({ nome, email, mensagem, recaptcha_token }),
    });

    const wpData = await wpRes.json();

    if (!wpRes.ok) {
      console.error('[api/ouvidoria] WordPress respondeu com erro:', { status: wpRes.status, body: wpData });
      return res.status(wpRes.status).json({ success: false, message: wpData?.message || 'Erro do servidor' });
    }

    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso' });
  } catch (err) {
    console.error('[api/ouvidoria] Exceção ao contactar WordPress:', err);
    return res.status(500).json({ success: false, message: 'Erro interno ao processar mensagem' });
  }
}
