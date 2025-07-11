import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiHeart, FiFolder, FiSettings, 
  FiGrid, FiDownload, FiShare2, FiEdit2 
} = FiIcons;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('patterns');
  
  const userStats = {
    patterns: 24,
    likes: 156,
    followers: 89,
    following: 45
  };

  const userPatterns = [
    {
      id: 1,
      name: "Ocean Waves",
      thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      likes: 45,
      downloads: 123,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Geometric Dreams",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      likes: 32,
      downloads: 89,
      date: "1 week ago"
    }
    // Add more patterns as needed
  ];

  const collections = [
    {
      id: 1,
      name: "Geometric Collection",
      patterns: 12,
      thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Nature Inspired",
      patterns: 8,
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
    }
    // Add more collections as needed
  ];

  const tabs = [
    { id: 'patterns', name: 'My Patterns', icon: FiGrid },
    { id: 'liked', name: 'Liked', icon: FiHeart },
    { id: 'collections', name: 'Collections', icon: FiFolder }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-start space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white text-3xl font-bold"
            >
              JD
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    John Doe
                  </h1>
                  <p className="text-gray-600">
                    Pattern Designer & Digital Artist
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.patterns}
                  </div>
                  <div className="text-sm text-gray-600">Patterns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.likes}
                  </div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.followers}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.following}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex space-x-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'patterns' && userPatterns.map((pattern) => (
            <motion.div
              key={pattern.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
            >
              <img
                src={pattern.thumbnail}
                alt={pattern.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pattern.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <SafeIcon icon={FiHeart} className="w-4 h-4 mr-1" />
                      {pattern.likes}
                    </span>
                    <span className="flex items-center">
                      <SafeIcon icon={FiDownload} className="w-4 h-4 mr-1" />
                      {pattern.downloads}
                    </span>
                  </div>
                  <span>{pattern.date}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {activeTab === 'collections' && collections.map((collection) => (
            <motion.div
              key={collection.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
            >
              <img
                src={collection.thumbnail}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {collection.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{collection.patterns} patterns</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;