import { createSlice } from '@reduxjs/toolkit';

// Redux slice for managing the Categories and Products 

const initialState = {
  categories: [], // Category list
  items: [], // Product list
  loading: false, // Products loading
  categoriesLoading: false, // Categories loading
  error: null, // Error message
  success: '', // Success message
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set categories
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.categoriesLoading = false;
    },
    // Set categories loading
    setCategoriesLoading: (state) => {
      state.categoriesLoading = true;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Set success
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    // Clear success
    clearSuccess: (state) => {
      state.success = '';
    },
    // Set products
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    // Clear products
    clearProducts: (state) => {
      state.items = [];
    },
  }
});

// Actions
export const { setCategories, setCategoriesLoading, clearError, setError, setSuccess, clearSuccess, setProducts, clearProducts,
} = productsSlice.actions;

// Selectors
export const selectCategories = (state) => state.products.categories;
export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectCategoriesLoading = (state) => state.products.categoriesLoading;
export const selectProductsError = (state) => state.products.error;
export const selectSuccess = (state) => state.products.success;

export default productsSlice.reducer;
