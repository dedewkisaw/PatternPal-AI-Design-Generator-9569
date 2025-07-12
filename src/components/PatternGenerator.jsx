import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSliders, FiDownload, FiRefreshCcw } = FiIcons;

const PatternGenerator = () => {
  const canvasRef = useRef(null);
  const [settings, setSettings] = useState({
    scale: 1,
    complexity: 6,
    rotation: 45,
    noise: 0.2,
    colors: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'],
    style: 'geometric'
  });

  const patternStyles = {
    geometric: drawGeometricPattern,
    organic: drawOrganicPattern,
    abstract: drawAbstractPattern
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size with high DPI support
    const updateCanvasSize = () => {
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    generatePattern();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [settings]);

  const generatePattern = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw pattern based on selected style
    patternStyles[settings.style](ctx, width, height, settings);
  };

  function drawGeometricPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    const cellSize = 40 * scale;
    
    // Create grid alignment
    const gridOffset = {
      x: (width % cellSize) / 2,
      y: (height % cellSize) / 2
    };

    // Enhanced rendering quality
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let x = gridOffset.x; x < width; x += cellSize) {
      for (let y = gridOffset.y; y < height; y += cellSize) {
        const noiseValue = Math.random() * noise;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        ctx.fillStyle = colors[colorIndex];
        ctx.strokeStyle = colors[(colorIndex + 1) % colors.length];
        
        ctx.save();
        ctx.translate(x + cellSize/2, y + cellSize/2);
        ctx.rotate((rotation + noiseValue * 360) * Math.PI / 180);

        const shapeComplexity = Math.floor(Math.random() * complexity) + 3;

        // Enhanced pattern variety
        switch(Math.floor(Math.random() * 6)) {
          case 0: // Mandala
            for (let i = 0; i < shapeComplexity; i++) {
              ctx.beginPath();
              ctx.arc(0, 0, cellSize/2 * (1 - i/shapeComplexity), 0, 2 * Math.PI);
              if (i % 2 === 0) ctx.fill();
              ctx.stroke();
            }
            break;
            
          case 1: // Geometric Star
            ctx.beginPath();
            for (let i = 0; i < shapeComplexity; i++) {
              const angle = (i * 2 * Math.PI) / shapeComplexity;
              const radius = cellSize/2;
              ctx.lineTo(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
              );
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 2: // Nested Squares
            for (let i = shapeComplexity; i > 0; i--) {
              const size = (cellSize * i) / shapeComplexity;
              ctx.beginPath();
              ctx.rect(-size/2, -size/2, size, size);
              if (i % 2 === 0) ctx.fill();
              ctx.stroke();
            }
            break;
            
          case 3: // Flower Pattern
            for (let i = 0; i < shapeComplexity; i++) {
              ctx.beginPath();
              ctx.ellipse(
                0, 0,
                cellSize/3,
                cellSize/4,
                (i * Math.PI) / shapeComplexity,
                0, 2 * Math.PI
              );
              ctx.fill();
              ctx.stroke();
            }
            break;
            
          case 4: // Hexagonal Grid
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              ctx.rotate(Math.PI / 3);
              ctx.lineTo(cellSize/2, 0);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 5: // Concentric Circles
            for (let i = 1; i <= shapeComplexity; i++) {
              ctx.beginPath();
              ctx.arc(0, 0, (cellSize/2) * (i/shapeComplexity), 0, 2 * Math.PI);
              if (i % 2 === 0) ctx.fill();
              ctx.stroke();
            }
            break;
        }
        
        ctx.restore();
      }
    }
  }

  function drawOrganicPattern(ctx, width, height, settings) {
    // Implementation for organic patterns
    // Similar to geometric but with more curved shapes and natural flow
  }

  function drawAbstractPattern(ctx, width, height, settings) {
    // Implementation for abstract patterns
    // More random and artistic approach
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-neu-flat p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pattern Generator</h2>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePattern}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiRefreshCcw} className="w-4 h-4" />
              <span>Generate</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <canvas
              ref={canvasRef}
              className="w-full h-[500px] rounded-xl shadow-neu-flat"
              style={{ background: '#fff' }}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiSliders} className="w-5 h-5 mr-2" />
                Pattern Settings
              </h3>
              
              {/* Pattern Style */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  value={settings.style}
                  onChange={(e) => setSettings({ ...settings, style: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="geometric">Geometric</option>
                  <option value="organic">Organic</option>
                  <option value="abstract">Abstract</option>
                </select>
              </div>
              
              {/* Complexity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={settings.complexity}
                  onChange={(e) => setSettings({ ...settings, complexity: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Scale */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scale
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.scale}
                  onChange={(e) => setSettings({ ...settings, scale: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Rotation */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={settings.rotation}
                  onChange={(e) => setSettings({ ...settings, rotation: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {settings.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        // Color picker implementation
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternGenerator;