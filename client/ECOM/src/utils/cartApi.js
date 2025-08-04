import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

// 🔹 Get Cart Items
export const getCart = async () => {
  const response = await axiosInstance.get(API_PATHS.CART.GET);
  return response.data;
};

// 🔹 Add to Cart
export const addToCart = async (productId, quantity) => {
  const response = await axiosInstance.post(API_PATHS.CART.ADD, {
    productId,
    quantity,
  });
  return response.data;
};

// 🔹 Update Cart Item
export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.put(API_PATHS.CART.UPDATE, {
    productId,
    quantity,
  });
  return response.data;
};

// 🔹 Remove Cart Item
export const removeCartItem = async (productId) => {
  const response = await axiosInstance.delete(API_PATHS.CART.REMOVE(productId));
  return response.data;
};
