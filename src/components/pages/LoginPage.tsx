import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import InputField from "@/components/atoms/InputField";
import PasswordField from "@/components/atoms/PasswordField";
import Footer from "@/components/organisms/Footer";
import { useLoginStore } from "@/store/auth/loginStore";

interface DecodedToken {
  userId: string;
  role: "Owner" | "Admin" | "Tenant";
  iat: number;
  exp: number;
}

const LoginPage = () => {
  const { email, password, setEmail, setPassword, reset } = useLoginStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim()) {
      setErrorMsg("Email harus diisi");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Password harus diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      if (res.success && res.data?.token) {
        // Decode token
        const decoded: DecodedToken = jwtDecode(res.data.token);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          setErrorMsg("Token sudah expired");
          return;
        }

        // Simpan token
        localStorage.setItem("token", res.data.token);
        setSuccessMsg("Login berhasil!");

        reset();

        // Arahkan sesuai role
        switch (decoded.role) {
          case "Owner":
            navigate("/owner");
            break;
          case "Admin":
            navigate("/admin/approvals");
            break;
          case "Tenant":
            navigate("/tenant");
            break;
          default:
            navigate("/");
        }
      } else {
        setErrorMsg("Login gagal! Silakan coba lagi");
      }
    } catch (err: unknown) {
      // Better error handling
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        const msg = response?.data?.message || "Terjadi kesalahan pada server";
        setErrorMsg(msg);
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[url('/background/blue-sky-whited.png')] bg-cover bg-center flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-8 flex flex-col gap-5 rounded-4xl w-full max-w-sm sm:max-w-md lg:max-w-lg"
        >
          {/* Header */}
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl sm:text-3xl">Welcome back!</h1>
            <p className="text-sm sm:text-base">Sign in to your account</p>
            {/*<img className="h-[64px] mt-5" src="/rentverse.png" alt="Logo" />*/}
          </div>

          {/* Error & Success */}
          {errorMsg && (
            <p className="text-red-500 text-center text-sm sm:text-base">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-green-500 text-center text-sm sm:text-base">
              {successMsg}
            </p>
          )}

          {/* Email */}
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukan email..."
            icon={<Mail size={18} />}
            hint="*Masukan email aktif anda"
          />

          {/* Password */}
          <PasswordField
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hint="*Masukan kembali password yang sudah anda buat sebelumnya, 8 karakter, ada huruf besar, kecil, dan angka"
            placeholder="Masukan password..."
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="p-4 sm:p-5 w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>

          {/* Have Account */}
          <div className="flex justify-center gap-2 text-base">
            <p className="text-[var(--color-text)]/50">Belum punya akun?</p>
            <Link to="/auth/register" className="text-[var(--color-primary)]">
              Create Account
            </Link>
          </div>

          {/* Back to Home */}
          <div className="flex justify-center">
            <Link to="/" className="text-base text-[var(--color-text)]/50">
              Kembali ke beranda
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
