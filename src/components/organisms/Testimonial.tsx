import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Ridha",
      role: "Family Traveler",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ullam commodi porro repudiandae quasi.",
      profile: "./profile.png",
      company: "https://static.cdnlogo.com/logos/m/59/meta.svg",
    },
    {
      name: "Yogawan",
      role: "Solo Traveler",
      content:
        "Doloribus rerum reiciendis numquam deleniti itaque, repellendus suscipit quisquam maiores.",
      profile: "./profile.png",
      company:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    },
    {
      name: "Alif",
      role: "Expat Professional",
      content:
        "Repellat voluptas beatae doloremque asperiores sequi nisi nemo magni accusantium.",
      profile: "./profile.png",
      company:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png",
    },
    {
      name: "Joko Supriyanto",
      role: "Corporate Guest",
      content:
        "Sapiente, dolores numquam. Ratione quos doloremque voluptatibus officiis!",
      profile: "./profile.png",
      company:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png",
    },
    {
      name: "Agil Ghani Istikmal",
      role: "Student Tenant",
      content:
        "Quibusdam asperiores delectus quaerat laboriosam, pariatur vitae minima.",
      profile: "./profile.png",
      company: "./company.png",
    },
    {
      name: "Sultan Akmal Ghiffari",
      role: "Event Group Organizer",
      content:
        "Tempora amet explicabo voluptas impedit error deleniti perferendis.",
      profile: "./profile.png",
      company: "./company.png",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount =
        window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 350 : 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border-t border-black/15 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 relative">
      {/* Header & Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
        {/* Header */}
        <div>
          <p className="text-xs p-3 text-black/50 border border-black/15 w-fit rounded-full">
            Client Testimonials
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Hear From Our Happy{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Clients
            </span>
          </h1>
          <p className="mt-4 text-black/50 text-sm sm:text-base leading-relaxed">
            Discover what our partners and clients say about our rental property
            services.
          </p>
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
      {/* List Card */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10 overflow-x-auto scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] p-6 sm:p-8 md:p-10 bg-[var(--color-background)] backdrop-blur-sm border border-black/10 rounded-3xl sm:rounded-[2rem] flex flex-col gap-2 hover:border-black/20 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <img
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-black/5"
                  src={item.profile}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23e5e7eb"/><text x="50" y="55" text-anchor="middle" font-family="Arial" font-size="14" fill="%236b7280">${item.name.charAt(0)}</text></svg>`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="p-3 sm:p-4 md:p-5 bg-gray-50/50 border border-black/5 rounded-2xl sm:rounded-3xl">
                <img
                  className="w-12 sm:w-14 md:w-16 h-auto opacity-70"
                  src={item.company}
                  alt={item.role}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32"><rect width="64" height="32" fill="%23f3f4f6" stroke="%23d1d5db"/><text x="32" y="20" text-anchor="middle" font-family="Arial" font-size="8" fill="%236b7280">LOGO</text></svg>`;
                  }}
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 my-6 sm:my-8 md:my-10">
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 w-8 h-8 text-black/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <p className="text-[var(--color-text)]/60 text-base sm:text-lg leading-relaxed pl-6 italic">
                  {item.content}
                </p>
              </div>
            </div>
            {/* Footer */}
            <div className="pt-4 border-t border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"></div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-black/80">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm text-black/50 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
