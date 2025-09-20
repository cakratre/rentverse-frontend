import { useEffect, useState } from "react";
import { getTenantRentHistory } from "@/services/tenant.service";
import { Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { verifyRole } from "@/utils/verifyRole";
import { useNavigate } from "react-router-dom";

interface RentalHistory {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  rentalAmount: number;
  status: string;
  property: {
    name: string;
    propertyType: string;
    address: {
      streetName: string;
      buildingName: string;
      area: string;
      state: string;
      country: string;
    };
  };
}

const TenantRentalHistoryPage = () => {
  const [history, setHistory] = useState<RentalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    verifyRole(navigate, ["Tenant"]);
  }, [navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const res = await getTenantRentHistory();

      if (res.success) {
        setHistory(res.data);
      } else {
        setError(res.message || "Gagal mengambil riwayat sewa");
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--color-background)]">
        <div className="text-center text-[var(--color-text)]">
          <Icon icon="eos-icons:loading" width="64" height="64" />
        </div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
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

      <h1 className="pt-20 text-2xl font-normal mb-5">Riwayat Sewa</h1>

      {history.length === 0 ? (
        <p>Belum ada riwayat sewa.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="border border-black/15 rounded-4xl p-4 flex flex-col gap-3 h-fit"
            >
              {/* Property Name */}
              <h2 className="text-lg font-normal">{item.property.name}</h2>

              {/* Property Address */}
              <p className="flex items-start text-xs text-black/50 font-normal">
                {item.property.address.buildingName},{" "}
                {item.property.address.streetName},{" "}
                {item.property.address.state}, {item.property.address.country}
              </p>

              {/* Property Details - Condensed */}
              <div className="space-y-1">
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Type:</span> {item.property.propertyType}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Duration:</span> {item.duration} months
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Period:</span>{" "}
                  {new Date(item.startDate).toLocaleDateString()} -{" "}
                  {new Date(item.endDate).toLocaleDateString()}
                </p>
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Price:</span> ${item.rentalAmount.toFixed(2)}
                </p>
              </div>

              {/* Status */}
              <div className="border-t border-black/10 pt-3">
                <p className="flex items-start text-xs gap-2 text-black/50 font-normal">
                  <span>Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>

              {/* Download Button */}
              <div className="mt-3 pt-2">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-5 rounded-full text-center">
                  <a
                    href="/rental-agreement.pdf"
                    className="block text-sm font-normal"
                  >
                    Download Rental Agreement
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantRentalHistoryPage;
