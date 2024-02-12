import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../config/axiosInstance'
import { Form, InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FORM_SCHEMA } from '../../../../helpers/validationsSchemas';
import Swal from 'sweetalert2'

const UpdateProduct = ({ datoProduct, getProducts }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(FORM_SCHEMA)
    });

    const [categories, setCategories] = useState([])
    const [imgFile, setImgFile] = useState(null);
    const { title, description, price, category, image, code, stock } = datoProduct
    const [formDatos, setFormDatos] = useState({
        title,
        description,
        price,
        category,
        image,
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
        setImgFile(e.target.files[0]);  // Solo guarda un archivo en lugar de una lista
    };

    const onSubmit = async (data) => {
        try {
            console.log('Datos antes de la actualización:', data);

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description.replace(/\n/g, 'saltosDeUsuario'));
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('code', data.code);
            formData.append('stock', data.stock);

            // Solo agregar la nueva imagen si se seleccionó una
            if (imgFile) {
                formData.append('image', imgFile);
            }

            console.log('Datos enviados en la solicitud:', formData);

            await axiosInstance.put(`/product/${datoProduct._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Producto modificado con éxito',
            });
        } catch (error) {
            console.log(error);
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
                        // onChange={handleChangeDatos}
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
                        // onChange={handleChangeDatos}
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
                            // onChange={handleChangeDatos}
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
                    <Form.Label htmlFor="nombre">Imagen del producto</Form.Label>
                    <Form.Control
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImage}
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

export default UpdateProduct

