import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RECOVERPASSWORD_SCHEMA } from "../../helpers/validationsSchemas";
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import Swal from 'sweetalert2'

const RecoverPassword = () => {
    const {
        register, handleSubmit, formState: { errors }, reset } = useForm(
            {
                resolver: yupResolver(RECOVERPASSWORD_SCHEMA),
            }
        );

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/user/recover', { email: data.email });
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correo enviado para recuperar contraseña.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Usuario No Registrado.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    return (
        <>
            <div className="recoverPassword">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="recoverPassword__input"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="register__error-message">{errors.email.message}</p>
                        )}
                    </div>
                    <button type="submit" className="recoverPassword__button">Enviar</button>

                </form>
                <div className="recoverPassword__enlace">
                    <span>
                        <Link to="/login" className="recoverPassword__link">Volver</Link>
                    </span>
                </div>
            </div>
        </>
    );
};

export default RecoverPassword;
