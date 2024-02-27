import React, {useState, useEffect} from 'react';
import ProductsTable from '../components/Admin/ProductTable/ProductsTable';
import UserTable from '../components/Admin/UserTable/UserTable';
import { axiosInstance } from '../config/axiosInstance';
import CategoryTable from '../components/Admin/CategotyTable/CategoryTable';

const Admin = () => {
  const [activeTable, setActiveTable] = useState('products'); // Estado para controlar qué tabla mostrar
  const [allProducts, setAllProducts] = useState([]);

  const showProductView = () => {
    setActiveTable('products');
  };

  const showUserView = () => {
    setActiveTable('users');
  };

  const showCategoryView = () => {
    setActiveTable('categories');
  };

    const getProducts = async () => {
        try {
           const resp = await axiosInstance.get("/products")
        setAllProducts(resp.data.products)
        } catch (error) {
          console.log(error)
        }
      }
      
      useEffect(() =>{
        getProducts()
      }, [])
      return (
        <>
        <div className="container admin-body">
          <div className="row">
            <div className="col mt-5 mb-4">
              <button className={`btn ${activeTable === 'products' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={showProductView}>Mostrar Productos</button>
              <button className={`btn ${activeTable === 'users' ? 'btn-dark' : 'btn-outline-dark'} ms-5`} onClick={showUserView}>Mostrar Usuarios</button>
              <button className={`btn ${activeTable === 'categories' ? 'btn-secondary' : 'btn-outline-secondary'} ms-5`} onClick={showCategoryView}>Mostrar Categorías</button>
            </div>
          </div>
          {activeTable === 'products' && <ProductsTable allProducts={allProducts} getProducts={getProducts} />}
          {activeTable === 'users' && <UserTable />}
          {activeTable === 'categories' && <CategoryTable />}
        </div>
      </>
      );
    }

export default Admin;

