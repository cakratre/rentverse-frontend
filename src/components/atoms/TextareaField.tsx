import type { ReactNode } from "react";

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  hint?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
}) => {
  return (
    <div>
      {/* Label */}
      <label htmlFor={id} className="block mb-1 ml-5">
        {label}
      </label>
      {/* Textarea Container */}
      <div className="flex items-center border border-[var(--color-border)] rounded-3xl pl-5">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-5 w-full outline-none focus:ring-0 resize-none bg-transparent text-[var(--color-text)]/50 rounded-r-xl"
          rows={5}
        />
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm mt-1 ml-5 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default TextareaField;
