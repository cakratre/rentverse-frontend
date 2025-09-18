import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

// GET all properties
export const getGuestProperty = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/properties`);

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
export const getGuestPropertyById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/properties/${id}`);

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
