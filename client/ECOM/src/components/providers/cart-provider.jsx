import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../../api/cartApi";
import { toast } from "react-hot-toast";
import { useUser } from "../providers/userProvider";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  // Fetch cart on login
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
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn]);

  const addItem = async (product, quantity = 1) => {
    if (!isLoggedIn) return toast.error("Please login to add products");

    try {
      await addToCart(product._id, quantity);
      const existing = items.find((i) => i._id === product._id);

      if (existing) {
        setItems((prev) =>
          prev.map((i) =>
            i._id === product._id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        );
      } else {
        setItems((prev) => [...prev, { ...product, quantity }]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

const updateQuantity = async (productId, quantity) => {
  if (!isLoggedIn) return toast.error("Please login to update cart");

  try {
    if (quantity <= 0) return removeItem(productId);

    console.log("Updating cart item:", productId, quantity);

    await updateCartItem(productId, quantity);

    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  } catch (err) {
    console.error(err);
    toast.error("Failed to update cart");
  }
};





  const removeItem = async (productId) => {
    if (!isLoggedIn) return toast.error("Please login to remove items");
    try {
      await removeCartItem(productId);
      setItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = () => setItems([]);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalPrice,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
