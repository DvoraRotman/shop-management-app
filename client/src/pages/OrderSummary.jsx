// React & React Router
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI components & icons
import { Box, Typography, TextField, Button, CardContent, Grid, Divider, IconButton, Tooltip, Alert } from '@mui/material';
import { PersonOutline, CheckCircle, ShoppingCart, ArrowForward } from '@mui/icons-material';

// Components
import OrderSummaryTable from '../components/Order/OrderSummaryTable';
import CartDrawer from '../components/Shopping/CartDrawer';
import StepHeader from '../components/Layout/StepHeader';

// Hooks
import { useCart, useCartDrawer } from '../hooks/useCart';

// API actions & validation
import { submitOrder } from '../api/fetchAction';
import { validateOrderData } from '../utils/apiValidation';
import { request } from '../api/axios';

// Redux
import { ismoke as selectIsmoke } from '../store/slices/ismokeSlice';
import { useSelector } from 'react-redux';

const OrderSummary = ({ onGoToStep2, onGoBack }) => {

    const navigate = useNavigate();
    const ismoke = useSelector(selectIsmoke);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
    });

    // Error and status 
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ isLoading: false, isSuccess: '' });

    // Hooks : useCart, useCartDrawer
    const { isOpen: isCartDrawerOpen, toggleDrawer: toggleCartDrawer, openDrawer: openCartDrawer } = useCartDrawer();
    const { cart, totalQuantity, getTotalPrice } = useCart();

    // Create order data object 
    const getOrderData = () => ({
        ...formData,
        items: cart.map(item => ({
            productId: item.id || item.product?.id || `PROD-${Date.now()}`,
            productName: item.name || item.product?.name || 'מוצר ללא שם',
            quantity: item.quantity,
            price: item.price || item.product?.price || 0,
            totalPrice: (item.price || item.product?.price || 0) * item.quantity
        })),
        totalAmount: getTotalPrice()
    });

    // Validate form before submit
    const validateForm = async () => {
        const { isValid, message } = await validateOrderData(getOrderData());
        return isValid ? (setErrors({}), true) : (setErrors({ form: message }), false);
    };

    // Handle input changes
    const handleInputChange = (field) => (e) => {
        setStatus(s => ({ ...s, isSuccess: '' }));
        setFormData({ ...formData, [field]: e.target.value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // Handle form submit
    const handleSubmit = async () => {
        await submitOrder({ orderData: getOrderData(), setStatus, navigate, ismoke });
    };

    // Fields for user details
    const fields = [
        { name: 'fullName', label: 'שם פרטי ומשפחה' },
        { name: 'email', label: 'כתובת מייל', type: 'email' },
        { name: 'address', label: 'כתובת מלאה', multiline: true, rows: 2, placeholder: 'רחוב, מספר, עיר, קומה, דירה' }];

    return (
        <CardContent sx={{ p: 4 }}>
            {/* Header with step */}
            <StepHeader step="order-summary"
                onCartClick={openCartDrawer}
                cartQuantity={totalQuantity}
            />
            <Grid container spacing={3} display="grid" sx={{ gridTemplateColumns: { xs: '1fr', lg: '59% 2% 39%' }, alignItems: 'stretch' }} justifyContent="space-between" component="form"
                onSubmit={async (e) => {
                    debugger
                    e.preventDefault();
                    if (!(await validateForm())) return;
                    await handleSubmit();
                }}>

                {/* Part 1 - User details form */}
                <Grid item sx={{ gridColumn: { xs: '1', lg: '1' }, width: '100%' }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonOutline />
                        פרטי לקוח
                    </Typography>

                    {/* Map over the fields array for inputs */}
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            fullWidth
                            label={field.label}
                            placeholder={field.placeholder || `הכנס ${field.label}`}
                            variant="outlined"
                            type={field.type || 'text'}
                            value={formData[field.name]}
                            onChange={handleInputChange(field.name)}
                            margin="normal"
                            required
                            multiline={!!field.multiline}
                            rows={field.rows || 1}
                            error={!!errors[field.name]}
                            sx={{ mb: field.name === 'address' ? 3 : 2 }}
                        />
                    ))}

                    {/* Error or status message */}
                    <Box sx={{ minHeight: 56, height: 56, mb: 2, display: 'flex', alignItems: 'center' }}>
                        {Object.values(errors).some(Boolean) ? (
                            <Alert severity="error" sx={{ width: '100%', mt: 0 }}>
                                {Object.values(errors).filter(Boolean).map((msg, idx) => (
                                    <div key={idx}>{msg}</div>
                                ))}
                            </Alert>
                        ) : (
                            status?.isSuccess && (
                                <Alert severity={status?.isSuccess.includes('הצלחה') ? 'success' : 'error'} sx={{ width: '100%', mt: 0 }}>
                                    {status.isSuccess}
                                </Alert>
                            )
                        )}
                    </Box>
                    {/* Action buttons: back and submit */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Tooltip title="חזור לרשימת הקניות">
                            <IconButton
                                size="large" onClick={onGoBack || (() => navigate('/step1'))}
                                sx={{
                                    bgcolor: (theme) => theme.palette.grey[100],
                                    '&:hover': { bgcolor: (theme) => theme.palette.grey[200] },
                                    border: '1px solid',
                                    borderColor: (theme) => theme.palette.grey[300]
                                }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </Tooltip>

                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            startIcon={<CheckCircle />}
                            disabled={totalQuantity === 0 || status?.isLoading}
                            sx={{ py: 1.5, flex: 1 }}
                        >
                            {status?.isLoading ? 'שולח...' : 'אשר הזמנה'}
                        </Button>
                    </Box>
                </Grid>

                {/* Divider between form and summary */}
                <Grid item sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'stretch', gridColumn: { xs: '1', lg: '2' }, width: '100%' }}>
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

                {/* Part 2 - Order summary table */}
                <Grid item sx={{ gridColumn: { xs: '1', lg: '3' }, width: '100%' }}>
                    <OrderSummaryTable
                        cart={cart}
                        getTotalPrice={getTotalPrice}
                        showTitle={true}
                    />
                </Grid>
            </Grid>
            {/* Cart drawer for quick cart view */}
            <CartDrawer
                open={isCartDrawerOpen}
                onClose={toggleCartDrawer}
                onGoToStep2={onGoToStep2}
            />
        </CardContent>
    );
};

export default OrderSummary;
