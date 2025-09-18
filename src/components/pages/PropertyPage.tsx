// src/components/pages/PropertyPage.tsx
import Footer from "@/components/organisms/Footer";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getGuestProperty } from "@/services/guest.service";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building,
  Home,
  Building2,
  Filter,
  X,
} from "lucide-react";
import { Icon } from "@iconify/react";

interface PropertyImage {
  id: string;
  url: string;
  propertyId: string;
}

interface PropertyOwner {
  id: string;
  name: string;
  email: string;
}

interface PropertyAddress {
  id: string;
  lat: number;
  lon: number;
  streetName: string;
  buildingName: string;
  area: string;
  town: string;
  state: string;
  country: string;
}

interface Property {
  id: string;
  name: string;
  addressId: string;
  propertyType: string;
  numberOfRooms: number;
  furnished: boolean;
  size: number;
  price: number;
  description: string;
  confidenceScore: number;
  status: string;
  ownershipCertificateUrl: string;
  ownershipCertificateIv: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  images: PropertyImage[];
  owner: PropertyOwner;
  address: PropertyAddress;
}

const PropertyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Filter states
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    searchParams.get("type") || "",
  );
  const [searchLocation, setSearchLocation] = useState<string>(
    searchParams.get("location") || "",
  );
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [roomCount, setRoomCount] = useState<string>("");
  const [furnished, setFurnished] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const propertyTypes = [
    { type: "All", icon: Building },
    { type: "Condo", icon: Building },
    { type: "Apartment", icon: Building2 },
    { type: "Office", icon: Building },
    { type: "House", icon: Home },
    { type: "Penthouse", icon: Building2 },
  ];

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = [...properties];

    // Filter by property type
    if (selectedPropertyType && selectedPropertyType !== "All") {
      filtered = filtered.filter(
        (property) =>
          property.propertyType.toLowerCase() ===
          selectedPropertyType.toLowerCase(),
      );
    }

    // Filter by location
    if (searchLocation.trim()) {
      const locationSearch = searchLocation.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.address?.area?.toLowerCase().includes(locationSearch) ||
          property.address?.town?.toLowerCase().includes(locationSearch) ||
          property.address?.state?.toLowerCase().includes(locationSearch) ||
          property.address?.country?.toLowerCase().includes(locationSearch) ||
          property.name?.toLowerCase().includes(locationSearch),
      );
    }

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((property) => {
        const price = property.price || 0;
        const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
        const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Filter by room count
    if (roomCount) {
      filtered = filtered.filter(
        (property) => property.numberOfRooms >= parseInt(roomCount),
      );
    }

    // Filter by furnished status
    if (furnished === "furnished") {
      filtered = filtered.filter((property) => property.furnished === true);
    } else if (furnished === "unfurnished") {
      filtered = filtered.filter((property) => property.furnished === false);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [
    properties,
    selectedPropertyType,
    searchLocation,
    priceRange,
    roomCount,
    furnished,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getGuestProperty();
        console.log("API Response:", res); // Debug log

        if (res?.success) {
          // Validasi data sebelum set state
          const validProperties = Array.isArray(res.data) ? res.data : [];
          setProperties(validProperties);
        } else {
          setError(res?.message || "Failed to fetch properties");
          console.error("API Error:", res?.message);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType(type);
    const newSearchParams = new URLSearchParams(searchParams);
    if (type === "All") {
      newSearchParams.delete("type");
    } else {
      newSearchParams.set("type", type.toLowerCase());
    }
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setSelectedPropertyType("");
    setSearchLocation("");
    setPriceRange({ min: "", max: "" });
    setRoomCount("");
    setFurnished("");
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-background)]">
        <div className="text-center text-[var(--color-text)]">
          <Icon icon="eos-icons:loading" width="64" height="64" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[var(--color-background)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background)]">
      {/* Filter Section */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 border-b border-black/10">
        {/* Property Type Filters */}
        <div className="mb-6">
          <h2 className="text-xl font-normal mb-4">Property Type</h2>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            {propertyTypes.map(({ type, icon: Icon }) => (
              <button
                key={type}
                onClick={() => handlePropertyTypeClick(type)}
                className={`p-2 sm:p-3 border rounded-full inline-flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm flex-shrink-0 font-normal ${
                  selectedPropertyType === type ||
                  (type === "All" && !selectedPropertyType)
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-normal text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show More Filters"}
          </button>

          {(selectedPropertyType ||
            searchLocation ||
            priceRange.min ||
            priceRange.max ||
            roomCount ||
            furnished) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm font-normal text-red-500 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-2xl">
            {/* Location Search */}
            <div>
              <label className="block text-sm font-normal mb-2">Location</label>
              <input
                type="text"
                placeholder="Search location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm font-normal"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-normal mb-2">
                Price Range (MYR)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                  }
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm font-normal"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                  }
                  className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm font-normal"
                />
              </div>
            </div>

            {/* Room Count */}
            <div>
              <label className="block text-sm font-normal mb-2">
                Minimum Rooms
              </label>
              <select
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
                className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm font-normal"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Furnished */}
            <div>
              <label className="block text-sm font-normal mb-2">
                Furnished
              </label>
              <select
                value={furnished}
                onChange={(e) => setFurnished(e.target.value)}
                className="w-full p-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm font-normal"
              >
                <option value="">Any</option>
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4">
          <p className="text-sm font-normal text-gray-600">
            Showing {filteredProperties.length} properties
          </p>
        </div>
      </div>

      {/* List Property */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="border border-black/15 rounded-4xl p-4 flex flex-col gap-3 h-fit"
            >
              {/* Property Image */}
              <div className="mb-2">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0].url}
                    alt={property.name || "Property image"}
                    className="w-full h-32 object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 font-normal">No Image</span>
                  </div>
                )}
              </div>

              {/* Property Name */}
              <h2 className="text-lg font-normal">
                {property.name || "Unnamed Property"}
              </h2>

              {/* Description */}
              <p className="flex items-start text-xs text-black/50 font-normal">
                {property.description && property.description.length > 80
                  ? `${property.description.substring(0, 80)}...`
                  : property.description || "No description available"}
              </p>

              {/* Property Details - Condensed */}
              <div className="space-y-1">
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Type:</span> {property.propertyType || "N/A"}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Rooms:</span> {property.numberOfRooms || 0}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Furnished:</span> {property.furnished ? "Yes" : "No"}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Size:</span> {property.size || 0} M²
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Price:</span> {property.price || 0} MYR
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Score:</span> {property.confidenceScore || 0}
                </p>
              </div>

              {/* Address */}
              {property.address && (
                <div className="border-t border-black/10 pt-3">
                  <div className="flex items-start gap-2 text-base">
                    <MapPin
                      size={16}
                      className="text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                    />
                    <div className="text-xs text-gray-600 leading-relaxed font-normal">
                      <p>
                        {property.address.area || ""},{" "}
                        {property.address.town || ""}
                      </p>
                      <p>
                        {property.address.state || ""},{" "}
                        {property.address.country || ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-3 pt-2">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-center">
                  <Link
                    className="block text-sm font-normal"
                    to={"/auth/login"}
                  >
                    Rent Property Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[var(--color-text)] hover:bg-black/5"
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-[var(--color-primary)] text-white"
                        : "text-[var(--color-text)] hover:bg-black/5"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[var(--color-text)] hover:bg-black/5"
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, properties.length)}{" "}
              of {properties.length} properties
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-6 font-normal">
              No properties found matching your criteria
            </p>
            <button
              onClick={clearFilters}
              className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-normal"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PropertyPage;
