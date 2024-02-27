import React, { useState, useEffect } from 'react';
import mediosPago from "../../../public/img/mercadopago_logos1.jpg";
import { RiLockFill } from "react-icons/ri";
import { axiosInstance } from '../../config/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
 from {
   transform: rotate(0deg);
 }

  to {
   transform: rotate(360deg);
 }
`;

const Spinner = styled.div`
margin: 0 auto;  // Añade esta línea para centrar horizontalmente
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

const convertToPesos = (numb) => {
  if (typeof numb !== 'undefined') {
    const pesos = numb.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return pesos;
  } else {
    return ''; 
  }
};

const ProductDetail = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula un retraso en la carga con un timeout
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Establece loading en falso una vez que los datos están cargados (o ocurrió un error)
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
        // Maneja el error si es necesario
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async () => {
    try {
      // Intenta obtener el token del localStorage
      const localStorageToken = localStorage.getItem('codertoken');
      let decodedToken;

      if (localStorageToken) {
        // Si hay un token en localStorage, decodifícalo
        decodedToken = jwtDecode(localStorageToken);
      } else {
        // Si no hay un token en localStorage, intenta obtener la cookie 'user_data'
        const cookieUserData = Cookies.get('user_data');

        if (!cookieUserData) {
          // Si no hay token en localStorage ni cookie 'user_data', muestra un mensaje
          Swal.fire('Inicia sesión', 'Debes iniciar sesión para agregar un producto a tu carrito', 'info');
          return;
        }

        // Si hay una cookie 'user_data', parsea la información
        decodedToken = JSON.parse(cookieUserData);
      }

      const cartId = decodedToken.cart; // Obtén el ID del carrito del token

      // Realiza la solicitud POST para agregar el producto al carrito
      await axiosInstance.post(`/cart/${cartId}/product/${product._id}`);

      Swal.fire('Añadido al carrito', '', 'success');
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      Swal.fire('Error', 'Hubo un error al agregar el producto al carrito', 'error');
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
  {loading ? (
      <CustomLoader />
    ) : (
      <div className="container mt-4">
          <div className="row">
            <div className="col-lg-7 text-center">
              <div className="mb-3">
                {product?.images && product.images.length > 0 ? (
                  <div className="zoom-container mb-5">
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.title}
                      className="img-fluid img-product"
                      id="zoomImage"
                    />
                  </div>
                ) : (
                  <p>No hay imágenes disponibles</p>
                )}
              </div>
              <div className="row justify-content-center">
                {product?.images && product.images.length > 0 && product.images.map((image, index) => (
                  <div key={index} className="col-2">
                    <img
                      src={image}
                      alt={product.title}
                      className={`img-fluid img-thumbnail ${index === currentImageIndex ? 'selected-thumbnail' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='row'>
                <div className='col mt-5'>
                  <h1>{product?.title}</h1>
                </div>
                <div className='mt-4'>
                  <h2>{product?.description}</h2>
                </div>
                <div className='mt-4'>
                  <h3>{convertToPesos(product?.price)}</h3>
                </div>
                <div>
                  <button className='productCard__button mt-4 mb-4' onClick={handleAddToCart}>
                    Añadir al carrito
                  </button>
                </div>
                <p><RiLockFill /> Compra Protegida</p>
                <hr className='mt-5'/>
                <h4 className="text-center ">
                  Tenemos la mejor financiación para vos!
                </h4>
                <img src={mediosPago} alt="" className="img-fluid" />
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-5 pre">
              <h3>Medios de Pago</h3>
              <p>
                Podes pagar online de forma segura mediante las plataformas
                Mobbex o Viumi (se debe realizar validación de identidad y se
                hará entrega al titular de la tarjeta). Podes elegir pagar en 1
                pago o en cuotas, incluidos los pagos con Planes Ahora 3, 6, 12
                y 18.
                <br />
                También podes hacerlo con MercadoPago con tarjetas de crédito de
                todos los bancos.
                <br />
                Además podes realizar tu pedido y abonarlo por depósito o
                transferencia bancaria o bien, en nuestro local al retirarlo.
                <br />
                Agregá el producto al carrito y continuá con el proceso de pago
                online!
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 mt-4 pre">
              <h3>Medios de Envío</h3>
              <p>
                Te lo enviamos al lugar de la Argentina donde te encuentres de
                forma segura y rápida.
                <br />
                Queremos que puedas disfrutar de tus productos lo antes posible.
                Es por eso que procesamos su pedido rápidamente para que pueda
                comenzar a tocar cuanto antes.
                <br />
                Todos nuestros instrumentos son calibrados y afinados por
                nuestro Luthier previo a ser embalado y enviado, para garantizar
                una entrega en óptimas condiciones.
                <br />
                Retiro en el Local
                <br />
                Los artículos serán entregados al titular de la compra y en caso
                de que el pago se haya realizado con tarjetas de crédito o
                débito, la entrega se hará al titular de la tarjeta.
                <br />
                Devoluciones
                <br />
                Estamos comprometidos con su satisfacción como miembro de la
                familia SwanMusic. Todos los productos comprados a través del
                sitio web pueden ser devueltos o cambiados dentro de los 30 días
                posteriores a la compra.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;