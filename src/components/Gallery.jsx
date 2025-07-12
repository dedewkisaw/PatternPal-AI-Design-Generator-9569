import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiDownload, FiEye, FiGrid, FiList, FiFilter, FiEdit2, FiPlus, FiUser, FiShare2, FiStar, FiBookmark, FiInfo } = FiIcons;

const Gallery = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [likedPatterns, setLikedPatterns] = useState(new Set());
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [bookmarkedPatterns, setBookmarkedPatterns] = useState(new Set());
  
  // Load saved patterns from localStorage on component mount
  useEffect(() => {
    const loadSavedPatterns = () => {
      try {
        const savedPatternsData = localStorage.getItem('savedPatterns');
        if (savedPatternsData) {
          setSavedPatterns(JSON.parse(savedPatternsData));
        }

        // Load liked patterns
        const likedPatternsData = localStorage.getItem('likedPatterns');
        if (likedPatternsData) {
          setLikedPatterns(new Set(JSON.parse(likedPatternsData)));
        }

        // Load bookmarked patterns
        const bookmarkedPatternsData = localStorage.getItem('bookmarkedPatterns');
        if (bookmarkedPatternsData) {
          setBookmarkedPatterns(new Set(JSON.parse(bookmarkedPatternsData)));
        }
      } catch (error) {
        console.error("Error loading patterns data:", error);
      }
    };
    
    loadSavedPatterns();
  }, []);

  // Save liked patterns to localStorage when they change
  useEffect(() => {
    localStorage.setItem('likedPatterns', JSON.stringify([...likedPatterns]));
  }, [likedPatterns]);

  // Save bookmarked patterns to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookmarkedPatterns', JSON.stringify([...bookmarkedPatterns]));
  }, [bookmarkedPatterns]);

  // Demo patterns to display along with user's saved patterns
  const demoPatterns = [
    {
      id: 1,
      title: 'Geometric Waves',
      category: 'geometric',
      author: 'Sarah Chen',
      likes: 234,
      downloads: 1200,
      createdAt: '2023-04-15',
      description: 'A mesmerizing pattern of geometric waves that creates a sense of movement and depth. Perfect for modern web backgrounds and digital art projects.',
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
      createdAt: '2023-05-22',
      description: 'Inspired by natural elements, this flowing organic pattern brings a touch of nature to your designs. Great for wellness brands and eco-friendly products.',
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
      createdAt: '2023-06-10',
      description: 'A bold abstract pattern that fuses multiple design elements into a harmonious composition. Ideal for creative portfolios and artistic expressions.',
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
      createdAt: '2023-07-05',
      description: 'Inspired by traditional textile designs, this pattern blends cultural elements with modern aesthetics. Perfect for fashion and home decor applications.',
      thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
      colors: ['#8B5CF6', '#7C3AED', '#6D28D9']
    },
    {
      id: 5,
      title: 'Digital Nebula',
      category: 'abstract',
      author: 'Jordan Lee',
      likes: 278,
      downloads: 1050,
      createdAt: '2023-08-18',
      description: 'A cosmic-inspired digital pattern that resembles distant nebulae and star clusters. Creates a sense of wonder and exploration in your designs.',
      thumbnail: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=400&h=300&fit=crop',
      colors: ['#4F46E5', '#7C3AED', '#2563EB']
    },
    {
      id: 6,
      title: 'Minimalist Grids',
      category: 'geometric',
      author: 'Taylor Swift',
      likes: 201,
      downloads: 980,
      createdAt: '2023-09-02',
      description: 'Clean, minimal grid-based pattern that brings structure and clarity to your designs. Excellent for corporate materials and modern interfaces.',
      thumbnail: 'https://images.unsplash.com/photo-1603665301175-57ba46f392ed?w=400&h=300&fit=crop',
      colors: ['#111827', '#374151', '#6B7280']
    }
  ];
  
  // Combine demo patterns with user's saved patterns
  const combinedPatterns = [
    ...savedPatterns.map(p => ({
      ...p,
      category: 'my-patterns',
      author: 'You',
      description: p.description || 'Your custom pattern creation',
      createdAt: new Date(p.id).toISOString().split('T')[0],
      colors: ['#3B82F6', '#8B5CF6', '#F59E0B']
    })),
    ...demoPatterns
  ];

  const categories = [
    { id: 'all', name: 'All Patterns' },
    { id: 'my-patterns', name: 'My Patterns' },
    { id: 'geometric', name: 'Geometric' },
    { id: 'organic', name: 'Organic' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'textile', name: 'Textile' },
    { id: 'bookmarked', name: 'Bookmarked', icon: FiBookmark }
  ];

  const filteredPatterns = 
    filter === 'all' 
      ? combinedPatterns 
      : filter === 'bookmarked'
        ? combinedPatterns.filter(pattern => bookmarkedPatterns.has(pattern.id))
        : combinedPatterns.filter(pattern => pattern.category === filter);

  const toggleLike = (patternId) => {
    const newLiked = new Set(likedPatterns);
    if (newLiked.has(patternId)) {
      newLiked.delete(patternId);
    } else {
      newLiked.add(patternId);
    }
    setLikedPatterns(newLiked);
  };

  const toggleBookmark = (patternId) => {
    const newBookmarked = new Set(bookmarkedPatterns);
    if (newBookmarked.has(patternId)) {
      newBookmarked.delete(patternId);
    } else {
      newBookmarked.add(patternId);
    }
    setBookmarkedPatterns(newBookmarked);
  };

  const openPatternDetails = (pattern) => {
    setSelectedPattern(pattern);
    setShowDetailsModal(true);
  };

  const handleEditPattern = (patternId) => {
    // Here you would navigate to the editor with the pattern data
    localStorage.setItem('editingPatternId', patternId);
    navigate('/editor');
  };

  const handleViewProfile = (author) => {
    if (author === 'You') {
      navigate('/profile');
    } else {
      // For demo purposes, just navigate to profile
      navigate('/profile');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pattern Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore your saved patterns and discover creations by the PatternPal community
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          {/* Filter */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full sm:w-auto">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                    filter === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon && <SafeIcon icon={category.icon} className="w-4 h-4 mr-1" />}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* View Mode & Create New */}
          <div className="flex items-center space-x-3">
            <Link to="/editor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Create New</span>
              </motion.button>
            </Link>
            
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
        </div>

        {/* Gallery */}
        {filteredPatterns.length > 0 ? (
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
                className="bg-white rounded-xl overflow-hidden shadow-neu-flat hover:shadow-neu-card transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={pattern.thumbnail}
                    alt={pattern.title || pattern.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openPatternDetails(pattern)}
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
                      onClick={() => toggleBookmark(pattern.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        bookmarkedPatterns.has(pattern.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <SafeIcon icon={FiBookmark} className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-all duration-200"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    </motion.button>
                    
                    {pattern.category === 'my-patterns' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditPattern(pattern.id)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-all duration-200"
                      >
                        <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 flex space-x-1">
                    {pattern.colors && pattern.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-primary-600 transition-colors"
                      onClick={() => openPatternDetails(pattern)}>
                    {pattern.title || pattern.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={() => handleViewProfile(pattern.author)}
                      className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                    >
                      <SafeIcon icon={FiUser} className="w-3 h-3 mr-1" />
                      <span>by {pattern.author}</span>
                    </button>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{pattern.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <SafeIcon icon={FiHeart} className="w-4 h-4 mr-1" />
                        {likedPatterns.has(pattern.id) ? (pattern.likes + 1) : pattern.likes || 0}
                      </span>
                      <span className="flex items-center">
                        <SafeIcon icon={FiDownload} className="w-4 h-4 mr-1" />
                        {pattern.downloads || 0}
                      </span>
                    </div>
                    
                    <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {pattern.category === 'my-patterns' ? 'Your Pattern' : pattern.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl shadow-neu-flat">
            <SafeIcon icon={FiGrid} className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No patterns found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'my-patterns' 
                ? "You haven't created any patterns yet" 
                : filter === 'bookmarked'
                  ? "You haven't bookmarked any patterns yet"
                  : "No patterns found with the current filter"}
            </p>
            <Link to="/editor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create Your First Pattern
              </motion.button>
            </Link>
          </div>
        )}

        {/* Pattern Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedPattern && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDetailsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-neu-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img 
                      src={selectedPattern.thumbnail} 
                      alt={selectedPattern.title || selectedPattern.name}
                      className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    />
                    <button
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all duration-200"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedPattern.title || selectedPattern.name}
                    </h2>
                    
                    <div className="flex items-center mb-4">
                      <button 
                        onClick={() => {
                          setShowDetailsModal(false);
                          handleViewProfile(selectedPattern.author);
                        }}
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                      >
                        <SafeIcon icon={FiUser} className="w-4 h-4 mr-1" />
                        <span>by {selectedPattern.author}</span>
                      </button>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{selectedPattern.createdAt}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 flex-grow">
                      {selectedPattern.description}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Colors</h3>
                      <div className="flex space-x-2">
                        {selectedPattern.colors && selectedPattern.colors.map((color, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-xs text-gray-500 mt-1">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {selectedPattern.category === 'my-patterns' ? 'Your Pattern' : selectedPattern.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center">
                        <SafeIcon icon={FiHeart} className="w-3 h-3 mr-1 text-red-500" />
                        {likedPatterns.has(selectedPattern.id) ? (selectedPattern.likes + 1) : selectedPattern.likes || 0} likes
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center">
                        <SafeIcon icon={FiDownload} className="w-3 h-3 mr-1" />
                        {selectedPattern.downloads || 0} downloads
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleLike(selectedPattern.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          likedPatterns.has(selectedPattern.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SafeIcon icon={likedPatterns.has(selectedPattern.id) ? FiHeart : FiHeart} className="w-4 h-4" />
                        <span>{likedPatterns.has(selectedPattern.id) ? 'Liked' : 'Like'}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleBookmark(selectedPattern.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          bookmarkedPatterns.has(selectedPattern.id)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <SafeIcon icon={FiBookmark} className="w-4 h-4" />
                        <span>{bookmarkedPatterns.has(selectedPattern.id) ? 'Bookmarked' : 'Bookmark'}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                      >
                        <SafeIcon icon={FiShare2} className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                      
                      {selectedPattern.category === 'my-patterns' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setShowDetailsModal(false);
                            handleEditPattern(selectedPattern.id);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
                        >
                          <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                          <span>Edit Pattern</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;