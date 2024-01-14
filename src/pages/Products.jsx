import React from 'react'
import { products } from '../helpers/data'
import ProductItem from '../components/Products/ProductItem'

const Products = () => {
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
                    products.map((product) => (
                        <ProductItem product={product} key={product.id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Products
