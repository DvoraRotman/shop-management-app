const express = require('express');
const Order = require('../models/Order');
const { validateOrderData } = require('../validations/validations');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Validate order data
    const validation = validateOrderData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }
    // Use validated data
    const { fullName, email, address, items, totalAmount } = validation.data;
    const newOrder = new Order({
      fullName,
      email,
      address,
      items: items.map(item => ({
        productId: item.productId || item.id,
        productName: item.productName || item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice || (item.price * item.quantity)
      })),
      totalAmount,
      status: 'confirmed'
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: `Order ${savedOrder.orderNumber} created and saved successfully!`,
      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        status: savedOrder.status,
        totalAmount: savedOrder.totalAmount,
        createdAt: savedOrder.createdAt,
        customer: {
          fullName: savedOrder.fullName,
          email: savedOrder.email,
          address: savedOrder.address
        },
        itemsCount: savedOrder.items.length
      }
    });    
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Order number already exists - please try again'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error - please try again'
    });
  }
});

module.exports = router;
