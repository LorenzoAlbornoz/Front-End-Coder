import React from 'react'
import CarouselHome from '../components/Home/CarouselHome'
import ShippingType from '../components/Home/ShippingType'
import WhatsappLink from '../components//Home/WhatsAppLink'

const Home = () => {
    return (
        <>
         <CarouselHome />
         <ShippingType/>
            <div className='container home-container'>
                <div className='row'>
                    <div className='col-6'>
                        {/* <a href="#" className='btn btn-outline-info mt-3'></a> */}
                    </div>
                </div>
            </div>
            <WhatsappLink/>
        </>
    )
}

export default Home