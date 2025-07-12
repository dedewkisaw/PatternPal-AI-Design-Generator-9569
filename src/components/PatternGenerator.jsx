import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSliders, FiDownload, FiRefreshCcw, FiChevronDown, FiPalette, FiMessageSquare, FiCpu, FiSend, FiLoader, FiZap } = FiIcons;

const PatternGenerator = () => {
  const canvasRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [promptSuggestions, setPromptSuggestions] = useState([
    "Abstract waves with blue and purple",
    "Geometric mountains at sunset",
    "Organic floral pattern with pastel colors",
    "Tech-inspired circuit board design",
    "Tropical leaves with vibrant greens"
  ]);
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
    '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', 
    '#10B981', '#EF4444', '#6366F1', '#F97316', 
    '#84CC16', '#06B6D4', '#8B5A2B', '#DC2626', 
    '#7C3AED', '#059669', '#B91C1C', '#7C2D12', 
    '#1E40AF', '#BE185D'
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

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Store the prompt in history
    setGeneratedPrompts(prev => [prompt, ...prev.slice(0, 4)]);

    // Simulate AI processing
    setTimeout(() => {
      // Generate pattern based on prompt
      const newSettings = processPrompt(prompt);
      setSettings(newSettings);
      setIsGenerating(false);
      setPrompt('');
    }, 1500);
  };

  // Process prompt to generate pattern settings
  const processPrompt = (promptText) => {
    // This is a simplified simulation of AI pattern generation
    // In a real implementation, this would call an API
    
    const lowercasePrompt = promptText.toLowerCase();
    const newSettings = { ...settings };
    
    // Determine style based on keywords
    if (lowercasePrompt.includes('geometric') || lowercasePrompt.includes('shape') || lowercasePrompt.includes('polygon')) {
      newSettings.style = 'geometric';
    } else if (lowercasePrompt.includes('organic') || lowercasePrompt.includes('natural') || lowercasePrompt.includes('flow')) {
      newSettings.style = 'organic';
    } else if (lowercasePrompt.includes('abstract') || lowercasePrompt.includes('chaos') || lowercasePrompt.includes('random')) {
      newSettings.style = 'abstract';
    }
    
    // Adjust complexity based on keywords
    if (lowercasePrompt.includes('simple') || lowercasePrompt.includes('minimal')) {
      newSettings.complexity = 3 + Math.floor(Math.random() * 3);
    } else if (lowercasePrompt.includes('complex') || lowercasePrompt.includes('detailed')) {
      newSettings.complexity = 8 + Math.floor(Math.random() * 4);
    } else {
      newSettings.complexity = 4 + Math.floor(Math.random() * 6);
    }
    
    // Adjust rotation
    if (lowercasePrompt.includes('straight') || lowercasePrompt.includes('aligned')) {
      newSettings.rotation = Math.floor(Math.random() * 10);
    } else if (lowercasePrompt.includes('diagonal') || lowercasePrompt.includes('tilted')) {
      newSettings.rotation = 30 + Math.floor(Math.random() * 30);
    } else if (lowercasePrompt.includes('rotate') || lowercasePrompt.includes('circular')) {
      newSettings.rotation = Math.floor(Math.random() * 360);
    }
    
    // Extract colors
    const colorWords = [
      { name: 'blue', hex: '#3B82F6' },
      { name: 'purple', hex: '#8B5CF6' },
      { name: 'orange', hex: '#F59E0B' },
      { name: 'pink', hex: '#EC4899' },
      { name: 'green', hex: '#10B981' },
      { name: 'red', hex: '#EF4444' },
      { name: 'indigo', hex: '#6366F1' },
      { name: 'yellow', hex: '#FBBF24' },
      { name: 'teal', hex: '#14B8A6' },
      { name: 'cyan', hex: '#06B6D4' },
      { name: 'brown', hex: '#8B5A2B' },
      { name: 'gray', hex: '#71717A' },
      { name: 'black', hex: '#1E1E1E' },
      { name: 'white', hex: '#FFFFFF' }
    ];
    
    const foundColors = colorWords.filter(color => 
      lowercasePrompt.includes(color.name)
    ).map(color => color.hex);
    
    if (foundColors.length > 0) {
      // If colors are found in the prompt, use them
      newSettings.colors = foundColors.length >= 2 ? 
        foundColors : 
        [foundColors[0], ...predefinedColors.slice(0, 3)];
    } else {
      // Otherwise choose random colors
      const randomColors = [];
      for (let i = 0; i < 4; i++) {
        randomColors.push(predefinedColors[Math.floor(Math.random() * predefinedColors.length)]);
      }
      newSettings.colors = randomColors;
    }
    
    // Adjust scale based on keywords
    if (lowercasePrompt.includes('small') || lowercasePrompt.includes('tiny')) {
      newSettings.scale = 0.5 + Math.random() * 0.5;
    } else if (lowercasePrompt.includes('large') || lowercasePrompt.includes('big')) {
      newSettings.scale = 1.5 + Math.random() * 0.5;
    } else {
      newSettings.scale = 0.8 + Math.random() * 0.8;
    }
    
    // Adjust noise based on keywords
    if (lowercasePrompt.includes('clean') || lowercasePrompt.includes('precise')) {
      newSettings.noise = 0.05 + Math.random() * 0.1;
    } else if (lowercasePrompt.includes('messy') || lowercasePrompt.includes('chaotic')) {
      newSettings.noise = 0.3 + Math.random() * 0.3;
    } else {
      newSettings.noise = 0.1 + Math.random() * 0.2;
    }
    
    return newSettings;
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* AI Prompt Input Section */}
      <motion.div 
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        className="neu-card mb-8"
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <SafeIcon icon={FiCpu} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Pattern Generator</h3>
            <p className="text-gray-600">Describe the pattern you want to create</p>
          </div>
        </div>
        
        <form onSubmit={handlePromptSubmit} className="mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 pr-12 neu-input text-gray-800 placeholder-gray-500"
              placeholder="e.g. Abstract waves with blue and purple colors..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white disabled:opacity-50"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
              ) : (
                <SafeIcon icon={FiSend} className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
        
        {/* Prompt Suggestions */}
        <div className="mb-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Try these prompts:</p>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1 bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-sm text-gray-700 rounded-lg"
                onClick={() => setPrompt(suggestion)}
                disabled={isGenerating}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Recent Prompts */}
        {generatedPrompts.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Recent prompts:</p>
            <div className="flex flex-wrap gap-2">
              {generatedPrompts.map((genPrompt, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1 bg-white shadow-neu-flat-sm hover:shadow-neu-button text-sm text-gray-700 rounded-lg flex items-center"
                  onClick={() => setPrompt(genPrompt)}
                  disabled={isGenerating}
                >
                  <SafeIcon icon={FiMessageSquare} className="w-3 h-3 mr-1 text-blue-500" />
                  {genPrompt.length > 30 ? `${genPrompt.substring(0, 30)}...` : genPrompt}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Pattern Generator UI */}
      <div className="neu-card">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Pattern Generator</h2>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePattern}
              className="flex items-center space-x-2 px-4 py-3 neu-button"
            >
              <SafeIcon icon={FiRefreshCcw} className="w-4 h-4" />
              <span>Generate</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-3 neu-button"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <canvas 
              ref={canvasRef} 
              className="w-full h-[500px] rounded-neu shadow-neu-flat" 
              style={{ background: '#fff' }}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-neu-gradient rounded-neu p-6 shadow-neu-flat">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <div className="neu-icon-container mr-3">
                  <SafeIcon icon={FiSliders} className="w-5 h-5 text-primary-600" />
                </div>
                Pattern Settings
              </h3>
              
              {/* Pattern Style - Neumorphic Dropdown */}
              <div className="mb-6 style-section">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Style
                </label>
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-3 neu-button flex items-center justify-between"
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
                        className="absolute top-full left-0 right-0 mt-2 bg-neu-gradient rounded-neu shadow-neu-flat z-10 overflow-hidden"
                      >
                        {styleOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ backgroundColor: '#e6e7eb' }}
                            onClick={() => {
                              setSettings({ ...settings, style: option.value });
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:shadow-neu-pressed-sm transition-all duration-200"
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="settings-section">
                {/* Complexity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Complexity ({settings.complexity})
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={settings.complexity}
                    onChange={(e) => setSettings({ ...settings, complexity: Number(e.target.value) })}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Scale */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Scale ({settings.scale.toFixed(1)})
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.scale}
                    onChange={(e) => setSettings({ ...settings, scale: Number(e.target.value) })}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Rotation */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rotation ({settings.rotation}°)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={settings.rotation}
                    onChange={(e) => setSettings({ ...settings, rotation: Number(e.target.value) })}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Noise/Randomness */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Randomness ({(settings.noise * 100).toFixed(0)}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.6"
                    step="0.05"
                    value={settings.noise}
                    onChange={(e) => setSettings({ ...settings, noise: Number(e.target.value) })}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
              
              {/* Colors - Neumorphic Color Picker */}
              <div className="export-section">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Colors
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  {settings.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full cursor-pointer shadow-neu-flat-sm hover:shadow-neu-button transition-shadow duration-200 border-2 border-white"
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
                    className="w-10 h-10 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button transition-all duration-200 flex items-center justify-center"
                  >
                    <SafeIcon icon={FiPalette} className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {showColorPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-neu-gradient rounded-neu p-5 shadow-neu-flat"
                    >
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Choose Color</h4>
                      <div className="grid grid-cols-6 gap-3 mb-4">
                        {predefinedColors.map((color, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full cursor-pointer shadow-neu-flat-sm hover:shadow-neu-button transition-shadow duration-200"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(selectedColorIndex, color)}
                          />
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <input
                          type="color"
                          className="w-full h-10 rounded-neu-sm shadow-neu-pressed cursor-pointer"
                          onChange={(e) => handleColorChange(selectedColorIndex, e.target.value)}
                          value={settings.colors[selectedColorIndex]}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowColorPicker(false)}
                          className="px-4 py-2 neu-button"
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