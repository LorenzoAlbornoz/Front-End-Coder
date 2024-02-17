import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import ProductSkeleton from '../Skeleton/ProductSkeleton';
import Cookies from 'js-cookie';

const ProductList = ({ allProducts }) => {
  // Estado para manejar la carga
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorite = async () => {
      try {
        let decodedToken;

        // Intenta obtener el token del localStorage
        const localStorageToken = localStorage.getItem('codertoken');

        if (localStorageToken) {
          // Si hay un token en localStorage, decodifícalo
          decodedToken = jwtDecode(localStorageToken);
        } else {
          // Si no hay un token en localStorage, intenta obtener la cookie 'user_data'
          const cookieUserData = Cookies.get('user_data');

          if (!cookieUserData) {
            // Si no hay token en localStorage ni cookie 'user_data', muestra un mensaje
            setIsLoading(false);
            return;
          }

          // Si hay una cookie 'user_data', parsea la información
          decodedToken = JSON.parse(cookieUserData);
        }

        const userId = decodedToken.sub;
        const resp = await axiosInstance.get(`/favorite/${userId}`);
        const favoriteProductIds = resp.data.products.map(({ product }) => product._id);
        setFavorites(favoriteProductIds);
      } catch (error) {
        console.error('Error al obtener productos favoritos:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      } finally {
        setIsLoading(false);
      }
    };

    getFavorite();
  }, []);
  

  return (
    <div className="container containerProductList">
      <div className="row">
        <div className="col text-center my-3">
          <h3 id="ourProducts" className="featuredProducts__titleText">
            Nuestros Productos
          </h3>
        </div>
      </div>

      <div className="row">
        {isLoading ? (
          Array(12)
            .fill()
            .map((_, index) => (
              <div key={index} className="col-md-3 mb-4">
                <ProductSkeleton />
              </div>
            ))
        ) : (
          allProducts.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <ProductItem product={product} favorites={favorites}/>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
