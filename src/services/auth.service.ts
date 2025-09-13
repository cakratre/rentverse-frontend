import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

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

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

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
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }
};
