import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getCookie("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
