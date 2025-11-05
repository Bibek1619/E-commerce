import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import SignUp from './pages/Auth/user/SignUp';
import Login from './pages/Auth/user/Login';
import Verification from './pages/Auth/Verification';
import { Toaster } from 'react-hot-toast';
import AppProviders from './AppProviders';
import Layout from './components/layout/Layout'; // impLayout
import SellerReg from './pages/Auth/seller/SellerReg';
import SellerLog from './pages/Auth/seller/SellerLog';
import SellerDashboard from './pages/seller/SellerDashboard';
import Category from './pages/category/category';
import ProductPage from './pages/product/ProductPage';
import SearchPage from './pages/search/SearchPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccess from './pages/sucess/OrderSuccess';
import MyOrders from './pages/orders/MyOrders';

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
             <Route path='/signup' element={<SellerReg/>}/>
             <Route path='/Signin' element={<SellerLog/>}/>
             <Route path='/seller/dashboard'element={<SellerDashboard/>}/>
             <Route path='/category/:category' element={<Category/>}/>
              <Route path="/product/:id" element={<ProductPage />} />
              
              <Route path="/search" element={<SearchPage />} />

              <Route path="/checkout" element={<CheckoutPage />} />
               <Route path="/order-success/:id" element={<OrderSuccess />} /> 


             { /*my order*/}
        <Route path="orders/my-orders" element={<MyOrders />} />



          </Routes>
         
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
