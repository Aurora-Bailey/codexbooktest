# Codexarium

A split-nature archive that renders JSON manuscripts as an illuminated web library. The repository stores raw chapter data under `books/` and ships a SvelteKit front-end (`frontend/`) that transforms those files into an old-world reading experience. Demonological grimoires live beside JavaScript textbooks, and the UI leans into parchment textures, embossed spines, and animated page turns.

## Repository map

```
├── books/
│   ├── demonology/        # 20 JSON chapters of “Codex Daemonium” & “Codex Lumen”
│   └── javascript/        # 10 JSON chapters covering modern JS tooling
├── frontend/              # SvelteKit static site that reads the books folder
│   ├── src/
│   │   ├── lib/server/    # Book-loading utilities
│   │   └── routes/        # Library UI and chapter pages (old-book aesthetic)
│   └── build/             # Generated after `npm run build`
└── README.md
```

## Requirements

- Node.js 20+
- npm (bundled with Node) or compatible package manager

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Point your browser at <http://localhost:5173/> to wander the stacks. The dev server watches `books/` for changes, so editing JSON chapters updates the UI without a rebuild.

## Static builds / GitHub Pages

```bash
cd frontend
npm run build
```

The static artefacts land in `frontend/build/`. Deploy that folder to GitHub Pages or any static host. If you serve from a repository subpath, set `BASE_PATH=/repo-name` before building.

## Data format

Each chapter is a JSON file shaped like:

```json
{
  "metadata": {
    "chapter": 1,
    "title": "Chapter Title",
    "summary": "Short synopsis…",
    "keywords": ["tag1", "tag2"],
    "references": [
      {
        "title": "Source",
        "author": "Author",
        "year": 2024,
        "url": "https://example.com",
        "note": "Why it matters."
      }
    ],
    "approx_word_count": 2000
  },
  "body": [
    "Paragraph one…",
    "Paragraph two…"
  ]
}
```

Add new tomes by creating a folder under `books/` and dropping similarly structured files; the UI enumerates shelves automatically.

## Features

- **Vintage ambiance:** parchment textures, Garamond/Baskerville typography, codex-style navigation, and animated page turns with reduced-motion respect.
- **Dual catalogue:** demonology and programming coexist, and the landing page shelves any additional books you add.
- **Static-ready:** `@sveltejs/adapter-static` makes hosting on Pages or Netlify trivial.
- **Server-side loaders:** SvelteKit reads JSON directly from disk, keeping the client bundle lean.

## Commands

```bash
npm run dev      # start dev server
npm run check    # TypeScript + Svelte diagnostics
npm run build    # static output in build/
npm run preview  # preview production build locally
```

Happy scribing! Contributions that extend the library (new book folders, improved front-end polish, or tooling) are welcome.
