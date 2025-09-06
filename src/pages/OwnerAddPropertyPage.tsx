import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

import { useState } from "react";
import { User } from "lucide-react";

const OwnerAddPropertyPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [furnished, setFurnished] = useState("");
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [address, setAddress] = useState({
      street: "",
      area: "",
      city: "",
      state: "",
      postalCode: "",
    });


    return (
        <div className="px-5 py-10 flex justify-center">

            <form className="w-[720px] flex flex-col gap-5">
                
                {/* Name */}
                <InputField
                id="name"
                label="Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukan name..."
                icon={<User size={18} />}
                hint="*Masukan name aktif anda"
                />

                {/* Property Type */}
                <SelectField
                id="propertyType"
                label="Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                placeholder="Pilih tipe..."
                options={[
                    { label: "Penthouse", value: "Penthouse" },
                    { label: "Apartement", value: "Apartement" },
                    { label: "House", value: "House" },
                    { label: "Villa", value: "Villa" },
                    { label: "Office", value: "Office" },
                ]}
                hint={
                    <>
                    *Owner, jika kamu pelilik property <br />
                    *Tenant, jika kamu mau cari property
                    </>
                }
                />

                <label htmlFor="">Addres</label>

                <div className="flex flex-col gap-5 p-5 rounded-3xl border border-[var(--color-border)]">

                    {/* Street */}
                    <SelectField
                    id="address"
                    label="Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Pilih street..."
                    options={[
                        { label: "Penthouse", value: "Penthouse" },
                        { label: "Apartement", value: "Apartement" },
                        { label: "House", value: "House" },
                        { label: "Villa", value: "Villa" },
                        { label: "Office", value: "Office" },
                    ]}
                    hint={
                        <>
                        *Owner, jika kamu pelilik property
                        </>
                    }
                    />

                    {/* Area */}
                    <SelectField
                    id="address"
                    label="Area"
                    value={address.area}
                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    placeholder="Pilih area..."
                    options={[
                        { label: "Penthouse", value: "Penthouse" },
                        { label: "Apartement", value: "Apartement" },
                        { label: "House", value: "House" },
                        { label: "Villa", value: "Villa" },
                        { label: "Office", value: "Office" },
                    ]}
                    hint={
                        <>
                        *Owner, jika kamu pelilik property
                        </>
                    }
                    />

                    {/* City */}
                    <SelectField
                    id="address"
                    label="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="Pilih city..."
                    options={[
                        { label: "Penthouse", value: "Penthouse" },
                        { label: "Apartement", value: "Apartement" },
                        { label: "House", value: "House" },
                        { label: "Villa", value: "Villa" },
                        { label: "Office", value: "Office" },
                    ]}
                    hint={
                        <>
                        *Owner, jika kamu pelilik property
                        </>
                    }
                    />

                    {/* State */}
                    <SelectField
                    id="address"
                    label="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="Pilih state..."
                    options={[
                        { label: "Penthouse", value: "Penthouse" },
                        { label: "Apartement", value: "Apartement" },
                        { label: "House", value: "House" },
                        { label: "Villa", value: "Villa" },
                        { label: "Office", value: "Office" },
                    ]}
                    hint={
                        <>
                        *Owner, jika kamu pelilik property
                        </>
                    }
                    />

                    {/* Postal Code */}
                    <SelectField
                    id="address"
                    label="Postal Code"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="Pilih postal code..."
                    options={[
                        { label: "Penthouse", value: "Penthouse" },
                        { label: "Apartement", value: "Apartement" },
                        { label: "House", value: "House" },
                        { label: "Villa", value: "Villa" },
                        { label: "Office", value: "Office" },
                    ]}
                    hint={
                        <>
                        *Owner, jika kamu pelilik property
                        </>
                    }
                    />

                </div>


            </form>
        </div>
    );
}

export default OwnerAddPropertyPage;