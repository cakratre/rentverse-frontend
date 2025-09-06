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
      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-lg"
      : "border border-black/15 text-[var(--color-text)]/75 hover:shadow-lg";

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses}`}>
      {Icon && <Icon className="w-5 h-5" />}
      {text}
    </Link>
  );
};

export default Button;
