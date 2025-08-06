import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/api/cart"; // make sure these are correctly imported

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 🔹 Add product to cart
  const addItem = async (product, quantity = 1) => {
    try {
      const updatedCart = await addToCart(product._id, quantity);
      setItems(updatedCart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // 🔹 Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) return removeItem(productId);
      const updatedCart = await updateCartItem(productId, quantity);
      setItems(updatedCart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // 🔹 Remove item from cart
  const removeItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setItems(updatedCart);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // 🔹 Total price calculation
  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  // 🔹 Clear cart (frontend only)
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
