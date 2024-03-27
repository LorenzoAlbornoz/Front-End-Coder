import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useCart } from '../..//Context/CartContext';

const OfferItem = ({ product, favorites }) => {
  const { updateCartQuantity } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      const localStorageToken = localStorage.getItem('codertoken');
      let decodedToken;

      if (localStorageToken) {
        decodedToken = jwtDecode(localStorageToken);
      } else {
        const cookieUserData = Cookies.get('user_data');

        if (!cookieUserData) {
          Swal.fire('Inicia sesión', 'Debes iniciar sesión para gestionar tus favoritos', 'info');
          return;
        }

        decodedToken = JSON.parse(cookieUserData);
      }

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
      const localStorageToken = localStorage.getItem('codertoken');
      let decodedToken;

      if (localStorageToken) {
        decodedToken = jwtDecode(localStorageToken);
      } else {
        const cookieUserData = Cookies.get('user_data');

        if (!cookieUserData) {
          Swal.fire('Inicia sesión', 'Debes iniciar sesión para agregar un producto a tu carrito', 'info');
          return;
        }

        decodedToken = JSON.parse(cookieUserData);
      }

      const cartId = decodedToken.cart;

      await axiosInstance.post(`/cart/${cartId}/product/${product._id}`);

      updateCartQuantity(cartId);

      Swal.fire('Añadido al carrito', '', 'success');
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);

      const errorMessage = error.response?.data?.error || 'Hubo un error al agregar el producto al carrito';

      Swal.fire('Error', errorMessage, 'error');
    }
  };
  useEffect(() => {
    setIsFavorite(favorites.includes(product._id));
  }, [favorites, product._id]);

  return (
    <>
      <Card key={product._id} className='offerCard'>
        <div className='offerCard__header'>
          <button
            className={`offerCard__favorite `}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? (
              <FaHeart className={`offerCard__favorite-icons favorite`} />
            ) : (
              <FaRegHeart className='offerCard__favorite-icons' />
            )}
          </button>
        </div>
        <Link to={`/product/${product._id}`} className='offerCard__link'>
          <div className='offerCard__imgContainer'>
            <Card.Img variant="top" src={product.images[0]} alt={product.title} className='offerCard__img' />
          </div>
        </Link>
        <Card.Body className='offerCard__body text-center'>
          <Card.Title className='offerCard__title'>{product.title}</Card.Title>
          <Card.Subtitle className='mb-2 offerCard__price'>{convertToPesos(product.price)}</Card.Subtitle>
          <Card.Text className='offerCard__description'>
            {product.description}
          </Card.Text>
        </Card.Body>
        <div className='offerCard__footer'>
          <button className='btn btn-primary offerCard__button' onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </Card>
    </>
  );
};

export default OfferItem;
