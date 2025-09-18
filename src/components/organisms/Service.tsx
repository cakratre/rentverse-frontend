import { useRef } from "react";
import { Home, Building } from "lucide-react";

const Service = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Sewa Property",
      description:
        "Temukan properti impian Anda dengan mudah. Kami menyediakan berbagai pilihan properti berkualitas dengan harga terjangkau dan lokasi strategis.",
      icon: <Home />,
      features: [
        "Lokasi Strategis",
        "Harga Terjangkau",
        "Kualitas Terjamin",
        "Proses Mudah",
      ],
      category: "RENTAL",
    },
    {
      title: "Listing Property",
      description:
        "Tawarkan properti Anda untuk disewa dengan mudah. Kami membantu Anda mengelola dan memasarkan properti dengan sistem yang terpercaya.",
      icon: <Building />,
      features: [
        "Sistem Terpercaya",
        "Marketing Optimal",
        "Pengelolaan Mudah",
        "Support 24/7",
      ],
      category: "LISTING",
    },
  ];

  return (
    <div className="border-t border-[var(--color-border)] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      {/* Header */}
      <div>
        <p className="text-xs p-3 text-black/50 border border-black/15 w-fit rounded-full">
          Company Service
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <p className="mt-4 text-black/50 text-sm sm:text-base leading-relaxed">
          Discover what our partners and clients say about our rental property
          services.
        </p>
      </div>

      {/* List Card */}
      <div
        ref={scrollRef}
        className="flex gap-4 mt-6 sm:mt-8 overflow-x-auto scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {services.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] p-6 bg-transparent border border-black/10 rounded-4xl flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                {item.icon}
              </div>
              <span className="text-xs text-black/50 font-medium">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl sm:text-2xl font-normal text-color-text">
              {item.title}
            </h3>
            <p className="text-sm text-black/50">{item.description}</p>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {item.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs text-black/50">{feature}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <button className="mt-4 p-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
              {index === 0 ? "Cari Property" : "Daftarkan Property"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
