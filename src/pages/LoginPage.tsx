import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState(""); // state role

  // Regex cek password: minimal 8 char, ada huruf besar, huruf kecil, angka
  const passwordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // Cek apakah konfirmasi password sama
  const confirmValid =
    confirmPassword === password && confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex justify-center items-center">
      <form
        action=""
        className="px-16 py-8 flex flex-col gap-5 bg-[var(--color-background)] rounded-3xl w-[512px]"
      >
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center">
          <img className="w-[256px]" src="/logo.png" alt="Logo" />
          <h1 className="text-3xl">Create Account</h1>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>

        {/* Username */}
        {/* <div>
          <label htmlFor="username" className="block mb-1 ml-5">
            Username
          </label>
          <div className="flex items-center gap-3 border border-black/15 pl-5 rounded-full">
            <User className="text-gray-500" size={18} />
            <input
              id="username"
              type="text"
              className="p-5 w-full outline-none focus:ring-0 rounded-r-full"
              placeholder="Masukan username..."
            />
          </div>
        </div> */}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 ml-5">
            Email
          </label>
          <div className="flex items-center gap-3 border border-black/15 pl-5 rounded-full">
            <Mail className="text-gray-500" size={18} />
            <input
              id="email"
              type="email"
              className="p-5 w-full outline-none focus:ring-0 rounded-r-full"
              placeholder="Masukan email..."
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 ml-5">
            Password
          </label>
          <div className="flex items-center gap-3 border border-black/15 pl-5 rounded-full relative">
            <Lock className="text-gray-500" size={18} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-5 w-full outline-none focus:ring-0 rounded-r-full"
              placeholder="Masukan password..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p
            className={`text-sm mt-1 ml-5 ${
              password.length === 0
                ? "text-gray-500"
                : passwordValid
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {password.length === 0
              ? "*Minimal 8 karakter, harus ada huruf besar, kecil, dan angka"
              : passwordValid
              ? "✅ Password valid"
              : "❌ Password harus ada huruf besar, kecil, dan angka"}
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 ml-5">
            Konfirmasi Password
          </label>
          <div className="flex items-center gap-3 border border-black/15 pl-5 rounded-full relative">
            <Lock className="text-gray-500" size={18} />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-5 w-full outline-none focus:ring-0 rounded-r-full"
              placeholder="Ulangi password..."
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <p
              className={`text-sm mt-1 ml-5 ${
                confirmValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {confirmValid ? "✅ Password cocok" : "❌ Password tidak sama"}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!passwordValid || !confirmValid || !role}
          className="p-5 w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Masuk
        </button>

        {/* Have Account */}
        <div className="flex justify-center gap-2">
          <p>Belum punya akun?</p>
          <Link to={"/auth/register"} className="text-[var(--color-primary)]">
            Create Account
          </Link>
        </div>

        {/* Back to Home */}
        <div className="flex justify-center gap-2">
          <Link to={"/"} className="text-gray-600">
            Kembali ke beranda
          </Link>
        </div>
        
      </form>
    </div>
  );
};

export default LoginPage;
