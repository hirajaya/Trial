import React from 'react';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header>
        <div className="logo">
          {/* Your logo image or placeholder */}
          <img src="your-logo.png" alt="Your Company Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">ArtistPayroll</a>
            </li>
            <li>
              <a href="#">DeliveryPayroll</a>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
            <li>
              <a href="#">Promotions</a>
            </li>
            <li>
              <a href="#">Report</a>
            </li>
          </ul>
        </nav>
        <div className="user-profile">
          <button type="button">
            <i className="fas fa-user"></i>
            Log Out
          </button>
        </div>
      </header>
      <main>
        <section className="admin-info">
          <h2>Admin Dashboard</h2>
          <div className="profile-card">
            <div className="profile-image">
              {/* Your profile image or placeholder */}
              <img src="your-profile-image.png" alt="Your Profile" />
            </div>
            <div className="profile-details">
              <p>Name: Devon Perera</p>
              <p>Admin ID: 23658</p>
              <p>Age: 28</p>
              <p>Location: 5/3 Jaya Road Colombo 4</p>
              <p>Delivery Code: 582</p>
              <p>Login Code: DE562</p>
            </div>
          </div>
        </section>
        <section className="dashboard-content">
          {/* Your dashboard content */}
          {/* Add sections, charts, tables, etc., here */}
        </section>
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          <ul className="social-links">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;