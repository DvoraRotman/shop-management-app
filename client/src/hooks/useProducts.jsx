import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, clearSuccess, setSuccess, selectProducts } from '../store/slices/productsSlice';
import { ismoke as selectIsmoke } from '../store/slices/ismokeSlice';

// API actions
import { fetchCategories, fetchProductsByCategory } from '../api/fetchAction';

// Custom hook for managing products and categories
export const useProducts = () => {

  const dispatch = useDispatch();

  // Get categories and products from Redux store
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const ismoke = useSelector(selectIsmoke);

  // Local state
  const [selectedCategory, setSelectedCategory] = useState(null); // Current category
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(-1); // Current tab index
  const [selectedProduct, setSelectedProduct] = useState(null); // Current product
  const [quantity, setQuantity] = useState(1); // Product quantity
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after search filter

  // Filter products by search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  // Select a category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setSearchTerm('');
  };

  // Load categories from API
  // Note: forceIsmoke is a local override to avoid async Redux update issues (see usage in useContinueDialog)
  const loadCategories = (openDialog, forceIsmoke) => {
    fetchCategories(dispatch, openDialog, forceIsmoke !== undefined ? forceIsmoke : ismoke);
  };

  // Load products for selected category
  const loadProducts = () => {
    if (selectedCategory && selectedCategory.id) {
      fetchProductsByCategory(selectedCategory.id, dispatch, ismoke);
    }
  };

  // Select a product
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  // Change product quantity (minimum 1)
  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  // Update search term
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Show a success message for 3 seconds
  const showSuccessMessage = (message) => {
    dispatch(setSuccess(message));
    setTimeout(() => dispatch(clearSuccess()), 3000);
  };

  // Change selected tab and category
  const handleTabChange = (event, newValue) => {
    setSelectedCategoryTab(newValue);
    if (categories && categories[newValue]) {
      handleCategorySelect(categories[newValue]);
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedCategoryTab,
    setSelectedCategoryTab,
    selectedProduct,
    quantity,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    handleCategorySelect,
    loadCategories,
    loadProducts,
    handleProductSelect,
    handleQuantityChange,
    handleSearch,
    showSuccessMessage,
    handleTabChange,
  };
};
