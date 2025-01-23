const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Family', 'Friends', 'Work'], required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  savingsGoal: { type: Number, default: 0 },
  totalContributions: { type: Number, default: 0 },
  totalSpending: { type: Number, default: 0 },
  votingResults: [{
    cause: String,
    votes: Number
  }]
});

module.exports = mongoose.model('Group', groupSchema);
