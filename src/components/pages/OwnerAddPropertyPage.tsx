import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import CheckboxField from "@/components/atoms/CheckboxField";
import TextareaField from "@/components/atoms/TextareaField";
import NumberInputField from "@/components/atoms/NumberInputField";
import SizeInputField from "@/components/atoms/SizeInputField";
import ImageUploadPreview from "@/components/atoms/ImageUploadPreview";

import { useState } from "react";
import { User, MapPin } from "lucide-react";

const OwnerAddPropertyPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState(0);
  const [size, setSize] = useState(0);
  const [furnished, setFurnished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState({
    street: "",
    area: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const fullAddress = `${address.street}, ${address.area}, ${address.city}, ${address.state}, ${address.postalCode}`;
  // const [price, setPrice] = useState(0);
  // const [confidenceScore, setConfidenceScore] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // cegah reload page
    console.log({
      name,
      description,
      propertyType,
      numberOfRoom,
      size,
      furnished,
      image,
      address: fullAddress,
    });
  };

  return (
    <div className="px-5 py-10 flex justify-center">
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div className="w-[512px]">
          <div className="flex flex-col gap-5">
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
              onChange={(file) => setImage(file)}
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
          </div>
        </div>

        {/* Addrea & Button */}
        <div className="w-[512px] flex flex-col gap-3">
          <label className="pl-5" htmlFor="">
            Address
          </label>
          <div className="flex flex-col gap-5 p-5 rounded-3xl border border-[var(--color-border)]">
            {/* Street */}
            <InputField
              id="street"
              label="Street"
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="Masukan alamat jalan..."
              icon={<MapPin size={18} />}
              hint="*Masukan alamat jalan "
            />

            {/* Area */}
            <InputField
              id="area"
              label="Area"
              type="text"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              placeholder="Masukan area..."
              icon={<MapPin size={18} />}
              hint="*Masukan area "
            />

            {/* City */}
            <InputField
              id="city"
              label="City"
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="Masukan kota..."
              icon={<MapPin size={18} />}
              hint="*Masukan kota "
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
              placeholder="Masukan state..."
              icon={<MapPin size={18} />}
              hint="*Masukan state "
            />

            {/* Postal Code */}
            <InputField
              id="postalCode"
              label="Postal Code"
              type="text"
              value={address.postalCode}
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
              placeholder="Masukan kode pos..."
              icon={<MapPin size={18} />}
              hint="*Masukan kode pos "
            />
          </div>

          {/* Button */}
          <button className="mt-5 p-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white w-full rounded-full type='submit'">
            Prediksi Harga
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerAddPropertyPage;
