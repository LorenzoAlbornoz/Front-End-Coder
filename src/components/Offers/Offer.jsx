import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import OfferList from './OfferList';

const Offer = () => {
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
        <h1 className='text-center'>Productos de Oferta</h1>
      <OfferList allProducts={allProducts} getProducts={getProducts} />
    </div>
  );
};

export default Offer;