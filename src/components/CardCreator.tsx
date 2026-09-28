import { useRef, useState } from "react";
import { CardFieldsEditor } from "./CardFieldsEditor";

export interface NewCardFields {
  term: string;
  definition: string;
  termImage?: string;
  definitionImage?: string;
}

export function CardCreator({ onCreate }: { onCreate: (fields: NewCardFields) => void }) {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [termImage, setTermImage] = useState<string | undefined>();
  const [definitionImage, setDefinitionImage] = useState<string | undefined>();
  const [resetKey, setResetKey] = useState(0);
  const termRef = useRef<HTMLTextAreaElement>(null);

  function handleCreate() {
    if (!term.trim()) {
      termRef.current?.focus();
      return;
    }
    onCreate({ term, definition, termImage, definitionImage });
    setTerm("");
    setDefinition("");
    setTermImage(undefined);
    setDefinitionImage(undefined);
    setResetKey((k) => k + 1);
    termRef.current?.focus();
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold mb-3">Create a card</h2>
      <CardFieldsEditor
        term={term}
        definition={definition}
        termImage={termImage}
        definitionImage={definitionImage}
        onTermChange={setTerm}
        onDefinitionChange={setDefinition}
        onTermImageChange={setTermImage}
        onDefinitionImageChange={setDefinitionImage}
        resetKey={resetKey}
        termRef={termRef}
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600"
        >
          + Create Card
        </button>
      </div>
    </div>
  );
}
