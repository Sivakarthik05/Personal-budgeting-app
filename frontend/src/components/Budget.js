import React from 'react';
import AddIncome from './AddIncome';  // Import AddIncome
import AddExpense from './AddExpense'; // Import AddExpense
import '../styles/Budget.css';

const Budget = () => {
  return (
    <div className="budget-container">
      <h1>Manage Budget</h1>
      <div className="budget-form">
        <h2>Add Income</h2>
        <AddIncome />
      </div>
      <div className="budget-form">
        <h2>Add Expense</h2>
        <AddExpense />
      </div>
    </div>
  );
};

export default Budget;
