import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@/utils/verifyRole";
import Topbar from "@/components/organisms/Topbar";
import axios from "axios";
import {
  getAdminPropertyById,
  updateAdminPropertyStatus,
} from "@/services/admin.service";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

interface PropertyImage {
  id: string;
  url: string;
  propertyId: string;
}

interface Owner {
  id: string;
  name: string;
  email: string;
}

interface Address {
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

interface PropertyData {
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
  owner: Owner;
  images: PropertyImage[];
  address: Address;
}

const AdminDetailApprovalsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);

  //  Cek user role
  useEffect(() => {
    verifyRole(navigate, ["Admin"]);
  }, [navigate]);

  // GET by ID
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);

      // GET Property by ID
      const res = await getAdminPropertyById(id);
      if (res.success) {
        setProperty(res.data);
        setSelectedStatus(res.data.status);
      } else {
        setErrorMsg(res.message || "Gagal mengambil property");
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  // PUT
  const handleSave = async () => {
    if (!property) return;
    setSaving(true);

    // PUT status Property by ID
    const res = await updateAdminPropertyStatus(property.id, selectedStatus);
    if (res.success) {
      alert("Status berhasil disimpan!");
      setProperty((prev) => prev && { ...prev, status: selectedStatus });
      navigate("/admin/approvals");
    } else {
      alert(res.message || "Gagal menyimpan status");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div>
        <Topbar routeHome="/admin/approvals" routeProfile="/admin/profile" />
        <div className="fixed top-0 left-0 right-0 min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center flex justify-center items-center">
          <span className="text-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div>
        <Topbar routeHome="/admin/approvals" routeProfile="/admin/profile" />
        <div className="min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center pt-20 px-6">
          <p className="text-red-500 text-xl">{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div>
      {/* Navigation */}
      <Topbar routeHome="/admin/approvals" routeProfile="/admin/profile" />

      {/* Main Content */}
      <div className="min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center pt-20 pb-5 px-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Property{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Details
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-text)]">
            {property.name}
          </h2>
        </div>

        {/* Status Section */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Status Management
          </h3>
          <div className="flex items-center gap-3">
            <label className="text-lg text-[var(--color-text)]">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={saving}
              className="border border-[var(--color-border)] rounded-full px-3 py-2 text-base"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-2 rounded-full text-base"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>

        {/* Property Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Basic Info */}
          <div className="p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
            <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
              Property Details
            </h3>
            <div className="space-y-2">
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Property Type:</span>{" "}
                {property.propertyType}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">
                  Number of Rooms:
                </span>{" "}
                {property.numberOfRooms}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Size:</span>{" "}
                {property.size} sqm
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Price:</span> RM{" "}
                {property.price.toFixed(2)}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Furnished:</span>{" "}
                {property.furnished ? "Yes" : "No"}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">
                  Confidence Score:
                </span>{" "}
                {property.confidenceScore}%
              </p>
            </div>
          </div>

          {/* Owner Info */}
          <div className="p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
            <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
              Owner Information
            </h3>
            <div className="space-y-2">
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Name:</span>{" "}
                {property.owner.name}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Email:</span>{" "}
                {property.owner.email}
              </p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Street:</span>{" "}
                {property.address.streetName}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Building:</span>{" "}
                {property.address.buildingName}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Area:</span>{" "}
                {property.address.area}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Town:</span>{" "}
                {property.address.town}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">State:</span>{" "}
                {property.address.state}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Country:</span>{" "}
                {property.address.country}
              </p>
              <p className="text-base text-[var(--color-text)]/75">
                <span className="text-[var(--color-text)]">Coordinates:</span>{" "}
                {property.address.lat}, {property.address.lon}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Description
          </h3>
          <p className="text-base text-[var(--color-text)]/75">
            {property.description}
          </p>
        </div>

        {/* Ownership Certificate */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Ownership Certificate
          </h3>
          <div className="space-y-2">
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Token tidak ditemukan");
                    return;
                  }

                  const res = await axios.get(
                    `${BASE_URL}/admin/property/${property.id}/certificate`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      responseType: "blob",
                    },
                  );

                  const blobUrl = URL.createObjectURL(res.data);
                  window.open(blobUrl, "_blank");
                } catch (error: unknown) {
                  console.error(error);
                  const errorMessage =
                    error instanceof Error
                      ? error.message
                      : (
                          error as {
                            response?: { data?: { message?: string } };
                          }
                        )?.response?.data?.message ||
                        "Gagal membuka certificate";
                  alert(errorMessage);
                }
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-medium hover:opacity-90 transition"
            >
              View Certificate
            </button>

            <p className="text-base text-[var(--color-text)]/75">
              <span className="text-[var(--color-text)]">Certificate IV:</span>{" "}
              {property.ownershipCertificateIv}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Timestamps
          </h3>
          <div className="space-y-2">
            <p className="text-base text-[var(--color-text)]/75">
              <span className="text-[var(--color-text)]">Created At:</span>{" "}
              {new Date(property.createdAt).toLocaleString()}
            </p>
            <p className="text-base text-[var(--color-text)]/75">
              <span className="text-[var(--color-text)]">Updated At:</span>{" "}
              {new Date(property.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Images */}
        <div className="mb-6 p-4 backdrop-blur bg-transparent rounded-3xl border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl mb-3 text-[var(--color-text)]">
            Property Images
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {property.images.map((img) => (
              <div key={img.id} className="space-y-2">
                <img
                  src={img.url}
                  alt="Property"
                  className="w-full h-48 object-cover rounded-lg border border-[var(--color-border)]"
                />
                <p className="text-xs text-[var(--color-text)]/50">
                  ID: {img.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailApprovalsPage;
