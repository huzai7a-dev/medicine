import axios, { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

const authRoutes = ["/auth/singup", "/auth/login"];

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!authRoutes.includes(config.url || "")) {
    if (config.headers) {
      const session = JSON.parse(sessionStorage.getItem("auth-storage") || "");
      config.headers["authorization"] = session.state.authToken;
    }
  }
  return config;
});
export default apiClient;
