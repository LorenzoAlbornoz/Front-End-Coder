import React, { useEffect, useState } from 'react';
import ProductList from '../components/Products/ProductList';
import { axiosInstance } from '../config/axiosInstance';

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([])

  const getProducts = async () => {
    try {
      const resp = await axiosInstance.get("/products")
      setAllProducts(resp.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <ProductList allProducts={allProducts} getProducts={getProducts} />
    </div>
  );
};

export default ProductPage;
