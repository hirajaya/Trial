import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src="/musicnexuslogo.jpeg" alt="Logo" />
        </div>
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
      <div className="header-right">
        <div className="cart-icon">
          <i className="fa fa-shopping-cart"></i>
        </div>
        <div className="profile-icon">
          <i className="fa fa-user-circle"></i>
        </div>
        <button className="logout-button">Log out</button>
      </div>
    </header>
  );
};

export default Header;
