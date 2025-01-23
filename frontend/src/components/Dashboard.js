import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    incomeTotal: 0,
    expenseTotal: 0,
    remainingBudget: 0,
    budget: [
      { name: 'Groceries', amount: 1500, spent: 1200 },
      { name: 'Entertainment', amount: 1000, spent: 800 },
      { name: 'Utilities', amount: 500, spent: 300 },
    ],
    groupProgress: [],
    exceedingMembers: [],
    votingResults: [],
  });

  useEffect(() => {
    // Fetch income total
    axios.get('http://localhost:5000/api/income/total')
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          incomeTotal: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching income total:', error);
      });

    // Fetch expense total
    axios.get('http://localhost:5000/api/expense/total')
      .then((response) => {
        const expenseTotal = response.data;
        setData((prevData) => ({
          ...prevData,
          expenseTotal,
          remainingBudget: prevData.incomeTotal - expenseTotal,
        }));
      })
      .catch((error) => {
        console.error('Error fetching expense total:', error);
      });

    // Fetch group progress
    axios.get('http://localhost:5000/api/collab/progress')
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          groupProgress: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching group progress:', error);
      });

    // Fetch exceeding members
    axios.get('http://localhost:5000/api/collab/exceeding')
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          exceedingMembers: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching exceeding members:', error);
      });

    // Fetch voting results
    axios.get('http://localhost:5000/api/collab/voting-results')
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          votingResults: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching voting results:', error);
      });
  }, []);

  const calculateProgress = () => {
    const totalSpent = data.expenseTotal;
    const totalBudget = data.incomeTotal;
    return totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>

        {/* Financial Summary */}
        <div className="financial-summary">
          <div className="summary-card">
            <h3>Total Income</h3>
            <p>${data.incomeTotal}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>${data.expenseTotal}</p>
          </div>
          <div className="summary-card">
            <h3>Remaining Budget</h3>
            <p>${data.remainingBudget}</p>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="progress-section">
          <h3>Budget Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <p>{calculateProgress().toFixed(2)}% of your budget spent</p>
        </div>

        {/* Pie Chart */}
        <div className="pie-chart">
          <h3>Spending by Category</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={data.budget}
              dataKey="spent"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {data.budget.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Collaborative Section */}
        <div className="collab-section">
          <h3>Group Progress</h3>
          <ul>
            {data.groupProgress.map((member, index) => (
              <li key={index}>{member.name}: ${member.contribution}</li>
            ))}
          </ul>

          <h3>Members Exceeding Limits</h3>
          <ul>
            {data.exceedingMembers.map((member, index) => (
              <li key={index} style={{ color: 'red' }}>
                {member.name}: Exceeded by ${member.exceededAmount}
              </li>
            ))}
          </ul>

          <h3>Voting Results</h3>
          <ul>
            {data.votingResults.map((result, index) => (
              <li key={index}>
                {result.option}: {result.votes} votes
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
