"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create CartContext
const CartContext = createContext(undefined);

// CartProvider Component
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addItem = (newItem) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity of item
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  // Handle Buy Now (single item checkout)
  const buyNowItem = (item) => {
    const buyNowData = { ...item, quantity: 1 };
    localStorage.setItem("buyNowItem", JSON.stringify(buyNowData));
  };

  // Calculate total price and item count
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        buyNowItem,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.trace(); // helpful during debug
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
