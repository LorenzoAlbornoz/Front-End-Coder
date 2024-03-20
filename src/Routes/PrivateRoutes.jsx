import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const localStorageToken = localStorage.getItem("codertoken");
  const cookieUserData = Cookies.get("user_data");

  let userRole = "";

  if (localStorageToken) {
    // Decodificar el token para obtener el rol del usuario
    const decodedToken = jwtDecode(localStorageToken);
    userRole = decodedToken.role;
  } else if (cookieUserData) {
    // Obtener el rol del usuario de los datos almacenados en las cookies
    const userData = JSON.parse(cookieUserData);
    userRole = userData.role;
  }

  if (userRole !== "admin") {
    // Si el usuario no es un administrador, redirigir al inicio
    return <Navigate to="/" />;
  }

  // Si el usuario está autenticado y es un administrador, devolver null
  return null;
};

const PrivateRoutes = () => {
  // Ejecutar la lógica de autenticación
  const authResult = useAuth();

  // Si el resultado de la autenticación es null (usuario autenticado y autorizado)
  // devolver el Outlet para permitir que se rendericen las rutas hijas
  if (authResult === null) {
    return <Outlet />;
  }

  // Si el resultado de la autenticación no es null, significa que la autenticación falló
  // y se redirigirá automáticamente al usuario según lo definido en useAuth
  return authResult;
};

export default PrivateRoutes;
