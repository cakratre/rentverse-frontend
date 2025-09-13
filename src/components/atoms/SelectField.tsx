import type { ReactNode } from "react";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  hint?: ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Pilih...",
  hint,
}) => {
  return (
    <div>
      {/* Label */}
      <label htmlFor={id} className="block mb-1 ml-5">
        {label}
      </label>
      {/* Select Container */}
      <div className="flex items-center gap-3 border border-[var(--color-border)] px-5 rounded-2xl">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="p-5 w-full bg-transparent outline-none focus:ring-0 rounded-full text-[var(--color-text)]/50"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm mt-1 ml-5 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default SelectField;
