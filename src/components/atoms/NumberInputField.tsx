import type { ReactNode } from "react";
import { useState, useEffect } from "react";

interface NumberInputFieldProps {
  id: string;
  label: string;
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    value === 0 ? "" : value.toString(),
  );

  useEffect(() => {
    setInputValue(value === 0 ? "" : value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: val === "" ? 0 : Number(val),
      },
    } as any);
  };

  return (
    <div>
      {/* Label */}
      <label htmlFor={id} className="block mb-1 ml-5">
        {label}
      </label>
      {/* Input Container */}
      <div className="flex items-center border border-[var(--color-border)] rounded-2xl pl-5">
        <input
          type="number"
          id={id}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="p-5 w-full outline-none focus:ring-0 rounded-r-full bg-transparent text-[var(--color-text)]/50"
        />
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm mt-1 ml-5 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default NumberInputField;
