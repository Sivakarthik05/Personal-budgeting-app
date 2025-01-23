import React, { useState } from 'react';
import axios from 'axios'; // Add axios to send data to the backend
import '../styles/AddExpense.css'; // Import the CSS for AddExpense

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async () => {
    if (!amount || !category || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send the expense data to the backend
      const response = await axios.post('http://localhost:5000/api/expense/add', {
        amount: parseFloat(amount),
        category,
        description,
      });

      console.log('Added expense:', response.data);
      alert('Expense added successfully!');
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense.');
    }
  };

  return (
    <div className="add-expense">
      <h3>Add Expense</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;
