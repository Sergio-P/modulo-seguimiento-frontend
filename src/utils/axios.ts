import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

export default axiosClient;
