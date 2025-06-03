import { showErrorToast } from "@/utils/toast_uitls";
import { useAuthStore } from "@/zustand/useAuthStore";
import axios from "axios";

const apiService = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8045/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token && token.length > 0) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    showErrorToast("Error in request");
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { setIsAuth, setIsValidated, setToken } = useAuthStore.getState();
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || "An unexpected error occurred";

    if (status === 400) {
      setIsAuth(false);
      setIsValidated(false);
      setToken("");
    } else if (status === 406) {
      setIsAuth(true);
      setIsValidated(false);
    }

    showErrorToast(message);

    return Promise.reject(error);
  }
);

export default apiService;
