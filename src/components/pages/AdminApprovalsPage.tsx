import Topbar from "@/components/organisms/Topbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@/utils/verifyRole";
import { getAdminProperty } from "@/services/admin.service";

interface Property {
  id: string;
  name: string;
  propertyType: string;
  numberOfRooms: number;
  furnished: boolean;
  size: number;
  price: number;
  status: string;
  owner: {
    name: string;
    email: string;
  };
}

const AdminApprovalsPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verifyRole(navigate, ["Admin"]);
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const res = await getAdminProperty();
    if (res.success) {
      setProperties(res.data);
    } else {
      alert(res.message || "Gagal fetch data");
    }
    setLoading(false);
  };

  const handleDetail = (id: string) => {
    navigate(`/admin/approvals/${id}`);
  };

  return (
    <div>
      <Topbar routeHome="/admin/approvals" routeProfile="/admin/profile" />
      <div className="min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center pt-20 px-6">
        {/* Header */}
        <div>
          {/*<p className="text-xs p-3 text-black/50 border border-black/15 w-fit rounded-full">
            Admin Dashboard
          </p>*/}
          <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Admin{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Approvals
            </span>
          </h1>
          {/*<p className="mt-4 text-black/50 text-sm sm:text-base leading-relaxed">
            Discover what our partners and clients say about our rental property
            services.
          </p>*/}
        </div>

        {loading ? (
          <div className="fixed top-0 left-0 right-0 min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center flex justify-center items-center">
            <span className="text-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Loading
            </span>
          </div>
        ) : (
          <table className="w-full backdrop-blur overflow-hidden">
            <thead className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Rooms</th>
                <th className="p-3 text-left">Furnished</th>
                <th className="p-3 text-left">Size (sqft)</th>
                <th className="p-3 text-left">Price ($)</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr
                  key={prop.id}
                  className="border-b border-[var(--color-border)] text-[var(--color-text)]/75"
                >
                  <td className="p-3">{prop.name}</td>
                  <td className="p-3">{prop.propertyType}</td>
                  <td className="p-3">{prop.numberOfRooms}</td>
                  <td className="p-3">{prop.furnished ? "Yes" : "No"}</td>
                  <td className="p-3">{prop.size}</td>
                  <td className="p-3">{prop.price.toFixed(2)}</td>
                  <td className="p-3">{prop.status}</td>
                  <td className="p-3">{prop.owner.name}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDetail(prop.id)}
                      className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-12 py-3 rounded-full"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminApprovalsPage;
