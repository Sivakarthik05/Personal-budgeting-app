const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expense');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');
const groupRoutes = require('./routes/group');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/personal-budget';
mongoose.connect('mongodb://127.0.0.1:27017/personal-budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection lost. Reconnecting...');
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Budget API!');
});

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.status(200).json({ status: 'ok', dbState: states[dbState] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// API Routes
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/group', groupRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available Routes:');
  console.log('  Income Routes:       /api/income');
  console.log('  Expense Routes:      /api/expense');
  console.log('  Account Routes:      /api/account');
  console.log('  Transaction Routes:  /api/transaction');
});
