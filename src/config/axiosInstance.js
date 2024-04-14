import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: `https://proyect-back-end-coder-production.up.railway.app/api`,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("codertoken");
  const userDataCookie = Cookies.get('user_data');
  if (token  || userDataCookie) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

