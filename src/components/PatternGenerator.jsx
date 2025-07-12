import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSliders, FiDownload, FiRefreshCcw, FiChevronDown, FiPalette } = FiIcons;

const PatternGenerator = () => {
  const canvasRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const styleOptions = [
    { value: 'geometric', label: 'Geometric' },
    { value: 'organic', label: 'Organic' },
    { value: 'abstract', label: 'Abstract' }
  ];

  const predefinedColors = [
    '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981', '#EF4444',
    '#6366F1', '#F97316', '#84CC16', '#06B6D4', '#8B5A2B', '#DC2626',
    '#7C3AED', '#059669', '#B91C1C', '#7C2D12', '#1E40AF', '#BE185D'
  ];

  useEffect(() => {
    generatePattern();
  }, [settings]);

  const generatePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with high DPI support
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pattern based on selected style
    patternStyles[settings.style](ctx, rect.width, rect.height, settings);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `pattern-${settings.style}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColorChange = (colorIndex, newColor) => {
    const newColors = [...settings.colors];
    newColors[colorIndex] = newColor;
    setSettings({ ...settings, colors: newColors });
    setShowColorPicker(false);
  };

  function drawGeometricPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    const cellSize = 40 * scale;
    
    const gridOffset = {
      x: (width % cellSize) / 2,
      y: (height % cellSize) / 2
    };

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

        switch(Math.floor(Math.random() * 6)) {
          case 0: // Mandala
            for (let i = 0; i < shapeComplexity; i++) {
              ctx.beginPath();
              ctx.arc(0, 0, cellSize/2 * (1 - i/shapeComplexity), 0, 2 * Math.PI);
              if (i % 2 === 0) ctx.fill();
              ctx.stroke();
            }
            break;
            
          case 1: // Star
            ctx.beginPath();
            for (let i = 0; i < shapeComplexity * 2; i++) {
              const radius = i % 2 === 0 ? cellSize/2 : cellSize/4;
              const angle = (i * Math.PI) / shapeComplexity;
              ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 2: // Polygons
            for (let i = shapeComplexity; i > 0; i--) {
              ctx.beginPath();
              const radius = (cellSize/2) * (i/shapeComplexity);
              for (let j = 0; j < complexity; j++) {
                const angle = (j * 2 * Math.PI) / complexity;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
              }
              ctx.closePath();
              if (i % 2 === 0) ctx.fill();
              ctx.stroke();
            }
            break;
            
          default:
            ctx.beginPath();
            ctx.rect(-cellSize/4, -cellSize/4, cellSize/2, cellSize/2);
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.restore();
      }
    }
  }

  function drawOrganicPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    const cellSize = 30 * scale;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let x = 0; x < width; x += cellSize) {
      for (let y = 0; y < height; y += cellSize) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[colorIndex];
        ctx.strokeStyle = colors[(colorIndex + 1) % colors.length];
        
        ctx.save();
        ctx.translate(x + cellSize/2, y + cellSize/2);
        ctx.rotate((rotation + Math.random() * noise * 360) * Math.PI / 180);

        // Organic shapes
        switch(Math.floor(Math.random() * 4)) {
          case 0: // Blob
            ctx.beginPath();
            for (let i = 0; i < complexity + 3; i++) {
              const angle = (i * 2 * Math.PI) / (complexity + 3);
              const radius = (cellSize/3) * (0.7 + Math.random() * 0.6);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                const prevAngle = ((i-1) * 2 * Math.PI) / (complexity + 3);
                const prevRadius = (cellSize/3) * (0.7 + Math.random() * 0.6);
                const prevX = Math.cos(prevAngle) * prevRadius;
                const prevY = Math.sin(prevAngle) * prevRadius;
                const cpX = (prevX + x) / 2 + (Math.random() - 0.5) * 10;
                const cpY = (prevY + y) / 2 + (Math.random() - 0.5) * 10;
                ctx.quadraticCurveTo(cpX, cpY, x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 1: // Leaf
            ctx.beginPath();
            ctx.ellipse(0, 0, cellSize/4, cellSize/2, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, -cellSize/2);
            ctx.quadraticCurveTo(cellSize/8, 0, 0, cellSize/2);
            ctx.stroke();
            break;
            
          case 2: // Petal
            for (let i = 0; i < complexity; i++) {
              ctx.save();
              ctx.rotate((i * 2 * Math.PI) / complexity);
              ctx.beginPath();
              ctx.ellipse(0, cellSize/6, cellSize/6, cellSize/3, 0, 0, 2 * Math.PI);
              ctx.fill();
              ctx.restore();
            }
            break;
            
          case 3: // Wave
            ctx.beginPath();
            ctx.moveTo(-cellSize/2, 0);
            for (let i = 0; i < 4; i++) {
              const x = (-cellSize/2) + (i * cellSize/3);
              const y = Math.sin(i + rotation/50) * cellSize/4;
              ctx.quadraticCurveTo(x, y, x + cellSize/6, 0);
            }
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      }
    }
  }

  function drawAbstractPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors[0] + '20');
    gradient.addColorStop(1, colors[1] + '20');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const numElements = complexity * 5;
    
    for (let i = 0; i < numElements; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 20 + Math.random() * 60 * scale;
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation + Math.random() * noise * 720) * Math.PI / 180);
      
      ctx.fillStyle = colors[colorIndex] + Math.floor(50 + Math.random() * 100).toString(16);
      ctx.strokeStyle = colors[(colorIndex + 1) % colors.length];

      switch(Math.floor(Math.random() * 5)) {
        case 0: // Abstract stroke
          ctx.beginPath();
          ctx.moveTo(-size, 0);
          for (let j = 0; j < 5; j++) {
            const px = (-size) + (j * size/2);
            const py = (Math.random() - 0.5) * size;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
          break;
          
        case 1: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, size/3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
          break;
          
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -size/2);
          ctx.lineTo(-size/2, size/2);
          ctx.lineTo(size/2, size/2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
          
        case 3: // Bezier curve
          ctx.beginPath();
          ctx.moveTo(-size/2, 0);
          ctx.bezierCurveTo(
            -size/4, -size/2,
            size/4, size/2,
            size/2, 0
          );
          ctx.stroke();
          break;
          
        case 4: // Splash
          for (let k = 0; k < 8; k++) {
            const angle = (k * Math.PI) / 4;
            const length = size/4 + Math.random() * size/2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
            ctx.stroke();
          }
          break;
      }
      
      ctx.restore();
    }
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
              className="flex items-center space-x-2 px-4 py-2 bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed active:shadow-neu-pressed rounded-lg transition-all duration-200"
            >
              <SafeIcon icon={FiRefreshCcw} className="w-4 h-4" />
              <span>Generate</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed active:shadow-neu-pressed rounded-lg transition-all duration-200"
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
            <div className="bg-neu-gradient rounded-xl p-4 shadow-neu-flat">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiSliders} className="w-5 h-5 mr-2" />
                Pattern Settings
              </h3>
              
              {/* Pattern Style - Neumorphic Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-2 bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed rounded-lg text-left flex items-center justify-between transition-all duration-200"
                  >
                    <span>{styleOptions.find(opt => opt.value === settings.style)?.label}</span>
                    <motion.div
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-neu-gradient rounded-lg shadow-neu-flat z-10 overflow-hidden"
                      >
                        {styleOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ backgroundColor: '#e6e7eb' }}
                            onClick={() => {
                              setSettings({ ...settings, style: option.value });
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:shadow-neu-pressed transition-all duration-200"
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Complexity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity ({settings.complexity})
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={settings.complexity}
                  onChange={(e) => setSettings({ ...settings, complexity: Number(e.target.value) })}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer shadow-neu-pressed slider"
                />
              </div>
              
              {/* Scale */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scale ({settings.scale.toFixed(1)})
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.scale}
                  onChange={(e) => setSettings({ ...settings, scale: Number(e.target.value) })}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer shadow-neu-pressed slider"
                />
              </div>
              
              {/* Rotation */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation ({settings.rotation}°)
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={settings.rotation}
                  onChange={(e) => setSettings({ ...settings, rotation: Number(e.target.value) })}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer shadow-neu-pressed slider"
                />
              </div>
              
              {/* Colors - Neumorphic Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {settings.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg cursor-pointer shadow-neu-flat hover:shadow-neu-pressed transition-shadow duration-200 border-2 border-white"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColorIndex(index);
                        setShowColorPicker(true);
                      }}
                    />
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowColorPicker(true)}
                    className="w-8 h-8 rounded-lg bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center"
                  >
                    <SafeIcon icon={FiPalette} className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {showColorPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-neu-gradient rounded-lg p-4 shadow-neu-flat"
                    >
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Choose Color</h4>
                      <div className="grid grid-cols-6 gap-2 mb-3">
                        {predefinedColors.map((color, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 rounded cursor-pointer shadow-neu-flat-sm hover:shadow-neu-pressed-sm transition-shadow duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(selectedColorIndex, color)}
                          />
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          className="w-full h-8 rounded shadow-neu-pressed cursor-pointer"
                          onChange={(e) => handleColorChange(selectedColorIndex, e.target.value)}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowColorPicker(false)}
                          className="px-3 py-1 text-sm bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed rounded transition-all duration-200"
                        >
                          Done
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternGenerator;