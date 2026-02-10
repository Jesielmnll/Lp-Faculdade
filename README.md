# Faculdade i9 Educação — Front-End

Aplicação React moderna que consome dados de um WordPress Headless via WP-JSON API.

## Arquitetura

```
src/
├── config/api.ts          # URLs da API e chave reCAPTCHA
├── services/api.ts        # Serviço centralizado (fetch) — WP REST + endpoints i9
├── hooks/useWordPress.ts  # React Query hooks (usePosts, usePost, useEstagios, useSubmitOuvidoria)
├── components/
│   ├── BrazilMap.tsx      # Mapa SVG interativo do Brasil (27 estados)
│   ├── BlogSection.tsx    # Grid de posts na landing page
│   ├── Header.tsx         # Sticky header com glassmorphism
│   └── ...
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Blog.tsx           # Listagem de posts com paginação
│   ├── BlogPost.tsx       # Template de post (prose typography)
│   ├── Estagio.tsx        # Mapa interativo + filtro de órgãos conveniados
│   ├── Ouvidoria.tsx      # Formulário com validação Zod + reCAPTCHA
│   ├── Institucional.tsx  # Página institucional
│   └── Nupeci.tsx         # Página NUPECI
└── ...
```

## Tecnologias

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + `@tailwindcss/typography` para renderização de conteúdo WordPress
- **React Query** (TanStack) para gerenciamento de estado assíncrono
- **Zod** para validação de formulários
- **React Router DOM** para roteamento SPA

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://admin.faculdade.i9educacao.edu.br/wp-json
VITE_RECAPTCHA_SITE_KEY=SUA_CHAVE_RECAPTCHA_AQUI
```

Ou edite diretamente `src/config/api.ts`:

```ts
export const API_BASE_URL = 'https://admin.faculdade.i9educacao.edu.br/wp-json';
export const RECAPTCHA_SITE_KEY = 'SUA_CHAVE_RECAPTCHA_AQUI';
```

### Endpoints consumidos

| Endpoint | Método | Descrição |
|---|---|---|
| `/wp/v2/posts?_embed` | GET | Listagem de posts do blog |
| `/wp/v2/posts?_embed&slug={slug}` | GET | Post individual por slug |
| `/wp/v2/categories` | GET | Categorias do blog |
| `/i9/v1/home` | GET | Dados da landing page |
| `/i9/v1/estagios` | GET | Lista de órgãos conveniados por UF |
| `/i9/v1/ouvidoria` | POST | Envio de mensagem da ouvidoria |

### Hooks Customizados

- `usePosts(page, perPage)` — Busca posts paginados
- `usePost(slug)` — Busca post individual por slug
- `useEstagios()` — Busca dados de estágio para o mapa
- `useSubmitOuvidoria()` — Mutation para envio do formulário

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy

Acesse [Lovable](https://lovable.dev) → Share → Publish.
