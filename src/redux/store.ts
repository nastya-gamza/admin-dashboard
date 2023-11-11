import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customersApi } from './customersApi';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [customersApi.reducerPath]: customersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;