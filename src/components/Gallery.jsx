import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiDownload, FiEye, FiGrid, FiList, FiFilter } = FiIcons;

const Gallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [likedPatterns, setLikedPatterns] = useState(new Set());

  const patterns = [
    {
      id: 1,
      title: 'Geometric Waves',
      category: 'geometric',
      author: 'Sarah Chen',
      likes: 234,
      downloads: 1200,
      thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      colors: ['#3B82F6', '#8B5CF6', '#F59E0B']
    },
    {
      id: 2,
      title: 'Organic Flow',
      category: 'organic',
      author: 'Mike Johnson',
      likes: 189,
      downloads: 890,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      colors: ['#10B981', '#059669', '#047857']
    },
    {
      id: 3,
      title: 'Abstract Fusion',
      category: 'abstract',
      author: 'Emma Davis',
      likes: 312,
      downloads: 1560,
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      colors: ['#EF4444', '#F97316', '#DC2626']
    },
    {
      id: 4,
      title: 'Textile Harmony',
      category: 'textile',
      author: 'Alex Kim',
      likes: 156,
      downloads: 720,
      thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
      colors: ['#8B5CF6', '#7C3AED', '#6D28D9']
    },
    {
      id: 5,
      title: 'Minimalist Grid',
      category: 'geometric',
      author: 'David Wilson',
      likes: 278,
      downloads: 1340,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      colors: ['#374151', '#6B7280', '#9CA3AF']
    },
    {
      id: 6,
      title: 'Nature Inspired',
      category: 'organic',
      author: 'Lisa Park',
      likes: 445,
      downloads: 2100,
      thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      colors: ['#0EA5E9', '#3B82F6', '#1E40AF']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Patterns' },
    { id: 'geometric', name: 'Geometric' },
    { id: 'organic', name: 'Organic' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'textile', name: 'Textile' }
  ];

  const filteredPatterns = filter === 'all' 
    ? patterns 
    : patterns.filter(pattern => pattern.category === filter);

  const toggleLike = (patternId) => {
    const newLiked = new Set(likedPatterns);
    if (newLiked.has(patternId)) {
      newLiked.delete(patternId);
    } else {
      newLiked.add(patternId);
    }
    setLikedPatterns(newLiked);
  };

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
            Pattern Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore thousands of unique patterns created by our community
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          {/* Filter */}
          <div className="flex items-center space-x-4">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={FiGrid} className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={FiList} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredPatterns.map((pattern) => (
            <motion.div
              key={pattern.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="relative">
                <img
                  src={pattern.thumbnail}
                  alt={pattern.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(pattern.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      likedPatterns.has(pattern.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-all duration-200"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4 flex space-x-1">
                  {pattern.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pattern.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  by {pattern.author}
                </p>
                
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
                  <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {pattern.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;