// Home.jsx

import React from 'react';
import CarouselHome from '../components/Home/CarouselHome';
import ShippingType from '../components/Home/ShippingType';
import WhatsappLink from '../components//Home/WhatsAppLink';
import Featured from '../components/Featured/Featured';
import Offer from '../components/Offers/Offer';

const Home = () => {
  const images = [
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350220/Publicidad_2_goa9rh.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350220/Publicidad_1_gv9ea2.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350219/Publicidad_3_eb3ooh.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350219/Publicidad_4_dn5zvg.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350220/Publicidad_5_ijv2eg.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350219/Publicidad_6_o0lmkv.jpg',
    'https://res.cloudinary.com/dcwpf7ghu/image/upload/v1708350220/Publicidad_7_gslmvm.jpg',
  ];

  // Divide las imágenes en grupos
  const group1 = images.slice(0, 2);
  const group2 = images.slice(2, 5);
  const group3 = images.slice(5, 7);

  return (
    <>
      <CarouselHome />
      <ShippingType />
      <div className="home-image-container">
        {group1.map((image, index) => (
          <img key={index} src={image} alt={`Ad ${index + 1}`} className="home-image" />
        ))}
      </div>

      <Featured />

      <div className="home-image-container">
        {group2.map((image, index) => (
          <img key={index} src={image} alt={`Ad ${index + 3}`} className="home-image2" />
        ))}
      </div>

      <Offer />

      <div className="home-image-container">
        {group3.map((image, index) => (
          <img key={index} src={image} alt={`Ad ${index + 6}`} className="home-image" />
        ))}
      </div>
      <WhatsappLink />
    </>
  );
};

export default Home;
