import { Markdown } from "./Markdown";
import type { Card } from "../lib/db";

const MASTERY_TARGET = 3;

export function FavoriteButton({
  favorite,
  onToggle,
}: {
  favorite: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
      className="flex items-start justify-center w-10 shrink-0 pt-1"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-6 h-6 transition-colors ${
          favorite
            ? "text-amber-400"
            : "text-gray-300 dark:text-gray-700 hover:text-amber-300 dark:hover:text-amber-500"
        }`}
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={favorite ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2.75l2.897 5.87 6.478.942-4.688 4.57 1.107 6.454L12 17.75l-5.794 3.046 1.107-6.454-4.688-4.57 6.478-.942L12 2.75z"
        />
      </svg>
    </button>
  );
}

export function MasteryRing({ streak }: { streak: number }) {
  const mastered = streak >= MASTERY_TARGET;
  const pct = Math.min(streak / MASTERY_TARGET, 1);
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div
      className="relative w-5 h-5 shrink-0"
      title={mastered ? "Mastered" : `${streak}/${MASTERY_TARGET} correct in a row`}
    >
      <svg viewBox="0 0 20 20" className="w-5 h-5 -rotate-90">
        <circle
          cx="10"
          cy="10"
          r={radius}
          fill="none"
          strokeWidth="2.5"
          className="stroke-gray-200 dark:stroke-gray-700"
        />
        {!mastered && streak > 0 && (
          <circle
            cx="10"
            cy="10"
            r={radius}
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="stroke-sky-500"
          />
        )}
        {mastered && (
          <circle
            cx="10"
            cy="10"
            r={radius}
            fill="none"
            strokeWidth="2.5"
            className="stroke-green-500"
          />
        )}
      </svg>
      {mastered && (
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 8-8" />
        </svg>
      )}
    </div>
  );
}

export function CardFieldsReadout({ card }: { card: Card }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div>
        <p className="text-xs text-gray-400 mb-1">Term</p>
        {card.termImage && (
          <img
            src={card.termImage}
            alt="Term attachment"
            className="max-h-24 rounded-lg border border-gray-200 dark:border-gray-800 object-contain mb-2"
          />
        )}
        <Markdown text={card.term || "*empty*"} />
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-1">Definition</p>
        {card.definitionImage && (
          <img
            src={card.definitionImage}
            alt="Definition attachment"
            className="max-h-24 rounded-lg border border-gray-200 dark:border-gray-800 object-contain mb-2"
          />
        )}
        <Markdown text={card.definition || "*empty*"} />
      </div>
    </div>
  );
}
