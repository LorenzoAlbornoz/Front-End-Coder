import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: `https://proyect-back-end-coder-8.onrender.com/api`,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("codertoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

