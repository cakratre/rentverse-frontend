import axios from "axios";

const BASE_URL = "https://homelab-rentverse-by-cakratre-api.yogaone.me/api";

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

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
