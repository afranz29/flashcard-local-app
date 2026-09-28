import Dexie, { type EntityTable } from "dexie";

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  /** Optional, non-indexed — sets are filtered by folder client-side. */
  folderId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Card {
  id: string;
  setId: string;
  term: string;
  definition: string;
  /** Data URL. Optional, non-indexed — no version bump needed to add it. */
  termImage?: string;
  /** Data URL. Optional, non-indexed — no version bump needed to add it. */
  definitionImage?: string;
  /** Consecutive correct answers in Learn mode. Absent/0 = not mastered. Reset on a wrong answer. */
  masteryStreak?: number;
  /** Absent/false = not favorited. */
  favorite?: boolean;
  order: number;
  createdAt: number;
}

export const db = new Dexie("FlashcardDB") as Dexie & {
  sets: EntityTable<FlashcardSet, "id">;
  cards: EntityTable<Card, "id">;
  folders: EntityTable<Folder, "id">;
};

// Dexie's stores() string only declares INDEXED properties. Adding new
// non-indexed fields to the Card interface (like the image fields above)
// does not require bumping this version — only a new index would.
db.version(1).stores({
  sets: "id, title, updatedAt",
  cards: "id, setId, order",
});

// Brand-new object stores DO need a version bump (IndexedDB creates stores
// only during an upgrade transaction). sets/cards are unchanged from v1 and
// don't need to be re-listed — Dexie carries them forward automatically.
db.version(2).stores({
  folders: "id, name, updatedAt",
});

export function newId(): string {
  return crypto.randomUUID();
}
