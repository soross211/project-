const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/payments', paymentRoutes);

module.exports = app;