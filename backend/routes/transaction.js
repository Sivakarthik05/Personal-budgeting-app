const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Create new transaction
router.post('/add', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
