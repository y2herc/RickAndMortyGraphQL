# RickAndMortyGraphQL

**React + TypeScript app (Vite) using Apollo Client & GraphQL Codegen to display Rick and Morty characters.** 🎯

RickAndMortyGraphQL is a demo app that fetches data from the Rick and Morty GraphQL API using Apollo Client and uses GraphQL Code Generator for fully typed queries and hooks. It features a responsive character grid, client-side filtering/sorting with Zustand, and paged navigation.

---

## Features

- ⚛️ React 19 + TypeScript (Vite)
- 🚀 Apollo Client v4 for GraphQL queries
- 🔧 GraphQL Code Generator for typed queries & hooks
- 🎨 Responsive character grid (2/3/4 columns based on screen size)
- 🔍 Client-side filtering & sorting (Zustand state management)
- 📄 Pagination with prev/next controls
- 🎭 Character details: name, species, gender, status with gradient badges
- 🛠️ Auto-fix script for generated hooks compatibility

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

The codegen script automatically runs a post-generation fix for Apollo Client v4 compatibility.

5. Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── componenets/
│   ├── CharactersList.tsx       # Main character grid with pagination
│   └── CharacterFilters.tsx     # Filter/sort controls
├── generated/
│   └── graphql.tsx               # Auto-generated types & hooks
├── graphql/
│   └── Queries.graphql           # GraphQL query definitions
├── store/
│   └── characterStore.ts         # Zustand store for filters/sorting
├── styles/
│   ├── App.css
│   ├── CharacterFilters.css
│   ├── CharactersList.css
│   └── index.css
├── apollo.ts                     # Apollo Client setup
├── App.tsx
└── main.tsx
```

---

## Features in Detail

### Client-Side Filtering & Sorting

Uses Zustand for state management to filter and sort query results without refetching from the API:

- **Sort by**: Name, Species, or Status
- **Filter by Species**: Human, Alien, Humanoid, Robot, etc.
- **Filter by Status**: Alive, Dead, Unknown
- All filters work instantly on the client side

### GraphQL Code Generator

Automatically generates TypeScript types and React hooks from `.graphql` files. A post-generation script (`scripts/fix-generated.js`) ensures compatibility with Apollo Client v4.

---

## Notes

- Keep `.graphql` files purely GraphQL (no JS/TS imports) — Codegen reads these files.
- The `npm run codegen` command automatically fixes Apollo Client v4 compatibility issues in generated hooks.
- If you upgrade `@apollo/client` or `@graphql-codegen/*` plugins, verify generated hooks remain compatible with your client version.
- Filters and sorting happen client-side without refetching — perfect for small datasets.

---

## Contributing

PRs welcome — small, focused changes are easiest to review.

---

## License

MIT

