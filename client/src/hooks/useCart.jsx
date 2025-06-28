import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart as addToCartAction, removeFromCart as removeFromCartAction, updateCartQuantity as updateCartQuantityAction,
  clearCart as clearCartAction, selectCartItems, selectCartTotalQuantity, selectCartTotalPrice
} from '../store/slices/cartSlice';

// Custom hook for cart logic using Redux
export const useCart = () => {

  const dispatch = useDispatch();

  // Select cart state from Redux store
  const cart = useSelector(selectCartItems); // Array of items in the cart
  const totalQuantity = useSelector(selectCartTotalQuantity); // Total number of items
  const totalPrice = useSelector(selectCartTotalPrice); // Total price of all items

  // Add a product to the cart
  const addToCart = (product, quantity = 1) => {
    dispatch(addToCartAction({ product, quantity }));
  };

  // Remove a product from the cart by its ID
  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };

  // Update the quantity of a product in the cart
  const updateCartQuantity = (productId, newQuantity) => {
    dispatch(updateCartQuantityAction({ productId, newQuantity }));
  };

  // Remove all items from the cart
  const clearCart = () => {
    dispatch(clearCartAction());
  };

  // Get the total price of the cart
  const getTotalPrice = () => {
    return totalPrice;
  };

  return {
    cart,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalPrice,
    clearCart,
  };
};

/**
 * Hook to manage the open/close state of the cart drawer
 */
export const useCartDrawer = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Open the drawer
  const openDrawer = () => setIsOpen(true);
  // Close the drawer
  const closeDrawer = () => setIsOpen(false);
  // Toggle the drawer open/close state
  const toggleDrawer = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};
