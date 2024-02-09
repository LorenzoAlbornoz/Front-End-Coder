import React, {useState, useEffect} from 'react';
import ProductsTable from '../components/Admin/ProductsTable';
import ProductModal from '../components/Admin/ProductModal';
const Admin = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
              <ProductsTable />
                </div>
            <ProductModal show={show} handleClose={handleClose}/>
            </div>
        </>
    );
}

export default Admin;

