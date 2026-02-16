# Faculdade i9 Educação — Front-End + Backend API

Aplicação React moderna com backend Node.js/Serverless integrado. O front-end consome dados de um WordPress Headless (apenas posts do blog) e processa toda lógica de segurança e e-mails internamente via pasta `/api`.

---

## Estrutura de Pastas

```
/
├── api/                           # Backend Node.js/Serverless
│   └── ouvidoria.ts               # POST /api/ouvidoria — reCAPTCHA + envio de e-mail
│
├── public/                        # Arquivos estáticos
│   ├── favicon.ico
│   ├── robots.txt
│   └── .htaccess
│
├── src/                           # Front-end React
│   ├── assets/                    # Imagens e mídias
│   ├── components/                # Componentes reutilizáveis
│   │   ├── ui/                    # shadcn/ui (Button, Input, Card, etc.)
│   │   ├── Header.tsx             # Sticky header com glassmorphism
│   │   ├── Footer.tsx             # Rodapé
│   │   ├── BrazilMap.tsx          # Mapa SVG interativo (27 UFs)
│   │   ├── BlogSection.tsx        # Grid de posts na landing page
│   │   ├── HeroSection.tsx        # Banner principal
│   │   ├── StatsSection.tsx       # Números/estatísticas
│   │   ├── AboutSection.tsx       # Seção "Sobre"
│   │   ├── CoursesSection.tsx     # Cursos disponíveis
│   │   ├── MVVSection.tsx         # Missão, Visão e Valores
│   │   ├── FAQSection.tsx         # Perguntas frequentes
│   │   ├── TestimonialsSection.tsx # Depoimentos
│   │   └── JourneySection.tsx     # Jornada do aluno
│   │
│   ├── config/
│   │   └── api.ts                 # URLs da API e chave pública do reCAPTCHA
│   │
│   ├── hooks/
│   │   ├── useWordPress.ts        # React Query hooks (usePosts, usePost, useSubmitOuvidoria)
│   │   ├── useScrollReveal.ts     # Hook de animação ao scroll
│   │   ├── useCountUp.ts          # Contador animado
│   │   └── use-mobile.tsx         # Detecção de viewport mobile
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Landing page
│   │   ├── Blog.tsx               # Listagem de posts com paginação
│   │   ├── BlogPost.tsx           # Template de post (SEO dinâmico via Helmet)
│   │   ├── Estagio.tsx            # Mapa interativo com dados estáticos
│   │   ├── Ouvidoria.tsx          # Formulário com Zod + reCAPTCHA v3
│   │   ├── Institucional.tsx      # Página institucional
│   │   ├── Nupeci.tsx             # Página NUPECI
│   │   └── NotFound.tsx           # Página 404
│   │
│   ├── services/
│   │   └── api.ts                 # Serviço centralizado de fetch (WP REST + /api)
│   │
│   ├── App.tsx                    # Router + HelmetProvider
│   ├── main.tsx                   # Ponto de entrada (preparado para hydrateRoot)
│   └── index.css                  # Tokens de design (Tailwind)
│
├── .env                           # Variáveis de ambiente (NÃO versionar)
├── index.html                     # Template HTML
├── vite.config.ts                 # Config do Vite
├── tailwind.config.ts             # Config do Tailwind CSS
└── README.md                      # Este arquivo
```

---

## Rotas de API

### Endpoints Internos (pasta `/api`)

| Endpoint          | Método | Descrição                                                |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/ouvidoria`  | POST   | Recebe mensagem, valida reCAPTCHA v3 com Google, envia e-mail |

**Payload `/api/ouvidoria`:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "mensagem": "Minha mensagem aqui...",
  "recaptcha_token": "TOKEN_GERADO_PELO_FRONTEND"
}
```

**Respostas:**
| Status | Corpo                                                    |
| ------ | -------------------------------------------------------- |
| 200    | `{ "success": true, "message": "Mensagem recebida..." }` |
| 400    | `{ "success": false, "message": "Campos obrigatórios..." }` |
| 403    | `{ "success": false, "message": "Falha na verificação reCAPTCHA" }` |
| 500    | `{ "success": false, "message": "Erro interno..." }`     |

### Endpoints Externos (WordPress Headless)

Consumidos **somente para conteúdo do blog**:

| Endpoint                         | Método | Descrição                   |
| -------------------------------- | ------ | --------------------------- |
| `/wp/v2/posts?_embed`            | GET    | Listagem de posts do blog   |
| `/wp/v2/posts?_embed&slug={slug}` | GET    | Post individual por slug    |
| `/wp/v2/categories`              | GET    | Categorias do blog          |
| `/i9/v1/home`                    | GET    | Dados da landing page       |

> **Nota:** Os endpoints `/i9/v1/estagios` e `/i9/v1/ouvidoria` do WordPress **não são mais utilizados**. Estágios usam dados estáticos; Ouvidoria usa o backend interno.

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

### Front-end (prefixo `VITE_`)

