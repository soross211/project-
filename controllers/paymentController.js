const db = require('../config/db');

// Create a new payment
exports.createPayment = (req, res) => {
  const { payerName, amount, paymentMethod } = req.body;
  const query = 'INSERT INTO payments (payerName, amount, paymentMethod) VALUES (?, ?, ?)';
  db.query(query, [payerName, amount, paymentMethod], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating payment', error: err });
    }
    res.status(201).json({ id: result.insertId, payerName, amount, paymentMethod });
  });
};

// Get all payments
exports.getAllPayments = (req, res) => {
  const query = 'SELECT * FROM payments';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching payments', error: err });
    }
    res.json(results);
  });
};

// Get a single payment by ID
exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM payments WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching payment', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(results[0]);
  });
};

// Update a payment by ID
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { payerName, amount, paymentMethod } = req.body;
  const query = 'UPDATE payments SET payerName = ?, amount = ?, paymentMethod = ? WHERE id = ?';
  db.query(query, [payerName, amount, paymentMethod, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating payment', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ id, payerName, amount, paymentMethod });
  });
};

// Delete a payment by ID
exports.deletePayment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM payments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting payment', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted' });
  });
};