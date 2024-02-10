import React from 'react'

const ProductDetail = ({ product }) => {

    const { data } = product
    return (
        <>
            {data.length !== 0 ? (
                  <div className='container mt-4'>
                  <div className='row'>
                    <div className='col-lg-7 d-flex justify-content-center align-items-center'>
                      <div className='text-center'>
                        <img src={data[0].image} alt={data[0].title} className='img-fluid img-product' />
                      </div>
                    </div>
                    <div className='col-lg-5'>
                      <div className='row'>
                        <div className='col mt-5'>
                          <h1>{data[0].title}</h1>
                        </div>
                        <div className='mt-4'>
                          <h2>{data[0].description}</h2>
                        </div>
                        <div className='mt-4'>
                          <h4>{data[0].category.name}</h4>
                        </div>
                        <div className='mt-4'>
                          <h3>{data[0].price}</h3>
                        </div>
                        <div>
                          <button
                            className='btn btn-warning mt-4 mb-4'
                          >
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <div className="containter mt-5">
                    <div className="row">
                        <div className="col text-center">
                            <h3>Producto no encontrado</h3>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}

export default ProductDetail