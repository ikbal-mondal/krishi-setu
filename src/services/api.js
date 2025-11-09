import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://krishisetuserser.vercel.app/api",
  // import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// attach Firebase token (if logged in)
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
