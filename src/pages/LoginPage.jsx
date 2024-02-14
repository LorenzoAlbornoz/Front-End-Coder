import React from "react";
import Login from "../components/Login&register/Login";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

const LoginPage = () => {
  return (
    <>
      <div className="login-container">
        <div className="loginPage">
          <div className="loginPage__form">
            <h2 className="loginPage__createAccount">Iniciar Sesión</h2>
            <div className="loginPage__iconos">
              <div className="loginPage__borderIcon">
                <a href="http://localhost:8080/api/facebook" className="loginPage__facebook">
                  <BsFacebook />
                </a>
              </div>
              <div className="loginPage__borderIcon">
                <a href="http://localhost:8080/api/google" className="loginPage__google">
                  <FcGoogle />
                </a>
              </div>
            </div>
            <Login />
            <div className="loginPage__enlace">
              <span>
                ¿Aún no tienes una cuenta? <a href="/register" className="loginPage__link">Regístrate</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
