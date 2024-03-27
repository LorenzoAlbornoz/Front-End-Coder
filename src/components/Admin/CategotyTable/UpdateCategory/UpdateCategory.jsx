import React, { useState } from 'react';
import { axiosInstance } from '../../../../config/axiosInstance';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_CATEGORY_SCHEMA } from '../../../../helpers/validationsSchemas';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { FaExclamationCircle } from 'react-icons/fa';

const UpdateCategory = ({ datoCategory, getCategories }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(UPDATE_CATEGORY_SCHEMA),
  });
  const [imgFile, setImgFile] = useState(null);
  const { name, image } = datoCategory;
  const [formDatos, setFormDatos] = useState({
    name,
    image
  });

  const handleImage = (e) => {
    setImgFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('codertoken') || Cookies.get('codertoken');

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        });
        return;
      }

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole !== 'admin') {
        Swal.fire({
          icon: 'error',
          title: 'No tienes permisos para modificar usuarios.',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', data.name);

      if (imgFile) {
        formData.append('image', imgFile);
      }

      console.log('Datos enviados en la solicitud:', formData);

      await axiosInstance.put(`/category/${datoCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Categoria modificada con éxito',
      });
    } catch (error) {
      console.error('Error al modificar la categoria:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error en la actualización',
        text: 'Hubo un error al modificar la categoria. Por favor, intenta nuevamente.',
      });
    } finally {
      getCategories();
    }
  };


  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            defaultValue={formDatos.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="register__error-message">
              <FaExclamationCircle />{errors.name.message}
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="nombre">Imagen de la Categoria</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
          />
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

export default UpdateCategory;
