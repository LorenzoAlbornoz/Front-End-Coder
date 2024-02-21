import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import FeaturedList from './FeaturedList';

const Featured = () => {
  const [allProducts, setAllProducts] = useState([])

    const getProducts = async () => {
        try {
           const resp = await axiosInstance.get("/products")
        setAllProducts(resp.data.products)
        } catch (error) {
          console.log(error)
        }
      }
      
      useEffect(() =>{
        getProducts()
      }, [])

  return (
      <div>
        <h1 className='text-center'>Productos Destacados</h1>
      <FeaturedList allProducts={allProducts} getProducts={getProducts} />
    </div>
  );
};

export default Featured;