import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RESETPASSWORD_SCHEMA } from "../../helpers/validationsSchemas";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import Swal from 'sweetalert2'
import styled, { keyframes } from "styled-components";
import { FaExclamationCircle } from 'react-icons/fa';

const ResetPassword = () => {
    const [userNotFound, setUserNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, handleSubmit, formState: { errors }, reset } = useForm(
            {
                resolver: yupResolver(RESETPASSWORD_SCHEMA),
            }
        );

    const navigate = useNavigate();
    const { id, token } = useParams()


    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.put(`/user/reset/${id}/${token}`, { password: data.password })
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña Modificada!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            navigate("/login")
        } catch (error) {
            console.error(error);
            setUserNotFound(true);
            Swal.fire({
                icon: 'error',
                title: 'La nueva contraseña es igual a la anterior.',
                showConfirmButton: false,
                timer: 1500,
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
        <>
            <div className="recoverPassword">
                {isLoading ? (
                    <CustomLoader />

                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña Nueva"
                                className="register__input"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="register__error-message">
                                    <FaExclamationCircle />{errors.password.message}
                                </p>
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
                                <p className="register__error-message">
                                    <FaExclamationCircle />{errors.repassword.message}
                                </p>
                            )}
                        </div>
                        <p className="register__description"> Tu contraseña debe tener al menos una mayúscula, una minúscula, un número y 8 caracteres como mínimo y 20 como máximo </p>
                        <button type="submit" className="register__button">Cambiar Contraseña</button>

                    </form>
                )}
            </div>
        </>
    );
};

export default ResetPassword;
