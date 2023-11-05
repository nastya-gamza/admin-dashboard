import { configureStore } from '@reduxjs/toolkit';
import { customersApi } from './customersApi';

export const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware),
});