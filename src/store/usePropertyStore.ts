import { create } from "zustand";

interface Address {
  lat: number;
  lon: number;
  streetName: string;
  buildingName: string;
  area: string;
  areatown: string;
  state: string;
  country: string;
}

interface PropertyState {
  name: string;
  description: string;
  propertyType: string;
  numberOfRoom: number;
  size: number;
  furnished: boolean;
  image: File | null;
  address: Address;
  mapPosition: [number, number];
  isLoadingAddress: boolean;
  ownershipCertificate: File | null;

  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setPropertyType: (type: string) => void;
  setNumberOfRoom: (num: number) => void;
  setSize: (size: number) => void;
  setFurnished: (value: boolean) => void;
  setImage: (file: File | null) => void;
  setAddress: (address: Partial<Address>) => void;
  setMapPosition: (pos: [number, number]) => void;
  setIsLoadingAddress: (loading: boolean) => void;
  setOwnershipCertificate: (file: File | null) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  name: "",
  description: "",
  propertyType: "",
  numberOfRoom: 0,
  size: 0,
  furnished: false,
  image: null,
  address: {
    lat: 5.4164,
    lon: 100.3327,
    streetName: "",
    buildingName: "",
    area: "",
    areatown: "",
    state: "",
    country: "",
  },
  mapPosition: [5.4164, 100.3327],
  isLoadingAddress: false,
  ownershipCertificate: null,

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setPropertyType: (propertyType) => set({ propertyType }),
  setNumberOfRoom: (numberOfRoom) => set({ numberOfRoom }),
  setSize: (size) => set({ size }),
  setFurnished: (furnished) => set({ furnished }),
  setImage: (image) => set({ image }),
  setAddress: (address) =>
    set((state) => ({ address: { ...state.address, ...address } })),
  setMapPosition: (mapPosition) => set({ mapPosition }),
  setIsLoadingAddress: (isLoadingAddress) => set({ isLoadingAddress }),
  setOwnershipCertificate: (file) => set({ ownershipCertificate: file }),
}));