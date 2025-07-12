import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiGrid, FiEdit2, FiUser } = FiIcons;

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { path: '/', name: 'Home', icon: FiHome },
    { path: '/editor', name: 'Editor', icon: FiEdit2 },
    { path: '/gallery', name: 'Gallery', icon: FiGrid },
    { path: '/profile', name: 'Profile', icon: FiUser }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="w-10 h-10 bg-neu-gradient rounded-full shadow-neu-flat-sm flex items-center justify-center text-gray-800 font-bold text-sm"
            >
              PP
            </motion.div>
            <span className="text-xl font-bold text-gray-800">
              PatternPal
            </span>
          </Link>
          
          <div className="flex space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setCurrentPage(item.name.toLowerCase())}
                className={`px-4 py-2 rounded-neu-sm flex items-center space-x-2 transition-all duration-300 ${
                  currentPage === item.name.toLowerCase()
                    ? 'bg-neu-gradient-pressed shadow-neu-button-pressed text-primary-600'
                    : 'bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600'
                }`}
              >
                <SafeIcon icon={item.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;