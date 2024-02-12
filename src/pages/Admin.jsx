import React, {useState, useEffect} from 'react';
import ProductsTable from '../components/Admin/ProductTable/ProductsTable';
import UserTable from '../components/Admin/UserTable/UserTable';
import { axiosInstance } from '../config/axiosInstance';

const Admin = () => {
  const [showProductTable, setShowProductTable] = useState(true);
  const [allProducts, setAllProducts] = useState([])

  const showProductView = () => {
    setShowProductTable(true);
  };

  const showUserView = () => {
    setShowProductTable(false);
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
                <button className='btn btn-primary' onClick={showProductView}>Mostrar Productos</button>
                <button className='btn btn-warning ms-5' onClick={showUserView}>Mostrar Usuarios</button>
              </div>
            </div>
            {showProductTable && <ProductsTable allProducts={allProducts} getProducts={getProducts}/>}
            {!showProductTable && <UserTable />}
          </div>
        </>
      );
    }

export default Admin;

