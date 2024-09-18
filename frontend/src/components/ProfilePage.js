import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    employeeId: '12345',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-555-5555',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="navbar">
          <a href="#">Merchandise</a>
          <a href="#">Returns</a>
          <a href="#">Triggers</a>
          <a href="#">Alerts</a>
          <a href="#" className="active">Requests</a>
        </nav>
        <div className="user-icon">👤</div>
      </header>

      <div className="profile-card">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-details">
          {!isEditing ? (
            <>
              <p><strong>Employee ID:</strong> {profile.employeeId}</p>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <button className="edit-btn" onClick={toggleEdit}>Edit details</button>
            </>
          ) : (
            <>
              <label>Employee ID:</label>
              <input 
                type="text" 
                name="employeeId" 
                value={profile.employeeId} 
                onChange={handleInputChange} 
                disabled 
              />
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleInputChange} 
              />
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleInputChange} 
              />
              <label>Phone:</label>
              <input 
                type="tel" 
                name="phone" 
                value={profile.phone} 
                onChange={handleInputChange} 
              />
              <button className="save-btn" onClick={toggleEdit}>Save</button>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <a href="#" className="signout">Sign Out</a>
        <p>Copyright © 2024 Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