```env
# URL base da API WordPress (apenas para conteúdo do blog)
VITE_API_BASE_URL=https://admin.faculdade.i9educacao.edu.br/wp-json

# Chave pública do reCAPTCHA v3 (publishable — segura no front-end)
VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

# Chave de autenticação do plugin i9 no WordPress
VITE_WP_API_KEY=sua_chave_api_aqui

# URL do endpoint da Ouvidoria (backend interno)
# Em desenvolvimento: http://localhost:3001/api/ouvidoria
# Em produção: https://seudominio.com/api/ouvidoria
VITE_OUVIDORIA_API=/api/ouvidoria
```

### Back-end (pasta `/api`)

```env
# Google reCAPTCHA v3 — chave SECRETA (nunca expor no front-end!)
RECAPTCHA_SECRET=sua_chave_secreta_recaptcha

# SMTP para envio de e-mails (ex: SendPulse, Gmail, etc.)
SMTP_HOST=smtp.sendpulse.com
SMTP_PORT=587
SMTP_USER=seu_usuario_smtp
SMTP_PASS=sua_senha_smtp

# E-mails de destino e remetente
MAIL_TO=ouvidoria@faculdade.i9educacao.edu.br
MAIL_FROM=noreply@faculdade.i9educacao.edu.br
```

---

## Guia de Instalação

### Pré-requisitos

- Node.js 18+ e npm/bun
- Chave do Google reCAPTCHA v3 ([console.cloud.google.com](https://console.cloud.google.com/security/recaptcha))

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd faculdade-i9
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite o .env com suas chaves reais
```

### 3. Rodar o front-end (Vite)

```bash
npm run dev
# Acesse http://localhost:5173
```

### 4. Rodar o backend `/api` (desenvolvimento local)

O backend pode ser servido de diferentes formas:

**Opção A — Express.js simples:**
```bash
npm install express ts-node
# Crie um server.ts que importa api/ouvidoria.ts
npx ts-node server.ts
```

**Opção B — Vercel Functions (zero-config):**
```bash
npm i -g vercel
vercel dev
# As funções em /api são detectadas automaticamente
```

**Opção C — Netlify Functions:**
```bash
# Mova api/ para netlify/functions/ e configure netlify.toml
```

---

## SEO com React Helmet

O projeto utiliza `react-helmet-async` para gerenciar meta tags dinâmicas em todas as páginas.

### Páginas estáticas

Cada página define `<title>` e `<meta name="description">` únicos:

```tsx
<Helmet>
  <title>Ouvidoria — Faculdade i9 Educação</title>
  <meta name="description" content="Canal de Ouvidoria da Faculdade i9..." />
</Helmet>
```

### Blog — Meta tags dinâmicas

No template `BlogPost.tsx`, os metadados são gerados a partir da API do WordPress:

```tsx
<Helmet>
  <title>{decode(post.title.rendered)} — Faculdade i9 Educação</title>
  <meta name="description" content={decode(stripHtml(post.excerpt.rendered))} />
  <meta property="og:title" content={decode(post.title.rendered)} />
  <meta property="og:description" content={decode(stripHtml(post.excerpt.rendered))} />
  <meta property="og:image" content={featuredImageUrl} />
  <meta property="og:type" content="article" />
</Helmet>
```

### Preparação para Prerendering

O arquivo `src/main.tsx` está preparado com comentários para substituir `createRoot` por `hydrateRoot` quando o `vite-plugin-prerender` for configurado. Isso permitirá que os mecanismos de busca indexem o HTML pré-renderizado com as meta tags já inseridas.

---

## Tecnologias

| Camada     | Stack                                                    |
| ---------- | -------------------------------------------------------- |
| Front-end  | React 18 + TypeScript + Vite + Tailwind CSS              |
| UI         | shadcn/ui + Radix UI + Lucide Icons                      |
| Estado     | TanStack React Query                                     |
| Validação  | Zod + React Hook Form                                    |
| Roteamento | React Router DOM v6                                      |
| SEO        | react-helmet-async (preparado para SSR/prerendering)     |
| Backend    | Node.js / Serverless Functions (pasta `/api`)            |
| CMS        | WordPress Headless (WP-JSON API — somente blog)          |
| Segurança  | Google reCAPTCHA v3 (validação no backend)               |

---

## Deploy

- **Front-end:** Acesse [Lovable](https://lovable.dev) → Share → Publish
- **Backend:** Deploy via Vercel, Netlify, ou servidor Node.js próprio

---

## Hooks Customizados

| Hook                    | Descrição                                      |
| ----------------------- | ---------------------------------------------- |
| `usePosts(page, perPage)` | Busca posts paginados do WordPress            |
| `usePost(slug)`          | Busca post individual por slug                 |
| `useSubmitOuvidoria()`   | Mutation para envio do formulário via `/api`    |
| `useScrollReveal()`     | Animação de fade-in ao entrar no viewport      |
| `useCountUp(target)`    | Contador numérico animado                      |
