import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProductCreation from './ProductCreation';

const ProductModal = ({show, handleClose}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ProductCreation/>
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


export default ProductModal;
