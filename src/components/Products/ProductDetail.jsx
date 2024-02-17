import React from 'react';

const convertToPesos = (numb) => {
  if (typeof numb !== 'undefined') {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  } else {
    return ''; 
  }
};

const ProductDetail = ({ product }) => {
  console.log(product)
  return (
    <>
      {product !== null ? (
        <div className='container mt-4'>
          <div className='row'>
            <div className='col-lg-7 d-flex justify-content-center align-items-center'>
              <div className='text-center'>
                <img src={product?.image} alt={product?.title} className='img-fluid img-product' />
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='row'>
                <div className='col mt-5'>
                  <h1>{product?.title}</h1>
                </div>
                <div className='mt-4'>
                  <h2>{product?.description}</h2>
                </div>
                <div className='mt-4'>
                  <h4>{product?.category?.name}</h4>
                </div>
                <div className='mt-4'>
                  <h3>{convertToPesos(product?.price)}</h3>
                </div>
                <div>
                  <button className='btn btn-warning mt-4 mb-4'>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
              <h3>Producto no encontrado</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
