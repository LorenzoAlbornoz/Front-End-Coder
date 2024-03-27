import React from 'react';

const ShippingType = () => {
  return (
    <>
      <section className='ShippingType'>
        <div className="ShippingType__container">
          <div className='ShippingType__item'>
            <img
              src='https://res.cloudinary.com/dcwpf7ghu/image/upload/v1705068382/cart_gfixuf.png'
              alt='Tarjeta de crédito y débito'
              className='ShippingType__card d-none d-sm-block'
            />
            <span className='ShippingType__text d-none d-sm-block'>Pagá con crédito y débito</span>
          </div>
          <div className='ShippingType__item'>
            <img
              src='https://res.cloudinary.com/dcwpf7ghu/image/upload/v1705068382/shipping_t43xk9.png'
              alt='Envíos a todo el país y retiro gratis'
              className='ShippingType__img'
            />
            <span className='ShippingType__text'>Envíos a todo el país y retiro gratis</span>
          </div>
          <div className='ShippingType__item'>
            <img
              src='https://res.cloudinary.com/dcwpf7ghu/image/upload/v1705068382/quota_xt4q2z.png'
              alt='3, 6, 12 y 18 Cuotas'
              className='ShippingType__img'
            />
            <span className='ShippingType__text'>3, 6, 12 y 18 Cuotas</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingType;
