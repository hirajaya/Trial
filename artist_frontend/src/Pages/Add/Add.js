import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mic, UserPlus, Music } from 'lucide-react';

const MusicDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome to MusicVerse</h1>
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => navigate('/dashboard/artist-profile')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1 flex items-center justify-center"
          >
            <Headphones className="mr-2" size={24} />
            <span>Artist</span>
          </button>
          <button
            onClick={() => navigate('/dashboard/user-profile')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1 flex items-center justify-center"
          >
            <Mic className="mr-2" size={24} />
            <span>User</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => navigate('/art-register')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1 flex items-center justify-center"
          >
            <UserPlus className="mr-2" size={24} />
            <span>Artist-Register</span>
          </button>
          <button
            onClick={() => navigate('/user-register')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex-1 flex items-center justify-center"
          >
            <Music className="mr-2" size={24} />
            <span>User-Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicDashboard;