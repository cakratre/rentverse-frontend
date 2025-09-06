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
  allowedRoles: DecodedToken["role"][]
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/"); // gak ada token
    return;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // cek expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

    // cek role
    if (!allowedRoles.includes(decoded.role)) {
      navigate("/"); // role tidak diizinkan
    }
  } catch (err) {
    console.error("Token invalid:", err);
    localStorage.removeItem("token");
    navigate("/");
  }
};
