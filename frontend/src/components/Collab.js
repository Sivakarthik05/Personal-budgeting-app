import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Collab.css';

const Collab = () => {
  const [groupType, setGroupType] = useState('');
  const [groupName, setGroupName] = useState('');
  const [numMembers, setNumMembers] = useState(0);
  const [invitationLink, setInvitationLink] = useState('');

  const createGroup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/group/create', {
        name: groupName,
        type: groupType,
        members: []
      });
      setInvitationLink(`http://localhost:3000/collab/join/${response.data._id}`);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="collab-container">
      <h1>Collaboration</h1>
      <div className="collab-options">
        <h3>Select Group Type:</h3>
        <select onChange={(e) => setGroupType(e.target.value)}>
          <option value="">Select</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
        </select>
        
        <h3>Group Name:</h3>
        <input
          type="text"
          placeholder="Enter group name"
          onChange={(e) => setGroupName(e.target.value)}
        />

        <h3>Number of Members:</h3>
        <input
          type="number"
          placeholder="Enter number of members"
          onChange={(e) => setNumMembers(e.target.value)}
        />

        <button onClick={createGroup}>Create Group</button>

        {invitationLink && (
          <div>
            <p>Invite members using this link:</p>
            <input type="text" value={invitationLink} readOnly />
          </div>
        )}
      </div>
    </div>
  );
};

export default Collab;
