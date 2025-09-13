import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import CheckboxField from "@/components/atoms/CheckboxField";
import TextareaField from "@/components/atoms/TextareaField";
import NumberInputField from "@/components/atoms/NumberInputField";
import SizeInputField from "@/components/atoms/SizeInputField";
import ImageUploadPreview from "@/components/atoms/ImageUploadPreview";
import PdfUploadPreview from "@/components/atoms/PdfUploadPreview";
import { usePropertyStore } from "@/store/usePropertyStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationMarkerProps {
  position: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker = ({ position, onLocationSelect }: LocationMarkerProps) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [map, position]);

  return position === null ? null : <Marker position={position} />;
};

const OwnerCreatePropertyPage = () => {
  const {
    name,
    description,
    propertyType,
    numberOfRoom,
    size,
    furnished,
    image,
    address,
    ownershipCertificate,
    mapPosition,
    isLoadingAddress,
    setName,
    setDescription,
    setPropertyType,
    setNumberOfRoom,
    setSize,
    setFurnished,
    setImage,
    setAddress,
    setOwnershipCertificate,
    setMapPosition,
    setIsLoadingAddress,
  } = usePropertyStore();

  const navigate = useNavigate();

  const reverseGeocode = async (lat: number, lon: number) => {
    setIsLoadingAddress(true);
    try {
      // Try multiple APIs as fallback
      const apis = [
        // Primary: Nominatim with CORS proxy
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`)}`,
        // Fallback: Another geocoding service
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      ];

      let addressData = null;

      // Try first API (Nominatim with proxy)
      try {
        const response = await fetch(apis[0]);
        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);

        if (data && data.address) {
          const addr = data.address;
          addressData = {
            streetName: addr.road || addr.pedestrian || "",
            buildingName: addr.house_number
              ? `${addr.house_number} ${addr.road || ""}`
              : "",
            area: addr.city || addr.town || addr.village || "",
            areatown: addr.suburb || addr.neighbourhood || "",
            state: addr.state || addr.province || "",
            country: addr.country || "",
          };
        }
      } catch {
        console.log("Primary API failed, trying fallback...");
      }

      // Try fallback API if primary failed
      if (!addressData) {
        try {
          const response = await fetch(apis[1]);
          const data = await response.json();

          if (data) {
            addressData = {
              streetName: data.locality || "",
              buildingName: "",
              area: data.city || "",
              areatown: data.principalSubdivision || "",
              state: data.principalSubdivision || "",
              country: data.countryName || "",
            };
          }
        } catch {
          console.log("Fallback API also failed");
        }
      }

      // Update address if we got data from any API
      if (addressData) {
        setAddress({
          lat,
          lon,
          ...addressData,
        });
      } else {
        // If all APIs fail, just update coordinates
        setAddress({
          lat,
          lon,
        });
        alert("Address lookup failed. Please enter address details manually.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      // Update coordinates even if geocoding fails
      setAddress({
        lat,
        lon,
      });
      alert("Address lookup failed. Please enter address details manually.");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
    reverseGeocode(lat, lng);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your current location. Please click on the map to select a location.",
          );
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      description,
      propertyType,
      numberOfRoom,
      size,
      image,
      ownershipCertificate,
      furnished,
      address,
    });
    navigate("/owner/property/create/predict");
  };

  return (
    <div className="px-5 py-10 flex justify-center">
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div className="p-1 w-full xl:w-[720px]">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                Add New{" "}
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                  Property
                </span>
              </h1>
            </div>

            {/* Name */}
            <InputField
              id="name"
              label="Property Name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukan name..."
              icon={<User size={18} />}
              hint="*Masukan name aktif anda"
            />

            {/* Description */}
            <TextareaField
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter property description..."
              hint="*Enter property description"
            />

            {/* Property Type */}
            <SelectField
              id="propertyType"
              label="Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="Pilih tipe..."
              options={[
                { label: "Condo", value: "Condo" },
                { label: "Penthouse", value: "Penthouse" },
                { label: "Apartement", value: "Apartement" },
                { label: "Office", value: "Office" },
                { label: "House", value: "House" },
              ]}
              hint={<>*Owner, jika kamu pelilik property</>}
            />

            {/* Number of Room */}
            <NumberInputField
              id="number-of-room"
              label="Number of Rooms"
              value={numberOfRoom}
              onChange={(e) => setNumberOfRoom(Number(e.target.value))}
              placeholder="Enter number of rooms"
            />

            {/* Size Input */}
            <SizeInputField
              id="property-size"
              label="Size"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              placeholder="Enter property size"
            />

            {/* Image Upload */}
            <ImageUploadPreview
              label="Upload Property Image"
              onChange={(file) => setImage(file[0] || null)}
              hint="*Upload a clear image of the property"
            />

            {/* Furnished */}
            <CheckboxField
              id="furnished"
              label="Furnished"
              value={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              hint="*Apakah property sudah furnisihed?"
            />

            {/* Ownership Certificate */}
            <PdfUploadPreview
              label="Upload Sertifikat Kepemilikan"
              hint="Format PDF, max 5MB"
              onChange={(files) => {
                // Ambil file pertama (atau bisa simpan semua jika mau multiple)
                setOwnershipCertificate(files[0] || null);
              }}
            />

            {/* Map Section */}
            <div className="flex flex-col gap-3">
              <label className="pl-5 font-medium">Select Location</label>
              <div className="p-5 rounded-3xl border border-[var(--color-border)]">
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    className="p-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white w-full rounded-full"
                  >
                    Use Current Location
                  </button>
                  {isLoadingAddress && (
                    <div className="flex items-center text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Loading...
                    </div>
                  )}
                </div>

                <div className="h-64 rounded-3xl overflow-hidden border border-[var(--color-border)]">
                  <MapContainer
                    center={mapPosition}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker
                      position={mapPosition}
                      onLocationSelect={handleLocationSelect}
                    />
                  </MapContainer>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  Click on the map to select property location or use "Use
                  Current Location" button
                </p>
              </div>
            </div>

            {/* Address Label */}
            <label className="pl-5 font-medium" htmlFor="">
              Address Details
            </label>

            {/* Addres */}
            <div className="flex flex-col gap-5 p-5 rounded-3xl border border-[var(--color-border)]">
              {/* Latitude */}
              <NumberInputField
                id="latitude"
                label="Latitude"
                value={address.lat}
                onChange={(e) => {
                  const lat = Number(e.target.value);
                  setAddress({ ...address, lat });
                  setMapPosition([lat, address.lon]);
                }}
                placeholder="Enter latitude"
              />

              {/* Longitude */}
              <NumberInputField
                id="longitude"
                label="Longitude"
                value={address.lon}
                onChange={(e) => {
                  const lon = Number(e.target.value);
                  setAddress({ ...address, lon });
                  setMapPosition([address.lat, lon]);
                }}
                placeholder="Enter longitude"
              />

              {/* Street Name */}
              <InputField
                id="streetName"
                label="Street Name"
                type="text"
                value={address.streetName}
                onChange={(e) =>
                  setAddress({ ...address, streetName: e.target.value })
                }
                placeholder="Enter street name..."
                icon={<MapPin size={18} />}
                hint="*Please enter the street name"
              />

              {/* Building Name */}
              <InputField
                id="buildingName"
                label="Building Name"
                type="text"
                value={address.buildingName}
                onChange={(e) =>
                  setAddress({ ...address, buildingName: e.target.value })
                }
                placeholder="Enter building name..."
                icon={<MapPin size={18} />}
                hint="*Please enter the building name"
              />

              {/* Area */}
              <InputField
                id="area"
                label="Area"
                type="text"
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
                placeholder="Enter city..."
                icon={<MapPin size={18} />}
                hint="*Please enter the city"
              />

              {/* Area Town */}
              <InputField
                id="areatown"
                label="Area Town"
                type="text"
                value={address.areatown}
                onChange={(e) =>
                  setAddress({ ...address, areatown: e.target.value })
                }
                placeholder="Enter town..."
                icon={<MapPin size={18} />}
                hint="*Please enter the town"
              />

              {/* State */}
              <InputField
                id="state"
                label="State"
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                placeholder="Enter state..."
                icon={<MapPin size={18} />}
                hint="*Please enter the state"
              />

              {/* Country */}
              <InputField
                id="country"
                label="Country"
                type="text"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                placeholder="Enter country..."
                icon={<MapPin size={18} />}
                hint="*Please enter the country"
              />
            </div>

            {/* Button */}
            <button
              className="mt-5 p-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white w-full rounded-full hover:opacity-90 transition-opacity"
              type="submit"
            >
              Predict Price
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OwnerCreatePropertyPage;
