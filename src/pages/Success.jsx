import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useCart} from '../Context/CartContext'

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

const PurchaseSuccess = () => {
    const { updateCartQuantity } = useCart();
    const [cart, setCart] = useState(null);
    const [userId, setUserId] = useState(null);
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
            const { cartId, userId } = userInfo;

            const fetchCart = async () => {
                try {
                    const response = await axiosInstance.get(`/cart/${cartId}`);
                    setCart(response.data);
                    confirmPurchase(userId);
                } catch (error) {
                    console.error('Error al obtener el carrito:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCart();
        }
    }, []);

    const confirmPurchase = async () => {
        if (!cart) return;

        const cartId = cart._id;
        const userId = getUserInfo().userId;
    
        try {
            await axiosInstance.post(`/cart/${cartId}/user/${userId}/purchase`);

       // Actualizar el carrito después de la compra
      const updatedCart = await axiosInstance.get(`/cart/${cartId}`);
      setCart(updatedCart.data);
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          alert('Error: No se pudo finalizar la compra.');
        }
      };

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
            {cart && (
                <PurchaseDetails>
                    {cart.products.map((item) => (
                        <DetailItem key={item.product._id}>
                            <ProductImage src={item.product.images[0]} alt={item.product.title} />
                            <ProductInfo>
                                <p><strong>{item.product.title}</strong></p>
                                <p>{item.quantity} x {convertToPesos(cart.total)}</p>
                                <p className="d-none d-md-block">{item.product.description}</p>
                            </ProductInfo>
                        </DetailItem>
                    ))}
                    <TotalItem>
                        <p><strong>Total:</strong></p>
                        <p>{convertToPesos(cart.total)}</p>
                    </TotalItem>
                </PurchaseDetails>
            )}
            <SuccessMessage>¡Gracias por tu compra!</SuccessMessage>
            <Link to="/products" className="btn btn-warning">
                <i className="fa fa-angle-left"></i> Continuar Comprando
            </Link>
        </SuccessContainer>
    );
};

export default PurchaseSuccess;
