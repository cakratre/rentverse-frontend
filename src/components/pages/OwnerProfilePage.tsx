import { useEffect, useState } from "react";
import Topbar from "@/components/organisms/Topbar";
import { getProfile } from "@/services/auth.service";
import { Mail, User, Calendar, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@/utils/verifyRole";
import { Icon } from "@iconify/react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const OwnerProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    verifyRole(navigate, ["Owner"]);
  }, [navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await getProfile();
      if (res.success) {
        setProfile(res.data);
      } else {
        setErrorMsg(res.message || "Gagal mengambil profile");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Topbar routeHome="/owner/property" routeProfile="/owner/profile" />
      <div className="min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center flex justify-center items-center">
        {loading ? (
          <div className="min-h-screen flex justify-center items-center bg-[var(--color-background)]">
            <div className="text-center text-[var(--color-text)]">
              <Icon icon="eos-icons:loading" width="64" height="64" />
            </div>
          </div>
        ) : errorMsg ? (
          <p className="text-red-500 text-lg">{errorMsg}</p>
        ) : profile ? (
          <div className="rounded-2xl w-full max-w-md flex flex-col gap-4">
            <h2 className="text-5xl bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
              {profile.name}
            </h2>
            <p className="flex items-center text-[var(--color-text)]/50 gap-3">
              <Mail className="h-5 w-5" />
              {profile.email}
            </p>
            <p className="flex items-center text-[var(--color-text)]/50 gap-3">
              <User className="h-5 w-5" />
              {profile.role}
            </p>
            <p className="flex items-center text-[var(--color-text)]/50 gap-3">
              <Calendar className="h-5 w-5" />
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
            <p className="flex items-center text-[var(--color-text)]/50 gap-3">
              <RefreshCw className="h-5 w-5" />
              {new Date(profile.updatedAt).toLocaleDateString()}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white p-5 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OwnerProfilePage;
