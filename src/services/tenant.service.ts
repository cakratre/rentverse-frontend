import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export interface PropertyFilters {
  location?: string;
  propertyType?: string;
  maxPrice?: number;
  minRooms?: number;
  minSize?: number;
  furnished?: boolean;
  page?: number;
  limit?: number;
}

// GET All
export const getTenantProperty = async (filters?: PropertyFilters) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${BASE_URL}/tenant/properties${params.toString() ? `?${params.toString()}` : ""}`;

    const res = await axios.get(url, {
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

// GET by ID
export const getTenantPropertyById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Token tidak ditemukan" };
    }

    const res = await axios.get(`${BASE_URL}/tenant/properties/${id}`, {
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
