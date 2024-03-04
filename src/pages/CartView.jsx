import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import styled, { keyframes } from "styled-components";
import { FaSyncAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartView = () => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newQuantities, setNewQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = () => {
    const token = localStorage.getItem('codertoken');
  
    if (token) {
      const decodedToken = jwtDecode(token);
      return {
        userId: decodedToken.sub,
        cartId: decodedToken.cart,
      };
    }
  
    const userDataCookie = Cookies.get('user_data');
  
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      return {
        userId: userData.sub,
        cartId: userData.cart,
       
      };
    }
    return null;
  };

  useEffect(() => {
    const userInfo = getUserInfo();

    if (userInfo) {
      const { userId, cartId } = userInfo;
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
        } finally {
          setIsLoading(false);
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

  const clearCart = async (cartId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esto eliminará todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F8A126",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`/cleanCart/${cartId}`);

        // Actualizar el carrito después de la eliminación
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
          text: 'No hay stock disponible o hubo un error.',
        });
      }
    }
  };

  const convertToPesos = (numb) => {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  };

  const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
 
   to {
    transform: rotate(360deg);
  }
 `;
 
 const SpinnerContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
 `;
 
 const Spinner = styled.div`
   animation: ${rotate360} 1s linear infinite;
   transform: translateZ(0);
   border-top: 2px solid var(--c-mainColor);
   border-right: 2px solid var(--c-mainColor);
   border-bottom: 2px solid var(--c-secondColor);
   border-left: 4px solid var(--c-grey);
   background: transparent;
   width: 40px;
   height: 40px;
   border-radius: 50%;
 `;

 const CustomLoader = () => (
   <div style={{ padding: "24px" }}>
   <SpinnerContainer>
     <Spinner />
   </SpinnerContainer>
     <div className="loginPage__custom-loading-text">Cargando...</div>
   
   </div>
 );

 if (isLoading) {
  return <CustomLoader />;
}

  if (!cart || cart.products.length === 0) {
    return <p className="important-titles">No hay productos en el carrito.</p>;
  }

  return (
    <div className="cart-container">
      <table className="cart-table table table-hover table-condensed">
        <thead className="table-head">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th className="text-center">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {cart.products.map((item) => (
            <tr key={item.product._id}>
              <td>
                <div className="row">
                  <div className="col-sm-2 hidden-xs">
                    <img className="product-image" src={item.product.images[0]} alt={item.product.title} />
                  </div>
                  <div className="col-sm-10">
                    <div>
                      <h4 className="nomargin">{item.product.title}</h4>
                      <p className="cart-description">{item.product.description}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td>{convertToPesos(item.product.price)}</td>
              <td>
                <select
                  name={`quantity-${item._id}`}
                  value={newQuantities[item.product._id]}
                  onChange={(event) => handleQuantityChange(item.product._id, event)}
                  className="form-control" // Agregada clase Bootstrap para estilos de formulario
                >
                  {[1, 2, 3, 4, 5].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="text-center">{convertToPesos(item.product.price * item.quantity)}</td>
              <td className="actions-column">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => updateQuantity(cart._id, item.product._id)}
                >
                  <FaSyncAlt style={{ fontSize: '15px', color: 'white' }} />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProductFromCart(cart._id, item.product._id)}
                >
                  <FaTrashAlt style={{ fontSize: '15px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="tfoot-container">
          <tr>
            <td>
              <Link to="/products" className="btn btn-warning">
                <i className="fa fa-angle-left"></i> Continuar Comprando
              </Link>
            </td>
            <td colSpan="2" className="hidden-xs"></td>
            <td className="hidden-xs text-center">
              <strong>Total {convertToPesos(cart.total)}</strong>
            </td>
            <td>
              <form id="cartForm" onSubmit={confirmPurchase} data-cart-id={cart._id}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => clearCart(cart._id)}
              >
                Vaciar Carrito
              </button>
                <button type="submit" className="btn btn-success">
                  Finalizar Compra
                </button>
           
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartView;