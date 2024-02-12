import React, { useState } from 'react';
import { axiosInstance } from '../../../../config/axiosInstance';
import { Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '../../../../helpers/validationsSchemas';
import Swal from 'sweetalert2';

const UpdateUser = ({ datoUser, getUsers }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(UPDATE_USER_SCHEMA), // Asegúrate de tener el esquema de validación correcto
  });

  const { name, password, role } = datoUser;
  const [formDatos, setFormDatos] = useState({
    role,
  });

  const onSubmit = async (data) => {
    try {
      console.log('Datos antes de la actualización:', data);

      // Puedes construir el objeto de datos para la solicitud de actualización
      const updatedUserData = {
        role: data.role,
      };

      console.log('Datos enviados en la solicitud:', updatedUserData);

      // Realiza la solicitud de actualización del usuario
      await axiosInstance.put(`/user/${datoUser._id}`, updatedUserData);

      Swal.fire({
        icon: 'success',
        title: 'Usuario modificado con éxito',
      });
    } catch (error) {
      console.log(error);
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
