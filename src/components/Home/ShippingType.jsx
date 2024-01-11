import React from 'react'
import { PiCertificateDuotone, PiTruck,PiCreditCardThin } from 'react-icons/pi';

const ShippingType = () => {
  return (
    <>
    <section className='ShippingType'>
        <div className="ShippingType__container">
            <div className='ShippingType__item'>
                <PiCertificateDuotone className='ShippingType__icons'/>
                <span className='ShippingType__text'>Garantía oficial</span>

            </div>
            <div className='ShippingType__item'>
                <PiTruck className='ShippingType__icons'/>
                <span className='ShippingType__text'>Envíos a todo el país</span>

            </div>
            <div className='ShippingType__item'>
                <PiCreditCardThin className='ShippingType__icons'/>
                <span className='ShippingType__text'>3, 6, 12 y 18 Cuotas</span>

            </div>
        </div>
    </section>

    </>
  )
}

export default ShippingType