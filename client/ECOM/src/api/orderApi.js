import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";


// Place a new order
export const placeOrder = async (orderData) => {
  const res = await axiosInstance.post(API_PATHS.ORDER.CREATE, orderData);
  return res.data;
};

// Get logged-in user's orders
export const getMyOrders = async () => {
  const res = await axiosInstance.get(API_PATHS.ORDER.GET_MY_ORDERS);
  return res.data;
};

// Get a specific order by ID
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(API_PATHS.ORDER.GET_BY_ID(id));
  return res.data;
};

// Cancel an order
export const cancelOrder = async (id) => {
  const res = await axiosInstance.put(API_PATHS.ORDER.CANCEL_ORDER(id));
  return res.data;
};
export const updateOrderStatus = async (id, status) => {
  const res = await axiosInstance.put(API_PATHS.ORDER.UPDATE_STATUS(id), { status });
  return res.data;
};
