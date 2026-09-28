# Flashcards

A local-only flashcard app, similar to Quizlet, that runs entirely in your browser. No
account, no server — everything is stored in your browser's IndexedDB.

## Features

- **Sets & folders** — organize flashcard sets into flat folders (drag-and-drop or the
  folder dropdown), or leave them unfiled.
- **Markdown cards** — term and definition fields support Markdown (bold, italics,
  lists, headers, code, etc.), plus an optional image per side.
- **Browse view** — a flip-card viewer with prev/next arrows, and a full read-only list
  of every card in the set below it.
- **Study mode** — flip through cards at your own pace, sorting them into "know it" /
  "still learning" as you go.
- **Learn mode** — a Quizlet-style quiz: multiple choice and/or True/False questions,
  with a configurable direction (term→definition, definition→term, or randomized).
  Three correct answers in a row masters a card; a wrong answer resets its streak.
  Mastery persists per card across sessions.
- **Favorites** — mark individual cards as favorites.
- **Import/export** — paste-import (Quizlet-style, with configurable delimiters),
  export/import a whole library or a single set as JSON (preserves images, mastery,
  and folders), and export a set to CSV.
- **Dark mode** — light/dark/system theme toggle.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

## Building

```bash
npm run build
```

Outputs a static site to `dist/`, which you can host anywhere (or just open locally) —
no backend required.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Dexie (IndexedDB) for storage
- react-router-dom
- react-markdown (sanitized) for card rendering

## Data & privacy

All data lives in your browser's IndexedDB, scoped to whichever browser you're using —
it does not sync between browsers or devices. Use the library export/import feature to
move your data between browsers or back it up.
