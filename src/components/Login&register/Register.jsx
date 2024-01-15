import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_SCHEMA } from "../../helpers/validationsSchemas";
import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from "../config/axiosInstance";
import Swal from "sweetalert2";
import styled, { keyframes } from "styled-components"; 

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(REGISTER_SCHEMA)
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await axiosInstance.post("/register", data)
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha completado con éxito. Ahora puedes iniciar sesión.',
      });
      navigate("/login")
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Registro',
        text: 'Hubo un problema durante el registro. Es posible que el usuario ya esté registrado.',
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault()
  }

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
     <div className="registerPage__custom-loading-text">Cargando...</div>
   
   </div>
 );
 

  return (
    <div className="register">
          {isLoading ? (
       <CustomLoader />

      ) : (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register__input"
            {...register("email")}
          />
          {errors.email && (
            <p className="register__error-message">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="register__input"
            {...register("name")}
          />
          {errors.name && (
            <p className="register__error-message">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="register__input"
            {...register("password")}
          />
          {errors.password && (
            <p className="register__error-message">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="repassword"
            placeholder="Repetir Contraseña"
            className="register__input"
            onPaste={handlePaste}
            {...register("repassword")}
          />
          {errors.repassword && (
            <p className="register__error-message">{errors.repassword.message}</p>
          )}
        </div>
        <p className="register__description"> Tu contraseña debe tener al menos una mayúscula, una minúscula, un número y 8 caracteres como mínimo y 20 como máximo </p>
        <button type="submit" className="register__button">Registrarse</button>

      </form>
      )}
    </div>
  );
};

export default Register;

