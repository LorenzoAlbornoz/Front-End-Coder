import React, {useState, useEffect} from 'react';
import ProductsTable from '../components/Admin/ProductsTable';
import ProductModal from '../components/Admin/ProductModal';
import { axiosInstance } from '../config/axiosInstance';

const Admin = () => {
    const [show, setShow] = useState(false);
    const [allProducts, setAllProducts] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        <h2>Admin</h2>
                        <button className='btn btn-outline-primary' onClick={handleShow}>Agregar Producto</button>
                        <hr />
                    </div>
                </div>
                <div className="row">
              <ProductsTable allProducts={allProducts} getProducts={getProducts}/>
                </div>
            <ProductModal show={show} handleClose={handleClose}/>
            </div>
        </>
    );
}

export default Admin;

