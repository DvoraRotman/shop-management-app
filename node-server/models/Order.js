const mongoose = require('mongoose');

// Simple order model
const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: false
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  items: [{
    productId: String,
    productName: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Auto generate order number
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;