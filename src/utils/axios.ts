import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  console.log("token", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;