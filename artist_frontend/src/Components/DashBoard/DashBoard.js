import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import Navbar from './NavBar';

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar className="w-full lg:w-1/4 xl:w-1/5 bg-gray-800" />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar className="w-full bg-white shadow-lg" />

        {/* Main content goes here */}
        <main className="flex-grow p-0 bg-white mt-0 mb-0">
          {/* This is where nested routes will be rendered */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

