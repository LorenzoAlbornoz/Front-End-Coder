import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateProduct from './UpdateProduct'

const UpdateModal = ({show, handleClose, datoProduct, getProducts}) => {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
              <UpdateProduct datoProduct={datoProduct} getProducts={getProducts}/>
              </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
  )
}

export default UpdateModal