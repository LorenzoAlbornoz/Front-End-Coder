import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const CarouselHome = () => {
  return (
    <>
      <Carousel id='carouselHome' interval={3000} slide>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704944088/img1_wnzcdm.webp"
            alt="first slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704944089/img2_mo4ine.webp"
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704944089/img3_tlmjv0.webp"
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://res.cloudinary.com/dcwpf7ghu/image/upload/v1704944088/img4_u2wpjv.webp"
            alt="Second slide"
          />

        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default CarouselHome