import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUser, FiHeart, FiFolder, FiSettings, FiGrid, FiDownload, 
  FiShare2, FiEdit2, FiPlus, FiBookmark, FiTrello, FiActivity, 
  FiImage, FiTrash2, FiCheck, FiX, FiUpload
} = FiIcons;

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patterns');
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [likedPatterns, setLikedPatterns] = useState([]);
  const [bookmarkedPatterns, setBookmarkedPatterns] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedPatterns, setSelectedPatterns] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    bio: 'Pattern Designer & Digital Artist',
    email: 'john.doe@example.com',
    website: 'example.com',
    location: 'New York, USA'
  });
  
  // Load saved patterns from localStorage on component mount
  useEffect(() => {
    const loadPatternData = () => {
      try {
        // Load saved patterns
        const savedPatternsData = localStorage.getItem('savedPatterns');
        if (savedPatternsData) {
          setSavedPatterns(JSON.parse(savedPatternsData));
        }
        
        // Load liked patterns IDs
        const likedPatternsData = localStorage.getItem('likedPatterns');
        if (likedPatternsData) {
          const likedIds = JSON.parse(likedPatternsData);
          setLikedPatterns(getDemoPatterns().filter(p => likedIds.includes(p.id)));
        }
        
        // Load bookmarked patterns IDs
        const bookmarkedPatternsData = localStorage.getItem('bookmarkedPatterns');
        if (bookmarkedPatternsData) {
          const bookmarkedIds = JSON.parse(bookmarkedPatternsData);
          setBookmarkedPatterns(getDemoPatterns().filter(p => bookmarkedIds.includes(p.id)));
        }
        
        // Load user profile data
        const profileData = localStorage.getItem('userProfile');
        if (profileData) {
          setUserProfile(JSON.parse(profileData));
        }
        
        // Load profile image
        const profileImageData = localStorage.getItem('profileImage');
        if (profileImageData) {
          setProfileImage(profileImageData);
        }
      } catch (error) {
        console.error("Error loading patterns data:", error);
      }
    };
    
    loadPatternData();
  }, []);
  
  // Save user profile to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Demo patterns to complement user's data
  const getDemoPatterns = () => {
    return [
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
      }
    ];
  };

  const userStats = {
    patterns: savedPatterns.length,
    likes: likedPatterns.length,
    bookmarks: bookmarkedPatterns.length,
    followers: 89,
    following: 45
  };

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
    },
    {
      id: 3,
      name: "Modern Abstract",
      patterns: 5,
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"
    }
  ];

  const tabs = [
    { id: 'patterns', name: 'My Patterns', icon: FiGrid },
    { id: 'liked', name: 'Liked', icon: FiHeart },
    { id: 'bookmarked', name: 'Bookmarked', icon: FiBookmark },
    { id: 'collections', name: 'Collections', icon: FiFolder }
  ];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePatternSelection = (patternId) => {
    const newSelected = new Set(selectedPatterns);
    if (newSelected.has(patternId)) {
      newSelected.delete(patternId);
    } else {
      newSelected.add(patternId);
    }
    setSelectedPatterns(newSelected);
  };

  const handleBulkDelete = () => {
    const updatedPatterns = savedPatterns.filter(pattern => !selectedPatterns.has(pattern.id));
    setSavedPatterns(updatedPatterns);
    localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
    setSelectedPatterns(new Set());
    setIsSelectionMode(false);
    setShowDeleteConfirm(false);
  };

  const handleCreateCollection = () => {
    // This would typically open a modal to create a new collection
    // For now, we'll just navigate to the gallery
    navigate('/gallery');
  };

  const renderPatternGrid = (patterns) => {
    if (patterns.length === 0) {
      return (
        <div className="text-center py-16 bg-gray-50 rounded-xl shadow-neu-flat">
          <SafeIcon icon={activeTab === 'patterns' ? FiGrid : activeTab === 'liked' ? FiHeart : FiBookmark} 
                   className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {activeTab === 'patterns' ? "No patterns yet" : 
             activeTab === 'liked' ? "No liked patterns" : "No bookmarked patterns"}
          </h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'patterns' 
              ? "You haven't created any patterns yet. Start creating beautiful patterns now!" 
              : activeTab === 'liked'
                ? "You haven't liked any patterns yet. Explore the gallery to find patterns you love."
                : "You haven't bookmarked any patterns yet. Bookmark patterns to save them for later."}
          </p>
          {activeTab === 'patterns' ? (
            <Link to="/editor">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create Your First Pattern
              </motion.button>
            </Link>
          ) : (
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explore Gallery
              </motion.button>
            </Link>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map((pattern) => (
          <motion.div
            key={pattern.id}
            whileHover={{ y: -5 }}
            className={`bg-white rounded-xl overflow-hidden shadow-neu-flat hover:shadow-neu-card transition-all duration-300 ${
              isSelectionMode && activeTab === 'patterns' ? 'relative' : ''
            }`}
          >
            {isSelectionMode && activeTab === 'patterns' && (
              <div 
                className={`absolute top-4 left-4 z-10 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                  selectedPatterns.has(pattern.id) 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white/80 text-gray-600'
                }`}
                onClick={() => togglePatternSelection(pattern.id)}
              >
                {selectedPatterns.has(pattern.id) && <SafeIcon icon={FiCheck} className="w-4 h-4" />}
              </div>
            )}
            
            <div className="relative">
              <img
                src={pattern.thumbnail}
                alt={pattern.title || pattern.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-all duration-200"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                </motion.button>
                
                {activeTab === 'patterns' && (
                  <Link to="/editor">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-all duration-200"
                    >
                      <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {pattern.title || pattern.name}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <SafeIcon icon={FiHeart} className="w-4 h-4 mr-1" />
                    {pattern.likes || 0}
                  </span>
                  <span className="flex items-center">
                    <SafeIcon icon={FiDownload} className="w-4 h-4 mr-1" />
                    {pattern.downloads || 0}
                  </span>
                </div>
                
                {pattern.date && <span>{pattern.date}</span>}
              </div>
              
              <div className="flex space-x-2">
                {activeTab === 'patterns' && (
                  <>
                    <Link to="/editor" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                      >
                        <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                        <span>Edit</span>
                      </motion.button>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      <span>Download</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                    >
                      <SafeIcon icon={FiShare2} className="w-4 h-4" />
                      <span>Share</span>
                    </motion.button>
                  </>
                )}
                
                {(activeTab === 'liked' || activeTab === 'bookmarked') && (
                  <>
                    <Link to="/editor" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                      >
                        <SafeIcon icon={FiImage} className="w-4 h-4" />
                        <span>Use</span>
                      </motion.button>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      <span>Download</span>
                    </motion.button>
                    
                    <Link to="/gallery" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                      >
                        <SafeIcon icon={FiFolder} className="w-4 h-4" />
                        <span>View</span>
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-neu-flat mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white text-3xl md:text-4xl font-bold overflow-hidden"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  userProfile.name.substring(0, 2).toUpperCase()
                )}
              </motion.div>
              <div className="absolute bottom-0 right-0">
                <label className="cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-full shadow-neu-flat-sm flex items-center justify-center hover:shadow-neu-button transition-all">
                    <SafeIcon icon={FiUpload} className="w-4 h-4 text-gray-600" />
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {userProfile.name}
                  </h1>
                  <p className="text-gray-600">
                    {userProfile.bio}
                  </p>
                  {userProfile.location && (
                    <p className="text-gray-500 text-sm mt-1">
                      <SafeIcon icon={FiIcons.FiMapPin} className="w-3 h-3 inline mr-1" />
                      {userProfile.location}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 md:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditProfile(true)}
                    className="flex items-center space-x-2 px-4 py-2 neu-button"
                  >
                    <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                <div className="text-center p-2 rounded-lg neu-card">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.patterns}
                  </div>
                  <div className="text-sm text-gray-600">Patterns</div>
                </div>
                
                <div className="text-center p-2 rounded-lg neu-card">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.likes}
                  </div>
                  <div className="text-sm text-gray-600">Liked</div>
                </div>
                
                <div className="text-center p-2 rounded-lg neu-card">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.bookmarks}
                  </div>
                  <div className="text-sm text-gray-600">Bookmarked</div>
                </div>
                
                <div className="text-center p-2 rounded-lg neu-card">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.followers}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                
                <div className="text-center p-2 rounded-lg neu-card">
                  <div className="text-xl font-bold text-gray-900">
                    {userStats.following}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link to="/editor">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    <span>Create Pattern</span>
                  </motion.button>
                </Link>
                
                <Link to="/gallery">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-4 py-2 neu-button"
                  >
                    <SafeIcon icon={FiGrid} className="w-4 h-4" />
                    <span>View Gallery</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab.id);
                setIsSelectionMode(false);
                setSelectedPatterns(new Set());
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-neu-button'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Action Bar for My Patterns */}
        {activeTab === 'patterns' && savedPatterns.length > 0 && (
          <div className="flex flex-wrap justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-neu-flat-sm">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-gray-900">Your Patterns</h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {savedPatterns.length} {savedPatterns.length === 1 ? 'pattern' : 'patterns'}
              </div>
            </div>
            
            <div className="flex space-x-3 mt-2 sm:mt-0">
              {!isSelectionMode ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSelectionMode(true)}
                    className="flex items-center space-x-2 px-4 py-2 neu-button"
                  >
                    <SafeIcon icon={FiTrello} className="w-4 h-4" />
                    <span>Select</span>
                  </motion.button>
                  
                  <Link to="/editor">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      <span>Create New</span>
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSelectionMode(false);
                      setSelectedPatterns(new Set());
                    }}
                    className="flex items-center space-x-2 px-4 py-2 neu-button"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                    <span>Cancel</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectedPatterns.size > 0 && setShowDeleteConfirm(true)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedPatterns.size > 0
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={selectedPatterns.size === 0}
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    <span>{selectedPatterns.size > 0 ? `Delete (${selectedPatterns.size})` : 'Delete'}</span>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'patterns' && renderPatternGrid(savedPatterns)}
            
            {activeTab === 'liked' && renderPatternGrid(likedPatterns)}
            
            {activeTab === 'bookmarked' && renderPatternGrid(bookmarkedPatterns)}
            
            {activeTab === 'collections' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Collections</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateCollection}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    <span>New Collection</span>
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection) => (
                    <motion.div
                      key={collection.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl overflow-hidden shadow-neu-flat hover:shadow-neu-card transition-all duration-300"
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
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{collection.patterns} {collection.patterns === 1 ? 'pattern' : 'patterns'}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <SafeIcon icon={FiShare2} className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="flex space-x-2">
                          <Link to="/gallery" className="flex-1">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                            >
                              <SafeIcon icon={FiGrid} className="w-4 h-4" />
                              <span>View</span>
                            </motion.button>
                          </Link>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 neu-button"
                          >
                            <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                            <span>Edit</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-neu-card p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditProfile(false)}
                    className="p-2 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          userProfile.name.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <label className="px-4 py-2 neu-button cursor-pointer">
                        <SafeIcon icon={FiUpload} className="w-4 h-4 inline mr-2" />
                        <span>Upload Photo</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      className="w-full px-4 py-2 neu-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      className="w-full px-4 py-2 neu-input"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="w-full px-4 py-2 neu-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="text"
                      value={userProfile.website}
                      onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                      className="w-full px-4 py-2 neu-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={userProfile.location}
                      onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                      className="w-full px-4 py-2 neu-input"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditProfile(false)}
                    className="px-4 py-2 neu-button"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditProfile(false)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-neu-card p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-4 text-red-600">
                  <SafeIcon icon={FiTrash2} className="w-6 h-6 mr-2" />
                  <h2 className="text-xl font-bold">Delete Patterns</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete {selectedPatterns.size} {selectedPatterns.size === 1 ? 'pattern' : 'patterns'}? This action cannot be undone.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 neu-button"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;