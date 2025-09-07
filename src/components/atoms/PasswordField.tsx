import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  validationMessage?: string;
  isValid?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  validationMessage,
  isValid,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {/* Label */}
      <label htmlFor={id} className="block mb-1 ml-5">
        {label}
      </label>
      {/* Input Container */}
      <div className="flex items-center gap-3 border border-[var(--color-border)] pl-5 rounded-full relative">
        <Lock className="text-gray-500" size={18} />
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-5 w-full outline-none focus:ring-0 rounded-r-full text-[var(--color-text)]/50"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {/* Hint */}
      {hint && (
        <p className="text-sm mt-1 ml-5 text-[var(--color-text)]/50">{hint}</p>
      )}
      {/* Validation Message */}
      {validationMessage && (
        <p
          className={`text-sm mt-1 ml-5 ${
            isValid === undefined
              ? "text-gray-500"
              : isValid
                ? "text-green-600"
                : "text-red-600"
          }`}
        >
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
