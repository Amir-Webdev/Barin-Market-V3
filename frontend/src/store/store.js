import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice.js"; // RTK Query API slice
import cartSliceReducer from "./slices/cart/cartSlice.js";
import authSliceReducer from "./slices/auth/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export default store;
