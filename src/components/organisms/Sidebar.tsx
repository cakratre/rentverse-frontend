import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItem {
  href: string;
  icon: React.ElementType;
  label?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  header?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ items, className, header }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed min-h-screen border-r border-black/15 bg-transparent ${className}`}
    >
      {header && <div className="p-5">{header}</div>}

      <div className="flex flex-col p-5 mt-10 gap-10 xl:gap-12">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 transition-colors ${
                isActive
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text)]/50 hover:text-[var(--color-text)]"
              }`}
            >
              <Icon className="w-6 h-6" />
              {item.label && (
                <span className="hidden xl:inline">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
