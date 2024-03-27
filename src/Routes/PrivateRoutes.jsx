import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const localStorageToken = localStorage.getItem("codertoken");
  const cookieUserData = Cookies.get("user_data");

  if (!localStorageToken && !cookieUserData) {
    return <Navigate to="/login" />;
  }
};

const PrivateRoutes = () => {
  useAuth();

  return <Outlet />;
};

export default PrivateRoutes;
