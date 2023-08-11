import axios from "axios";

const apiAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default apiAxios;
