const express = require('express');
const router = express.Router();
const Account = require('../models/account');

// Create new account
router.post('/add', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
