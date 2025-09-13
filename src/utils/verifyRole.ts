import { jwtDecode } from "jwt-decode";
import type { NavigateFunction } from "react-router-dom";

interface DecodedToken {
  userId: string;
  role: "Owner" | "Admin" | "Tenant";
  iat: number;
  exp: number;
}

export const verifyRole = (
  navigate: NavigateFunction,
  allowedRoles: DecodedToken["role"][],
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Anda harus login terlebih dahulu.");
    navigate("/"); // gak ada token
    return;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // cek expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      alert("Token Anda telah kadaluarsa. Silakan login kembali.");
      navigate("/");
      return;
    }

    // cek role
    if (!allowedRoles.includes(decoded.role)) {
      alert("Anda tidak memiliki akses ke halaman ini.");
      navigate("/");
    }
  } catch (err) {
    console.error("Token invalid:", err);
    localStorage.removeItem("token");
    alert("Token invalid. Silakan login kembali.");
    navigate("/");
  }
};
