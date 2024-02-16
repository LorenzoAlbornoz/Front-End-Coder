import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { RiHeart3Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import SearchBar from '../SearchBar/SearchBar';
import { axiosInstance } from '../../config/axiosInstance';
import Cookies from 'js-cookie'; // Importa la biblioteca js-cookie


const Navigation = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  // Verificar si el token está en localStorage
  const localStorageToken = localStorage.getItem('codertoken');

  // Verificar si el token está en cookies
  const cookieToken = Cookies.get('codertoken');

  Cookies.set('codertoken', 'valor_de_tu_token', { expires: 7 });


  // Imprime todas las cookies disponibles
  console.log('Cookies disponibles:', document.cookie);

  // Determinar si el usuario está logueado y obtener el token
  const token = localStorageToken || cookieToken;
  const isLogged = !!token;

  let userRole = '';
  let cartId = '';
  if (isLogged) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
    cartId = decodedToken.cart;
  }

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
        Cookies.remove('codertoken'); // Eliminar el token de las cookies también
        localStorage.removeItem('userRole');
        navigate('/');
      }
    });
  };

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
    // Actualizar la cantidad del carrito al cargar el componente
    updateCartQuantity(cartId);
  }, [cartId]);

  const showLogout = isLogged && (
    <div className='row align-items-center flex-column flex-sm-row'>
      <div className='col-auto'>
        <button className='nav-header__cerrar-sesion' onClick={logOut}>
          Cerrar Sesión
        </button>
      </div>
      <div className='col-auto mt-2 mt-sm-0'></div>
    </div>
  );

  // Agregar console.log para verificar la fuente del token
  useEffect(() => {
    console.log('Token obtenido:', token);
    console.log('Fuente del token:', localStorageToken ? 'localStorage' : 'cookies');
  }, [token]);

  const handleUnauthorizedAccess = (event) => {
    event.preventDefault(); // Evitar que el enlace redireccione inmediatamente
  
    Swal.fire({
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para acceder a esta función',
      icon: 'info',
      confirmButtonText: 'Entendido',
    })
  };
  

  return (
    <Navbar expand='lg' bg='light' className='nav-header'>
      <Container>
        <Navbar.Brand>
          <img
            src='https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704945934/fravega_fgkexe.png'
            height='100'
            alt='Frávega Logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-center text-center'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Inicio</Nav.Link>
            <Nav.Link href='/products'>Productos</Nav.Link>
            {userRole === 'admin' && (
              <Nav.Link as={Link} to='/admin' className='nav-header__link'>
                Administración
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className='d-flex align-items-center'>
          <SearchBar />
        </div>
        <Nav className='ml-auto icons-group d-flex flex-row align-items-center justify-content-center text-center'>
          <Nav.Link href='/login' className='ml-lg-2'>
            <FaUser className='nav-header__login' />
          </Nav.Link>
          <Nav.Link href={`/cart/${cartId}`} className='ml-lg-2' onClick={isLogged ? null : handleUnauthorizedAccess}>
  <FaShoppingCart className='nav-header__cart' />
  <span id='cartQuantity'>{cartQuantity}</span>
</Nav.Link>
<Nav.Link as={Link} to='/favorite' className='ml-lg-2' onClick={isLogged ? null : handleUnauthorizedAccess}>
  <RiHeart3Fill className='nav-header__heart' />
</Nav.Link>

          {showLogout}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
