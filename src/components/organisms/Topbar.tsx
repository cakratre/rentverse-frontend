import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";

interface TopbarProps {
  routeHome: string;
  routeProfile: string;
}

const Topbar: React.FC<TopbarProps> = ({ routeHome, routeProfile }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <ul className="flex justify-center bg-transparent backdrop-blur p-6 border border-[var(--color-border)] gap-10">
        <li className="flex items-center gap-2">
          <Home className="w-5 h-5 text-[var(--color-text)]/75" />
          <Link className="text-[var(--color-text)]/75" to={routeHome}>
            Home
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <User className="w-5 h-5 text-[var(--color-text)]/75" />
          <Link className="text-[var(--color-text)]/75" to={routeProfile}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
