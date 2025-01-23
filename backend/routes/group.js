const express = require('express');
const router = express.Router();
const Group = require('../models/group');

// Create a new group
router.post('/create', async (req, res) => {
  try {
    const { name, type, members } = req.body;
    const group = new Group({ name, type, members });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Invite members
router.post('/invite', async (req, res) => {
  try {
    const { groupId, newMembers } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.members.push(...newMembers);
    await group.save();
    res.status(200).json({ message: 'Members invited successfully', group });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Track collective spending
router.get('/progress/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('expenses');
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const totalSpending = group.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    res.status(200).json({ totalSpending, savingsGoal: group.savingsGoal });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Vote for allocation of savings
router.post('/vote', async (req, res) => {
  try {
    const { groupId, cause } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const existingVote = group.votingResults.find(v => v.cause === cause);
    if (existingVote) {
      existingVote.votes += 1;
    } else {
      group.votingResults.push({ cause, votes: 1 });
    }
    
    await group.save();
    res.status(200).json({ message: 'Vote submitted successfully', group });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
