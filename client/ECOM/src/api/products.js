// src/api/products.js
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const fetchAllProducts = async () => {
  const response = await axiosInstance.get(API_PATHS.PRODUCT.GET_ALL);
  return response.data;
};
