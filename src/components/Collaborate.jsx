import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiMessageCircle, FiVideo, FiShare2, FiEdit3, FiClock } = FiIcons;

const Collaborate = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'Textile Design Sprint',
      participants: ['Sarah', 'Mike', 'Emma'],
      isActive: true,
      lastActivity: '2 min ago',
      project: 'Summer Collection Patterns',
      thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Geometric Exploration',
      participants: ['Alex', 'Lisa'],
      isActive: false,
      lastActivity: '1 hour ago',
      project: 'Modern Architecture Patterns',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Brand Identity Workshop',
      participants: ['David', 'Emma', 'Sarah', 'Mike'],
      isActive: true,
      lastActivity: '5 min ago',
      project: 'Tech Startup Visual Identity',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
    }
  ];

  const activities = [
    { user: 'Sarah', action: 'created a new pattern', time: '2 min ago', type: 'create' },
    { user: 'Mike', action: 'commented on "Geometric Waves"', time: '5 min ago', type: 'comment' },
    { user: 'Emma', action: 'joined the collaboration', time: '10 min ago', type: 'join' },
    { user: 'Alex', action: 'shared a color palette', time: '15 min ago', type: 'share' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collaborate in Real-Time
          </h1>
          <p className="text-lg text-gray-600">
            Work together with your team to create amazing patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collaboration Rooms */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Active Rooms</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateRoom(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Create Room</span>
              </motion.button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-200 cursor-pointer ${
                    activeRoom === room.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setActiveRoom(room.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={room.thumbnail}
                      alt={room.project}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                        <div className="flex items-center space-x-2">
                          {room.isActive && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                          <span className="text-sm text-gray-500">{room.lastActivity}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{room.project}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {room.participants.slice(0, 3).map((participant, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                              >
                                {participant[0]}
                              </div>
                            ))}
                            {room.participants.length > 3 && (
                              <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                                +{room.participants.length - 3}
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {room.participants.length} participants
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiVideo} className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiShare2} className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Active Collaboration Canvas */}
            {activeRoom && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Collaborative Canvas</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <SafeIcon icon={FiUsers} className="w-4 h-4" />
                      <span>3 active editors</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      Join Session
                    </motion.button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <SafeIcon icon={FiEdit3} className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">Real-time collaborative canvas</p>
                    <p className="text-sm text-gray-400">Click "Join Session" to start collaborating</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiClock} className="w-5 h-5 mr-2" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {activity.user[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">Create New Room</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiUsers} className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">Invite Team Member</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiShare2} className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">Share Project</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;