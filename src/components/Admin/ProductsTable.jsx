import React from 'react'
import Datable from 'react-data-table-component'
import { axiosInstance } from "../../config/axiosInstance.js";
import Swal from "sweetalert2";

const ProductsTable = ({allProducts, getProducts}) => {

    const deleteCurso = async (row) => {
        try {
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
                    await axiosInstance.delete(`/product/${row}`);
                    getProducts();
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            getProducts();
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
            maxWidth: "40%",
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
            width: "10%",
        },
        {
            name: "Categoria",
            selector: (row) => row.category.name,
            sortable: true,
            hide: "sm",
            width: "10%",
        },
        {
            name: "Imagen",
            selector: (row) => (
                <div>
                    <img src={row.image} alt={row.title} width={75} />
                </div>
            ),
            hide: "lg",
            width: "9%",
        },
        {
            name: "Acciones",
            selector: (row) => {
                return (
                    <div>
                        <button
                            className="btn btn-warning btn-md me-3"
                            onClick={() => handleUpdate(row)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-md "
                            onClick={() => deleteCurso(row._id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];
  return (
    <Datable
    title="Administración de Productos"
    columns={columns}
    data={allProducts}
    pagination
    />
  )
}

export default ProductsTable