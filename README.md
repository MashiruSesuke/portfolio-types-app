# Potfolio App - Next.js 16 + TypeScript

**Live demo**:  
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-types-app.vercel.app?_vercel_share=4XlDjVGhfLBUGk2KZ8JEilUiB1KewtFY)

Unit tests for utils and API layer (coverage 100%). Component tests in progress.

**Demo portfolio app for middle frontend-developer.**
Shows modern practices: Server Components, Streaming SSR, TanStack Query, forms with validation, optimistic updates.

## Tech stack

- **Next.js 16** (App Router, Server Actions, Streaming SSR)
- **React 18** (hooks, Suspense)
- **TypeScript** (strict mode, utility types, generics, descrimitated unions)
- **TanStack Query** (useQuery, useMutation, optimistic updates)
- **React Hook Form + Zod** (form validation on client and server)
- **Tailwind CSS** (styling)

## Functionality

- Main page: product cards, user profile (localStorage)
- Posts (server fetch): `/posts` - classic SSR
- Posts (client fetch): `/posts-client` - TanStack Query, delete with optimistic updates, post quick creation
- Products: `/products` - server loading + client sorting/likes
- Post creation: `/create-post` - form with Zod and Server Action
- Dashboard: `/dashboard` - SSR streaming with Suspense and skeletons

## How to run

```bash
git clone https://github.com/MashiruSesuke/portfolio-types-app.git
cd portfolio-types-app
```

### Dev

```bash
npm i
npm run dev
```

Open http://localhost:3000

In this mode SSR streaming doesn't work. Use production build instead.

### Prod (for SSR streaming check)

```bash
npm run build
npm run start
```

### Eslint

```bash
npm run lint
```

### Prettier

```bash
npm run format
```

### Type check

```bash
npm run type-check
```

## Project structure

```text
src/
  |- app/         # routes
    |- actions/   # actions (Server Actions)
    |- providers/ # providers (TanStack Query)
  |- components/  # reused components
  |- hooks/       # custom hooks
  |- lib/         # API, types
  |- utils/       # functions (fetch)
```

## Key opportunities

- Typification: advanced TypeScript-types in `lib/types.ts` (SnakeToCamel, AsyncState, DeepReadonly)
- Streaming SSR: page `/dashboard` loads with skeletons, blocks shows big by bit
- Optimistic updates: when post delete on `/posts-client` UI changes instantly, and if got an error it rolls back
- Server Actiobs: post creating form on `/create-post` with double validation (client + server)

## Author

Mashiru Sesuke - [GitHub](https://github.com/MashiruSesuke)

## License

MIT
