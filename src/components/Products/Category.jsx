import React, { useState } from 'react';
import CategoryList from './CategoryList';
import ProductList from './ProductList';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <CategoryList onCategoryClick={handleCategoryClick} />
      {selectedCategory && <ProductList selectedCategory={selectedCategory} />}
    </div>
  );
};

export default App;