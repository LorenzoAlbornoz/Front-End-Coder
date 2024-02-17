import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; 

const ProductItem = ({ product, favorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteToggle = async () => {
    try {
      // Intenta obtener el token del localStorage
      const localStorageToken = localStorage.getItem('codertoken');
      let decodedToken;

      if (localStorageToken) {
        // Si hay un token en localStorage, decodifícalo
        decodedToken = jwtDecode(localStorageToken);
      } else {
        // Si no hay un token en localStorage, intenta obtener la cookie 'user_data'
        const cookieUserData = Cookies.get('user_data');

        if (!cookieUserData) {
          // Si no hay token en localStorage ni cookie 'user_data', muestra un mensaje
          Swal.fire('Inicia sesión', 'Debes iniciar sesión para gestionar tus favoritos', 'info');
          return;
        }

        // Si hay una cookie 'user_data', parsea la información
        decodedToken = JSON.parse(cookieUserData);
      }

      // Actualizar el estado local inmediatamente para una respuesta más rápida
      setIsFavorite(!isFavorite);

      if (isFavorite) {
        await axiosInstance.delete(`/favorite/${decodedToken.favorite}/product/${product._id}`);
        Swal.fire('Eliminado de favoritos', '', 'success');
      } else {
        await axiosInstance.post(`/favorite/${decodedToken.favorite}/product/${product._id}`);
        Swal.fire('Añadido a favoritos', '', 'success');
      }
    } catch (error) {
      console.error('Error al procesar la acción de favoritos:', error);
      Swal.fire('Error', 'Hubo un error al procesar la acción de favoritos', 'error');
    }
  };

  const convertToPesos = (numb) => {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  };

  const handleAddToCart = async () => {
    try {
      // Intenta obtener el token del localStorage
      const localStorageToken = localStorage.getItem('codertoken');
      let decodedToken;

      if (localStorageToken) {
        // Si hay un token en localStorage, decodifícalo
        decodedToken = jwtDecode(localStorageToken);
      } else {
        // Si no hay un token en localStorage, intenta obtener la cookie 'user_data'
        const cookieUserData = Cookies.get('user_data');

        if (!cookieUserData) {
          // Si no hay token en localStorage ni cookie 'user_data', muestra un mensaje
          Swal.fire('Inicia sesión', 'Debes iniciar sesión para agregar un producto a tu carrito', 'info');
          return;
        }

        // Si hay una cookie 'user_data', parsea la información
        decodedToken = JSON.parse(cookieUserData);
      }

      const cartId = decodedToken.cart; // Obtén el ID del carrito del token

      // Realiza la solicitud POST para agregar el producto al carrito
      await axiosInstance.post(`/cart/${cartId}/product/${product._id}`);

      Swal.fire('Añadido al carrito', '', 'success');
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      Swal.fire('Error', 'Hubo un error al agregar el producto al carrito', 'error');
    }
  };

  useEffect(() => {
    setIsFavorite(favorites.includes(product._id));
  }, [favorites, product._id]);

  return (
    <>
      <Card key={product._id} className='productCard'>
        <div className='d-flex justify-content-end m-3'>
          <button
            className={`productCard__favorite `}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? (
              <FaHeart className={`productCard__favorite-icons favorite`} />
            ) : (
              <FaRegHeart className='productCard__favorite-icons' />
            )}
          </button>
        </div>
        <Link to={`/product/${product._id}`} className='productCard__link'>
          <div className='productCard__imgContainer'>
            <Card.Img variant="top" src={product.image} alt={product.title} className='productCard__img' />
          </div>
        </Link>
        <Card.Body className='productCard__body text-center'>
          <Card.Title className='productCard__title'>{product.title}</Card.Title>
          <Card.Subtitle className='mb-2 productCard__price'>{convertToPesos(product.price)}</Card.Subtitle>
          <Card.Text className='productCard__description'>
            {product.description}
          </Card.Text>
          <Card.Text className='productCard__category'>
            Categoría: {product.category.name}
          </Card.Text>
          <Card.Text className='productCard__stock'>
            Stock disponible: {product.stock}
          </Card.Text>
        </Card.Body>
        <div className='productCard__footer'>
          <button className='btn btn-primary productCard__button' onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </Card>
    </>
  );
};

export default ProductItem;
