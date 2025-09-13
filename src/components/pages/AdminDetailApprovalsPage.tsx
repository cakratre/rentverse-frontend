import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@/utils/verifyRole";
import {
  getAdminPropertyById,
  updateAdminPropertyStatus,
} from "@/services/admin.service";

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

interface PropertyData {
  id: string;
  name: string;
  status: string;
  owner: Owner;
  images: PropertyImage[];
  description: string;
  // ... tambahkan field lain sesuai kebutuhan
}

const AdminDetailApprovalsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    verifyRole(navigate, ["Admin"]);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      const res = await getAdminPropertyById(id);
      if (res.success) {
        setProperty(res.data);
        setSelectedStatus(res.data.status); // set initial status
      } else {
        setErrorMsg(res.message || "Gagal mengambil property");
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  const handleSave = async () => {
    if (!property) return;
    setSaving(true);

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

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p className="text-red-500">{errorMsg}</p>;
  if (!property) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

      <div className="mb-4 flex items-center gap-3">
        <label className="font-semibold">Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={saving}
          className="border rounded px-2 py-1"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <p>
        <strong>Owner:</strong> {property.owner.name} ({property.owner.email})
      </p>
      <p>
        <strong>Description:</strong> {property.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {property.images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt="Property"
            className="w-48 h-32 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDetailApprovalsPage;
