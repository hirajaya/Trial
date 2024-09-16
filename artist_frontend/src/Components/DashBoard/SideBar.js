import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Library, PlaySquare, Upload, PlusCircle, Menu, X, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, text: 'Home', path: '/user-view' },
    { icon: Search, text: 'Search', path: '/search' },
    { icon: Library, text: 'Your Library', path: '/library' },
    { icon: PlaySquare, text: 'Create Playlist', path: '/create-playlist' },
    { icon: Upload, text: 'Upload Music', path: '/upload-music' },
    { icon: PlusCircle, text: 'Upload Event Details', path: '/upload-event' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userType');

    // Close the sidebar on mobile
    setIsOpen(false);

    // Redirect to the login page or home page
    navigate('/login');
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-full shadow-lg transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-300 ease-in-out z-10`}
      >
        <div className="w-64 bg-gray-800 text-white h-screen p-4 overflow-y-auto flex flex-col">
          <nav className="mt-8 md:mt-0 flex-grow">
            <ul className="space-y-2 md:space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                      location.pathname === item.path ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={24} />
                    <span className="text-lg">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-3 rounded-lg transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut size={24} />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;