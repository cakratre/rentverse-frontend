// src/components/organisms/Hero.tsx
import { Building, Home, Building2, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const navigate = useNavigate();

  const propertyTypes = [
    { type: "Condo", icon: Building },
    { type: "Apartment", icon: Building2 },
    { type: "Office", icon: Building },
    { type: "House", icon: Home },
    { type: "Penthouse", icon: Building2 },
  ];

  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType(type);
    navigate(`/property?type=${type.toLowerCase()}`);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (selectedPropertyType) {
      searchParams.set('type', selectedPropertyType.toLowerCase());
    }
    if (searchLocation.trim()) {
      searchParams.set('location', searchLocation.trim());
    }
    navigate(`/property?${searchParams.toString()}`);
  };

  return (
    <div className="pt-20 flex justify-start items-end px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 min-h-screen bg-[url('/background/kitchen-white.png')] bg-cover bg-center relative">
      {/* Hero Content */}
      <div className="z-10 pb-16 pt-16 sm:pt-48 md:pt-56 lg:pt-64 flex flex-col items-center w-full gap-5">
        {/* Headline */}
        <h1 className="text-[var(--color-text)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl text-center leading-none font-normal">
          Easy Rentals <br /> Peaceful Living
        </h1>

        {/* Sub Headline */}
        <p className="text-[var(--color-text)]/50 text-sm sm:text-base md:text-lg text-center sm:max-w-md md:max-w-lg lg:max-w-5xl px-2 font-normal">
          Finding the right place to live shouldn't be stressful. With our
          platform, you can explore a wide range of properties — from modern
          apartments to spacious family homes — all designed to fit your
          lifestyle and budget.
        </p>

        {/* Filtering */}
        <div className="flex flex-col items-center w-full">
          {/* Button Filtering */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap justify-start sm:justify-center w-full px-2 scrollbar-hide pb-2">
            {propertyTypes.map(({ type, icon: Icon }) => (
              <button
                key={type}
                onClick={() => handlePropertyTypeClick(type)}
                className={`p-2 sm:p-3 border rounded-full inline-flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm flex-shrink-0 font-normal ${
                  selectedPropertyType === type
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Search Property */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          {/* Input Search */}
          <div className="w-full flex items-center border border-[var(--color-border)] rounded-full pl-5">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by location"
              aria-label="Search by location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="text-[var(--color-text)]/50 p-5 rounded-full focus:outline-none font-normal w-full"
            />
          </div>

          {/* Button Search */}
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full p-5 sm:p-5 flex items-center justify-center gap-2 hover:shadow-lg transition-shadow whitespace-nowrap text-sm sm:text-base flex-shrink-0 font-normal"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline sm:inline">Search Property</span>
            <span className="inline xs:hidden sm:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
