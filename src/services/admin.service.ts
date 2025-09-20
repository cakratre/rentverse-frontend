import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API_V1 || import.meta.env.VITE_BASE_URL_API_V2 || import.meta.env.VITE_BASE_URL_API_V3;

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

// GET property by ID
export const getAdminPropertyById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/admin/property/${id}`, {
      headers: {
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

// PUT property by ID
export const updateAdminPropertyStatus = async (id: string, status: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.put(
      `${BASE_URL}/admin/property/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

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

// GET certificate by property ID
export const getCertificate = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(
      `${BASE_URL}/admin/property/${id}/certificate`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
