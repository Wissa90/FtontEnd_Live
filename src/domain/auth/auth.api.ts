import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LoginCredentials, Register } from "./auth.types";

const API_URL = "https://1dbf-156-174-47-128.ngrok-free.app/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "any value",
  },
});

const isValidToken = (token: string) => {
  try {
    const decoded = jwtDecode(token) as { exp: number };
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const isUserLoggedIn = () =>
  !!localStorage.getItem("token") &&
  isValidToken(localStorage.getItem("token") as string);

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const authApi = {
  loginUser: async (credentials: LoginCredentials) => {
    const response = await api.post("/token/", credentials);
    localStorage.setItem("token", response.data.access);
    return response.data.access;
  },
  register: async (credentials: Register) => {
    // Use axios directly to bypass the interceptor
    const response = await axios.post(`${API_URL}/register/`, credentials, {
      headers: {
        "Content-Type": "application/json", // Only include the content type
      },
    });
    return response.data;
  },
};

export { authApi };
