import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* <Route path='/repassword' element={<RecoverPasswordPage />} />
        <Route path='/product/:_id' element={<DetailPage />} />
        <Route path='/products' element={<Products />} /> 
         <Route path='*' element={<Error404/>} />*/
        }
      </Routes>
      <Footer/>
    </>
  );
}

export default App;