import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RecoverPasswordPage from './pages/RecoverPasswordPage.jsx'
import Footer from './components/Footer/Footer.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Admin from './pages/Admin.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
         <Route path='/repassword' element={<RecoverPasswordPage />} />
        {/* <Route path='*' element={<Error404/>} /> */}
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products' element={<Products />} /> 
        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<Admin />} />
        </Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;