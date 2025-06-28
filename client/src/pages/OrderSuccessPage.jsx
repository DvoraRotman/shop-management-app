// React & React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI components & icons
import { Box, Typography, Button, Avatar, Zoom, } from '@mui/material';
import { CheckCircle, Receipt, Add, } from '@mui/icons-material';

// Hooks
import { useCart } from '../hooks/useCart';

// Success page after order

const OrderSuccessPage = ({ onStartOver }) => {

  const navigate = useNavigate();

  const { clearCart } = useCart();

  // Start a new order: clear cart and go home or call onStartOver
  const handleNewOrder = () => {
    clearCart();
    onStartOver ? onStartOver() : navigate('/');
  };

  // Show success message and new order button
  return (
    <Zoom in={true} timeout={1000}>
      <Box textAlign="center">
        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: (theme) => theme.palette.success.main }}>
          <CheckCircle sx={{ fontSize: 30 }} />
        </Avatar>
        <Typography variant="h5" gutterBottom color="success.main" fontWeight="bold">
          ההזמנה בוצעה בהצלחה!
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          תקבל אישור במייל בתוך 24 שעות
        </Typography>
        <Receipt sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
        <Button
          variant="contained"
          onClick={handleNewOrder}
          startIcon={<Add />}
          size="large"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: (theme) => theme.palette.primary.main,
            '&:hover': {
              bgcolor: (theme) => theme.palette.primary.dark
            }
          }}
        >
          הזמנה חדשה
        </Button>
      </Box>
    </Zoom>
  );
};

export default OrderSuccessPage;
