import React, { useEffect, useState } from 'react';
import ProductItem from '../Products/ProductItem';
import ProductSkeleton from '../Skeleton/ProductSkeleton';

const FavoriteList = ({ allProducts }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <main className="container main-favorite">
          <div className="row">
            <div className="col text-center my-3">
              <h3 id="ourProducts" className="featuredProducts__titleText">
                Favoritos
              </h3>
            </div>
          </div>
    
          <div className="row">
            {isLoading ? (
              Array(12)
                .fill()
                .map((_, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <ProductSkeleton />
                  </div>
                ))
            ) : allProducts?.length === 0 ? (
              <div className="col text-center">
                <h1>No hay productos agregados a favoritos</h1>
              </div>
            ) : (
              allProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-4">
                  <ProductItem product={product.product} favorites={product.product._id} />
                </div>
              ))
            )}
          </div>
        </main>
      );
    };

export default FavoriteList;
