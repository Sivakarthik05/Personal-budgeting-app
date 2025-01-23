const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Create new expense
router.post('/add', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get total expenses
router.get('/total', async (req, res) => {
  try {
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);
    res.status(200).json(totalExpenses[0].totalExpenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
