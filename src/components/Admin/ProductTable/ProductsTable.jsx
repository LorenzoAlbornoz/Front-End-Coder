import React, { useEffect, useState } from 'react'
import Datable from 'react-data-table-component'
import { axiosInstance } from "../../../config/axiosInstance.js";
import Swal from "sweetalert2";
import UpdateModal from './UpdateProduct/UpdateModal.jsx';
import ProductModal from './ProductModal.jsx'
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

const ProductsTable = ({ allProducts, getProducts }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [datoProduct, setDatoProduct] = useState({});
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);

    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);


    const handleUpdate = (row) => {
        handleShowUpdateModal();
        handleShowAddModal;
        setDatoProduct(row);
    };

    const deleteCurso = async (row) => {
        try {
            const token = localStorage.getItem('codertoken') || Cookies.get('codertoken');

            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la eliminación',
                    text: 'Debes iniciar sesión para eliminar un producto.',
                });
                return;
            }

            Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esto.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F8A126",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axiosInstance.delete(`/product/${row}`);
                        getProducts();
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error.response?.data?.data || 'Error desconocido');
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en la eliminación',
                            text: `Hubo un error al eliminar el producto: ${error.response?.data?.data || 'Error desconocido'}`,
                        });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            getProducts();
        }
    };

    const changeFeaturedStatus = async (row) => {
        try {
            const newIsFeaturedStatus = row.isFeatured === true ? false : true;

            await axiosInstance.put(`/product/featured/${row._id}`, {
                isFeatured: newIsFeaturedStatus,
            });

            await getProducts();
            Swal.fire({
                icon: "success",
                title: "Producto destacado con éxito.",
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Hubo un error al destacar el producto.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const changeOfferStatus = async (row) => {
        try {
            const newIsOfferStatus = row.isOffer === true ? false : true;

            await axiosInstance.put(`/product/offer/${row._id}`, {
                isOffer: newIsOfferStatus,
            });

            await getProducts();
            Swal.fire({
                icon: "success",
                title: "Producto en Oferta.",
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Hubo un error al poner el producto en Oferta.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    const columns = [
        {
            name: "Titulo",
            selector: (row) => {
                const maxTitleLength = 20;
                const title = row.title || "";
                return title.length > maxTitleLength ? (
                    <>{title.slice(0, maxTitleLength) + "... "}</>
                ) : (
                    title
                );
            },
            sortable: true,
            maxWidth: "9%",
        },
        {
            name: "Detallado",
            selector: (row) => {
                const maxDescriptionLength = 50;
                const description = row.description || "";
                return description.length > maxDescriptionLength ? (
                    <>{description.slice(0, maxDescriptionLength) + "... "}</>
                ) : (
                    description
                );
            },
            sortable: true,
            hide: "sm",
            width: "9%",
        },
        {
            name: "Precio",
            selector: (row) => row.price,
            sortable: true,
            hide: "sm",
            format: (row) => {
                const formattedPrice = `$${row.price
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                return formattedPrice;
            },
            width: "9%",
        },
        {
            name: "Categoria",
            selector: (row) => row.category.name,
            sortable: true,
            hide: "sm",
            width: "8%",
        },
        {
            name: "Imagen",
            selector: (row) => (
                <div>
                    <img src={row.images[0]} alt={row.title} width={75} />
                </div>
            ),
            hide: "sm",
            width: "9%",
        },
        {
            name: "Stock",
            selector: (row) => row.stock,
            sortable: true,
            hide: "sm",
            width: "6%",
        },
        {
            name: "Code",
            selector: (row) => row.code,
            sortable: true,
            hide: "sm",
            width: "6%",
        },
        {
            name: "Destacado",
            selector: (row) => (row.isFeatured ? "true" : "false"),
            sortable: true,
            width: "8%",
            hide: "sm",
        },
        {
            name: "Oferta",
            selector: (row) => (row.isOffer ? "true" : "false"),
            sortable: true,
            width: "8%",
            hide: "sm",
        },
        {
            name: "Acciones",
            selector: (row) => {
                return (
                    <div>
                        <button
                            className="btn btn-secondary btn-md me-3 "
                            onClick={() => changeFeaturedStatus(row)}
                        >
                            Destacado
                        </button>
                        <button
                            className="btn btn-secondary btn-md me-3 "
                            onClick={() => changeOfferStatus(row)}
                        >
                            Oferta
                        </button>
                        <button
                            className="btn btn-success btn-md me-3"
                            onClick={() => handleUpdate(row)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-md "
                            onClick={() => deleteCurso(row._id)}
                        >
                            X
                        </button>
                    </div>
                );
            },
        },
    ];


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
            setRows(allProducts);
            setPending(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [allProducts]);
    return (
        <>
            <div className="row">
                <div className="col text-end">
                    <button className="btn btn-success mb-4" onClick={handleShowAddModal}>
                        Agregar Producto
                    </button>
                </div>
            </div>

            <Datable
                title="Administración de Productos"
                columns={columns}
                data={allProducts}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                pagination
            />
            <UpdateModal
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                datoProduct={datoProduct}
                getProducts={getProducts}
            />
            <ProductModal
                show={showAddModal}
                handleClose={handleCloseAddModal}
                datoProduct={datoProduct}
                getProducts={getProducts}
            />
        </>
    )
}

export default ProductsTable