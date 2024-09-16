import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    if (userType === 'artist') {
      navigate('/artist-login');
    } else {
      navigate('/user-login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Please choose your login type to proceed
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin('user')}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            User Login
          </button>
          <button
            onClick={() => handleLogin('artist')}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Artist Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
