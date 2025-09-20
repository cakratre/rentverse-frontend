import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API_V1 || import.meta.env.VITE_BASE_URL_API_V2 || import.meta.env.VITE_BASE_URL_API_V3;

// GET all properties
export const getOwnerProperty = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/owner/properties`, {
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
export const getOwnerPropertyById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/owner/property/${id}`, {
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

// POST property
export const createOwnerProperty = async (data: FormData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Token tidak ditemukan" };

    console.log("Sending request to:", `${BASE_URL}/owner/property`);
    console.log("Token present:", !!token);

    const res = await axios.post(`${BASE_URL}/owner/property`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("API Error Details:", error);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
      console.error("Response Headers:", error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.error("Request Error:", error.request);
      return {
        success: false,
        message: "Network error - no response received",
      };
    } else {
      console.error("Error Message:", error.message);
      return { success: false, message: error.message };
    }
  }
};

// PUT property by ID
export const updateOwnerProperty = async (id: string, data: FormData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Token tidak ditemukan" };

    console.log("Updating property with ID:", id);
    console.log("Sending request to:", `${BASE_URL}/owner/property/${id}`);

    const res = await axios.put(`${BASE_URL}/owner/property/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("Update Property Error:", error);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("Request Error:", error.request);
      return {
        success: false,
        message: "Network error - no response received",
      };
    } else {
      console.error("Error Message:", error.message);
      return { success: false, message: error.message };
    }
  }
};

// DELETE property by ID
export const deleteOwnerProperty = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Token tidak ditemukan" };

    const res = await axios.delete(`${BASE_URL}/owner/property/${id}`, {
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
