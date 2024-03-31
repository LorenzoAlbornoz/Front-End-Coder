import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CancelContainer = styled.div`
  text-align: center;
  margin: 10rem auto;
  max-width: 800px;
  font-size: 15px;
`;

const CancelTitle = styled.h2`
  color: #dc3545; /* Color rojo para indicar error */
  margin-bottom: 40px;
  margin-top: 40px;
  font-size: 4.5rem;
`;

const CancelMessage = styled.p`
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

const ContinueShoppingButton = styled(Link)`
  background-color: #ffc107; /* Color amarillo */
  color: #212529; /* Color de texto oscuro */
  border: none;
  padding: 10px 20px;
  font-size: 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca2c; /* Color amarillo más claro al pasar el mouse */
  }
`;

const CancelPurchasePage = () => {
  return (
    <CancelContainer>
      <CancelTitle>¡Compra cancelada!</CancelTitle>
      <CancelMessage>Hubo un problema al procesar tu compra.</CancelMessage>
      <ContinueShoppingButton to="/products">Continuar comprando</ContinueShoppingButton>
    </CancelContainer>
  );
};

export default CancelPurchasePage;
