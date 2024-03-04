import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../config/axiosInstance'
import { Form, InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FORM_SCHEMA } from '../../../../helpers/validationsSchemas';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

const UpdateProduct = ({ datoProduct, getProducts }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(FORM_SCHEMA)
    });

    const [categories, setCategories] = useState([])
    const [imgFiles, setImgFiles] = useState(null);
    const { title, description, price, category, images, code, stock } = datoProduct
    const [formDatos, setFormDatos] = useState({
        title,
        description,
        price,
        category,
        images,
        code,
        stock
    })

    const getCategorias = async () => {
        try {
            const resp = await axiosInstance.get('/categories');
            setCategories(resp.data.categories);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            console.log(error.response);
        }
    };

    useEffect(() => {
        getCategorias()
    }, [])

    const handleImage = (e) => {
        setImgFiles(e.target.files);  // Solo guarda un archivo en lugar de una lista
    };

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
      
          console.log('Datos antes de la actualización:', data);
      
          const formData = new FormData();
          formData.append('title', data.title);
          formData.append('description', data.description.replace(/\n/g, 'saltosDeUsuario'));
          formData.append('price', data.price);
          formData.append('category', data.category);
          formData.append('code', data.code);
          formData.append('stock', data.stock);
      
          // Si hay imágenes, agregarlas al FormData
          if (imgFiles && imgFiles.length > 0) {
            for (let i = 0; i < imgFiles.length; i++) {
              formData.append('images', imgFiles[i]);
            }
          }
      
          // Intenta hacer la solicitud
          const response = await axiosInstance.put(`/product/${datoProduct._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Verifica el estado de la respuesta
          if (response.status === 200 && response.data.status === 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Producto modificado con éxito',
            });
          } else {
            // Si hay un error en la respuesta, muestra el mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error en la actualización',
              text: response.data,
            });
          }
        } catch (error) {
          // Si hay un error en el proceso, muestra el mensaje de error
          console.error('Error al modificar el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en la actualización',
            text: `${error.response?.data?.data || 'Error desconocido'}`,
          });
        } finally {
          getProducts();
        }
      };
      

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={formDatos.title}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="register__error-message">{errors.title.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">Detalle del producto</Form.Label>
                    <Form.Control
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={formDatos.description}
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="register__error-message">{errors.description.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Precio</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="price"
                            name="price"
                            defaultValue={formDatos.price}
                            {...register("price")}
                        />
                    </InputGroup>
                    {errors.price && (
                        <p className="register__error-message">{errors.price.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Categoria</Form.Label>
                    <Form.Select
                        name="category"
                        defaultValue={formDatos.category._id}  // Proporciona solo el ID de la categoría
                        {...register("category")}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category, index) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.category && (
                        <p className="register__error-message">{errors.category.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Imagenes del producto</Form.Label>
                    <Form.Control
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleImage}
                        multiple
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Code</Form.Label>
                    <Form.Control
                        type="string"
                        id="code"
                        name="code"
                        defaultValue={formDatos.code}
                        {...register("code")}
                    />
                    {errors.code && (
                        <p className="register__error-message">{errors.code.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Stock</Form.Label>
                    <Form.Control
                        type="number"
                        id="stock"
                        name="stock"
                        defaultValue={formDatos.stock}
                        {...register("stock")}
                    />
                    {errors.stock && (
                        <p className="register__error-message">{errors.stock.message}</p>
                    )}
                </Form.Group>

                <div className='form-group text-end'>
                    <button type='submit' className='modal-button'>Editar</button>
                </div>
            </Form>
        </div>
    )
}

export default UpdateProduct;
