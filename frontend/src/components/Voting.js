import React, { useState } from 'react';
import '../styles/Voting.css'; // Add styles for this component

const Voting = () => {
  const [votes, setVotes] = useState({
    charity: 0,
    rewards: 0,
    savings: 0,
  });

  const handleVote = (category) => {
    setVotes({ ...votes, [category]: votes[category] + 1 });
  };

  const totalVotes = votes.charity + votes.rewards + votes.savings;

  const calculatePercentage = (categoryVotes) => {
    return totalVotes > 0 ? (categoryVotes / totalVotes) * 100 : 0;
  };

  return (
    <div className="voting-section">
      <h3>Vote for Contribution Allocation</h3>
      <div className="voting-options">
        <button onClick={() => handleVote('charity')}>Charity</button>
        <button onClick={() => handleVote('rewards')}>Rewards</button>
        <button onClick={() => handleVote('savings')}>Savings</button>
      </div>

      <div className="voting-results">
        <h4>Voting Results</h4>
        <p>Charity: {calculatePercentage(votes.charity).toFixed(2)}%</p>
        <p>Rewards: {calculatePercentage(votes.rewards).toFixed(2)}%</p>
        <p>Savings: {calculatePercentage(votes.savings).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Voting;
