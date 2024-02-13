// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../config/axiosInstance.js';
// import { jwtDecode } from 'jwt-decode';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const FavoriteButton = ({ productId, onFavoriteChange }) => {
//   const [loading, setLoading] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     try {
//       const token = localStorage.getItem('codertoken');
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         setIsFavorite(decodedToken.favoriteProducts.includes(productId));
//       }
//     } catch (error) {
//       console.error('Error al decodificar el token:', error);
//     }
//   }, [productId]);

//   const handleFavoriteToggle = async () => {
//     setLoading(true);

//     try {
//       const token = localStorage.getItem('codertoken');
//       const decodedToken = jwtDecode(token);

//       if (isFavorite) {
//         await axiosInstance.delete(`/favorite/${decodedToken.sub}/product/${productId}`);
//       } else {
//         await axiosInstance.post(`/favorite/${decodedToken.sub}/product/${productId}`);
//       }

//       // Llamar al callback para actualizar el estado de favoritos
//       onFavoriteChange(productId, !isFavorite);
//       setIsFavorite(!isFavorite);
//     } catch (error) {
//       console.error('Error al procesar la acción de favoritos:', error);

//       if (error.response && error.response.data && error.response.data.error) {
//         console.error('Mensaje de error del servidor:', error.response.data.error);
//       } else {
//         console.error('Ocurrió un error al procesar la acción de favoritos.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       className={`btn btn-link position-absolute top-0 end-0 m-2 ${isFavorite ? 'heart-full' : 'heart-outline'}`}
//       onClick={handleFavoriteToggle}
//       disabled={loading}
//     >
//       {isFavorite ? <FaHeart color='red' /> : <FaRegHeart />}
//     </button>
//   );
// };

// export default FavoriteButton;
