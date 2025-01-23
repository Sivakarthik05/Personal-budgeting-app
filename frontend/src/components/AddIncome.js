import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddIncome.css';

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  const handleAddIncome = async () => {
    if (!amount || !source) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/income/add', {
        amount: parseFloat(amount),
        source,
      });

      // Log success and reset form
      console.log('Income added:', response.data);
      alert('Income added successfully!');
      setAmount('');
      setSource('');
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income. Please try again.');
    }
  };

  return (
    <div className="add-income">
      <h3>Add Income</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <button onClick={handleAddIncome}>Add Income</button>
    </div>
  );
};

export default AddIncome;
