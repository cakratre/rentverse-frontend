import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// GET all
export const getAdminProperty = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/admin/property`, {
      headers: {
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

// GET property by ID
export const getAdminPropertyById = async (propertyId: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/admin/property/${propertyId}`, {
      headers: {
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

// PUT property by ID
export const updateAdminPropertyStatus = async (
  propertyId: string,
  status: string,
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.put(
      `${BASE_URL}/admin/property/${propertyId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }
};
