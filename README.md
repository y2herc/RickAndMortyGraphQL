# RickAndMortyGraphQL

**React + TypeScript app (Vite) using Apollo Client & GraphQL Codegen to display Rick and Morty characters.** 🎯

RickAndMortyGraphQL is a small demo that fetches data from the Rick and Morty GraphQL API using Apollo Client and uses GraphQL Code Generator for fully typed queries and hooks. It includes a responsive character grid and simple paged navigation.

---

## Features

- React + TypeScript (Vite)
- Apollo Client for GraphQL
- GraphQL Code Generator for typed queries & hooks
- Responsive character grid + simple pagination

---

## Quick start

Prerequisites: Node.js 18+ and npm

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the GraphQL endpoint (Vite exposes VITE_ vars to the client):

```
VITE_GRAPHQL_URL=https://rickandmortyapi.com/graphql
```

3. Run dev server

```bash
npm run dev
```

4. Generate types (after editing `.graphql` files)

```bash
npm run codegen
```

5. Build for production

```bash
npm run build
```

---

## Notes

- Keep `.graphql` files purely GraphQL (no JS/TS imports) — Codegen reads these files.
- If you upgrade `@apollo/client` or `@graphql-codegen/*` plugins, verify generated hooks remain compatible with your client version.

---

## Contributing

PRs welcome — small, focused changes are easiest to review.

---

## License

MIT

