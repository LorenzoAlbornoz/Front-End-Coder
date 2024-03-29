import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { jwtDecode } from 'jwt-decode';
import ProductSkeleton from '../Skeleton/ProductSkeleton';
import Cookies from 'js-cookie';
import CategoryList from './CategoryList';
import SelectorBar from './SelectorBar';
import { axiosInstance } from '../../config/axiosInstance';

const sortProducts = (products, order) => {
  switch (order) {
    case '1':
      return products.slice().sort((a, b) => a._id - b._id);
    case '2':
      return products.slice().sort((a, b) => a.price - b.price);
    case '3':
      return products.slice().sort((a, b) => b.price - a.price);
    case '4':
      return products.slice().sort((a, b) => a.title.localeCompare(b.title));
    case '5':
      return products.slice().sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products.slice();
  }
};

const ProductList = ({ allProducts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedOrder, setSelectedOrder] = useState('1');

  useEffect(() => {
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
          const resp = await axiosInstance.get(`/favorite/${userId}`);
          const favoriteProductIds = resp.data.products.map(({ product }) => product._id);
          setFavorites(favoriteProductIds);
        }
      } catch (error) {
        console.error('Error al obtener productos favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getFavorite();
  }, [selectedOrder]);

  const handleCategoryClick = async (categoryName) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/products/category?categoryName=${categoryName}`);
      setSelectedCategory(categoryName);

      const totalFilteredProducts = response.data.products.length;

      const newPage = Math.ceil(totalFilteredProducts / itemsPerPage);

      if (currentPage > newPage) {
        setCurrentPage(newPage > 0 ? newPage : 1);
      }

      setFavorites(response.data.products.map(({ product }) => product._id));
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortProducts(
    allProducts.filter(product => !selectedCategory || product.category.name === selectedCategory),
    selectedOrder
  ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container containerProductList">
      <CategoryList onCategoryClick={handleCategoryClick} />
      <SelectorBar onOrderChange={setSelectedOrder} />
      <div className="row">
        <div className="col text-center my-3"></div>
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
          currentItems.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <ProductItem product={product} favorites={favorites} />
            </div>
          ))
        )}
      </div>

      {(!selectedCategory && allProducts.length > itemsPerPage) && (
        <div className="pagination-container">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">Anterior</button>
          <span className="pagination-current">{currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(allProducts.length / itemsPerPage)} className="pagination-button">Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
