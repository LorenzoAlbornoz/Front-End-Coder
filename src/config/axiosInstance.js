import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/api`
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("codertoken");
  if (token) {
      config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

