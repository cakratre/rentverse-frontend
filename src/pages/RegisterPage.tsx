import { Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/services/auth.service";

import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import PasswordField from "@/components/PasswordField";

const RegisterPage = () => {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  // Utils State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Validation
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const confirmValid = confirmPassword === password && confirmPassword.length > 0;

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await registerUser({
        name,
        email,
        password,
        role,
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => navigate("/auth/login"), 1500);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Register gagal!";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-8 flex flex-col gap-5 bg-[var(--color-background)] rounded-4xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
      >
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl">Create Account</h1>
          <p>Sign up to create account</p>
          <img className="h-[64px] mt-5" src="/rentverse.png" alt="Logo" />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5 flex-1">
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

            {/* Role */}
            <SelectField
              id="role"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Pilih role..."
              options={[
                { label: "Owner", value: "Owner" },
                { label: "Tenant", value: "Tenant" },
              ]}
              hint={
                <>
                  *Owner, jika kamu pelilik property <br />
                  *Tenant, jika kamu mau cari property
                </>
              }
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Password */}
            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan password..."
              validationMessage={
                password.length === 0
                  ? "*Minimal 8 karakter, harus ada huruf besar, kecil, dan angka"
                  : passwordValid
                  ? "✅ Password valid"
                  : "❌ Password harus ada huruf besar, kecil, dan angka"
              }
              isValid={password.length === 0 ? undefined : passwordValid}
            />

            {/* Confirm Password */}
            <PasswordField
              id="confirmPassword"
              label="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password..."
              hint="*Ulangi kembali password"
              validationMessage={
                confirmPassword.length === 0
                  ? undefined
                  : confirmValid
                  ? "✅ Password cocok"
                  : "❌ Password tidak sama"
              }
              isValid={confirmPassword.length === 0 ? undefined : confirmValid}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={!passwordValid || !confirmValid || !role || loading}
              className="p-4 sm:p-5 w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white disabled:opacity-50 disabled:cursor-not-allowed lg:mt-auto"
            >
              {loading ? "Processing..." : "Daftar"}
            </button>
          </div>
        </div>

        {/* Error & Success Message */}
        {errorMsg && <p className="text-red-600 text-center text-sm sm:text-base">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-center text-sm sm:text-base">{successMsg}</p>}

        {/* Have Account */}
        <div className="flex justify-center gap-2 text-sm sm:text-base text-[var(--color-text)]/50">
          <p>Sudah punya akun?</p>
          <Link to={"/auth/login"} className="text-[var(--color-primary)]">
            Masuk
          </Link>
        </div>

        {/* Back to Home */}
        <div className="flex justify-center">
          <Link to="/" className="text-xs text-[var(--color-text)]/50">
            Kembali ke beranda
          </Link>
        </div>

      </form>
    </div>
  );
};

export default RegisterPage;
