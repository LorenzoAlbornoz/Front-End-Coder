import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config/axiosInstance';
import { Form, InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_CATEGORY_SCHEMA } from '../../../helpers/validationsSchemas';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
import { FaExclamationCircle } from 'react-icons/fa';

const CategoryCreation = ({ getCategories }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(UPDATE_CATEGORY_SCHEMA)
  });

  const [imgFile, setImgFile] = useState([]);
  const [formDatos, setFormDatos] = useState({
    name: ''
  });

  const handleChangeDatos = (e) => {
    setFormDatos({
      ...formDatos,
      [e.target.name]: e.target.value
    })
  }

  const handleImage = (e) => {
    setImgFile([...e.target.files]);
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
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('image', imgFile[0]);

      await axiosInstance.post('/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Categoria Creada con éxito',
      });
      reset();
    } catch (error) {
    } finally {
      getCategories()
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
            onChange={handleChangeDatos}
            {...register("name")}
          />
          {errors.name && (
            <p className="register__error-message"><FaExclamationCircle />{errors.name.message}</p>
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
            Agregar
          </button>
        </div>
      </Form>
    </div>
  );
};


export default CategoryCreation