import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOwnerPropertyById } from "@/services/owner.service";
import Footer from "@/components/organisms/Footer";
import Topbar from "@/components/organisms/Topbar";
import { deleteOwnerProperty } from "@/services/owner.service";
import { Icon } from "@iconify/react";
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
  ArrowLeft,
  Star,
} from "lucide-react";
import { verifyRole } from "@/utils/verifyRole";

type PropertyType = {
  id: string;
  name: string;
  propertyType: string;
  numberOfRooms: number;
  furnished: boolean;
  size: number;
  price: number;
  description: string;
  confidenceScore: number;
  status: string;
  images: { id: string; url: string }[];
  address: {
    streetName: string;
    buildingName: string;
    area: string;
    town: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
  };
};

const OwnerDetailPropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    verifyRole(navigate, ["Owner"]);
  }, [navigate]);

  // Handle GET by ID
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      setLoading(true);
      const res = await getOwnerPropertyById(id);

      if (res.success === false) {
        setError(res.message || "Failed to fetch property");
      } else {
        setProperty(res.data);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  // Handle DELETE by ID
  const handleDeleteProperty = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("Yakin mau hapus property ini?");
    if (!confirmDelete) return;

    const result = await deleteOwnerProperty(id);

    if (result.success !== false) {
      alert("Property berhasil dihapus");
      navigate("/owner/property");
    } else {
      alert(result.message || "Gagal menghapus property");
    }
  };

  if (loading)
    return (
      <div className="bg-[var(--color-background)] min-h-screen">
        <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />
        <div className="min-h-screen flex justify-center items-center bg-[var(--color-background)]">
          <div className="text-center text-[var(--color-text)]">
            <Icon icon="eos-icons:loading" width="64" height="64" />
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="bg-[var(--color-background)] min-h-screen">
        <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  if (!property)
    return (
      <div className="bg-[var(--color-background)] min-h-screen">
        <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Property not found</p>
        </div>
      </div>
    );

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      {/* Navigation */}
      <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />

      {/* Header */}
      <div className="pl-20 pt-32">
        <div className="pl-5">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/owner/property"
              className="flex items-center gap-2 text-[var(--color-text)] hover:opacity-80"
            >
              <ArrowLeft size={20} />
              Back to list property
            </Link>
          </div>
          <h1 className="text-6xl mb-4">{property.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-20 pt-10 pb-20">
        <div className="max-w-6xl">
          {/* Image Gallery */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {property.images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={`Property ${img.id}`}
                  className="w-full h-64 object-cover rounded-3xl"
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div className="border border-black/15 rounded-3xl p-8">
                <h2 className="text-2xl mb-6">Property Details</h2>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-lg">
                    <Home size={20} className="text-[var(--color-primary)]" />
                    <span>Type:</span> {property.propertyType}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <DoorOpen
                      size={20}
                      className="text-[var(--color-primary)]"
                    />
                    <span>Rooms:</span> {property.numberOfRooms}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <Sofa size={20} className="text-[var(--color-primary)]" />
                    <span>Furnished:</span> {property.furnished ? "Yes" : "No"}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <Ruler size={20} className="text-[var(--color-primary)]" />
                    <span>Size:</span> {property.size} M²
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <DollarSign
                      size={20}
                      className="text-[var(--color-primary)]"
                    />
                    <span>Price:</span> {property.price} MYR
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <Star size={20} className="text-[var(--color-primary)]" />
                    <span>Confidence Score:</span> {property.confidenceScore}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    {property.status === "Available" ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <XCircle size={20} className="text-red-500" />
                    )}
                    <span>Status:</span> {property.status}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="border border-black/15 rounded-3xl p-8">
                <h2 className="text-2xl mb-4">Description</h2>
                <p className="flex items-start gap-3 text-lg leading-relaxed">
                  <Info
                    size={20}
                    className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                  />
                  {property.description}
                </p>
              </div>
            </div>

            {/* Right Column - Address & Actions */}
            <div className="space-y-6">
              {/* Address */}
              <div className="border border-black/15 rounded-3xl p-8">
                <h2 className="text-2xl mb-6">Location</h2>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                  />
                  <div className="text-lg leading-relaxed">
                    <p>{property.address.streetName}</p>
                    <p>{property.address.buildingName}</p>
                    <p>
                      {property.address.area}, {property.address.town}
                    </p>
                    <p>
                      {property.address.state}, {property.address.country}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Coordinates: {property.address.lat},{" "}
                      {property.address.lon}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-center">
                  <Link
                    to={`/owner/property/update/${property.id}`}
                    className="block text-lg"
                  >
                    Edit Property
                  </Link>
                </div>
                <div className="border border-red-500/50 text-red-500/75 p-5 rounded-full text-center">
                  <button
                    onClick={handleDeleteProperty}
                    className="block w-full text-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OwnerDetailPropertyPage;
