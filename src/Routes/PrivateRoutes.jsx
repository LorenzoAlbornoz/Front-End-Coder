import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const localStorageToken = localStorage.getItem("codertoken");
  const cookieUserData = Cookies.get("user_data");

  let userRole = "";

  if (localStorageToken) {
    const decodedToken = jwtDecode(localStorageToken);
    userRole = decodedToken.role;
  } else if (cookieUserData) {
    const userData = JSON.parse(cookieUserData);
    userRole = userData.role;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return null;
};

const PrivateRoutes = () => {
  const authResult = useAuth();

  if (authResult === null) {
    return <Outlet />;
  }

  return authResult;
};

export default PrivateRoutes;
