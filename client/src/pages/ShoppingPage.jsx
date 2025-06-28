// React & React Router
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI components & icons
import { Container, Box, Typography, TextField, Button, Alert, IconButton, Autocomplete, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Grid, Divider, Tooltip } from '@mui/material';
import {  Search, Category, Receipt, AddShoppingCart} from '@mui/icons-material';

// Redux
import { useSelector } from 'react-redux';
import { selectCategories, selectProductsLoading, selectProductsError, selectSuccess } from '../store/slices/productsSlice';

// Hooks
import { useCart, useCartDrawer } from '../hooks/useCart.jsx';
import { useProducts } from '../hooks/useProducts.jsx';
import useServerInactiveDialog from '../hooks/useServerInactiveDialog';

// Components
import StepHeader from '../components/Layout/StepHeader';
import OrderSummaryTable from '../components/Order/OrderSummaryTable';
import CartDrawer from '../components/Shopping/CartDrawer';
import Spinner from '../loader/Spinner';
import { categoryIcons } from '../utils/categoryIcons';

const ShoppingPage = ({ onNextStep, onGoToStep2 }) => {

  const navigate = useNavigate();

  // Category
  const categories = useSelector(selectCategories);

  // Fetch states
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const success = useSelector(selectSuccess);

  // Hooks : useCart, useCartDrawer, useProducts
  const { cart, addToCart, updateCartQuantity, removeFromCart, getTotalPrice, totalQuantity } = useCart();
  const { isOpen: cartDrawerOpen, openDrawer: openCartDrawer, closeDrawer: closeCartDrawer } = useCartDrawer();
  const { selectedCategory, setSelectedCategory, selectedCategoryTab, setSelectedCategoryTab, selectedProduct, quantity, searchTerm, setSearchTerm, filteredProducts, handleCategorySelect, loadCategories, loadProducts, handleProductSelect, handleQuantityChange, handleSearch, showSuccessMessage, handleTabChange } = useProducts();
  // Note: We use forceIsmoke=true here to avoid async Redux update issues (see loadCategories in useProducts)
  const serverInactiveDialog = useServerInactiveDialog(() => loadCategories(undefined, true));

  // Load categories on mount
  useEffect(() => {
    loadCategories(serverInactiveDialog.openDialog);
  }, []);

  // Load products when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadProducts()
    }
  }, [selectedCategory]);


  // Cart handlers
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      // openCartDrawer();
      // dispatch(clearSelectedProduct()); // לא צריך יותר
      handleProductSelect(null); // איפוס מקומי
      showSuccessMessage('המוצר נוסף לעגלה בהצלחה');
    }
  };


  return (
    <Container maxWidth="xl"
      sx={{ pt: 0, pb: { xs: 2, sm: 3, md: 4 } }}
    >
      {/* Render the continue dialog */}
      {serverInactiveDialog.dialog}
      {isLoading ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}>
          <Spinner />
        </Box>
      ) : (
        <>
          {/* header */}
          <StepHeader
            step="shopping"
            onCartClick={openCartDrawer}
            cartQuantity={totalQuantity}
          />
          <Grid container spacing={3} display="grid" sx={{ gridTemplateColumns: { xs: '1fr', lg: '59% 2% 39%' }, alignItems: 'stretch' }} justifyContent="space-between">

            {/* part 1 - categories & products */}
            <Grid sx={{ gridColumn: { xs: '1', lg: '1' }, width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ fontWeight: 'bold' }}>בחר קטגוריה</InputLabel>
                <Select
                  value={selectedCategory?.id || ''}
                  onChange={(e) => {
                    const category = categories.find(cat => cat.id === e.target.value);
                    if (category) {
                      setSelectedCategoryTab(categories.findIndex(cat => cat.id === category.id));
                      handleCategorySelect(category);
                    }
                  }}
                  label="בחר קטגוריה"
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  {categories && Array.isArray(categories) && categories.map((category) => {
                    const IconComponent = categoryIcons[category.name] || Category; // Default icon if not found

                    return (
                      <MenuItem key={category.id} value={category.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconComponent />
                          {category.name}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* tabs */}
              <Tabs
                value={selectedCategoryTab >= 0 ? selectedCategoryTab : false}
                onChange={(event, newValue) => {
                  setSelectedCategoryTab(newValue);
                  handleTabChange(event, newValue);
                }}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider, mb: 3 }}
              >
                {categories && categories.map((category, index) => {
                  const IconComponent = categoryIcons[category.name] || Category;
                  return (
                    <Tab
                      key={category.id}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconComponent />
                          {category.name}
                        </Box>
                      }
                    />
                  );
                })}
              </Tabs>

              {/* products list */}
              <Box sx={{ mb: 4 }}>
                <Autocomplete
                  options={selectedCategory ? filteredProducts : []}
                  getOptionLabel={(option) => option.name}
                  value={selectedProduct}
                  onChange={(event, newValue) => handleProductSelect(newValue)}
                  inputValue={searchTerm}
                  onInputChange={(event, newInputValue) => handleSearch(newInputValue)}
                  disabled={!selectedCategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={selectedCategory
                        ? `חפש מוצר בקטגוריה: ${selectedCategory.name}`
                        : 'בחר קטגוריה תחילה כדי לחפש מוצרים'
                      }
                      variant="outlined"
                      fullWidth
                      disabled={!selectedCategory}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: <Search sx={{ mr: 1, color: selectedCategory ? 'text.secondary' : 'text.disabled' }} />,
                      }}
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key, ...rest } = props;
                    return (
                      <Box component="li" key={key} {...rest}>
                        <Box>
                          <Typography variant="body1">
                            {option.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₪{option.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </Box>

              {/* products selected */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  פרטי המוצר הנבחר
                </Typography>

                <Box sx={{
                  mb: 3,
                  bgcolor: selectedProduct ? (theme) => theme.palette.grey[50] : (theme) => theme.palette.grey[100],
                  borderRadius: 2
                }}>
                  {selectedProduct ? (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      gap: { xs: 2, sm: 0 }
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 2 }
                      }}>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                          {selectedProduct.name}
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          ₪{selectedProduct.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: { xs: 2, sm: 2 },
                        width: { xs: '100%', sm: 'auto' }
                      }}>
                        <TextField
                          size="small"
                          label="כמות"
                          type="number"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          inputProps={{ min: 1 }}
                          sx={{ width: { xs: '100%', sm: 120 } }}
                          disabled={!selectedProduct}
                        />
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                            minWidth: 'fit-content'
                          }}
                        >
                          סה"כ: ₪{(selectedProduct.price * quantity).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="h6" color="text.disabled">
                      אנא בחר מוצר
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Tooltip title="הוסף מוצר לסל">
                    <span>
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={handleAddToCart}
                      disabled={!selectedProduct}
                      sx={{
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.custom.white,
                        '&:hover': {
                          bgcolor: (theme) => theme.palette.primary.dark,
                        },
                        '&:disabled': {
                          bgcolor: (theme) => theme.palette.grey[300],
                          color: (theme) => theme.palette.grey[500],
                        },
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                <Box sx={{ minHeight: 48, mb: 2 }}>
                  {error && (
                    <Alert severity="error" sx={{ mt: 0 }}>
                      {error}
                    </Alert>
                  )}
                  {!error && success && (
                    <Alert severity="success" sx={{ mt: 0 }}>
                      {success}
                    </Alert>
                  )}
                </Box>
                {/* button continue*/}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    disabled={cart.length === 0}
                    variant="contained"
                    size="large"
                    onClick={onNextStep || (() => navigate('/step2'))}
                    startIcon={<Receipt />}
                    sx={{
                      py: 1.5,
                      px: { xs: 4, sm: 8, md: 16 },
                      width: { xs: '100%', sm: 'auto' },
                      minWidth: { sm: 300, md: 450 },
                      maxWidth: 600
                    }}
                  >
                    המשך להזמנה
                  </Button>
                </Box>
              </Box></Grid>

            {/* divider */}
            <Grid sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'stretch', gridColumn: { xs: '1', lg: '2' }, width: '100%' }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: (theme) => theme.palette.divider,
                  borderWidth: 1,
                  height: '100%'
                }}
              />
            </Grid>

            {/* part 2 -order summary */}
            <Grid sx={{ gridColumn: { xs: '1', lg: '3' }, width: '100%' }}>
              <OrderSummaryTable
                cart={cart}
                getTotalPrice={getTotalPrice}
                showTitle={true}
              />
            </Grid>
          </Grid>


          {/* cart drawer */}
          <CartDrawer
            open={cartDrawerOpen}
            onClose={closeCartDrawer}
            onProceedToCheckout={onNextStep}
            onGoToStep2={onGoToStep2}
          />
        </>
      )}
    </Container>
  );
};

export default ShoppingPage;
