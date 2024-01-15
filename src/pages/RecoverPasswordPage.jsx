import React from "react";
import RecoverPassword from "../components/Login&register/RecoverPassword";

const RecoverPasswordPage = () => {
  return (
    <>
      <div className="recoverPassword-container">
        <div className="recoverPasswordPage">
          <div className="recoverPasswordPage__form">
            <h2 className="recoverPasswordPage__createAccount">Recuperar contraseña</h2>
            <p className="recoverPasswordPage__description"> Ingresá el correo electrónico con el que te registraste y te enviaremos instrucciones para restablecer tu contraseña. </p>
            <RecoverPassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPasswordPage;
