# 🌱 Broto CMS

> **Clone. Configure. Coloque no ar.**  
> CMS open source para sites e sistemas — front-end, painel admin e API juntos em um único repositório.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Payload CMS](https://img.shields.io/badge/Payload-v3-1a1a1a?style=flat-square)](https://payloadcms.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![License](https://img.shields.io/badge/license-MIT-7ab648?style=flat-square)](LICENSE)

---

## 📖 Documentação completa

**→ [brototec.github.io/broto-cms-docs](https://brototec.github.io/broto-cms-docs)**

Arquitetura detalhada, sistema de temas, collections, roteiro de implementação e guia de infraestrutura.

---

## Como funciona

O Broto CMS funciona como Drupal ou WordPress — você clona o repositório, configura o ambiente e sobe para o cliente. Front-end, painel administrativo e API vivem juntos no mesmo projeto. Cada instalação é independente. O código é do cliente. A infra é do cliente.

```bash
git clone https://github.com/brototec/broto-cms nome-do-projeto
cd nome-do-projeto
cp .env.example .env.local
# editar .env.local com banco e variáveis
pnpm install && pnpm dev
```

---

## Para quem é

- **Agências e devs** que entregam sites com painel de edição incluso
- **Empresas** que querem autonomia para editar o próprio site sem depender de desenvolvedor
- **Times** que precisam de sistemas internos com CRUD, auth e painel de gestão

---

## Stack

| Tecnologia | Papel |
|---|---|
| **Next.js 15** | Framework full-stack — App Router, SSR, Server Components |
| **Payload CMS v3** | CMS + Admin + REST API automática (roda dentro do Next.js) |
| **TypeScript** | Tipos compartilhados entre CMS e front-end |
| **PostgreSQL** | Banco de dados relacional |
| **Tailwind CSS v4** | Estilização com sistema de temas modulares |

---

## Início rápido

### Pré-requisitos

- Node.js v20+
- pnpm — `npm install -g pnpm`
- PostgreSQL (local, [Neon.tech](https://neon.tech) grátis, ou VPS)

### 1. Clonar o repositório

```bash
git clone https://github.com/brototec/broto-cms nome-do-projeto
cd nome-do-projeto
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
# Payload
PAYLOAD_SECRET=sua-chave-secreta-minimo-32-caracteres

# Banco de dados
DATABASE_URI=postgresql://usuario:senha@host:5432/nome-do-banco?sslmode=require

# URL do projeto
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Upload de arquivos (Uploadthing — gratuito em uploadthing.com)
UPLOADTHING_SECRET=sk_live_xxx
UPLOADTHING_APP_ID=xxx
```

### 3. Instalar e rodar

```bash
pnpm install
pnpm dev
```

Acessar [localhost:3000/admin](http://localhost:3000/admin) e criar o primeiro usuário administrador.

---

## Estrutura do projeto

```
broto-cms/
├── src/
│   ├── app/
│   │   ├── (frontend)/              # Rotas públicas do site
│   │   │   ├── page.tsx             # Home
│   │   │   ├── [slug]/page.tsx      # Páginas dinâmicas
│   │   │   └── layout.tsx
│   │   ├── (payload)/               # Painel administrativo
│   │   │   └── admin/[[...segments]]/page.tsx
│   │   └── api/
│   │       └── payload/[...slug]/route.ts   # REST API automática
│   │
│   ├── collections/                 # Tipos de conteúdo — definidos em TypeScript
│   │   ├── Pages.ts                 # Páginas com page builder
│   │   ├── Posts.ts                 # Blog e conteúdo editorial
│   │   ├── Media.ts                 # Upload de arquivos
│   │   ├── Users.ts                 # Autenticação e roles
│   │   └── Forms.ts                 # Formulários dinâmicos
│   │
│   ├── globals/                     # Dados singleton editáveis
│   │   ├── Header.ts                # Navegação principal
│   │   └── Footer.ts                # Rodapé
│   │
│   ├── blocks/                      # Blocos do page builder
│   │   ├── HeroBlock.ts
│   │   ├── ContentBlock.ts
│   │   ├── CTABlock.ts
│   │   └── MediaBlock.ts
│   │
│   ├── themes/                      # Sistema de temas — um por projeto/cliente
│   │   └── broto-default/           # Tema base da Brototec
│   │       ├── components/
│   │       ├── styles/
│   │       └── theme.config.ts
│   │
│   ├── components/                  # Componentes compartilhados
│   ├── lib/                         # Utilitários e queries
│   └── payload.config.ts            # Configuração central do CMS
│
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Criando o tema do cliente

Cada projeto tem seu próprio tema em `/src/themes/`. Um tema é uma pasta com componentes React e um arquivo de configuração — o conteúdo no banco não muda, só a apresentação visual.

```bash
# Duplicar o tema base
cp -r src/themes/broto-default src/themes/nome-do-cliente
```

Editar `src/themes/nome-do-cliente/theme.config.ts`:

```typescript
export const theme: ThemeConfig = {
  name: 'nome-do-cliente',
  layout: { Header, Footer },
  blocks: {
    hero: HeroBlock,
    content: ContentBlock,
  },
  tokens: {
    primary: '#cor-do-cliente',
    background: '#fundo',
  }
}
```

Para sistemas customizados, adicione collections de negócio em `/src/collections/` — mesma estrutura, campos específicos para o contexto do cliente.

---

## Deploy

### Vercel

Recomendado para a maioria dos projetos — deploy automático via GitHub, CDN global, zero configuração de servidor.

```bash
npm install -g vercel
vercel
```

Configurar no painel da Vercel: `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SERVER_URL`, `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`.

Banco recomendado: [Neon.tech](https://neon.tech) — PostgreSQL gerenciado com free tier.

### VPS

Para projetos que exigem banco próprio, maior controle de dados ou volume maior de acessos.

```bash
# No servidor (Ubuntu 22.04+)
git clone https://github.com/brototec/broto-cms /var/www/nome-do-projeto
cd /var/www/nome-do-projeto
cp .env.example .env.local
# editar .env.local com dados do banco local
pnpm install && pnpm build && pnpm start
```

Gerenciador de processos recomendado: [PM2](https://pm2.keymetrics.io)  
Deploy automatizado recomendado: [Coolify](https://coolify.io) — self-hosted e gratuito.

Guia completo de deploy na [documentação](https://brototec.github.io/broto-cms-docs).

---

## Infraestrutura

O projeto cresce com o negócio sem reescrever código. A migração entre estágios é só trocar a string de conexão no `.env`.

| Estágio | Onde rodar | Banco | Custo estimado |
|---|---|---|---|
| **Início** | Vercel free | Neon free (5GB) | R$ 0/mês |
| **Crescendo** | Vercel Pro | Neon Pro | ~R$ 50/mês |
| **Escala** | VPS Hetzner CX21 | PostgreSQL próprio | ~R$ 120/mês |

---

## Collections disponíveis

| Collection | Descrição | Uso |
|---|---|---|
| `Pages` | Páginas com page builder por blocos | Site |
| `Posts` | Blog, notícias e conteúdo editorial | Site |
| `Media` | Upload centralizado com resize automático | Site / Sistema |
| `Users` | Auth com roles (admin / editor / viewer) | Site / Sistema |
| `Forms` | Formulários dinâmicos configuráveis | Site |
| `FormSubmissions` | Respostas dos formulários | Site |

---

## Comandos úteis

```bash
pnpm dev                        # Desenvolvimento local
pnpm build                      # Build de produção
pnpm start                      # Rodar em produção
pnpm payload generate:types     # Regenerar tipos após alterar collections
pnpm type-check                 # Verificar erros de TypeScript
```

---

## Contribuindo

```bash
# Fork → branch → commit → Pull Request
git checkout -b feat/minha-contribuicao
git commit -m "feat: descrição da mudança"
```

Padrão de commits: `feat` `fix` `docs` `refactor` `chore`

---

## Ecossistema Brototec

| Repositório | Descrição |
|---|---|
| [brototec/broto-cms](https://github.com/brototec/broto-cms) | Este repositório — o CMS open source |
| [brototec/broto-cms-docs](https://github.com/brototec/broto-cms-docs) | Documentação interativa (GitHub Pages) |
| [brototec/brototec](https://github.com/brototec/brototec) | Site institucional |

---

## Licença

MIT — veja [LICENSE](LICENSE).

O código é seu. A infra é sua. Sem dependência de plataforma fechada.

---

<p align="center">
  Feito com intenção por <a href="https://brototec.vercel.app">Brototec</a><br>
  <em>Sem dependência • Sem complicação • Feito para você evoluir</em>
</p>
