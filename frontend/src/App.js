import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget'; // Budget component for adding income and expense
import Accounts from './components/Accounts'; // Accounts component for adding bank accounts
import RecentTransactions from './components/RecentTransactions'; // Recent Transactions page
import Collab from './components/Collab'; // New Collab page
import './styles/Global.css'; // Global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<RecentTransactions />} />
            <Route path="/collab" element={<Collab />} /> {/* New Collab route */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
