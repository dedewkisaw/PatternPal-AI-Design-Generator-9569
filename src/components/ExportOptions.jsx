import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiFileText, FiCopy, FiFigma, FiLink, FiCheck, FiSettings } = FiIcons;

const ExportOptions = ({ pattern, onExport, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [exportSettings, setExportSettings] = useState({
    width: 1024,
    height: 1024,
    quality: 100,
    scale: 1
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exported, setExported] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const exportFormats = [
    { id: 'png', name: 'PNG', icon: FiFileText },
    { id: 'svg', name: 'SVG', icon: FiFileText },
    { id: 'pdf', name: 'PDF', icon: FiFileText },
    { id: 'figma', name: 'Figma', icon: FiFigma }
  ];

  const handleExport = async () => {
    setExported(true);
    
    if (onExport) {
      await onExport(selectedFormat, exportSettings);
    }
    
    // Generate a share link
    const shareId = Math.random().toString(36).substring(2, 15);
    const newShareLink = `https://patternpal.com/shared/${shareId}`;
    setShareLink(newShareLink);
    
    setTimeout(() => setExported(false), 2000);
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <div className="bg-neu-gradient rounded-neu p-6 shadow-neu-flat">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <div className="neu-icon-container mr-3">
          <SafeIcon icon={FiDownload} className="w-5 h-5 text-primary-600" />
        </div>
        Export Pattern
      </h3>
      
      {/* Format Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {exportFormats.map((format) => (
          <motion.button
            key={format.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFormat(format.id)}
            className={`p-4 rounded-neu-sm transition-all duration-200 ${
              selectedFormat === format.id
                ? 'bg-neu-primary text-white shadow-neu-button-pressed'
                : 'bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button'
            }`}
          >
            <SafeIcon 
              icon={format.icon} 
              className="w-5 h-5 mx-auto mb-2 text-current" 
            />
            <span className="text-sm font-medium">
              {format.name}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Advanced Settings */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 px-4 py-2 neu-button text-sm"
        >
          <SafeIcon icon={FiSettings} className="w-4 h-4" />
          <span>Advanced Settings</span>
        </button>
        
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4 p-4 bg-white/50 rounded-neu-sm shadow-neu-pressed-sm"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={exportSettings.width}
                  onChange={(e) => setExportSettings({ ...exportSettings, width: parseInt(e.target.value) })}
                  className="w-24 px-3 py-2 neu-input"
                  placeholder="Width"
                />
                <span className="text-gray-500 self-center">×</span>
                <input
                  type="number"
                  value={exportSettings.height}
                  onChange={(e) => setExportSettings({ ...exportSettings, height: parseInt(e.target.value) })}
                  className="w-24 px-3 py-2 neu-input"
                  placeholder="Height"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={exportSettings.quality}
                onChange={(e) => setExportSettings({ ...exportSettings, quality: parseInt(e.target.value) })}
                className="w-full slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Lower size</span>
                <span>{exportSettings.quality}%</span>
                <span>Best quality</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Share Link */}
      {shareLink && (
        <div className="mb-6 p-4 bg-white/50 rounded-neu-sm shadow-neu-pressed-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 truncate">{shareLink}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="ml-2 p-2 bg-neu-gradient rounded-full shadow-neu-flat-sm hover:shadow-neu-button"
            >
              <SafeIcon icon={linkCopied ? FiCheck : FiCopy} className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
        </div>
      )}
      
      {/* Export Actions */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 neu-button-primary"
        >
          <SafeIcon icon={exported ? FiCheck : FiDownload} className="w-4 h-4" />
          <span>{exported ? 'Exported!' : 'Export Pattern'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 neu-button"
        >
          <SafeIcon icon={linkCopied ? FiCheck : FiLink} className="w-4 h-4" />
          <span>{linkCopied ? 'Copied!' : 'Share Link'}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ExportOptions;