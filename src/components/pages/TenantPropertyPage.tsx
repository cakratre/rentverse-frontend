import Footer from "@/components/organisms/Footer";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTenantProperty } from "@/services/tenant.service";
import {
  Home,
  MapPin,
  Building,
  Box,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

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

const propertyTypes = [
  { label: "Condo", icon: Home },
  { label: "Apartment", icon: Building },
  { label: "House", icon: Box },
  { label: "Pent House", icon: Building },
  { label: "Office", icon: Briefcase },
];

const TenantPropertyPage = () => {
  const [location, setLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [price, setPrice] = useState(5000);
  const [properties, setProperties] = useState<Property[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filter functions
  const filterByLocation = (
    property: Property,
    searchLocation: string,
  ): boolean => {
    if (!searchLocation) return true;

    const searchTerm = searchLocation.toLowerCase();
    const { area, town, state, country, streetName, buildingName } =
      property.address;

    return (
      area.toLowerCase().includes(searchTerm) ||
      town.toLowerCase().includes(searchTerm) ||
      state.toLowerCase().includes(searchTerm) ||
      country.toLowerCase().includes(searchTerm) ||
      streetName.toLowerCase().includes(searchTerm) ||
      buildingName.toLowerCase().includes(searchTerm)
    );
  };

  const filterByPropertyType = (
    property: Property,
    selectedType: string,
  ): boolean => {
    return !selectedType || property.propertyType === selectedType;
  };

  const filterByPrice = (property: Property, maxPrice: number): boolean => {
    return property.price <= maxPrice;
  };

  // Apply all filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      return (
        filterByLocation(property, location) &&
        filterByPropertyType(property, selectedPropertyType) &&
        filterByPrice(property, price)
      );
    });
  }, [properties, location, selectedPropertyType, price]);

  // Reset all filters
  const resetFilters = () => {
    setLocation("");
    setSelectedPropertyType("");
    setPrice(5000);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [location, selectedPropertyType, price]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await getTenantProperty();
      if (res.success) {
        setProperties(res.data);
      } else {
        console.error(res.message);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(selectedPropertyType === type ? "" : type);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[var(--color-background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <ul className="flex justify-center bg-transparent backdrop-blur p-6 border border-[var(--color-border)] gap-10">
          <li className="flex items-center gap-2">
            <Home className="w-5 h-5 text-[var(--color-text)]/75" />
            <Link className="text-[var(--color-text)]/75" to="/tenant/property">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Home className="w-5 h-5 text-[var(--color-text)]/75" />
            <Link
              className="text-[var(--color-text)]/75"
              to="/tenant/rental/history"
            >
              Rent History
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--color-text)]/75" />
            <Link className="text-[var(--color-text)]/75" to="/tenant/profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Header & Filtering */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16 min-h-screen bg-[url('/background/kitchen-white.png')] bg-cover bg-center">
        {/* Header */}
        <h1 className="pt-64 sm:pt-80 md:pt-96 lg:pt-[512px] mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] leading-tight">
          Want to Rent a{" "}
          <span className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
            Property?
          </span>
        </h1>

        {/* Filtering */}
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="rounded-full flex justify-between items-center p-fit h-fit w-full border border-black/15 text-[var(--color-text)] pl-3 sm:pl-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text)] flex-shrink-0" />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 sm:p-4 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:border-none bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Property Type */}
          <div>
            <h2 className="pb-2 text-sm sm:text-base text-[var(--color-text)]">
              Property Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 sm:gap-3">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedPropertyType === type.label;
                return (
                  <button
                    key={type.label}
                    onClick={() => handlePropertyTypeSelect(type.label)}
                    className={`flex items-center justify-center sm:justify-start gap-2 p-2 sm:p-3 border rounded-full text-xs sm:text-sm transition-colors ${
                      isSelected
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                        : "border-[var(--color-border)] text-[var(--color-text)] hover:bg-black/5"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <h2 className="pb-1 text-sm sm:text-base text-[var(--color-text)]">
              Price Range (MYR)
            </h2>
            <input
              type="range"
              min={0}
              max={10000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-[var(--color-border)] accent-[var(--color-text)] cursor-pointer"
            />

            {/* Label value */}
            <div className="flex justify-between mt-1 text-xs text-[var(--color-text)]">
              <span>MYR 0</span>
              <span className="font-medium">MYR {price.toLocaleString()}</span>
              <span>MYR 10,000</span>
            </div>
          </div>

          {/* Filter Results Summary */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-black/10">
            <div className="flex justify-between items-center">
              <p className="text-xs sm:text-sm text-[var(--color-text)]">
                Found{" "}
                <span className="font-semibold">
                  {filteredProperties.length}
                </span>{" "}
                properties
                {selectedPropertyType && ` • Type: ${selectedPropertyType}`}
                {location && ` • Location: ${location}`}
                {price < 10000 && ` • Max Price: MYR ${price.toLocaleString()}`}
              </p>
              {(location || selectedPropertyType || price < 10000) && (
                <button
                  onClick={resetFilters}
                  className="text-xs sm:text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* List Owner Property */}
      <div className="px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="border border-black/15 rounded-4xl p-4 flex flex-col gap-3 h-fit"
            >
              {/* Property Image */}
              <div className="mb-2">
                {property.images.length > 0 && (
                  <img
                    src={property.images[0].url}
                    alt={`${property.name}`}
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                )}
              </div>

              {/* Property Name */}
              <h2 className="text-lg">{property.name}</h2>

              {/* Property Status */}
              {/*<p
                className={`flex items-center gap-3 text-sm ${
                  property.status === "Available"
                    ? "text-green-500"
                    : property.status === "Unavailable"
                      ? "text-red-500"
                      : property.status === "Pending"
                        ? "text-yellow-500"
                        : ""
                }`}
              >
                {property.status}
              </p>*/}

              {/* Description */}
              <p className="flex items-start text-xs text-black/50">
                {property.description.length > 80
                  ? `${property.description.substring(0, 80)}...`
                  : property.description}
              </p>

              {/* Property Details - Condensed */}
              <div className="space-y-1">
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Type:</span> {property.propertyType}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Rooms:</span> {property.numberOfRooms}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Furnished:</span> {property.furnished ? "Yes" : "No"}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Size:</span> {property.size} M²
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Price:</span> {property.price} MYR
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50">
                  <span>Score:</span> {property.confidenceScore}
                </p>
              </div>

              {/* Address */}
              <div className="border-t border-black/10 pt-3">
                <div className="flex items-start gap-2 text-base">
                  <MapPin
                    size={16}
                    className="text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  />
                  <div className="text-xs text-gray-600 leading-relaxed">
                    <p>
                      {property.address.area}, {property.address.town}
                    </p>
                    <p>
                      {property.address.state}, {property.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-2">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-center">
                  <Link
                    className="block text-sm"
                    to={`/tenant/property/${property.id}`}
                  >
                    View Details
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
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredProperties.length)} of{" "}
              {filteredProperties.length} properties
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && properties.length > 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-6">
              No properties match your filters
            </p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-8 py-4 rounded-full text-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {filteredProperties.length === 0 && properties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-6">
              No properties listed yet
            </p>
            <Link
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-8 py-4 rounded-full text-lg"
              to="/owner/property/create"
            >
              List Your First Property
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TenantPropertyPage;
