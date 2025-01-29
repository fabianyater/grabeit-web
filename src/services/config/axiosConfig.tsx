import axios from "axios";

const baseURL = "http://localhost:8080";

export const axiosConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(new Error(error));
  }
);
