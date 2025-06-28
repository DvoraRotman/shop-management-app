import React from 'react';

// Material UI and icons imports
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

// Redux
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/slices/productsSlice';

// Utils
import { getCategoryIcon } from '../../utils/categoryIcons';

const OrderSummaryTable = ({ cart, getTotalPrice, showTitle = true }) => {

    const categories = useSelector(selectCategories);

    // Table headers
    const tableHeaders = [
        { label: 'מוצר', align: 'left', description: 'Product', field: 'product' },
        { label: 'כמות', align: 'center', description: 'Quantity', field: 'quantity' },
        { label: 'מחיר', align: 'right', description: 'Price', field: 'price', isCalculated: false },
        { label: 'סכום', align: 'right', description: 'Total', field: 'total', isCalculated: true }
    ];

    // Style for product column
    const getCellStyle = (index) => {
        const header = tableHeaders[index];
        return header.field === 'product' ? { pl: 2 } : {};
    };

    // Bold for product/total columns
    const getCellFontWeight = (index) => {
        const header = tableHeaders[index];
        return header.field === 'product' || header.field === 'total' ? 'bold' : 'normal';
    };

    return (
        <>
            {/* Title and cart icon */}
            {showTitle && (
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCart />
                    מוצרים שנבחרו
                </Typography>
            )}

            {/* Empty cart message */}
            {cart.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        לא נבחרו מוצרים
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Products table */}
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header) => (
                                        <TableCell key={header.label} align={header.align}>
                                            {header.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Loop categories */}
                                {categories.map((category) => {
                                    // Filter items by category
                                    const categoryItems = cart.filter(item => item.product.categoryId === category.id);
                                    if (categoryItems.length === 0) return null;
                                    return (
                                        <React.Fragment key={category.id}>
                                            {/* Category row */}
                                            <TableRow>
                                                <TableCell colSpan={4} sx={{ bgcolor: (theme) => theme.palette.grey[50], py: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {/* Category icon */}
                                                        {React.createElement(getCategoryIcon(category.name), { sx: { fontSize: 18, color: (theme) => theme.palette.primary.main } })}
                                                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                                                            {category.name}
                                                        </Typography>
                                                        {/* Items count */}
                                                        <Chip
                                                            label={categoryItems.length}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                            {/* Product rows */}
                                            {categoryItems.map((item) => (
                                                <TableRow key={item.product.id}>
                                                    {tableHeaders.map((header, index) => (
                                                        <TableCell
                                                            key={index}
                                                            align={header.align}
                                                            sx={getCellStyle(index)}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                fontWeight={getCellFontWeight(index)}
                                                                color={header.field === 'product' ? 'primary.main' : header.field === 'total' ? 'success.main' : undefined}
                                                            >
                                                                {/* Product name, price, total, or quantity */}
                                                                {header.field === 'product'
                                                                    ? item.product.name
                                                                    : header.field === 'price'
                                                                        ? `₪${item.product.price.toLocaleString()}`
                                                                        : header.field === 'total'
                                                                            ? `₪${(item.product.price * item.quantity).toLocaleString()}`
                                                                            : item[header.field]
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Total price */}
                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">
                            סכום כולל:
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                            ₪{getTotalPrice().toLocaleString()}
                        </Typography>
                    </Box>
                </>
            )}
        </>
    );
};

export default OrderSummaryTable;
