import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

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

// GET all properties with optional filters
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
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${BASE_URL}/tenant/properties${params.toString() ? `?${params.toString()}` : ''}`;
    
    const res = await axios.get(url, {
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
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  }
};