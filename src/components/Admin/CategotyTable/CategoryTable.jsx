import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { axiosInstance } from '../../../config/axiosInstance.js';
import Swal from 'sweetalert2'
import styled, { keyframes } from 'styled-components';
import UpdateModal from './UpdateCategory/UpdateModal.jsx'
import Cookies from 'js-cookie';
import CategoryModal from './CategoryModal.jsx';

const CategoryTable = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [allCategories, setAllCategories] = useState([])
  const [datoCategory, setDatoCategory] = useState({});
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleUpdate = (row) => {
    handleShowUpdateModal();
    handleShowAddModal;
    setDatoCategory(row);
  };

  const getCategories = async () => {
    try {
      const resp = await axiosInstance.get("/categories")
      console.log(resp.data);
      setAllCategories(resp.data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const deleteCategory = async (row) => {
    try {
      const token = localStorage.getItem('codertoken') || Cookies.get('codertoken');

      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la eliminación',
          text: 'Debes iniciar sesión para eliminar una Categoria.',
        });
        return; // Detén la ejecución si no hay un token
      }
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F8A126",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosInstance.delete(`/category/${row}`);
          getCategories()
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      getCategories();
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      hide: 'md'
    },
    {
      name: "Imagen",
      selector: (row) => (
        <div>
          <img src={row.image} alt={row.title} width={75} />
        </div>
      ),
      sortable: true,
      width: "25%",
      center: true
    },
    {
      name: 'Creación',
      selector: (row) => {
        const createdAtDate = new Date(row.createdAt);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return createdAtDate.toLocaleDateString('es-AR', options);
      },
      sortable: true,
      hide: 'md',
      center: true,
    },
    {
      name: "Acciones",
      selector: row => {
        return (
          <div>
            <button className='btn btn-success btn-md me-3' onClick={() => handleUpdate(row)}>Edit</button>
            <button className='btn btn-danger btn-md' onClick={() => deleteCategory(row._id)}>X</button>
          </div>
        )
      }
    }
  ]

  const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
 
   to {
    transform: rotate(360deg);
  }
 `;


  const Spinner = styled.div`
 margin: 16px;
 animation: ${rotate360} 1s linear infinite;
 transform: translateZ(0);
 border-top: 2px solid var(--c-mainColor); 
 border-right: 2px solid var(--c-mainColor);
 border-bottom: 2px solid var(--c-secondColor);
 border-left: 4px solid var(--c-grey); 
 background: transparent;
 width: 40px;
 height: 40px;
 border-radius: 50%;
`;

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Spinner />
      <div className="text-center">Cargando...</div>
    </div>
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allCategories);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [allCategories]);

  return (
    <>
      <div className="row">
        <div className="col text-end">
          <button className="btn btn-success mb-4" onClick={handleShowAddModal}>
            Agregar Categoria
          </button>
        </div>
      </div>
      <>
        <DataTable
          title="Administración de Categorias"
          columns={columns}
          data={allCategories}
          progressPending={pending}
          progressComponent={<CustomLoader />}
          pagination />
        <UpdateModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          datoCategory={datoCategory}
          getCategories={getCategories}
        />
        <CategoryModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          datoCategory={datoCategory}
          getCategories={getCategories}
        />
      </>
    </>
  )
}

export default CategoryTable
