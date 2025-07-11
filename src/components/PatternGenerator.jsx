import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiDownload, FiRefreshCw, FiSettings, FiPalette, FiGrid, FiLayers } = FiIcons;

const PatternGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('geometric');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPattern, setGeneratedPattern] = useState(null);
  const [settings, setSettings] = useState({
    complexity: 5,
    colors: ['#3B82F6', '#8B5CF6', '#F59E0B'],
    size: 'medium',
    style: 'modern'
  });
  const canvasRef = useRef(null);

  const templates = [
    { id: 'geometric', name: 'Geometric', icon: FiGrid, description: 'Clean lines and shapes' },
    { id: 'organic', name: 'Organic', icon: FiLayers, description: 'Natural, flowing forms' },
    { id: 'abstract', name: 'Abstract', icon: FiPalette, description: 'Artistic expressions' },
    { id: 'textile', name: 'Textile', icon: FiGrid, description: 'Fabric-ready patterns' },
  ];

  const colorPalettes = [
    { name: 'Ocean', colors: ['#0EA5E9', '#3B82F6', '#1E40AF'] },
    { name: 'Sunset', colors: ['#F97316', '#EF4444', '#DC2626'] },
    { name: 'Forest', colors: ['#10B981', '#059669', '#047857'] },
    { name: 'Purple', colors: ['#8B5CF6', '#7C3AED', '#6D28D9'] },
    { name: 'Monochrome', colors: ['#374151', '#6B7280', '#9CA3AF'] },
  ];

  const generatePattern = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      drawPattern();
      setIsGenerating(false);
    }, 2000);
  };

  const drawPattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate pattern based on selected template
    switch (selectedTemplate) {
      case 'geometric':
        drawGeometricPattern(ctx, width, height);
        break;
      case 'organic':
        drawOrganicPattern(ctx, width, height);
        break;
      case 'abstract':
        drawAbstractPattern(ctx, width, height);
        break;
      case 'textile':
        drawTextilePattern(ctx, width, height);
        break;
      default:
        drawGeometricPattern(ctx, width, height);
    }

    setGeneratedPattern(canvas.toDataURL());
  };

  const drawGeometricPattern = (ctx, width, height) => {
    const cellSize = 40;
    const colors = settings.colors;
    
    for (let x = 0; x < width; x += cellSize) {
      for (let y = 0; y < height; y += cellSize) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[colorIndex];
        
        if (Math.random() > 0.5) {
          ctx.fillRect(x, y, cellSize, cellSize);
        } else {
          ctx.beginPath();
          ctx.arc(x + cellSize/2, y + cellSize/2, cellSize/2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  };

  const drawOrganicPattern = (ctx, width, height) => {
    const colors = settings.colors;
    ctx.globalAlpha = 0.7;
    
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 50 + 20;
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      ctx.fillStyle = colors[colorIndex];
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawAbstractPattern = (ctx, width, height) => {
    const colors = settings.colors;
    ctx.globalAlpha = 0.8;
    
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      ctx.fillStyle = colors[colorIndex];
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.random() * 100 - 50, y + Math.random() * 100 - 50);
      ctx.lineTo(x + Math.random() * 100 - 50, y + Math.random() * 100 - 50);
      ctx.closePath();
      ctx.fill();
    }
  };

  const drawTextilePattern = (ctx, width, height) => {
    const colors = settings.colors;
    const patternSize = 60;
    
    for (let x = 0; x < width; x += patternSize) {
      for (let y = 0; y < height; y += patternSize) {
        const colorIndex = ((x + y) / patternSize) % colors.length;
        ctx.fillStyle = colors[Math.floor(colorIndex)];
        
        ctx.fillRect(x, y, patternSize/2, patternSize/2);
        ctx.fillRect(x + patternSize/2, y + patternSize/2, patternSize/2, patternSize/2);
      }
    }
  };

  const downloadPattern = () => {
    if (!generatedPattern) return;
    
    const link = document.createElement('a');
    link.download = `pattern-${Date.now()}.png`;
    link.href = generatedPattern;
    link.click();
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawPattern();
    }
  }, [selectedTemplate, settings]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI Pattern Generator
        </h2>
        <p className="text-lg text-gray-600">
          Choose a template, customize settings, and generate unique patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiGrid} className="w-5 h-5 mr-2" />
              Templates
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <SafeIcon icon={template.icon} className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-sm font-medium text-gray-900">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.description}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiPalette} className="w-5 h-5 mr-2" />
              Color Palettes
            </h3>
            <div className="space-y-3">
              {colorPalettes.map((palette) => (
                <motion.button
                  key={palette.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSettings({...settings, colors: palette.colors})}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                    JSON.stringify(settings.colors) === JSON.stringify(palette.colors)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{palette.name}</span>
                    <div className="flex space-x-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiSettings} className="w-5 h-5 mr-2" />
              Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity: {settings.complexity}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.complexity}
                  onChange={(e) => setSettings({...settings, complexity: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={settings.size}
                  onChange={(e) => setSettings({...settings, size: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="small">Small (512x512)</option>
                  <option value="medium">Medium (1024x1024)</option>
                  <option value="large">Large (2048x2048)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePattern}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <SafeIcon icon={FiPlay} className="w-5 h-5 mr-2" />
                Generate Pattern
              </div>
            )}
          </motion.button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadPattern}
                disabled={!generatedPattern}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Download</span>
              </motion.button>
            </div>
            
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-auto border border-gray-200 rounded-lg bg-gray-50"
              />
              
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center">
                      <SafeIcon icon={FiRefreshCw} className="w-8 h-8 mx-auto mb-2 text-primary-600 animate-spin" />
                      <p className="text-sm text-gray-600">Generating your pattern...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternGenerator;