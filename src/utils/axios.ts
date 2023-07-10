import axios, { HeadersDefaults } from "axios";
let base_url = process.env.BACKEND_HOST + ":" + process.env.BACKEND_PORT;
console.log("base_url", base_url);
const apiClient = axios.create({
  baseURL: base_url,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
