import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import OfferItem from './OfferItem';
import { axiosInstance } from '../../config/axiosInstance';
import OfferSkeleton from '../Skeleton/OfferSkeleton';
import { jwtDecode } from 'jwt-decode';

const OfferList = ({ allProducts }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [offerProducts, setOfferProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [visibleItems, setVisibleItems] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getFavorite = async () => {
          try {
            let userId = null;
    
            const localStorageToken = localStorage.getItem('codertoken');
    
            if (localStorageToken) {
              const decodedToken = jwtDecode(localStorageToken);
              userId = decodedToken.sub;
            } else {
              // Resto del código para obtener userId desde Cookies si es necesario
            }
    
            if (userId) {
              const resp = await axiosInstance.get(`/favorite/${userId}`);
              const favoriteProductIds = resp.data.products.map(({ product }) => product._id);
              setFavorites(favoriteProductIds);
            }
          } catch (error) {
            console.error('Error al obtener productos favoritos:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        getFavorite();
      }, []);
  
    const handleSelect = (selectedIndex, e) => {
      setStartIndex(selectedIndex);
    };
  
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else {
        setVisibleItems(5);
        setStartIndex(0);
      }
    };
  
    useEffect(() => {
      const fetchOfferProducts = async () => {
        try {
          const resp = await axiosInstance.get("/products");
          const allProducts = resp.data.products;
          const offerProducts = allProducts.filter(product => product.isOffer === true);
          setOfferProducts(offerProducts);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchOfferProducts();
    }, []);
  
    useEffect(() => {
      updateVisibleItems();
      window.addEventListener('resize', updateVisibleItems);
  
      return () => {
        window.removeEventListener('resize', updateVisibleItems);
      };
    }, []);
  
    const productsChunks = [];
    for (let i = 0; i < offerProducts.length; i += visibleItems) {
      productsChunks.push(offerProducts.slice(i, i + visibleItems));
    }
  
    return (
      <>
        {isLoading ? (
          <Carousel
            id='carouselCards'
            activeIndex={startIndex}
            onSelect={handleSelect}
            className='mt-1'
          >
            <Carousel.Item>
              <div className="d-flex justify-content-around">
                {Array(visibleItems).fill().map((_, index) => (
                  <OfferSkeleton key={index} />
                ))}
              </div>
            </Carousel.Item>
          </Carousel>
        ) : (
          <Carousel
            id='carouselCards'
            activeIndex={startIndex}
            onSelect={handleSelect}
            className='mt-1'
            visibleItems={visibleItems}
          >
            {productsChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-around">
                  {chunk.map((product, productIndex) => (
                    <OfferItem key={productIndex} product={product} favorites={favorites}/>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </>
    );
  };

export default OfferList;
