import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PatternGenerator from './PatternGenerator';
import ExportOptions from './ExportOptions';
import SafeIcon from '../common/SafeIcon';
import html2canvas from 'html2canvas';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiShare2, FiDownload, FiCheck } = FiIcons;

const Editor = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const patternRef = useRef(null);
  const [savedPatterns, setSavedPatterns] = useState([]);

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

  const handleSave = () => {
    if (!patternRef.current) return;
    
    try {
      const canvas = patternRef.current.querySelector('canvas');
      if (!canvas) return;
      
      const patternData = {
        id: Date.now(),
        name: `Pattern ${savedPatterns.length + 1}`,
        thumbnail: canvas.toDataURL('image/png'),
        date: new Date().toLocaleDateString(),
        likes: 0,
        downloads: 0
      };
      
      // Save to local storage and state
      const updatedPatterns = [...savedPatterns, patternData];
      setSavedPatterns(updatedPatterns);
      localStorage.setItem('savedPatterns', JSON.stringify(updatedPatterns));
      
      // Show success indicator
      setIsSaved(true);
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

  return (
    <div className="min-h-screen pt-20 pb-16 bg-neugray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editor Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <div className="neu-icon-container mr-3">
              <SafeIcon icon={FiIcons.FiEdit2} className="w-5 h-5 text-primary-600" />
            </div>
            Pattern Editor
          </h1>
          
          <div className="flex space-x-4 save-section">
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
              onClick={handleSave}
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
        </div>
        
        {/* Pattern Generator */}
        <div className="neu-card" ref={patternRef}>
          <PatternGenerator />
        </div>
        
        {/* Export Modal */}
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neu-gradient rounded-neu shadow-neu-card p-8 max-w-md w-full mx-4"
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
      </div>
    </div>
  );
};

export default Editor;