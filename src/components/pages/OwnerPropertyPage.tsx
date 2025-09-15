import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/organisms/Footer";
import Topbar from "@/components/organisms/Topbar";
import { getOwnerProperty } from "@/services/owner.service";
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

const OwnerPropertyPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await getOwnerProperty();
      if (res.success) {
        setProperties(res.data);
      } else {
        console.error(res.message);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />

      {/* Header */}
      <div className="pl-20 pt-20">
        <div className="pl-5">
          <h1 className="text-6xl mb-10">
            HI! <span>Yogawan</span>. Welcome to your <br /> owner Dashboard
          </h1>
          <div className="pt-5">
            <Link
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-8 py-4 rounded-full text-lg"
              to="/owner/property/create"
            >
              List New Property
            </Link>
          </div>
        </div>
      </div>

      {/* List Owner Property */}
      <div className="px-20 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
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

        {/* Empty State */}
        {properties.length === 0 && (
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

export default OwnerPropertyPage;
