const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, default: 'Bank Account' },
  accountBalance: { type: Number, required: true },
});

module.exports = mongoose.model('Account', accountSchema);
