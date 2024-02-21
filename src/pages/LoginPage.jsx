import React from "react";
import Login from "../components/Login&register/Login";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="login-container">
        <div className="loginPage">
          <div className="loginPage__form">
            <h2 className="loginPage__createAccount">Iniciar Sesión</h2>
            <Login />
            <div className="loginPage__iconos">
                <div className="loginPage__borderIconFacebook">
                  <a href="http://localhost:8080/api/facebook" className="loginPage__facebook">
                    <BsFacebook size={20} /> Ingresar con Facebook
                  </a>
                </div>
                <div className="loginPage__borderIconGoogle">
                  <a href="http://localhost:8080/api/google" className="loginPage__google">
                    <FcGoogle size={20} /> Ingresar con Google
                  </a>
                </div>
              </div>
              <div className="login__enlace">
            <span>
              <Link to="/repassword" className="login__link">
                {" "}
                ¿Olvidaste tu contraseña?
              </Link>
            </span>
          </div>
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
