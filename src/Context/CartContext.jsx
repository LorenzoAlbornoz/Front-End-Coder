import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance.js'; // Asegúrate de tener la ruta correcta

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  const updateCartQuantity = (cartId) => {
    // Realizar una solicitud al servidor para obtener la cantidad del carrito
    axiosInstance.get(`/cart/quantity/${cartId}`)
      .then(response => {
        const cartQuantityFromServer = response.data.quantity;
        // Actualizar el estado local con la cantidad del carrito
        setCartQuantity(cartQuantityFromServer);
      })
      .catch(error => {
        console.error('Error al obtener la cantidad del carrito:', error);
      });
  };

  useEffect(() => {
    // Puedes realizar alguna lógica adicional cuando el contexto se inicializa, si es necesario
    // ...

    // Luego, puedes realizar la primera actualización de la cantidad del carrito (si se necesita)
    // updateCartQuantity(initialCartId);
  }, []); // Asegúrate de incluir las dependencias necesarias si las tienes

  const values = {
    cartQuantity,
    updateCartQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
