import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

// Register
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// Login
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// Get Profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }
};
