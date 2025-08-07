export const BASE_URL ="http://localhost:5000"

export const API_PATHS ={
    AUTH:{
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
       
    },
     CART: {
    GET: "/api/cart",
    ADD: "/api/cart/add",
    UPDATE: "/api/cart/update",
    REMOVE: (productId) => `/api/cart/remove/${productId}`, // dynamic route
  },
  PRODUCT: {
  GET_ALL: "/api/products", // or whatever your route is
},

};