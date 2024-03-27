import React from "react";
import ResetPassword from "../components/Login&register/ResetPassword";

const RecoverPasswordPage = () => {
  return (
    <>
      <div className="recoverPassword-container">
        <div className="recoverPasswordPage">
          <div className="recoverPasswordPage__form">
            <h2 className="recoverPasswordPage__createAccount">Generar contraseña</h2>
            <ResetPassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPasswordPage;
