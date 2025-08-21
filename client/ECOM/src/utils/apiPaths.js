export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
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
    GET_ALL: "/api/products",                          // GET all products
    GET_BY_ID: (id) => `/api/products/${id}`,         // GET single product by ID
    GET_BY_CATEGORY: (category) => `/api/products/category/${category}`, // GET products by category
    GET_CATEGORIES: "/api/products/categories",      // GET all categories
    CREATE: "/api/products",                          // POST create product (protected)
    UPDATE: (id) => `/api/products/${id}`,           // PUT update product (protected)
    DELETE: (id) => `/api/products/${id}`,           // DELETE product (protected)
    GET_MY_PRODUCTS: "/api/products/my-products",    // GET seller's own products (protected)
  },
};
