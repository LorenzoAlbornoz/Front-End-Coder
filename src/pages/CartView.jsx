import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const CartView = () => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newQuantities, setNewQuantities] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('codertoken');

    if (token) {
      const decodedToken = jwtDecode(token);
      const cartId = decodedToken.cart;
      const userId = decodedToken.sub

      setUserId(userId);

      const fetchCart = async () => {
        try {
          const response = await axiosInstance.get(`/cart/${cartId}`);
          setCart(response.data);

          // Inicializar las cantidades en el estado
          const initialQuantities = {};
          response.data.products.forEach((item) => {
            initialQuantities[item.product._id] = item.quantity;
          });
          setNewQuantities(initialQuantities);
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
        }
      };

      fetchCart();
    }
  }, []);

  const updateQuantity = async (cartId, productId) => {
    const newQuantity = newQuantities[productId];
  
    try {
      // Usar Axios para enviar la solicitud de actualización con el método PUT
      const response = await axiosInstance.put(`/cart/${cartId}/product/${productId}`, { quantity: newQuantity });
  
      // Mostrar una alerta indicando que la cantidad se ha actualizado
      console.log("Response from server:", response.data);  // Agregado para verificar la respuesta del servidor
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Cantidad del producto actualizada exitosamente',
      });
  
      // Actualizar el carrito después de la actualización
      const updatedCart = await axiosInstance.get(`/cart/${cartId}`);
      setCart(updatedCart.data);
    } catch (error) {
      // Mostrar una alerta indicando que ha ocurrido un error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar la cantidad del producto',
      });
    }
  };
  
  

  const deleteProductFromCart = async (cartId, productId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F8A126",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        await axiosInstance.delete(`/cart/${cartId}/product/${productId}`);
  
      // Actualizar el carrito después de la actualización
      const updatedCart = await axiosInstance.get(`/cart/${cartId}`);
      setCart(updatedCart.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (productId, event) => {
    setNewQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: parseInt(event.target.value, 10),
    }));
  };

  const confirmPurchase = async (event) => {
    event.preventDefault();
  
    const result = await Swal.fire({
      title: "¿Finalizar Compra?",
      text: "¿Deseas finalizar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar compra",
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      // Enviar la solicitud para finalizar la compra
      const cartId = cart._id;
      try {
        await axiosInstance.post(`/cart/${cartId}/user/${userId}/purchase`);
        
        // Obtener el carrito actualizado después de la compra
        const updatedCart = await axiosInstance.get(`/cart/${cartId}`);
        setCart(updatedCart.data); // Actualizar el estado del carrito en el componente
        // Puedes redirigir al usuario a una página de confirmación aquí si es necesario
        Swal.fire({
          icon: 'success',
          title: '¡Compra Finalizada!',
          text: 'Gracias por tu compra.',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al finalizar la compra.',
        });
      }
    }
  };
  

  if (!cart) {
    return <div className='text-center'>Cargando...</div>;
  }

  const convertToPesos = (numb) => {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <p>Total del Carrito: ${cart.total}</p>
      <p>Cantidad Total de Productos: {cart.totalQuantity}</p>
      <div className="cart-products">
        {cart.products && cart.products.map((item) => (
          <div key={item.product._id} className="cart-product">
            <img src={item.product.image} alt={item.product.title} className="product-image" />
            <h2>{item.product.title}</h2>
            <p>Precio: {convertToPesos(item.product.price)}</p>
            <p>Cantidad: {item.quantity}</p>
            <label htmlFor={`quantity-${item._id}`}>Nueva Cantidad:</label>
            <input
              type="number"
              name={`quantity-${item._id}`}
              value={newQuantities[item.product._id]}
              min="1"
              onChange={(event) => handleQuantityChange(item.product._id, event)}
            />
            <button
              onClick={() => updateQuantity(cart._id, item.product._id)}
              className="btn btn-warning"
            >
              Actualizar Cantidad
            </button>
            <button
              onClick={() => deleteProductFromCart(cart._id, item.product._id)}
              className="btn btn-danger"
            >
              Eliminar del carrito
            </button>
          </div>
        ))}
      </div>
      <form id="cartForm" onSubmit={confirmPurchase} data-cart-id={cart._id}>
        <button type="submit" className="btn btn-success" style={{ marginTop: '10px' }}>
          <i>Finalizar Compra</i> <span id="cartQuantity">{cart.totalQuantity}</span>
        </button>
      </form>
    </div>
  );
};

export default CartView;
