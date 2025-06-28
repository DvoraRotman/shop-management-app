import React from 'react';
// MUI components & icons

import { Box, Typography, Avatar, IconButton, Badge, useTheme, useMediaQuery } from '@mui/material';
import { ShoppingCart, ReceiptLong, FactCheck } from '@mui/icons-material';

const StepHeader = ({ step, onCartClick, cartQuantity = 0 }) => {

    const theme = useTheme();

    // Media queries for responsive design
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));


    // Step configurations
    const stepConfigs = {
        shopping: {
            icon: <ReceiptLong />,
            title: 'רשימת קניות',
            subtitle: 'בחר קטגוריה והוסף מוצרים לעגלת הקניות',
        },
        'order-summary': {
            icon: <FactCheck />,
            title: 'סיכום הזמנה',
            subtitle: 'אנא מלא את הפרטים שלך ובדוק את פרטי ההזמנה',
        }
    };

    const config = stepConfigs[step];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 3, md: 4 },
                mb: { xs: 4, sm: 6, md: 8 },
                mt: 0,
            }}
        >
            {/* Main content */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, sm: 3, md: 4 },
                width: { xs: '100%', sm: 'auto' },
                flexDirection: { xs: 'row', sm: 'row' }
            }}>
                <Avatar sx={{
                    width: { xs: 50, sm: 60, md: 68 },
                    height: { xs: 50, sm: 60, md: 68 },
                    bgcolor: (theme) => theme.palette.success.main,
                    flexShrink: 0,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}>
                    {config.icon}
                </Avatar>

                {/* Text content */}
                <Box sx={{
                    textAlign: 'right',
                    flex: 1,
                    minWidth: 0
                }}>
                    <Typography
                        variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
                        sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            mb: { xs: 0.5, sm: 0.75 },
                            lineHeight: { xs: 1.2, sm: 1.3 },
                            textAlign: 'left',
                            fontSize: { xs: '1.1rem', sm: '1.5rem', md: '2rem' }
                        }}
                    >
                        {config.title}
                    </Typography>
                    <Typography
                        variant={isMobile ? "body2" : "body1"}
                        sx={{
                            color: 'text.secondary',
                            lineHeight: { xs: 1.4, sm: 1.5 },
                            textAlign: 'left',
                            fontSize: { xs: '0.85rem', sm: '1rem' },
                            maxWidth: '100%',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal'
                        }}
                    >
                        {config.subtitle}
                    </Typography>
                </Box>
            </Box>

            {/* Cart button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    alignItems: 'center',
                    width: { xs: '100%', sm: 'auto' },
                    mt: { xs: 2, sm: 0 }
                }}>
                    <IconButton
                        onClick={onCartClick}
                        size={isMobile ? "large" : "large"}
                        sx={{
                            bgcolor: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.custom.white,
                            width: { xs: 56, sm: 64 },
                            height: { xs: 56, sm: 64 },
                            '&:hover': {
                                bgcolor: (theme) => theme.palette.primary.dark,
                                transform: 'scale(1.1)'
                            },
                            '&:active': {
                                transform: 'scale(0.95)'
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        <Badge
                            badgeContent={cartQuantity > 99 ? '99+' : cartQuantity}
                            color="error" sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                    minWidth: { xs: 18, sm: 22 },
                                    height: { xs: 18, sm: 22 },
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
        </Box>
    );
};

export default StepHeader;