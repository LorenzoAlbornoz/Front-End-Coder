import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { axiosInstance } from '../../config/axiosInstance';

const CategoryList = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Hacer la solicitud al endpoint de categorías
    axiosInstance
      .get('/categories')
      .then((response) => setCategories(response.data.categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings} className="category-list">
      {categories.map((category) => (
        <div key={category._id} onClick={() => onCategoryClick(category.name)} className="category-item">
          <img src={category.image} alt={category.name} className="img-fluid category-image" />
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </Slider>
  );
};

export default CategoryList;
