// In routes/collab.js
const express = require('express');
const router = express.Router();
const Collab = require('../models/collab'); 

// Get group progress
router.get('/progress', async (req, res) => {
  try {
    const groupProgress = await Collab.find();
    res.status(200).json(groupProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get exceeding members
router.get('/exceeding', async (req, res) => {
  try {
    const exceedingMembers = await Collab.find({ exceeded: true });
    res.status(200).json(exceedingMembers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get voting results
router.get('/voting-results', async (req, res) => {
  try {
    const votingResults = await Collab.aggregate([
      { $group: { _id: '$voteOption', votes: { $sum: 1 } } },
    ]);
    res.status(200).json(votingResults);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
