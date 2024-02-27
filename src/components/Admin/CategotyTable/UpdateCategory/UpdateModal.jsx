import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateCategory from './UpdateCategory'

const UpdateModal = ({show, handleClose, datoCategory, getCategories}) => {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
              <UpdateCategory datoCategory={datoCategory} getCategories={getCategories}/>
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