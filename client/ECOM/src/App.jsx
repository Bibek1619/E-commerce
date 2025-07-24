import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { CartProvider }  from './components/providers/cart-provider';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </>
  );
};

export default App;
