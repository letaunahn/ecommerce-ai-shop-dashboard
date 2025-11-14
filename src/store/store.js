import { configureStore } from "@reduxjs/toolkit";
import extraReducer from "./slices/extraSlice";
import adminReducer from "./slices/adminSlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    extra: extraReducer,
    admin: adminReducer,
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
});
