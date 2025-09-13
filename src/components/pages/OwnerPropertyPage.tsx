import { Link } from "react-router-dom";

import {
  MapPin,
  Home,
  Building,
  Store,
  LandPlot,
  Ruler,
  Eye,
} from "lucide-react";

interface Property {
  propertyName: string;
  address: string;
  type: string;
  size: string;
  price: string;
  description: string;
  imageUpload: string;
}

interface PropertyCardProps {
  property: Property;
}

const properties: Property[] = [
  {
    propertyName: "Rumah Mewah di Sleman",
    address: "Jl. Kaliurang KM 10, Sleman, Yogyakarta",
    type: "Rumah",
    size: "250 m²",
    price: "Rp 2.500.000.000",
    description:
      "Rumah modern minimalis dengan 4 kamar tidur, 3 kamar mandi, garasi luas, dan halaman belakang yang nyaman.",
    imageUpload:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50fGVufDB8fDB8fHww",
  },
  {
    propertyName: "Apartemen Premium Malioboro",
    address: "Jl. Malioboro No. 20, Yogyakarta",
    type: "Apartemen",
    size: "85 m²",
    price: "Rp 950.000.000",
    description:
      "Apartemen fully furnished dengan akses langsung ke pusat kota, cocok untuk investasi maupun hunian.",
    imageUpload:
      "https://plus.unsplash.com/premium_photo-1680281937008-f9b19ed9afb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    propertyName: "Ruko Strategis Condongcatur",
    address: "Jl. Raya Condongcatur, Sleman, Yogyakarta",
    type: "Ruko",
    size: "120 m²",
    price: "Rp 1.200.000.000",
    description:
      "Ruko 2 lantai dengan lokasi strategis dekat kampus, cocok untuk usaha atau investasi properti komersial.",
    imageUpload:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww",
  },
  {
    propertyName: "Tanah Kavling Dekat Bandara YIA",
    address: "Jl. Wates, Kulon Progo, Yogyakarta",
    type: "Tanah",
    size: "300 m²",
    price: "Rp 450.000.000",
    description:
      "Tanah kavling siap bangun dengan akses jalan utama, hanya 15 menit dari Bandara YIA.",
    imageUpload:
      "https://plus.unsplash.com/premium_photo-1680281937008-f9b19ed9afb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const getPropertyIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "rumah":
      return <Home className="w-4 h-4" />;
    case "apartemen":
      return <Building className="w-4 h-4" />;
    case "ruko":
      return <Store className="w-4 h-4" />;
    case "tanah":
      return <LandPlot className="w-4 h-4" />;
    default:
      return <Home className="w-4 h-4" />;
  }
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-[#EEEEEE] rounded-3xl overflow-hidden border border-black/15 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.imageUpload}
          alt={property.propertyName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white px-4 py-2 rounded-full text-base font-medium text-gray-700 flex items-center gap-2">
            {getPropertyIcon(property.type)}
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-3 leading-tight">
          {property.propertyName}
        </h3>

        <div className="text-gray-600 text-base mb-4 flex items-start">
          <MapPin className="w-5 h-5 mt-0.5 mr-2 text-gray-400 flex-shrink-0" />
          <span>{property.address}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-base text-gray-600">
            <Ruler className="w-5 h-5 text-gray-400" />
            <span>{property.size}</span>
          </div>
          <span className="font-bold text-xl" style={{ color: "#171717" }}>
            {property.price}
          </span>
        </div>

        <p className="text-gray-600 text-base mb-6 line-clamp-3">
          {property.description}
        </p>

        <button
          className="w-full p-5 rounded-full text-white font-medium transition-colors duration-200 hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#171717" }}
        >
          <Eye className="w-5 h-5" />
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

const OwnerPropertyList: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEEEE" }}>
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

const OwnerPropertyPage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //     verifyRole(navigate, ["Owner"]);
  // }, [navigate]);

  return (
    <div className="bg-[var(--color-background)]">
      {/*<OwnerSidebar />*/}
      <div className="pl-20 pt-5">
        <div className="pl-5">
          <h1 className="text-6xl">
            HI! <span>Yogawan</span>. Welcome to your <br /> owner Dashboard
          </h1>
          <div className="pt-10">
            <Link
              className="p-5 bg-black text-white rounded-full"
              to="/owner/property/add"
            >
              List New Peoperty
            </Link>
          </div>
        </div>

        <OwnerPropertyList />
      </div>
    </div>
  );
};

export default OwnerPropertyPage;
