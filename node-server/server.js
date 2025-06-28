const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import our modular components
const connectDB = require('./config/database');
const ordersRouter = require('./routes/orders');
const { getAvailablePort } = require('./config/port');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Orders API
app.use('/api/orders', ordersRouter);

// Initialize server with dynamic port
const startServer = async () => {
    const PORT = await getAvailablePort(process.env.PORT || 3001);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Orders endpoint: POST http://localhost:${PORT}/api/orders`);
    });
};

startServer();

module.exports = app;
