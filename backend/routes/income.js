const express = require('express');
const router = express.Router();
const Income = require('../models/income');

// Create new income
router.post('/add', async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get total income
router.get('/total', async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      { $group: { _id: null, totalIncome: { $sum: '$amount' } } },
    ]);
    res.status(200).json(totalIncome[0].totalIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
