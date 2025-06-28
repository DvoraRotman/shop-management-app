import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import ismokeReducer from './slices/ismokeSlice';
export { setIsmoke, ismoke } from './slices/ismokeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    ismoke: ismokeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
