import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "@/components/organisms/Footer";
import { getOwnerProperty } from "@/services/owner.service";
import { MapPin, Home, User } from "lucide-react";
import { verifyRole } from "@/utils/verifyRole";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    verifyRole(navigate, ["Owner"]);
  }, [navigate]);

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <ul className="flex justify-center bg-transparent backdrop-blur p-6 border border-[var(--color-border)] gap-10">
          <li>
            <span className="text-xl text-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Owner Dashboard
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Home className="w-5 h-5 text-[var(--color-text)]/75" />
            <Link
              className="text-[var(--color-text)]/75"
              to={"/owner/property"}
            >
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--color-text)]/75" />
            <Link className="text-[var(--color-text)]/75" to={"/owner/profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-8 py-4 rounded-full text-lg"
              to="/owner/property/create"
            >
              List New Property
            </Link>
          </li>
        </ul>
      </nav>

      {/* List Owner Property */}
      <div className="px-20 pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
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
              <p
                className={`flex items-center gap-3 text-sm ${
                  property.status === "Approved"
                    ? "text-green-500"
                    : property.status === "Rejected"
                      ? "text-red-500"
                      : property.status === "Pending"
                        ? "text-yellow-500"
                        : ""
                }`}
              >
                {property.status}
              </p>

              {/* Description */}
              <p className="flex items-start text-xs text-black/50">
                {property.description.length > 80
                  ? `${property.description.substring(0, 80)}...`
                  : property.description}
              </p>

              {/* Property Type */}
              <p className="flex items-start text-xs gap-2 text-black/50">
                <span>Type:</span>
                {property.propertyType}
              </p>

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
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-lg"
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
