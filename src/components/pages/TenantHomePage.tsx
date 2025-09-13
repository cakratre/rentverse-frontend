import { Home, Building, Box, Briefcase, MapPin } from "lucide-react";
import Footer from "@/components/organisms/Footer";
import { useState } from "react";
import Topbar from "../organisms/Topbar";

const propertyTypes = [
  { label: "Condo", icon: Home },
  { label: "Apartment", icon: Building },
  { label: "House", icon: Box },
  { label: "Pent House", icon: Building },
  { label: "Office", icon: Briefcase },
];

const TenantHomePage = () => {
  const [location, setLocation] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [price, setPrice] = useState(5000000);
  const [rooms, setRooms] = useState(1);
  const [size, setSize] = useState(50);
  const [isFurnished, setIsFurnished] = useState(false);

  const handleChange = () => setIsFurnished((prev) => !prev);

  const sizeIncrement = () => setSize((prev) => prev + 1);
  const sizeDecrement = () => setSize((prev) => (prev > 0 ? prev - 1 : 0));

  const roomIncrement = () => setRooms((prev) => prev + 1);
  const roomDecrement = () => setRooms((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div>
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16 min-h-screen bg-[url('/background/kitchen-white.png')] bg-cover bg-center">
        {/* Header */}
        <h1 className="pt-64 sm:pt-80 md:pt-96 lg:pt-[512px] mb-3 sm:mb-4 md:mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] leading-tight">
          Want to Rent a{" "}
          <span className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
            Property?
          </span>
        </h1>

        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          {/* Location */}
          <div className="rounded-full flex justify-between items-center p-fit h-fit w-full border border-black/15 text-[var(--color-text)] pl-3 sm:pl-5">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-text)] flex-shrink-0" />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-4 sm:p-5 md:p-6 lg:p-7 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:border-none bg-transparent"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Property Type */}
          <div>
            <h2 className="pb-2 sm:pb-3 text-base sm:text-lg text-[var(--color-text)]">
              Property Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3 sm:gap-4 lg:gap-5">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.label}
                    className="flex items-center justify-center sm:justify-start gap-2 p-3 sm:p-4 lg:p-5 border border-[var(--color-border)] rounded-full text-sm sm:text-base text-[var(--color-text)] hover:bg-black/5 transition-colors"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="pb-2 sm:pb-3 text-base sm:text-lg text-[var(--color-text)]">
              Price Range
            </h2>
            <input
              type="range"
              min={1000000}
              max={20000000}
              step={1000000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 sm:h-3 rounded-full bg-[var(--color-border)] accent-[var(--color-text)] cursor-pointer"
            />

            {/* Label value */}
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-[var(--color-text)]">
              <span>IDR 1,000,000</span>
              <span className="font-medium">IDR {price.toLocaleString()}</span>
              <span>IDR 20,000,000</span>
            </div>
          </div>

          {/* Number of Room and Size - Combined on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Number of Room */}
            <div>
              <h2 className="pb-2 sm:pb-3 text-base sm:text-lg text-[var(--color-text)]">
                Number of Room
              </h2>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={roomDecrement}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:bg-black/5 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 sm:w-20 text-center border border-[var(--color-border)] rounded px-2 py-2 sm:py-3 text-sm sm:text-base text-[var(--color-text)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  min={0}
                />
                <button
                  onClick={roomIncrement}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:bg-black/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size */}
            <div>
              <h2 className="pb-2 sm:pb-3 text-base sm:text-lg text-[var(--color-text)]">
                Size
              </h2>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={sizeDecrement}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:bg-black/5 transition-colors"
                >
                  -
                </button>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <input
                    type="number"
                    className="w-16 sm:w-20 text-center border border-[var(--color-border)] rounded px-2 py-2 sm:py-3 text-sm sm:text-base text-[var(--color-text)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    min={0}
                  />
                  <span className="text-sm sm:text-base text-[var(--color-text)]">
                    m²
                  </span>
                </div>
                <button
                  onClick={sizeIncrement}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:bg-black/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Furnished */}
          <label className="flex items-center space-x-3 sm:space-x-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isFurnished}
              onChange={handleChange}
              className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text)] border border-[var(--color-border)] rounded focus:ring-2 focus:ring-[var(--color-primary)] accent-[var(--color-primary)]"
            />
            <span className="text-base sm:text-lg text-[var(--color-text)]">
              Furnished
            </span>
          </label>
        </div>
      </div>
      <Topbar routeHome="/tenant" routeProfile="/tenant/profile" />
      <Footer />
    </div>
  );
};

export default TenantHomePage;
