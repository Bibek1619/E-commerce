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
    UPDATE: (productId) => `/api/cart/update/${productId}`,
    REMOVE: (productId) => `/api/cart/remove/${productId}`,
  },

  PRODUCT: {
    GET_ALL: "/api/products", // GET all products
    GET_BY_ID: (id) => `/api/products/${id}`, // GET single product by ID
    GET_BY_CATEGORY: (category) => `/api/products/category/${category}`, // GET products by category
    GET_CATEGORIES: "/api/products/categories", // GET all categories
    CREATE: "/api/products", // POST create product (protected)
    UPDATE: (id) => `/api/products/${id}`, // PUT update product (protected)
    DELETE: (id) => `/api/products/${id}`, // DELETE product (protected)
    GET_MY_PRODUCTS: "/api/products/my-products", // GET seller's own products (protected)
  },
  ORDER: {
    CREATE: "/api/orders", // POST create new order
    GET_MY_ORDERS: "/api/orders/my-orders", // GET current user's orders
    GET_BY_ID: (id) => `/api/orders/${id}`, // GET single order by id
    GET_SELLER_ORDERS: "/api/orders/seller", // 👈 NEW
 UPDATE_STATUS: (id) => `/api/orders/${id}/status`,

    CANCEL_ORDER: (id) => `/api/orders/cancel/${id}`,

  },
  PAYMENT: {
    CREATE_CHECKOUT_SESSION: "/api/payment/create-checkout-session", // POST
    WEBHOOK: "/webhook/stripe", // POST, for Stripe webhook
     GET_ORDER_BY_SESSION: "/api/payment/get-order-by-session", // use query param ?session_id=...
       VERIFY: "/api/payment/verify" // ✅ add this
  },
};
