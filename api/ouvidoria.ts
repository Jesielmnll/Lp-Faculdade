/**
 * POST /api/ouvidoria
 *
 * Rota Node.js/Serverless para processar mensagens da Ouvidoria.
 *
 * Responsabilidades:
 *   1. Validar campos obrigatórios (nome, email, mensagem)
 *   2. Verificar reCAPTCHA v3 diretamente com o Google (sem depender do WordPress)
 *   3. Enviar e-mail via SMTP/SendPulse (ou outro provider configurado)
 *
 * Variáveis de ambiente necessárias (.env):
 *   - RECAPTCHA_SECRET   → chave secreta do Google reCAPTCHA v3
 *   - SMTP_HOST          → servidor SMTP (ex: smtp.sendpulse.com)
 *   - SMTP_PORT          → porta SMTP (ex: 587)
 *   - SMTP_USER          → usuário/e-mail SMTP
 *   - SMTP_PASS          → senha SMTP
 *   - MAIL_TO            → e-mail de destino da ouvidoria (ex: ouvidoria@faculdade.i9educacao.edu.br)
 *   - MAIL_FROM          → e-mail remetente (ex: noreply@faculdade.i9educacao.edu.br)
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

export default async function handler(
  req: { method: string; body: OuvidoriaBody },
  res: { status: (code: number) => { json: (data: unknown) => void } }
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { nome, email, mensagem, recaptcha_token } = req.body;

  // ── 1. Validação básica ──────────────────────────────
  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      success: false,
      message: 'Campos obrigatórios: nome, email, mensagem',
    });
  }

  // ── 2. Validar reCAPTCHA v3 direto com o Google ──────
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

  if (!RECAPTCHA_SECRET) {
    console.error('[api/ouvidoria] RECAPTCHA_SECRET não configurada no .env');
    return res.status(500).json({
      success: false,
      message: 'Configuração de segurança ausente no servidor',
    });
  }

  if (!recaptcha_token) {
    return res.status(400).json({
      success: false,
      message: 'Token reCAPTCHA é obrigatório',
    });
  }

  try {
    const recaptchaRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptcha_token)}`,
      }
    );
    const recaptchaData: RecaptchaResponse = await recaptchaRes.json();

    console.log('[api/ouvidoria] reCAPTCHA response:', {
      success: recaptchaData.success,
      score: recaptchaData.score,
      action: recaptchaData.action,
    });

    if (!recaptchaData.success) {
      return res.status(403).json({
        success: false,
        message: 'Falha na verificação reCAPTCHA',
        errors: recaptchaData['error-codes'],
      });
    }

    if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
      return res.status(403).json({
        success: false,
        message: 'Verificação de segurança reprovada (score baixo)',
      });
    }
  } catch (err) {
    console.error('[api/ouvidoria] Erro ao validar reCAPTCHA:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro ao validar reCAPTCHA com o Google',
    });
  }

  // ── 3. Enviar e-mail (SMTP / SendPulse / Nodemailer) ─
  //
  // TODO: Integrar com Nodemailer ou SDK do SendPulse.
  // Exemplo com Nodemailer:
  //
  //   import nodemailer from 'nodemailer';
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST,
  //     port: Number(process.env.SMTP_PORT) || 587,
  //     secure: false,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   });
  //
  //   await transporter.sendMail({
  //     from: process.env.MAIL_FROM,
  //     to: process.env.MAIL_TO,
  //     subject: `[Ouvidoria] Mensagem de ${nome}`,
  //     html: `
  //       <h2>Nova mensagem da Ouvidoria</h2>
  //       <p><strong>Nome:</strong> ${nome}</p>
  //       <p><strong>E-mail:</strong> ${email}</p>
  //       <p><strong>Mensagem:</strong></p>
  //       <p>${mensagem}</p>
  //     `,
  //   });

  console.log('[api/ouvidoria] Mensagem recebida com sucesso:', {
    nome,
    email,
    mensagemLength: mensagem.length,
  });

  return res.status(200).json({
    success: true,
    message: 'Mensagem recebida com sucesso. Entraremos em contato em breve.',
  });
}
