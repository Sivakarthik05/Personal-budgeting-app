import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={toggleSidebar}>
        <h2>{isCollapsed ? 'T' : 'TRACKIFY'}</h2>
      </div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/budget">Budget</Link></li>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/transactions">Recent Transactions</Link></li>
        <li><Link to="/collab">Collab</Link></li> {/* New Collab option */}
      </ul>
    </div>
  );
};

export default Sidebar;
