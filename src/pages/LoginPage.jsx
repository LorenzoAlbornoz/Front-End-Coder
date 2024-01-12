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
            <div className="loginPage__iconos">
      <div className="loginPage__borderIcon">
        <Link to="/error404" className="loginPage__facebook">
          <BsFacebook />
        </Link>
      </div>
      <div className="loginPage__borderIcon">
        <Link to="/error404" className="loginPage__google">
          <FcGoogle />
        </Link>
      </div>
    </div>
            <Login />
            <div className="loginPage__enlace">
              <span >
                ¿Aún no tienes una cuenta? <Link to="/registro" className="loginPage__link">Registrate</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default LoginPage;

