import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import { api } from "../services/orders";

const store = configureStore({
  reducer: {
    orderData: orderSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});

export default store;
