import React from "react";
import Register from "../components/Login&register/Register";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <div className="register-container">
        <div className="registerPage">
          <div className="registerPage__form">
            <h2 className="registerPage__createAccount">Crear una cuenta</h2>
            <Register />
            <div className="registerPage__enlace">
              <span >
                ¿Ya tienes una cuenta? <Link to="/login" className="registerPage__link">Iniciá Sesión</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
