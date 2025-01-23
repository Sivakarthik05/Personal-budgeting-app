const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account: { type: String, required: true },
  transactionName: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  note: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
