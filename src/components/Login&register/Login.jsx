import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_SCHEMA } from "../../helpers/validationsSchemas";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components";
import { FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/login", data);
      const token = response.data.token;
      localStorage.setItem('codertoken', token);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (userRole === 'admin' || userRole === 'premium') {
        navigate('/admin');
      } else if (userRole === 'user') {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setUserNotFound(true);
        Swal.fire({
          icon: "error",
          title: "Usuario no registrado",
          text: "El usuario ingresado no está registrado",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta",
          text: "La contraseña ingresada no es válida",
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const rotate360 = keyframes`
 from {
   transform: rotate(0deg);
 }

  to {
   transform: rotate(360deg);
 }
`;

  const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

  const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid var(--c-mainColor);
  border-right: 2px solid var(--c-mainColor);
  border-bottom: 2px solid var(--c-secondColor);
  border-left: 4px solid var(--c-grey);
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
      <div className="loginPage__custom-loading-text">Cargando...</div>

    </div>
  );

  return (
    <div className="login">
      {isLoading ? (
        <CustomLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login__input"
              {...register("email")}
            />
            {errors.email && (
              <p className="register__error-message">
                <FaExclamationCircle /> {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="login__input"
              placeholder="Contraseña"
              {...register("password")}
            />
            {errors.password && (
              <p className="register__error-message">
                <FaExclamationCircle /> {errors.password.message}
              </p>
            )}
            <button type="submit" className="login__button">
              Ingresar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;