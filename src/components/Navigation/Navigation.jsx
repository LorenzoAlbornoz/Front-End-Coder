import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navigation = () => {
  const [inputValue, setInputValue] = useState("")
  
  const handleSubmit = (e) => {
   e.preventDefault()
   console.log("submit")
  }

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
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Nav className="mx-auto">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="d-flex align-items-center">
              <input type="text" placeholder='Buscar' onChange={(e) => setInputValue(e.target.value)}/>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;