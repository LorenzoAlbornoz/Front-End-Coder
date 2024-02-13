import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductItem = ({ product, favorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem('codertoken');
      if (token) {
        const decodedToken = jwtDecode(token);

        // Actualizar el estado local inmediatamente para una respuesta más rápida
        setIsFavorite(!isFavorite);

        if (isFavorite) {
          await axiosInstance.delete(`/favorite/${decodedToken.favorite}/product/${product._id}`);
        } else {
          await axiosInstance.post(`/favorite/${decodedToken.favorite}/product/${product._id}`);
        }
      }
    } catch (error) {
      console.error('Error al procesar la acción de favoritos:', error);
    }
  };

  const convertToPesos = (numb) => {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  };

  useEffect(() => {
    setIsFavorite(favorites.includes(product._id));
  }, [favorites]);

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
        <Link to={`/productos/${product._id}`} className='productCard__link'>
          <div className='productCard__imgContainer'>
            <Card.Img variant="top" src={product.image} alt={product.title} className='productCard__img' />
          </div>
        </Link>
        <Card.Body className='productCard__body text-center'>
          <Card.Title className='productCard__title'>{product.title}</Card.Title>
          <Card.Subtitle className='productCard__itemprice'>{convertToPesos(product.price)}</Card.Subtitle>
          <Card.Text className='productCard__description'>
            {product.description}
          </Card.Text>
        </Card.Body>
        <div className='productCard__footer'>
          <button className='productCard__button'>
            Añadir al carrito
          </button>
        </div>
      </Card>
    </>
  );
};

export default ProductItem;
