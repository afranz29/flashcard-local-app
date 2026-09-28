import { useState } from "react";
import { CardFieldsEditor } from "./CardFieldsEditor";
import { CardFieldsReadout, FavoriteButton, MasteryRing } from "./CardReadout";
import type { Card } from "../lib/db";

export function CardListItem({
  index,
  card,
  onChange,
  onDelete,
}: {
  index: number;
  card: Card;
  onChange: (fields: Partial<Card>) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [term, setTerm] = useState(card.term);
  const [definition, setDefinition] = useState(card.definition);
  const [termImage, setTermImage] = useState(card.termImage);
  const [definitionImage, setDefinitionImage] = useState(card.definitionImage);

  function startEdit() {
    setTerm(card.term);
    setDefinition(card.definition);
    setTermImage(card.termImage);
    setDefinitionImage(card.definitionImage);
    setEditing(true);
  }

  function save() {
    onChange({ term, definition, termImage, definitionImage });
    setEditing(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex gap-3">
      <FavoriteButton
        favorite={card.favorite ?? false}
        onToggle={() => onChange({ favorite: !card.favorite })}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-xs font-medium text-gray-400">
            Card {index + 1}
            <MasteryRing streak={card.masteryStreak ?? 0} />
          </span>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={save}
                  className="text-xs text-sky-500 dark:text-sky-400 hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={startEdit}
                className="text-xs text-sky-500 dark:text-sky-400 hover:underline"
              >
                Edit
              </button>
            )}
            <button
              onClick={onDelete}
              className="text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        {editing ? (
          <CardFieldsEditor
            term={term}
            definition={definition}
            termImage={termImage}
            definitionImage={definitionImage}
            onTermChange={setTerm}
            onDefinitionChange={setDefinition}
            onTermImageChange={setTermImage}
            onDefinitionImageChange={setDefinitionImage}
            resetKey={0}
          />
        ) : (
          <CardFieldsReadout card={card} />
        )}
      </div>
    </div>
  );
}
