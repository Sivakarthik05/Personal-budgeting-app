import React, { useState } from 'react';
import axios from 'axios'; // Add axios to send data to the backend
import '../styles/RecentTransactions.css'; // Import the updated CSS

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]); // State for storing transactions
  const [showModal, setShowModal] = useState(false); // State to toggle the modal
  const [transactionDetails, setTransactionDetails] = useState({
    account: '',
    transactionName: '',
    category: '',
    date: '',
    amount: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetails({ ...transactionDetails, [name]: value });
  };

  const handleAddTransaction = async () => {
    if (
      !transactionDetails.account ||
      !transactionDetails.transactionName ||
      !transactionDetails.category ||
      !transactionDetails.date ||
      !transactionDetails.amount
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      // Send the transaction data to the backend
      const response = await axios.post('http://localhost:5000/api/transaction/add', {
        ...transactionDetails,
        amount: parseFloat(transactionDetails.amount),
      });

      console.log('Added transaction:', response.data);
      alert('Transaction added successfully!');
      setTransactions([...transactions, response.data]);

      // Reset form and close modal
      setTransactionDetails({
        account: '',
        transactionName: '',
        category: '',
        date: '',
        amount: '',
        note: '',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction.');
    }
  };

  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      <button className="add-transaction-btn" onClick={() => setShowModal(true)}>
        Add Transaction
      </button>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-transactions">
                No transactions found. Add a new transaction to get started!
              </td>
            </tr>
          ) : (
            transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.account}</td>
                <td>{txn.transactionName}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>${txn.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Adding Transactions */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Transaction</h2>
            <select
              name="account"
              value={transactionDetails.account}
              onChange={handleInputChange}
            >
              <option value="">Select Account</option>
              <option value="US Bank">US Bank</option>
              <option value="Wallet">Wallet</option>
              <option value="Revolut">Revolut</option>
            </select>
            <input
              type="text"
              name="transactionName"
              placeholder="Transaction Name"
              value={transactionDetails.transactionName}
              onChange={handleInputChange}
            />
            <select
              name="category"
              value={transactionDetails.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Groceries">Groceries</option>
              <option value="Gas">Gas</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              name="date"
              value={transactionDetails.date}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={transactionDetails.amount}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="note"
              placeholder="Note (Optional)"
              value={transactionDetails.note}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleAddTransaction} className="save-btn">
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
