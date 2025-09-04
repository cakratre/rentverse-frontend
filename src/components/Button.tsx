import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  text: string;
  to?: string;
  icon?: LucideIcon;
  variant?: "elevated" | "outline"; // hanya dua varian
}

const Button = ({
  text,
  to = "/target-page",
  icon: Icon,
  variant = "elevated",
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center gap-2 px-16 py-6 rounded-full font-semibold transition";

  const variantClasses =
    variant === "elevated"
      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-lg hover:opacity-90"
      : "border border-black/15 text-gray-800 hover:bg-gray-100";

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses}`}>
      {Icon && <Icon className="w-5 h-5" />}
      {text}
    </Link>
  );
};

export default Button;
