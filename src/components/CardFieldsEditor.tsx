import { type RefObject } from "react";

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  image?: string;
  onImageChange: (dataUrl: string | undefined) => void;
  resetKey: number;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}

function Field({ label, value, onChange, image, onImageChange, resetKey, textareaRef }: FieldProps) {
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      // Soft warning only — still proceed. Keep this lightweight.
      console.warn(`${label} image is larger than 2MB; it will be stored inline.`);
    }
    onImageChange(await fileToDataUrl(file));
  }

  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent p-2 text-sm font-mono outline-none"
      />
      {image && (
        <div className="mt-2 flex items-center gap-2">
          <img
            src={image}
            alt={`${label} attachment`}
            className="max-h-24 rounded-lg border border-gray-200 dark:border-gray-800 object-contain"
          />
          <button
            type="button"
            onClick={() => onImageChange(undefined)}
            className="text-xs text-red-600 dark:text-red-400 hover:underline"
          >
            Remove image
          </button>
        </div>
      )}
      <input
        key={resetKey}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mt-2 block w-full text-xs file:mr-2 file:rounded-lg file:border file:border-gray-300 dark:file:border-gray-700 file:bg-white dark:file:bg-gray-900 file:px-2 file:py-1 file:text-xs"
      />
    </div>
  );
}

export interface CardFieldsEditorProps {
  term: string;
  definition: string;
  termImage?: string;
  definitionImage?: string;
  onTermChange: (value: string) => void;
  onDefinitionChange: (value: string) => void;
  onTermImageChange: (dataUrl: string | undefined) => void;
  onDefinitionImageChange: (dataUrl: string | undefined) => void;
  /** Bump this to force the file inputs to remount and clear their selection. */
  resetKey: number;
  termRef?: RefObject<HTMLTextAreaElement | null>;
}

export function CardFieldsEditor({
  term,
  definition,
  termImage,
  definitionImage,
  onTermChange,
  onDefinitionChange,
  onTermImageChange,
  onDefinitionImageChange,
  resetKey,
  termRef,
}: CardFieldsEditorProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Field
        label="Term"
        value={term}
        onChange={onTermChange}
        image={termImage}
        onImageChange={onTermImageChange}
        resetKey={resetKey}
        textareaRef={termRef}
      />
      <Field
        label="Definition"
        value={definition}
        onChange={onDefinitionChange}
        image={definitionImage}
        onImageChange={onDefinitionImageChange}
        resetKey={resetKey}
      />
    </div>
  );
}
