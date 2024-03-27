import React, { useState, useEffect } from 'react'
import FavoriteList from '../components/Favorite/FavoriteList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { axiosInstance } from '../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const Favorite = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorite = async () => {
    try {
      let userId = null;

      const localStorageToken = localStorage.getItem('codertoken');

      if (localStorageToken) {
        const decodedToken = jwtDecode(localStorageToken);
        userId = decodedToken.sub;
      } else {
        const userDataCookie = Cookies.get('user_data');

        if (userDataCookie) {
          const userData = JSON.parse(userDataCookie);

          userId = userData.sub;
        }
      }

      if (userId) {
        const response = await axiosInstance.get(`/favorite/${userId}`);
        setAllProducts(response.data.products);
        console.log(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <>

      <Container className='container'>
        <Row className="row">
          <Col >
            <FavoriteList
              setCartProducts={setCartProducts}
              cartProducts={cartProducts}
              allProducts={allProducts}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Favorite