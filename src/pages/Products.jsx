import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import ProductItem from '../components/Products/ProductItem';

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);

    const getProducts = async () => {
        try {
          const resp = await axiosInstance.get('/products');
          setAllProducts(resp.data.products);
        } catch (error) {
          console.log(error);
        } 
      };

      useEffect(() => {
        getProducts();
      }, []);

  return (
    <div className='background-product'>
        <div className="container">
            <div className="row">
                <div className="col text-center my-5">
                    <h3>Conoce nuestros Productos</h3>
                </div>
            </div>
            <div className="row">
                {
                    allProducts.map((product) => (
                        <ProductItem product={product} key={product._id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Products;