import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://multi-vendor-ecommerce-backend.vercel.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default apiAxios;
