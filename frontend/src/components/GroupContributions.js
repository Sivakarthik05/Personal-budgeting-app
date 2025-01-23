import React from 'react';
import '../styles/GroupContributions.css'; // Add styles for this component

const GroupContributions = ({ groupData }) => {
  const calculateGroupProgress = () => {
    return (groupData.totalSpent / groupData.totalGoal) * 100;
  };

  return (
    <div className="group-contributions">
      <h3>Group Budget Overview</h3>
      <div className="group-summary">
        <div className="summary-card">
          <h4>Total Contributions</h4>
          <p>${groupData.totalContributions}</p>
        </div>
        <div className="summary-card">
          <h4>Total Spending</h4>
          <p>${groupData.totalSpent}</p>
        </div>
        <div className="summary-card">
          <h4>Shared Goal</h4>
          <p>${groupData.totalGoal}</p>
        </div>
      </div>

      {/* Progress bar for group goal */}
      <div className="group-progress">
        <h4>Collective Progress</h4>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${calculateGroupProgress()}%` }}
          ></div>
        </div>
        <p>{calculateGroupProgress().toFixed(2)}% of the goal achieved</p>
      </div>

      {/* Highlight overspending members */}
      <div className="overspending-members">
        <h4>Members Exceeding Spending Limits</h4>
        {groupData.membersExceeding.length > 0 ? (
          groupData.membersExceeding.map((member, index) => (
            <p key={index}>{member.name} (${member.spent})</p>
          ))
        ) : (
          <p>No members exceeding their limits.</p>
        )}
      </div>
    </div>
  );
};

export default GroupContributions;
