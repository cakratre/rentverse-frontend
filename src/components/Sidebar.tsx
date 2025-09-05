import { 
  LayoutDashboard, CircleUser, UsersRound 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { href: "/admin", icon: LayoutDashboard },
  { href: "/admin/manage-user", icon: UsersRound },
  { href: "/admin/profile", icon: CircleUser },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed min-h-screen border-r border-black/15 bg-transparent">
      <div className="flex flex-col p-5 mt-10 gap-10 xl:gap-12">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={index}
              to={item.href} // 👈 ganti `href` → `to`
              className={`${
                isActive ? "text-[var(--color-text)]" : "text-[var(--color-text)]/50 hover:text-[var(--color-text)]"
              }`}
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
