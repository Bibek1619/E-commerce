import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Verification from './pages/Auth/Verification';
import { Toaster } from 'react-hot-toast';
import AppProviders from './AppProviders';
import Layout from './components/layout/Layout'; // import Layout

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route 
              path="/cart" 
              element={
                <Layout>
                  <CartPage />
                </Layout>
              } 
            />
            <Route path="/auth/SignUp" element={<SignUp />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route path="/auth/verification" element={<Verification />} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
