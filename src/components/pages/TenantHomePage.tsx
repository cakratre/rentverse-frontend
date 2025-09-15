import {  } from "lucide-react";
import Footer from "@/components/organisms/Footer";
import { useState, useEffect, useMemo } from "react";
import Topbar from "@/components/organisms/Topbar";
import { Link } from "react-router-dom";
import { getTenantProperty } from "@/services/tenant.service";
import {
  Home,
  DoorOpen,
  Sofa,
  Ruler,
  DollarSign,
  Info,
  MapPin,
  CheckCircle,
  XCircle,
  Building,
  Box,
  Briefcase,
  ChevronLeft,
  ChevronRight
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

const TenantHomePage = () => {
  const [location, setLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [price, setPrice] = useState(5000);
  const [rooms, setRooms] = useState(1);
  const [size, setSize] = useState(50);
  const [isFurnished, setIsFurnished] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filter functions
  const filterByLocation = (property: Property, searchLocation: string): boolean => {
    if (!searchLocation) return true;
    
    const searchTerm = searchLocation.toLowerCase();
    const { area, town, state, country, streetName, buildingName } = property.address;
    
    return (
      area.toLowerCase().includes(searchTerm) ||
      town.toLowerCase().includes(searchTerm) ||
      state.toLowerCase().includes(searchTerm) ||
      country.toLowerCase().includes(searchTerm) ||
      streetName.toLowerCase().includes(searchTerm) ||
      buildingName.toLowerCase().includes(searchTerm)
    );
  };

  const filterByPropertyType = (property: Property, selectedType: string): boolean => {
    return !selectedType || property.propertyType === selectedType;
  };

  const filterByPrice = (property: Property, maxPrice: number): boolean => {
    return property.price <= maxPrice;
  };

  const filterByRooms = (property: Property, minRooms: number): boolean => {
    return property.numberOfRooms >= minRooms;
  };

  const filterBySize = (property: Property, minSize: number): boolean => {
    return property.size >= minSize;
  };

  const filterByFurnished = (property: Property, isFurnishedRequired: boolean): boolean => {
    return !isFurnishedRequired || property.furnished;
  };

  // Apply all filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      return (
        filterByLocation(property, location) &&
        filterByPropertyType(property, selectedPropertyType) &&
        filterByPrice(property, price) &&
        filterByRooms(property, rooms) &&
        filterBySize(property, size) &&
        filterByFurnished(property, isFurnished)
      );
    });
  }, [properties, location, selectedPropertyType, price, rooms, size, isFurnished]);

  // Reset all filters
  const resetFilters = () => {
    setLocation("");
    setSelectedPropertyType("");
    setPrice(5000);
    setRooms(1);
    setSize(50);
    setIsFurnished(false);
  };

  const handleChange = () => setIsFurnished((prev) => !prev);

  const sizeIncrement = () => setSize((prev) => prev + 1);
  const sizeDecrement = () => setSize((prev) => (prev > 0 ? prev - 1 : 0));

  const roomIncrement = () => setRooms((prev) => prev + 1);
  const roomDecrement = () => setRooms((prev) => (prev > 0 ? prev - 1 : 0));

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [location, selectedPropertyType, price, rooms, size, isFurnished]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[var(--color-background)]">
      <Topbar routeHome="/tenant" routeProfile="/tenant/profile" />
      
      {/* Header & Filtering */}
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
              value={location}
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
                const isSelected = selectedPropertyType === type.label;
                return (
                  <button
                    key={type.label}
                    onClick={() => handlePropertyTypeSelect(type.label)}
                    className={`flex items-center justify-center sm:justify-start gap-2 p-3 sm:p-4 lg:p-5 border rounded-full text-sm sm:text-base transition-colors ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'border-[var(--color-border)] text-[var(--color-text)] hover:bg-black/5'
                    }`}
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
              Price Range (MYR)
            </h2>
            <input
              type="range"
              min={0}
              max={10000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 sm:h-3 rounded-full bg-[var(--color-border)] accent-[var(--color-text)] cursor-pointer"
            />

            {/* Label value */}
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-[var(--color-text)]">
              <span>MYR 0</span>
              <span className="font-medium">MYR {price.toLocaleString()}</span>
              <span>MYR 10,000</span>
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

          {/* Filter Results Summary */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-black/10">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[var(--color-text)]">
                Found <span className="font-semibold">{filteredProperties.length}</span> properties
                {selectedPropertyType && ` • Type: ${selectedPropertyType}`}
                {location && ` • Location: ${location}`}
                {price < 10000 && ` • Max Price: MYR ${price.toLocaleString()}`}
              </p>
              {(location || selectedPropertyType || price < 10000 || rooms > 1 || size > 50 || isFurnished) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* List Owner Property */}
      <div className="px-20 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="border border-black/15 rounded-3xl p-6 flex flex-col gap-4 h-fit"
            >
              {/* Property Image */}
              <div className="mb-4">
                {property.images.length > 0 && (
                  <img
                    src={property.images[0].url}
                    alt={`${property.name}`}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                )}
              </div>

              {/* Property Name */}
              <h2 className="text-xl mb-3">{property.name}</h2>

              {/* Property Details */}
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-base">
                  <Home size={18} className="text-[var(--color-primary)]" />
                  <span>Type:</span> {property.propertyType}
                </p>
                <p className="flex items-center gap-3 text-base">
                  <DoorOpen size={18} className="text-[var(--color-primary)]" />
                  <span>Rooms:</span> {property.numberOfRooms}
                </p>
                <p className="flex items-center gap-3 text-base">
                  <Sofa size={18} className="text-[var(--color-primary)]" />
                  <span>Furnished:</span> {property.furnished ? "Yes" : "No"}
                </p>
                <p className="flex items-center gap-3 text-base">
                  <Ruler size={18} className="text-[var(--color-primary)]" />
                  <span>Size:</span> {property.size} M²
                </p>
                <p className="flex items-center gap-3 text-base">
                  <DollarSign size={18} className="text-[var(--color-primary)]" />
                  <span>Price:</span> {property.price} MYR
                </p>
                <p className="flex items-center gap-3 text-base">
                  <CheckCircle size={18} className="text-[var(--color-primary)]" />
                  <span>Score:</span> {property.confidenceScore}
                </p>
                <p className="flex items-center gap-3 text-base">
                  {property.status === "Available" ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                  <span>Status:</span> {property.status}
                </p>
              </div>

              {/* Description */}
              <div className="py-2">
                <p className="flex items-start gap-3 text-base text-gray-600 leading-relaxed">
                  <Info size={18} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  {property.description.length > 100
                    ? `${property.description.substring(0, 100)}...`
                    : property.description}
                </p>
              </div>

              {/* Address */}
              <div className="border-t border-black/10 pt-4">
                <div className="flex items-start gap-3 text-base">
                  <MapPin size={18} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600 leading-relaxed">
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
              <div className="mt-4 pt-2">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-4 rounded-full text-center">
                  <Link
                    className="block text-base"
                    to={`/owner/property/${property.id}`}
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
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[var(--color-text)] hover:bg-black/5'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text)] hover:bg-black/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-[var(--color-text)] hover:bg-black/5'
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
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
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

      <Footer />
    </div>
  );
};

export default TenantHomePage;
