import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { CartProvider }  from './components/providers/cart-provider';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Verification from './pages/Auth/Verification';
const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth/SignUp" element={<SignUp />} />
          <Route path="/auth/Login" element={<Login />} />
          <Route path="/auth/verification" element={<Verification />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </>
  );
};

export default App;
