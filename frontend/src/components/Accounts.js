import React, { useState } from 'react';
import axios from 'axios'; // Add axios to send data to the backend
import '../styles/Accounts.css'; // Ensure the CSS file is in the same directory or update the path

const Accounts = () => {
  const [showModal, setShowModal] = useState(false); // For showing/hiding modal
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Bank Account');
  const [accountBalance, setAccountBalance] = useState('');
  const [accounts, setAccounts] = useState([]); // List of added accounts

  const handleAddAccount = async () => {
    if (!accountName || !accountNumber || !accountBalance) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send the account data to the backend
      const response = await axios.post('http://localhost:5000/api/account/add', {
        accountName,
        accountNumber,
        accountType,
        accountBalance: parseFloat(accountBalance),
      });

      console.log('Added account:', response.data);
      alert('Account added successfully!');
      setAccounts([...accounts, response.data]); // Update state with the new account
      setAccountName('');
      setAccountNumber('');
      setAccountType('Bank Account');
      setAccountBalance('');
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Failed to add account.');
    }
  };

  return (
    <div className="accounts-container">
      <h1>Accounts</h1>

      {/* Show Accounts List */}
      <div className="accounts-list">
        {accounts.length === 0 ? (
          <p>No accounts added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Account Type</th>
                <th>Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <td>{account.accountName}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.accountType}</td>
                  <td>${account.accountBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Account Button */}
      <button className="add-account-btn" onClick={() => setShowModal(true)}>
        Add Account
      </button>

      {/* Modal for Adding Account */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Account</h2>
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Bank Account">Bank Account</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Savings">Savings</option>
            </select>
            <input
              type="number"
              placeholder="Account Balance"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleAddAccount} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
