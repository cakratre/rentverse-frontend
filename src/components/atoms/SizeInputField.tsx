import { useState, useEffect } from "react";

interface SizeInputFieldProps {
  id: string;
  label: string;
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  unit?: string;
}

const SizeInputField: React.FC<SizeInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  unit = "m²",
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
          className="p-5 w-full outline-none focus:ring-0 bg-transparent text-[var(--color-text)]/50"
        />
        <span className="pr-5 text-[var(--color-text)]/50">{unit}</span>
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm mt-1 ml-5 text-[var(--color-text)]/50">{hint}</p>
      )}
    </div>
  );
};

export default SizeInputField;
