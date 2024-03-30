import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const SuccessContainer = styled.div`
  text-align: center;
  margin: 2rem auto;
  max-width: 800px;
  font-size: 15px;
`;

const SuccessTitle = styled.h2`
  color: #28a745;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 4.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const PurchaseDetails = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ProductInfo = styled.div`
  flex: 0.85;
`;

const TotalItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  font-size: 2rem;
`;

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

const PurchaseSuccess = () => {
  const { updateCartQuantity } = useCart();
  const [cart, setCart] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      const userInfo = getUserInfo();

      if (userInfo) {
        const { ticketId } = userInfo;

        try {
          // Simulación de carga de 5 segundos
          setTimeout(async () => {
            const response = await axiosInstance.get(`/ticket/${ticketId}`);
            setTicket(response.data);
            setIsLoading(false); // Cuando se completa la carga del ticket
          }, 2000);
        } catch (error) {
          console.error('Error al obtener el ticket:', error);
          setIsLoading(false); // En caso de error, también detenemos la carga
        }
      }
    };

    const confirmPurchase = async () => {
      const userInfo = getUserInfo();

      if (userInfo) {
        const { cartId, ticketId } = userInfo;

        try {
          await axiosInstance.post(`/cart/${cartId}/ticket/${ticketId}/purchase`);

          // Actualizar el carrito después de la compra
          const response = await axiosInstance.get(`/ticket/${ticketId}`);
          const updatedCart = await axiosInstance.get(`/cart/${cartId}`);
          setTicket(response.data);
          setCart(updatedCart.data);
          updateCartQuantity(cartId);
        } catch (error) {
          console.error('Error al realizar la compra:', error);
        }
      }
    };

    const getUserInfo = () => {
      const token = localStorage.getItem('codertoken');

      if (token) {
        const decodedToken = jwtDecode(token);
        return {
          userId: decodedToken.sub,
          cartId: decodedToken.cart,
          ticketId: decodedToken.ticket
        };
      }

      const userDataCookie = Cookies.get('user_data');

      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        return {
          userId: userData.sub,
          cartId: userData.cart,
          ticketId: userData.ticket
        };
      }

      return null;
    };

    fetchTicket();
    confirmPurchase();
  }, []);

  const convertToPesos = (numb) => {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  };

  return (
    <SuccessContainer>
      <SuccessTitle>¡Compra exitosa!</SuccessTitle>
      {isLoading ? (
        <CustomLoader /> // Mostrar el spinner durante 5 segundos
      ) : (
        <>
          {ticket && ticket.ticket.products && (
            <PurchaseDetails>
              {ticket.ticket.products.map((item) => (
                <DetailItem key={item.product._id}>
                  <ProductImage src={item.product.images[0]} alt={item.product.title} />
                  <ProductInfo>
                    <p><strong>{item.product.title}</strong></p>
                    <p>{item.quantity} x {convertToPesos(item.product.price)}</p>
                    <p className="d-none d-md-block">{item.product.description}</p>
                  </ProductInfo>
                </DetailItem>
              ))}
              <TotalItem>
                <p><strong>Total:</strong></p>
                <p>{convertToPesos(ticket.ticket.total)}</p>
              </TotalItem>
            </PurchaseDetails>
          )}
          <SuccessMessage>¡Gracias por tu compra!</SuccessMessage>
          <Link to="/products" className="btn btn-warning">
            <i className="fa fa-angle-left"></i> Continuar Comprando
          </Link>
        </>
      )}
    </SuccessContainer>
  );
};

export default PurchaseSuccess;
