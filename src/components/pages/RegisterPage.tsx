import { Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/services/auth.service";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import PasswordField from "@/components/atoms/PasswordField";
import Footer from "@/components/organisms/Footer";
import { useRegisterStore } from "@/store/auth/useRegisterStore";

const RegisterPage = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    role,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setRole,
    reset,
  } = useRegisterStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // Validation
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const confirmValid =
    confirmPassword === password && confirmPassword.length > 0;

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
        reset();
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Registration failed!";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[url('/background/resisdence-whited.png')] bg-cover bg-center flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-8 flex flex-col gap-5 bg-transparent w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
        >
          {/* Header */}
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl">Create Account</h1>
            <p>Sign up to create account</p>
            {/*<img className="h-[64px] mt-5" src="/rentverse.png" alt="Logo" />*/}
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
                placeholder="Enter your name..."
                icon={<User size={18} />}
                hint="*Enter your active name"
              />

              {/* Email */}
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                icon={<Mail size={18} />}
                hint="*Enter your active email"
              />

              {/* Role */}
              <SelectField
                id="role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Choose role..."
                options={[
                  { label: "Owner", value: "Owner" },
                  { label: "Tenant", value: "Tenant" },
                ]}
                hint={
                  <>
                    *Owner, if you own property <br />
                    *Tenant, if you want to find property
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
                placeholder="Enter password..."
                validationMessage={
                  password.length === 0
                    ? "*Minimum 8 characters, must contain uppercase, lowercase, and numbers"
                    : passwordValid
                      ? "✅ Password is valid"
                      : "❌ Password must contain uppercase, lowercase, and numbers"
                }
                isValid={password.length === 0 ? undefined : passwordValid}
              />

              {/* Confirm Password */}
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password..."
                hint="*Repeat your password"
                validationMessage={
                  confirmPassword.length === 0
                    ? undefined
                    : confirmValid
                      ? "✅ Password matches"
                      : "❌ Password doesn't match"
                }
                isValid={
                  confirmPassword.length === 0 ? undefined : confirmValid
                }
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={!passwordValid || !confirmValid || !role || loading}
                className="p-4 sm:p-5 w-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white disabled:opacity-50 disabled:cursor-not-allowed lg:mt-auto"
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </div>
          </div>

          {/* Error & Success Message */}
          {errorMsg && (
            <p className="text-red-600 text-center text-sm sm:text-base">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="text-green-600 text-center text-sm sm:text-base">
              {successMsg}
            </p>
          )}

          {/* Have Account */}
          <div className="flex justify-center gap-2 text-base text-[var(--color-text)]/50">
            <p>Already have an account?</p>
            <Link to={"/auth/login"} className="text-[var(--color-primary)]">
              Sign In
            </Link>
          </div>

          {/* Back to Home */}
          <div className="flex justify-center">
            <Link to="/" className="text-base text-[var(--color-text)]/50">
              Back to home
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
