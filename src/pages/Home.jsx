import React from 'react'
import CarouselHome from '../components/Home/CarouselHome'
import ShippingType from '../components/Home/ShippingType'

const Home = () => {
    return (
        <>
         <CarouselHome />
         <ShippingType/>
            <div className='container home-container'>
                <div className='row'>
                    <div className='col-6'>
                        <h1>La plataforma de aprendizaje para desarrolladores</h1>
                        <a href="#" className='btn btn-outline-info mt-3'></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home