import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatternGenerator from './PatternGenerator';
import ExportOptions from './ExportOptions';
import SafeIcon from '../common/SafeIcon';
import html2canvas from 'html2canvas';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSave, FiShare2, FiDownload, FiCheck, FiEdit, 
  FiImage, FiTag, FiTrash2, FiX
} = FiIcons;

const Editor = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [editingPattern, setEditingPattern] = useState(null);
  const patternRef = useRef(null);
  const [savedPatterns, setSavedPatterns] = useState([]);
  const [patternData, setPatternData] = useState({
    name: '',
    description: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Check if we're editing an existing pattern
  useEffect(() => {
    const loadSavedPatterns = () => {
      try {
        const savedPatternsData = localStorage.getItem('savedPatterns');
        if (savedPatternsData) {
          setSavedPatterns(JSON.parse(savedPatternsData));
        }
      } catch (error) {
        console.error("Error loading saved patterns:", error);
      }
    };

    loadSavedPatterns();

    // Check if we're editing a pattern
    const editingId = localStorage.getItem('editingPatternId');
    if (editingId) {
      const patternToEdit = savedPatterns.find(p => p.id.toString() === editingId);
      if (patternToEdit) {
        setEditingPattern(patternToEdit);
        setPatternData({
          name: patternToEdit.name || '',
          description: patternToEdit.description || '',
          tags: patternToEdit.tags || []
        });
      }
      
      // Clear the editing ID to prevent issues on refresh
      localStorage.removeItem('editingPatternId');
    }
  }, [savedPatterns.length]);

  const handleExport = async (format, settings) => {
    if (!patternRef.current) return;

    try {
      // Get the canvas element from the PatternGenerator
      const canvas = patternRef.current.querySelector('canvas');
      if (!canvas) {
        console.error("Canvas not found");
        return;
      }
      
      if (format === 'png') {
        // Export as PNG
        const link = document.createElement('a');
        link.download = `pattern-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'svg') {
        // Convert canvas to SVG (simplified approach)
        const svgData = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <image href="${canvas.toDataURL('image/png')}" width="${canvas.width}" height="${canvas.height}" />
          </svg>
        `;
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `pattern-${Date.now()}.svg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
      // Return true to indicate successful export
      return true;
    } catch (error) {
      console.error("Error exporting pattern:", error);
      return false;
    }
  };

  const handleSavePattern = () => {
    if (!patternRef.current) return;

    try {
      const canvas = patternRef.current.querySelector('canvas');
      if (!canvas) return;

      const newPattern = {
        id: editingPattern ? editingPattern.id : Date.now(),
        name: patternData.name || `Pattern ${savedPatterns.length + 1}`,
        description: patternData.description || '',
        tags: patternData.tags || [],
        thumbnail: canvas.toDataURL('image/png'),
        date: new Date().toLocaleDateString(),
        likes: editingPattern ? editingPattern.likes || 0 : 0,
        downloads: editingPattern ? editingPattern.downloads || 0 : 0
      };

      let updatedPatterns;
      if (editingPattern) {
        // Update existing pattern
        updatedPatterns = savedPatterns.map(pattern => 
          pattern.id === editingPattern.id ? newPattern : pattern
        );
      } else {
        // Add new pattern
        updatedPatterns = [...savedPatterns, newPattern];
      }
      
      // Save to local storage and state
      setSavedPatterns(updatedPatterns);
      localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));

      // Reset form data
      setPatternData({ name: '', description: '', tags: [] });
      setEditingPattern(null);

      // Show success indicator and close modal
      setIsSaved(true);
      setShowSaveModal(false);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Error saving pattern:", error);
    }
  };

  const handleShare = () => {
    // Show the export modal which also handles sharing
    setShowExportModal(true);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!patternData.tags.includes(tagInput.trim())) {
      setPatternData({
        ...patternData,
        tags: [...patternData.tags, tagInput.trim()]
      });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setPatternData({
      ...patternData,
      tags: patternData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-neugray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editor Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <div className="neu-icon-container mr-3">
              <SafeIcon icon={FiIcons.FiEdit2} className="w-5 h-5 text-primary-600" />
            </div>
            {editingPattern ? 'Edit Pattern' : 'Pattern Editor'}
          </h1>
          
          <div className="flex flex-wrap gap-3 save-section">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-3 neu-button"
              onClick={() => setShowExportModal(true)}
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-3 neu-button"
              onClick={() => setShowSaveModal(true)}
            >
              <SafeIcon icon={isSaved ? FiCheck : FiSave} className="w-4 h-4" />
              <span>{isSaved ? 'Saved!' : 'Save'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-3 neu-button"
              onClick={handleShare}
            >
              <SafeIcon icon={isShared ? FiCheck : FiShare2} className="w-4 h-4" />
              <span>{isShared ? 'Shared!' : 'Share'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Pattern Generator */}
        <div className="neu-card" ref={patternRef}>
          <PatternGenerator />
        </div>

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neu-gradient rounded-neu shadow-neu-card p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Export Pattern</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowExportModal(false)}
                    className="p-2 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button"
                  >
                    <SafeIcon icon={FiIcons.FiX} className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <ExportOptions 
                  onExport={handleExport}
                  onClose={() => setShowExportModal(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Modal */}
        <AnimatePresence>
          {showSaveModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSaveModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neu-gradient rounded-neu shadow-neu-card p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                      <SafeIcon icon={FiSave} className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingPattern ? 'Update Pattern' : 'Save Pattern'}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSaveModal(false)}
                    className="p-2 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiEdit} className="w-4 h-4 inline mr-2" />
                      Pattern Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 neu-input"
                      placeholder="e.g. Geometric Waves"
                      value={patternData.name}
                      onChange={(e) => setPatternData({ ...patternData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiImage} className="w-4 h-4 inline mr-2" />
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 neu-input"
                      placeholder="Describe your pattern..."
                      rows="3"
                      value={patternData.description}
                      onChange={(e) => setPatternData({ ...patternData, description: e.target.value })}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SafeIcon icon={FiTag} className="w-4 h-4 inline mr-2" />
                      Tags
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 neu-input rounded-r-none"
                        placeholder="Add tags..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-3 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    
                    {patternData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {patternData.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <SafeIcon icon={FiX} className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSaveModal(false)}
                    className="px-6 py-3 neu-button"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSavePattern}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingPattern ? 'Update Pattern' : 'Save Pattern'}
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

export default Editor;