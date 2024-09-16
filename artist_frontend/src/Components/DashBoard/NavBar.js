import React, { useState } from 'react';
import { Search, Bell, Menu, X, Music } from 'lucide-react';
import { SomeIcon } from 'lucide-react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Music className="h-8 w-8 text-blue-500" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-gray-100">Music</a>
                <a href="#" className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-gray-100">Merchandise</a>
                <a href="#" className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-gray-100">Events</a>
              </div>
            </div>
          </div>
       
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Music</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Merchandise</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Events</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for Artists..."
                  className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
