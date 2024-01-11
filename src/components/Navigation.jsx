import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { FormControl, InputGroup } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar expand="lg" bg='light' className="nav-header">
    <Container>
      <Navbar.Brand href="/">E-commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"> 
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/productos">Productos</Nav.Link>
          <Nav.Link href="/nosotros">Nosotros</Nav.Link>
        </Nav>
        <Nav className="mx-auto">
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/iniciar-sesion">
            <FaUser /> Iniciar sesión
          </Nav.Link>
          <Nav.Link href="/carrito">
            <FaShoppingCart /> Carrito
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Navigation;
