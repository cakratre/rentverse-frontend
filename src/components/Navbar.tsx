import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">RENTVERSE</h1>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex space-x-8">
            <a href="#feature" className="text-gray-700 hover:text-blue-600">
              Feature
            </a>
            <a href="#testimonial" className="text-gray-700 hover:text-blue-600">
              Testimonial
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600">
              FAQ
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
