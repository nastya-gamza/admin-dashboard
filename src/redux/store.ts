import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customersApi } from './customersApi';
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [customersApi.reducerPath]: customersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      customersApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
