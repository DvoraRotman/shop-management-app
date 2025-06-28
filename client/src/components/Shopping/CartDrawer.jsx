import React from 'react';

// MUI components & icons
import { Drawer, Box, Typography, Paper, IconButton, Card, CardContent, Button, Divider, Avatar } from '@mui/material';
import { ShoppingCart, Add, Remove, Delete, Receipt, Close } from '@mui/icons-material';

// Hooks
import { useCart } from '../../hooks/useCart';

// Redux
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose, onProceedToCheckout, onGoToStep2 }) => {

    const navigate = useNavigate();

    // Custom hook to manage cart state
    const { cart, updateCartQuantity, removeFromCart, getTotalPrice } = useCart();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 450, md: 500 },
                    padding: 2,
                },
            }}
        >
            {/* Title with close button */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 50, height: 50, bgcolor: (theme) => theme.palette.primary.main }}>
                        <ShoppingCart sx={{ fontSize: 25 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" color="primary.main">
                            עגלת הקניות 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {cart.length} פריטים בעגלה 
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="large">
                    <Close />
                </IconButton>
            </Box>

            {/* Cart is empty */}
            {cart.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <ShoppingCart sx={{ fontSize: 80, color: (theme) => theme.palette.grey[300], mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        העגלה ריקה
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        לא הוספת עדיין מוצרים לעגלת הקניות
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{ px: 4 }}
                    >
                        המשך קניות
                    </Button>
                </Box>
            ) : (
                <Box>
                    {/* Product list */}
                    <Box sx={{ mb: 3, maxHeight: '60vh', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            פריטים בעגלה
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {cart.map((item) => (
                            <Card key={item.product.id} sx={{ mb: 2, border: '1px solid', borderColor: (theme) => theme.palette.grey[200] }}>
                                <CardContent sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={2}>
                                        מחיר יחידה: ₪{item.product.price.toLocaleString()}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                                size="small"
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                                size="small"
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                                                ₪{(item.product.price * item.quantity).toLocaleString()}
                                            </Typography>
                                            <IconButton
                                                onClick={() => removeFromCart(item.product.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* Order summary */}
                    <Paper elevation={2} sx={{ p: 2, bgcolor: (theme) => theme.palette.grey[50] }}>
                        <Typography variant="h6" gutterBottom>
                            סיכום הזמנה
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">
                                    מספר פריטים:
                                </Typography>
                                <Typography variant="body1">
                                    {cart.reduce((total, item) => total + item.quantity, 0)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="body1">
                                    סכום ביניים:
                                </Typography>
                                <Typography variant="body1">
                                    ₪{getTotalPrice().toLocaleString()}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    סכום כולל:
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                    ₪{getTotalPrice().toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                        {/* Continue to payment */}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<Receipt />}
                            sx={{ py: 1.5, mb: 2 }}
                            onClick={() => {
                                onClose();
                                if (onGoToStep2) {
                                    onGoToStep2();
                                } else if (onProceedToCheckout) {
                                    onProceedToCheckout();
                                } else {
                                    navigate('/step2');
                                }
                            }}
                        >
                            המשך לתשלום
                        </Button>
                        {/* Continue shopping */}
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={onClose}
                            sx={{ py: 1.5 }}
                        >
                            המשך קניות
                        </Button>
                    </Paper>
                </Box>
            )}
        </Drawer>
    );
};

export default CartDrawer;
