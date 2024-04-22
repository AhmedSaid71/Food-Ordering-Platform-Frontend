import axios, { isAxiosError } from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

export const axiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "An unexpected error";
  }
};
