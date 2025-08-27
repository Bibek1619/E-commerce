import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../../api/cartApi";
import { toast } from "react-hot-toast";
import { useUser } from "../providers/userProvider"; // <-- import your UserContext hook

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser(); // ✅ listen to login state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user; // logged-in state

  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCart();
        setItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        if (err.response?.status === 401) setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isLoggedIn]); // ✅ now re-fetches after login/logout

  const addItem = async (product, quantity = 1) => {
    if (!isLoggedIn) return toast.error("Please login to add products to cart");
    try {
      const updatedCart = await addToCart(product._id, quantity);
      setItems(updatedCart);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setItems([]);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isLoggedIn) return toast.error("Please login to update cart");
    try {
      if (quantity <= 0) return removeItem(productId);
      const updatedCart = await updateCartItem(productId, quantity);
      setItems(updatedCart);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setItems([]);
    }
  };

  const removeItem = async (productId) => {
    if (!isLoggedIn) return toast.error("Please login to remove items from cart");
    try {
      const updatedCart = await removeCartItem(productId);
      setItems(updatedCart);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setItems([]);
    }
  };

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        getTotalPrice,
        clearCart,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
