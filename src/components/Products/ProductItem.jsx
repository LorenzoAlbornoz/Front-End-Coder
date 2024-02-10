import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ product }) => {
 
    return (
        <Link to={`/product/${product._id}`}  className='col-3 mb-4' >
            <div className="card h-100">
                <img src={product.image} className='card-img-top' alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Descripción: {product.description}</p>
                    <p className="card-text">Precio: ${product.price}</p>
                    <p className="card-text">Categoría: {product.category.name}</p>
                    <p className="card-text">Código: {product.code}</p>
                    <p className="card-text">Stock: {product.stock}</p>
                    <div className='text-center position-absolute bottom-0 start-50 translate-middle-x'>
                        <button className='btn btn-primary'>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem