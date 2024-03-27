import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RecoverPasswordPage from './pages/RecoverPasswordPage.jsx'
import ResetPage from './pages/ResetPage.jsx'
import Footer from './components/Footer/Footer.jsx';
import Products from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Admin from './pages/Admin.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx'
import Favorite from './pages/Favorite.jsx';
import CartView from './pages/CartView.jsx'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/repassword' element={<RecoverPasswordPage />} />
        <Route path="/reset_password/:id/:token" element={<ResetPage />}></Route>
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart/:cardId' element={<CartView />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route element={<PrivateRoutes />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;