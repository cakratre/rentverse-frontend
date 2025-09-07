import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Shield, Calendar, Loader2, AlertCircle } from "lucide-react";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

// Types/Interfaces
interface Profile {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const TenantProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL_API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.data);
      } catch (err: unknown) {
        const apiError = err as ApiError;
        setError(apiError.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-blue-100 capitalize">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Full Name</p>
                <p className="text-lg font-semibold text-slate-800">{profile.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Email Address</p>
                <p className="text-lg font-semibold text-slate-800">{profile.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Role</p>
                <p className="text-lg font-semibold text-slate-800 capitalize">{profile.role}</p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Member Since</p>
                <p className="text-lg font-semibold text-slate-800">
                  {new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantProfilePage;
