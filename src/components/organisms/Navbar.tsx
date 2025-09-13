import { LogIn } from "lucide-react";

const Navbar = () => {
  const navItems = [{ name: "Login", href: "/auth/login", icon: LogIn }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur border-b border-white/15">
      <div className="max-w-8xl px-5 xl:px-32">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="w-32" src="/navbar.png" alt="RENTVERSE" />
          </div>

          {/* Nav Items */}
          <div className="flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full px-8 py-4 text-sm font-medium transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
