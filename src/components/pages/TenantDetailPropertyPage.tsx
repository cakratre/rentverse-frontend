import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getTenantPropertyById,
  rentTenantProperty,
} from "@/services/tenant.service";
import Footer from "@/components/organisms/Footer";
import Topbar from "@/components/organisms/Topbar";
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
  User,
  Mail,
} from "lucide-react";
import { verifyRole } from "@/utils/verifyRole";

const VITE_DOCUSIGN_BASE_URL_API = import.meta.env.VITE_DOCUSIGN_BASE_URL_API_V1 || import.meta.env.VITE_DOCUSIGN_BASE_URL_API_V2 || import.meta.env.VITE_DOCUSIGN_BASE_URL_API_V3;

interface Property {
  id: string;
  name: string;
  propertyType: string;
  numberOfRooms: number;
  furnished: boolean;
  size: number;
  price: number;
  description: string;
  confidenceScore?: number;
  status?: string;
  images: { id: string; url: string }[];
  owner: { name: string; email: string };
  address: {
    streetName: string;
    buildingName: string;
    area: string;
    town: string;
    state: string;
    country: string;
    lat?: number;
    lon?: number;
  };
}

type ApiResult = {
  success: boolean;
  message: string;
  envelopeId?: string;
} | null;

const TenantDetailPropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // state popup
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [rentLoading, setRentLoading] = useState(false);

  // Rental agreement form states
  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [agreementResult, setAgreementResult] = useState<ApiResult>(null);

  useEffect(() => {
    verifyRole(navigate, ["Tenant"]);
  }, [navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await getTenantPropertyById(id);

      if (res.success) {
        setProperty(res.data);
      } else {
        setError(res.message || "Gagal mengambil data");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleRent = async () => {
    if (!id || !property) return;
    setRentLoading(true);
    setAgreementResult(null);

    // First, rent the property
    const rentRes = await rentTenantProperty(id, { startDate, duration });

    if (rentRes.success) {
      // Then generate rental agreement
      const formData = new FormData();
      formData.append("tenantName", tenantName);
      formData.append("tenantEmail", tenantEmail);
      formData.append("tenantAddress", tenantAddress);
      formData.append("ownerName", property.owner.name);
      formData.append("ownerEmail", property.owner.email);
      formData.append(
        "ownerAddress",
        `${property.address.streetName}, ${property.address.buildingName}, ${property.address.area}, ${property.address.town}, ${property.address.state}, ${property.address.country}`
      );
      formData.append(
        "propertyAddress",
        `${property.address.streetName}, ${property.address.buildingName}, ${property.address.area}, ${property.address.town}, ${property.address.state}, ${property.address.country}`
      );
      formData.append("propertyType", property.propertyType);
      formData.append("size", property.size.toString());
      formData.append("numberOfRoom", property.numberOfRooms.toString());
      formData.append("furnished", String(property.furnished));
      formData.append("startDate", startDate);
      formData.append("duration", (duration * 30).toString()); // Convert months to days
      formData.append("price", property.price.toString());

      try {
        const response = await fetch(
          `${VITE_DOCUSIGN_BASE_URL_API}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data: ApiResult = await response.json();
        setAgreementResult(data);

        if (data?.success) {
          alert(
            "Sewa properti berhasil dan kontrak telah dikirim untuk ditandatangani!"
          );
        } else {
          alert(`Sewa berhasil, tapi gagal mengirim kontrak: ${data?.message}`);
        }
      } catch {
        setAgreementResult({
          success: false,
          message: "Network error saat mengirim kontrak.",
        });
        alert(
          "Sewa berhasil, tapi gagal mengirim kontrak karena masalah jaringan."
        );
      }
    } else {
      alert(`Gagal: ${rentRes.message}`);
    }

    setRentLoading(false);
  };

  const inputStyle =
    "w-full p-3 border border-black/15 rounded-2xl bg-[var(--color-background)] text-[var(--color-text)]";

  if (loading)
    return (
      <div className="bg-[var(--color-background)] min-h-screen">
        <Topbar routeHome="/tenant/property" routeProfile="/tenant/profile" />
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
        <Topbar routeHome="/tenant/property" routeProfile="/tenant/profile" />
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </div>
    );

  if (!property)
    return (
      <div className="bg-[var(--color-background)] min-h-screen">
        <Topbar routeHome="/tenant/property" routeProfile="/tenant/profile" />
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Property not found</p>
        </div>
      </div>
    );

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
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

      {/* Header */}
      <div className="pl-20 pt-32">
        <div className="pl-5">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/tenant/property"
              className="flex items-center gap-2 text-[var(--color-text)] hover:opacity-80"
            >
              <ArrowLeft size={20} />
              Back to property list
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
                  {property.confidenceScore && (
                    <p className="flex items-center gap-3 text-lg">
                      <Star size={20} className="text-[var(--color-primary)]" />
                      <span>Confidence Score:</span> {property.confidenceScore}
                    </p>
                  )}
                  {property.status && (
                    <p className="flex items-center gap-3 text-lg">
                      {property.status === "Available" ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <XCircle size={20} className="text-red-500" />
                      )}
                      <span>Status:</span> {property.status}
                    </p>
                  )}
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

            {/* Right Column - Address, Owner & Actions */}
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
                    {property.address.lat && property.address.lon && (
                      <p className="text-sm text-gray-600 mt-2">
                        Coordinates: {property.address.lat},{" "}
                        {property.address.lon}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="border border-black/15 rounded-3xl p-8">
                <h2 className="text-2xl mb-6">Property Owner</h2>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-lg">
                    <User size={20} className="text-[var(--color-primary)]" />
                    <span>{property.owner.name}</span>
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <Mail size={20} className="text-[var(--color-primary)]" />
                    <span>{property.owner.email}</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="block w-full text-lg"
                >
                  Rent Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-background)] border border-black/15 rounded-3xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6">Rental Agreement Form</h2>

            <div className="space-y-6">
              {/* Tenant Details */}
              <fieldset className="border border-black/15 p-5 rounded-3xl">
                <legend className="text-lg font-semibold px-2 text-[var(--color-text)]">
                  Tenant Details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Full Name
                    </label>
                    <input
                      className={inputStyle}
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className={inputStyle}
                      value={tenantEmail}
                      onChange={(e) => setTenantEmail(e.target.value)}
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Current Address
                    </label>
                    <input
                      className={inputStyle}
                      value={tenantAddress}
                      onChange={(e) => setTenantAddress(e.target.value)}
                      placeholder="Enter your current address"
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Owner Details - Read Only */}
              <fieldset className="border border-black/15 p-5 rounded-3xl bg-gray-50">
                <legend className="text-lg font-semibold px-2 text-[var(--color-text)]">
                  Owner Details (Auto-filled)
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Full Name
                    </label>
                    <input
                      className={`${inputStyle} bg-gray-100`}
                      value={property?.owner.name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Email
                    </label>
                    <input
                      className={`${inputStyle} bg-gray-100`}
                      value={property?.owner.email || ""}
                      readOnly
                    />
                  </div>
                </div>
              </fieldset>

              {/* Property & Rent Details - Auto-filled */}
              <fieldset className="border border-black/15 p-5 rounded-3xl bg-gray-50">
                <legend className="text-lg font-semibold px-2 text-[var(--color-text)]">
                  Property & Rent Details (Auto-filled)
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Property Address
                    </label>
                    <input
                      className={`${inputStyle} bg-gray-100`}
                      value={
                        property
                          ? `${property.address.streetName}, ${property.address.buildingName}, ${property.address.area}, ${property.address.town}, ${property.address.state}, ${property.address.country}`
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className={inputStyle}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      className={inputStyle}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Monthly Rent Price (MYR)
                    </label>
                    <input
                      className={`${inputStyle} bg-gray-100`}
                      value={property?.price || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Property Type
                    </label>
                    <input
                      className={`${inputStyle} bg-gray-100`}
                      value={property?.propertyType || ""}
                      readOnly
                    />
                  </div>
                </div>
              </fieldset>

              {/* Result Display */}
              {agreementResult && (
                <div
                  className={`p-4 rounded-2xl ${
                    agreementResult.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p className="font-bold">
                    {agreementResult.success ? "Success!" : "Error"}
                  </p>
                  <p className="text-sm">{agreementResult.message}</p>
                  {agreementResult.success && agreementResult.envelopeId && (
                    <p className="text-xs mt-2">
                      Envelope ID: {agreementResult.envelopeId}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 p-3 border border-black/15 rounded-2xl text-[var(--color-text)] hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={handleRent}
                disabled={
                  rentLoading ||
                  !tenantName ||
                  !tenantEmail ||
                  !tenantAddress ||
                  !startDate
                }
                className="flex-1 p-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-2xl hover:opacity-90 disabled:opacity-50"
              >
                {rentLoading ? "Processing..." : "Rent & Generate Agreement"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TenantDetailPropertyPage;
