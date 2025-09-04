import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

const testimonials = [
    {
        name: "Yogawan",
        role: "CEO of House of Ovee",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ullam commodi porro repudiandae quasi",
        profile: "./profile.png",
        company: "./company.png",
    },
    {
        name: "Aditya",
        role: "CTO of TechStart",
        content:
            "Doloribus rerum reiciendis numquam deleniti itaque, repellendus suscipit quisquam maiores.",
        profile: "./profile.png",
        company: "./company.png",
    },
    {
        name: "Pratama",
        role: "Founder of CreativeLabs",
        content:
            "Repellat voluptas beatae doloremque asperiores sequi nisi nemo magni accusantium.",
        profile: "./profile.png",
        company: "./company.png",
    },
    {
        name: "Yogawan",
        role: "CEO of House of Ovee",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ullam commodi porro repudiandae quasi",
        profile: "./profile.png",
        company: "./company.png",
    },
    {
        name: "Aditya",
        role: "CTO of TechStart",
        content:
            "Doloribus rerum reiciendis numquam deleniti itaque, repellendus suscipit quisquam maiores.",
        profile: "./profile.png",
        company: "./company.png",
    },
    {
        name: "Pratama",
        role: "Founder of CreativeLabs",
        content:
            "Repellat voluptas beatae doloremque asperiores sequi nisi nemo magni accusantium.",
        profile: "./profile.png",
        company: "./company.png",
    },
];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 350 : 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 relative">
      {/* Header + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl">OUR REVIEWER</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Client
            </span>{" "}
            Say
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 self-start sm:self-auto">
          <button
            onClick={() => scroll("left")}
            className="p-3 sm:p-4 md:p-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow hover:scale-110 transition"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 sm:p-4 md:p-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow hover:scale-110 transition"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* List Rendering with Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10 overflow-x-auto scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] p-6 sm:p-8 md:p-10 border border-black/15 rounded-2xl sm:rounded-3xl flex flex-col gap-4 sm:gap-5"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <img
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                src={item.profile}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23e5e7eb"/><text x="50" y="55" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280">${item.name.charAt(0)}</text></svg>`;
                }}
              />
              <div className="p-3 sm:p-4 md:p-5 border border-black/15 rounded-xl sm:rounded-2xl">
                <img 
                  className="w-12 sm:w-14 md:w-16 h-auto" 
                  src={item.company} 
                  alt={item.role}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32"><rect width="64" height="32" fill="%23f3f4f6" stroke="%23d1d5db"/><text x="32" y="20" text-anchor="middle" font-family="Arial" font-size="8" fill="%236b7280">LOGO</text></svg>`;
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">"</h1>
              <h1 className="text-[var(--color-text)]/50 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
                {item.content}
              </h1>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 md:mt-10 pl-6 sm:pl-8 md:pl-10 border-l-2 border-black/15">
              <p className="text-sm sm:text-base font-medium">{item.name}</p>
              <p className="text-sm sm:text-base text-gray-600">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;