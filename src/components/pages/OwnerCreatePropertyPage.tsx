// src/pages/OwnerCreatePropertyPage.tsx
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { verifyRole } from "@/utils/verifyRole";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@iconify/react";

const BASE_URL = import.meta.env.VITE_BASE_URL_API_V1 || import.meta.env.VITE_BASE_URL_API_V2 || import.meta.env.VITE_BASE_URL_API_V3;

// Fix leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Address {
  lat: number;
  lon: number;
  streetName: string;
  buildingName: string;
  area: string;
  town: string;
  state: string;
  country: string;
}

interface PropertyResponse {
  id: string;
  price: number;
  confidenceScore: number;
  name: string;
}

// Map click handler component
const MapClickHandler = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lon: number) => void;
}) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

const OwnerCreatePropertyPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [size, setSize] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [ownershipCertificate, setOwnershipCertificate] = useState<File | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [propertyResponse, setPropertyResponse] =
    useState<PropertyResponse | null>(null);
  const navigate = useNavigate();

  const [address, setAddress] = useState<Address>({
    lat: 5.4164,
    lon: 100.3327,
    streetName: "",
    buildingName: "-",
    area: "",
    town: "",
    state: "",
    country: "",
  });
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    verifyRole(navigate, ["Owner"]);
  }, [navigate]);

  // Reverse geocoding function
  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    setIsLoadingAddress(true);
    try {
      // Using Nominatim for reverse geocoding (free service)
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
      );

      const data = response.data;
      const addressComponents = data.address || {};

      setAddress((prev) => ({
        ...prev,
        lat,
        lon,
        streetName: addressComponents.road || addressComponents.street || "",
        buildingName:
          addressComponents.house_number || addressComponents.building || "",
        area: addressComponents.suburb || addressComponents.neighbourhood || "",
        town:
          addressComponents.city ||
          addressComponents.town ||
          addressComponents.village ||
          "",
        state: addressComponents.state || addressComponents.province || "",
        country: addressComponents.country || "",
      }));
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      // Update coordinates even if geocoding fails
      setAddress((prev) => ({
        ...prev,
        lat,
        lon,
      }));
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  // Handle map location selection
  const handleLocationSelect = useCallback(
    (lat: number, lon: number) => {
      reverseGeocode(lat, lon);
    },
    [reverseGeocode],
  );

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Could not get your current location");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("propertyType", propertyType);
      formData.append("numberOfRooms", numberOfRooms.toString());
      formData.append("size", size.toString());
      formData.append("furnished", furnished ? "true" : "false");

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (ownershipCertificate) {
        formData.append("ownershipCertificate", ownershipCertificate);
      }

      // nested address - only append if values are not empty
      formData.append("address[lat]", address.lat.toString());
      formData.append("address[lon]", address.lon.toString());
      formData.append("address[streetName]", address.streetName || "");

      // Only append buildingName if it has a value
      if (address.buildingName && address.buildingName.trim() !== "") {
        formData.append(
          "address[buildingName]",
          address.buildingName?.trim() || "-",
        );
      }

      formData.append("address[area]", address.area || "");
      formData.append("address[town]", address.town || "");
      formData.append("address[state]", address.state || "");
      formData.append("address[country]", address.country || "");

      // debug sebelum post
      console.log("FormData Preview:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(`${BASE_URL}/owner/property`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", res.data);

      // Set response data and show modal
      setPropertyResponse({
        id: res.data.data.id,
        price: res.data.data.price,
        confidenceScore: res.data.data.confidenceScore,
        name: res.data.data.name,
      });
      setShowModal(true);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);

      // More detailed error handling
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map((err: any) => {
            if (err.children && err.children.length > 0) {
              return err.children
                .map(
                  (child: any) =>
                    `${child.property}: ${Object.values(child.constraints || {}).join(", ")}`,
                )
                .join("\n");
            }
            return `${err.property}: ${Object.values(err.constraints || {}).join(", ")}`;
          })
          .join("\n");
        alert(`Validation Error:\n${errorMessages}`);
      } else {
        alert("Gagal membuat property");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    const id = propertyResponse?.id;
    setPropertyResponse(null);
    navigate(`/owner/property/update/${id}`);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-background)]">
        <div className="text-center text-[var(--color-text)]">
          <Icon icon="line-md:uploading-loop" width="64" height="64" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-[512px] pb-10">
      {/* Header */}
      <div className="mt-10 pb-10 pl-5">
        <Link
          to="/owner/property"
          className="flex items-center gap-2 text-[var(--color-text)] hover:opacity-80"
        >
          <ArrowLeft size={20} />
          Back to list property
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          Add New{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            Property
          </span>
        </h1>
        <p className="mt-4 text-black/50 text-sm sm:text-base leading-relaxed">
          Showcase your property with just a few clicks. Make it easier for
          tenants to discover, explore, and connect with your listings
          effortlessly.
        </p>
      </div>

      {/* Form Container */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Property Name */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Property Name
          </label>

          {/* Input */}
          <input
            type="text"
            value={name}
            placeholder="Enter your property name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[var(--color-border)] p-5 rounded-2xl"
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Enter a name for your property.
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Description
          </label>

          {/* Textarea */}
          <textarea
            value={description}
            placeholder="Enter property description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-[var(--color-border)] p-5 rounded-2xl min-h-[120px] resize-none"
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Provide a detailed description of your property.
          </p>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Property Type
          </label>

          {/* Select */}
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border border-[var(--color-border)] p-5 rounded-2xl bg-white text-[var(--color-text)]"
          >
            <option value="">Choose your property type</option>
            <option value="Condo">Condo</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="House">House</option>
          </select>

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Select the type that best describes your property.
          </p>
        </div>

        {/* Number of Rooms */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Number of Rooms
          </label>

          {/* Input */}
          <input
            type="number"
            value={numberOfRooms}
            placeholder="Enter number of rooms"
            onChange={(e) => setNumberOfRooms(e.target.value)}
            className="w-full border border-[var(--color-border)] p-5 rounded-2xl"
            min={0}
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Specify how many rooms are available.
          </p>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Size (m²)
          </label>

          {/* Input */}
          <input
            type="number"
            value={size ?? ""}
            placeholder="Enter property size in m²"
            onChange={(e) =>
              setSize(e.target.value === "" ? null : Number(e.target.value))
            }
            className="w-full border border-[var(--color-border)] p-5 rounded-2xl"
            min={0}
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Specify the total size of your property in square meters.
          </p>
        </div>

        {/* Furnished */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Furnished
          </label>

          {/* Checkbox */}
          <div className="flex items-center gap-3 pl-5">
            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer rounded"
            />
            <span className="text-sm text-[var(--color-text)]">
              This property is furnished
            </span>
          </div>

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Check this if your property comes with furniture.
          </p>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Images
          </label>

          {/* File Input */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImages(Array.from(e.target.files));
              }
            }}
            className="w-full border border-[var(--color-border)] p-4 rounded-2xl cursor-pointer text-sm text-[var(--color-text)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)] file:text-white hover:file:bg-opacity-90"
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *You can upload multiple images (JPG, PNG, etc).
          </p>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">
                Preview Images:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-2xl border border-[var(--color-border)]"
                    />
                    <p className="text-xs text-[var(--color-text)] mt-1 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certification */}
        <div className="flex flex-col gap-3">
          {/* Label */}
          <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
            Ownership Certificate
          </label>

          {/* File Input */}
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              setOwnershipCertificate(e.target.files?.[0] || null)
            }
            className="w-full border border-[var(--color-border)] p-4 rounded-2xl cursor-pointer text-sm text-[var(--color-text)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)] file:text-white hover:file:bg-opacity-90"
          />

          {/* Hint */}
          <p className="pl-5 text-xs text-[var(--color-text)]">
            *Upload a valid ownership certificate (PDF, JPG, PNG).
          </p>

          {/* Preview */}
          {ownershipCertificate && (
            <div className="mt-3 pl-5">
              <p className="text-sm text-[var(--color-text)] font-medium">
                Selected File:
              </p>
              <p className="text-xs text-[var(--color-text)] truncate">
                {ownershipCertificate.name}
              </p>
            </div>
          )}
        </div>

        {/* Address */}
        <fieldset className="flex flex-col gap-6 p-5 border border-[var(--color-border)] rounded-2xl">
          <legend className="text-base font-semibold text-[var(--color-text)] px-2">
            Address
          </legend>

          {/* Map Section */}
          <div className="flex flex-col gap-3">
            <label className="pl-5 text-sm font-medium text-[var(--color-text)]">
              Select Location on Map
            </label>

            <div className="flex items-center gap-3 pl-5">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
                           text-white text-sm font-medium px-6 py-3 rounded-2xl hover:opacity-90 transition"
              >
                Use Current Location
              </button>
              {isLoadingAddress && (
                <span className="text-sm text-[var(--color-text)]">
                  Loading address...
                </span>
              )}
            </div>

            <div className="h-64 w-full border border-[var(--color-border)] rounded-2xl overflow-hidden relative">
              <MapContainer
                center={[address.lat, address.lon]}
                zoom={15}
                className="absolute top-0 left-0 h-full w-full z-0"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[address.lat, address.lon]} />
                <MapClickHandler onLocationSelect={handleLocationSelect} />
              </MapContainer>

              {/* Overlay di atas map */}
              <div className="absolute top-2 left-2 z-10 bg-white/90 px-3 py-1 rounded-lg shadow text-xs font-medium">
                Click map to select location
              </div>
            </div>

            <p className="pl-5 text-xs text-[var(--color-text)]">
              Click on the map to select a location or use the "Use Current
              Location" button.
            </p>
          </div>

          {/* Coordinates Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                disabled
                readOnly
                value={address.lat}
                className="w-full border border-[var(--color-border)] p-4 rounded-2xl bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                disabled
                readOnly
                value={address.lon}
                className="w-full border border-[var(--color-border)] p-4 rounded-2xl bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Street Name */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              Street Name
            </label>
            <input
              type="text"
              value={address.streetName}
              onChange={(e) =>
                setAddress({ ...address, streetName: e.target.value })
              }
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>

          {/* Building Name */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              Building Name (Optional)
            </label>
            <input
              type="text"
              value={address.buildingName}
              placeholder="e.g., Building A, Tower 1, etc."
              onChange={(e) =>
                setAddress({ ...address, buildingName: e.target.value })
              }
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>

          {/* Area */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              Area
            </label>
            <input
              type="text"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>

          {/* Town */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              Town
            </label>
            <input
              type="text"
              value={address.town}
              onChange={(e) => setAddress({ ...address, town: e.target.value })}
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              State
            </label>
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <label className="pl-2 text-sm font-medium text-[var(--color-text)]">
              Country
            </label>
            <input
              type="text"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="w-full border border-[var(--color-border)] p-4 rounded-2xl"
            />
          </div>
        </fieldset>

        {/* Button */}
        <button
          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full w-full disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Prediksi Harga"}
        </button>
      </form>

      {/* Modal */}
      {showModal && propertyResponse && (
        <div className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-[var(--color-border)] rounded-4xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Property Created Successfully!
              </h3>

              <div className="bg-white rounded-3xl p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  {propertyResponse.name}
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Price:</span>
                    <span className="font-semibold text-green-600 text-lg">
                      {propertyResponse.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                      -MYR
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence Score:</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-blue-600 text-lg mr-2">
                        {propertyResponse.confidenceScore.toFixed(1)}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${propertyResponse.confidenceScore}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-normal p-5 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerCreatePropertyPage;