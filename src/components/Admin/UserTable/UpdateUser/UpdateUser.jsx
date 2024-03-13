import React, { useState } from 'react';
import { axiosInstance } from '../../../../config/axiosInstance';
import { Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '../../../../helpers/validationsSchemas';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const UpdateUser = ({ datoUser, getUsers }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(UPDATE_USER_SCHEMA), // Asegúrate de tener el esquema de validación correcto
  });

  const { role } = datoUser;
  const [formDatos, setFormDatos] = useState({
    role,
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('codertoken') || Cookies.get('codertoken');
  
      // Verifica si hay un token
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        });
        return; // Detén la ejecución si no hay un token
      }

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
  
      // Verifica si el usuario tiene el rol de administrador
      if (userRole !== 'admin') {
        Swal.fire({
          icon: 'error',
          title: 'No tienes permisos para modificar usuarios.',
          showConfirmButton: false,
          timer: 1500,
        });
        return; // Detén la ejecución si el usuario no es administrador
      }
  
      // Puedes construir el objeto de datos para la solicitud de actualización
      const updatedUserData = {
        role: data.role,
      };
  
      // Realiza la solicitud de actualización del usuario
      const response = await axiosInstance.put(`/user/${datoUser._id}`, updatedUserData);
  
      // Verifica el estado de la respuesta
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario modificado con éxito',
        });
      }
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
  
      // Maneja otros errores aquí, si es necesario
      Swal.fire({
        icon: 'error',
        title: 'Error en la actualización',
        text: 'Hubo un error al modificar el usuario. Por favor, intenta nuevamente.',
      });
    } finally {
      getUsers();
    }
  };
  
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="role">Rol</Form.Label>
          <Form.Control
            type="text"
            id="role"
            name="role"
            defaultValue={formDatos.role} // Puedes mostrar el rol actual aquí
            {...register('role')}
          />
          {errors.role && (
            <p className="register__error-message">{errors.role.message}</p>
          )}
        </Form.Group>

        <div className="form-group text-end">
          <button type="submit" className="modal-button">
            Editar
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateUser;
