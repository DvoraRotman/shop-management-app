import { createSlice } from '@reduxjs/toolkit';

// Redux slice for managing the shopping cart

const initialState = {
  items: [], // Cart items
  totalQuantity: 0, // Total count
  totalPrice: 0, // Total price
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      state.totalQuantity += quantity;
      state.totalPrice += product.price * quantity;
    },
    // Remove product
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.product.price * existingItem.quantity;
        state.items = state.items.filter(item => item.product.id !== productId);
      }
    },
    // Update quantity
    updateCartQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        const existingItem = state.items.find(item => item.product.id === productId);
        if (existingItem) {
          state.totalQuantity -= existingItem.quantity;
          state.totalPrice -= existingItem.product.price * existingItem.quantity;
          state.items = state.items.filter(item => item.product.id !== productId);
        }
      } else {
        const existingItem = state.items.find(item => item.product.id === productId);
        if (existingItem) {
          const quantityDiff = newQuantity - existingItem.quantity;
          existingItem.quantity = newQuantity;
          state.totalQuantity += quantityDiff;
          state.totalPrice += existingItem.product.price * quantityDiff;
        }
      }
    },
    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Actions
export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
