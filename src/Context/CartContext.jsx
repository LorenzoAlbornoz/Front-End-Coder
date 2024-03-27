import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  const updateCartQuantity = (cartId) => {
    axiosInstance.get(`/cart/quantity/${cartId}`)
      .then(response => {
        const cartQuantityFromServer = response.data.quantity;
        setCartQuantity(cartQuantityFromServer);
      })
      .catch(error => {
        console.error('Error al obtener la cantidad del carrito:', error);
      });
  };

  useEffect(() => {
  }, []);

  const values = {
    cartQuantity,
    updateCartQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
