import type { ReactNode } from "react";

interface CheckboxFieldProps {
  id: string;
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: ReactNode;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  value,
  onChange,
  hint,
}) => {
  return (
    <div className="flex flex-col pl-3">
      {/* Label */}
      <label
        htmlFor={id}
        className="inline-flex items-center gap-3 cursor-pointer"
      >
        {/* Input Field */}
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={onChange}
          className="w-5 h-5 text-blue-600 border border-[var(--color-border)] rounded-full focus:ring-0"
        />
        <span className="text-[var(--color-text)]">{label}</span>
      </label>
      {/* Hint */}
      {hint && (
        <p className="text-sm ml-8 mt-1 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default CheckboxField;
