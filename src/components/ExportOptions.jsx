import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiDownload, FiFileText, FiCopy, FiFigma, 
  FiLink, FiCheck, FiSettings 
} = FiIcons;

const ExportOptions = ({ pattern, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [exportSettings, setExportSettings] = useState({
    width: 1024,
    height: 1024,
    quality: 100,
    scale: 1
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exported, setExported] = useState(false);

  const exportFormats = [
    { id: 'png', name: 'PNG', icon: FiFileText },
    { id: 'svg', name: 'SVG', icon: FiFileText },
    { id: 'pdf', name: 'PDF', icon: FiFileText },
    { id: 'figma', name: 'Figma', icon: FiFigma }
  ];

  const handleExport = async () => {
    setExported(true);
    await onExport(selectedFormat, exportSettings);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2" />
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
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              selectedFormat === format.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <SafeIcon 
              icon={format.icon} 
              className="w-5 h-5 mx-auto mb-2 text-primary-600" 
            />
            <span className="text-sm font-medium text-gray-900">
              {format.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Advanced Settings */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <SafeIcon icon={FiSettings} className="w-4 h-4" />
          <span>Advanced Settings</span>
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={exportSettings.width}
                  onChange={(e) => setExportSettings({
                    ...exportSettings,
                    width: parseInt(e.target.value)
                  })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Width"
                />
                <span className="text-gray-500 self-center">×</span>
                <input
                  type="number"
                  value={exportSettings.height}
                  onChange={(e) => setExportSettings({
                    ...exportSettings,
                    height: parseInt(e.target.value)
                  })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Height"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={exportSettings.quality}
                onChange={(e) => setExportSettings({
                  ...exportSettings,
                  quality: parseInt(e.target.value)
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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

      {/* Export Actions */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon 
            icon={exported ? FiCheck : FiDownload} 
            className="w-4 h-4" 
          />
          <span>{exported ? 'Exported!' : 'Export Pattern'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {/* Copy share link */}}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <SafeIcon icon={FiLink} className="w-4 h-4" />
          <span>Share Link</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ExportOptions;