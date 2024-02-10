import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { RiHeart3Fill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const token = localStorage.getItem('codertoken');
  const isLogged = !!token;

  let userRole = '';
  if (isLogged) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  const navigate = useNavigate();

  const logOut = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8A126',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('codertoken');
        localStorage.removeItem('userRole');
        navigate('/');
      }
    });
  };

  const showFavoritesAndLogout = isLogged && (
    <div className='icons user-actions d-none d-sm-flex'>
      <Nav.Link as={Link} to='/favorite'>
        <RiHeart3Fill className="nav-header__heart" />
      </Nav.Link>
      <Button className="nav-header__cerrar-sesion" onClick={logOut}>
        Cerrar Sesión
      </Button>
    </div>
  );

  return (
    <Navbar expand="lg" bg='light' className="nav-header">
      <Container>
        <Navbar.Brand>
          <img src='https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704945934/fravega_fgkexe.png' height="100" alt="Frávega Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            {userRole === 'admin' && (
              <Nav.Link as={Link} to="/admin" className='nav-header__link'>Administración</Nav.Link>
            )}
          </Nav>
          <Nav className="mx-auto">
            <form onSubmit={handleSubmit} className="search-form">
              <div className="d-flex align-items-center">
                <input type="text" placeholder='Buscar' onChange={(e) => setInputValue(e.target.value)} />
                <button type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/login">
              <FaUser />
            </Nav.Link>
            <Nav.Link href="/cart">
              <FaShoppingCart />
            </Nav.Link>
          </Nav>
          <div className='d-flex icons-group'>
            <div className='icons'>
              <Nav.Link> </Nav.Link>
            </div>
            {showFavoritesAndLogout}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
