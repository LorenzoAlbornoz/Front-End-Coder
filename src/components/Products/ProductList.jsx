import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import ProductSkeleton from '../Skeleton/ProductSkeleton';

const ProductList = ({ allProducts }) => {
  // Estado para manejar la carga
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorite = async () => {
      try {
        const token = localStorage.getItem('codertoken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
          const resp = await axiosInstance.get(`/favorite/${userId}`);
          console.log(resp.data);
  
          // Modificar el mapeo para obtener directamente los _id de los productos
          const favoriteProductIds = resp.data.products.map(({ product }) => product._id);
          setFavorites(favoriteProductIds);
        }
      } catch (error) {
        console.error('Error al obtener productos favoritos:', error);
      } finally {
        setIsLoading(false); // Marcar como cargado independientemente de si hubo un error o no
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
