// React & React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI components & icons
import { Container, Box, Typography, Paper, IconButton, Card, CardContent, Button, Divider, Avatar, Grid } from '@mui/material';
import { ShoppingCart, Add, Remove, Delete, Receipt, ArrowBack, } from '@mui/icons-material';

// Hooks
import { useCart } from '../hooks/useCart';

const CartPage = () => {

    const navigate = useNavigate();

    // Use custom cart hook to manage cart state and actions
    const { cart, updateCartQuantity, removeFromCart, getTotalPrice } = useCart();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header with button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <IconButton onClick={() => navigate(-1)} size="large">
                    <ArrowBack />
                </IconButton>
                <Avatar sx={{ width: 60, height: 60, bgcolor: (theme) => theme.palette.primary.main }}>
                    <ShoppingCart sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                        עגלת הקניות שלי
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {cart.length} פריטים בעגלה
                    </Typography>
                </Box>
            </Box>

            {cart.length === 0 ? (
                <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
                    <ShoppingCart sx={{ fontSize: 120, color: (theme) => theme.palette.grey[300], mb: 3 }} />
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        העגלה ריקה
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        לא הוספת עדיין מוצרים לעגלת הקניות
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/shopping')}
                        sx={{ px: 4 }}
                    >
                        התחל קניות
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={4}>
                    {/* Products in cart */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                פריטים בעגלה
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            {cart.map((item) => (
                                <Card key={item.product.id} sx={{ mb: 2, border: '1px solid', borderColor: (theme) => theme.palette.grey[200] }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                    {item.product.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    מחיר יחידה: ₪{item.product.price.toLocaleString()}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={6} sm={3}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton
                                                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                                        size="small"
                                                    >
                                                        <Remove />
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{ minWidth: 30, textAlign: 'center' }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                                        size="small"
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={4} sm={2}>
                                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                                    ₪{(item.product.price * item.quantity).toLocaleString()}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={2} sm={1}>
                                                <IconButton
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    color="error"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                        </Paper>
                    </Grid>

                    {/* Summary section*/}

                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Typography variant="h5" gutterBottom>
                                סיכום הזמנה
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

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

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={<Receipt />}
                                sx={{ py: 1.5, mb: 2 }}
                            >
                                המשך לתשלום
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/shopping')}
                                sx={{ py: 1.5 }}
                            >
                                המשך קניות
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default CartPage;
