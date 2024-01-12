import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_SCHEMA } from "../../helpers/validationsSchemas";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from "../../config/axiosInstance";
// import jwt_decode from 'jwt-decode';
// import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components"; 

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
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/login", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.rol;
      if (userRole === 'admin') {
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
              name="username"
              placeholder="Email"
              className="login__input"
              {...register("username")}
            />
            {errors.username && (
              <p className="register__error-message">{errors.username.message}</p>
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
              <p className="register__error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="login__enlace">
            <span>
              <Link to="/repassword" className="login__link">
                {" "}
                ¿Olvidaste tu contraseña?
              </Link>
            </span>
          </div>
          <button type="submit" className="login__button">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

