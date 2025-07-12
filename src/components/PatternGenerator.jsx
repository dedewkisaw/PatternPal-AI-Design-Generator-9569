import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSliders, FiDownload, FiRefreshCcw, FiChevronDown, FiPalette, 
  FiMessageSquare, FiCpu, FiSend, FiLoader, FiZap, FiStar, 
  FiTrendingUp, FiAperture, FiLayers, FiMagic, FiTarget, 
  FiSettings, FiFileText
} = FiIcons;

const PatternGenerator = () => {
  const canvasRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [aiMode, setAiMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  const [promptSuggestions, setPromptSuggestions] = useState([
    "Flowing organic waves in ocean blue and seafoam green",
    "Geometric crystal formations with purple and gold gradients", 
    "Abstract neural network pattern in electric blue",
    "Mandala-inspired geometric design with warm sunset colors",
    "Minimalist grid pattern with subtle grayscale tones",
    "Tropical leaf pattern with vibrant jungle greens",
    "Art deco geometric pattern with black and gold",
    "Watercolor-style abstract blooms in pastel colors"
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
    { value: 'geometric', label: 'Geometric', icon: FiTarget },
    { value: 'organic', label: 'Organic', icon: FiAperture },
    { value: 'abstract', label: 'Abstract', icon: FiZap }
  ];

  const predefinedColors = [
    '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', 
    '#10B981', '#EF4444', '#6366F1', '#F97316', 
    '#84CC16', '#06B6D4', '#8B5A2B', '#DC2626', 
    '#7C3AED', '#059669', '#B91C1C', '#7C2D12', 
    '#1E40AF', '#BE185D', '#0F766E', '#7C2D12',
    '#581C87', '#92400E', '#1E3A8A', '#991B1B'
  ];

  useEffect(() => {
    generatePattern();
  }, [settings]);

  const generatePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    patternStyles[settings.style](ctx, rect.width, rect.height, settings);
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setAiMode(true);
    
    setGeneratedPrompts(prev => [prompt, ...prev.slice(0, 4)]);

    setTimeout(() => {
      const newSettings = processPrompt(prompt);
      setSettings(newSettings);
      setIsGenerating(false);
      setPrompt('');
      
      // Add some visual feedback
      setTimeout(() => setAiMode(false), 2000);
    }, 2000);
  };

  const processPrompt = (promptText) => {
    const lowercasePrompt = promptText.toLowerCase();
    const newSettings = { ...settings };
    
    // Enhanced style detection
    if (lowercasePrompt.includes('geometric') || lowercasePrompt.includes('crystal') || 
        lowercasePrompt.includes('grid') || lowercasePrompt.includes('polygon') ||
        lowercasePrompt.includes('mandala') || lowercasePrompt.includes('deco')) {
      newSettings.style = 'geometric';
    } else if (lowercasePrompt.includes('organic') || lowercasePrompt.includes('flow') || 
               lowercasePrompt.includes('natural') || lowercasePrompt.includes('leaf') ||
               lowercasePrompt.includes('wave') || lowercasePrompt.includes('bloom')) {
      newSettings.style = 'organic';
    } else if (lowercasePrompt.includes('abstract') || lowercasePrompt.includes('neural') || 
               lowercasePrompt.includes('chaos') || lowercasePrompt.includes('watercolor') ||
               lowercasePrompt.includes('splash') || lowercasePrompt.includes('random')) {
      newSettings.style = 'abstract';
    }
    
    // Enhanced complexity detection
    if (lowercasePrompt.includes('simple') || lowercasePrompt.includes('minimal') || 
        lowercasePrompt.includes('clean') || lowercasePrompt.includes('subtle')) {
      newSettings.complexity = 3 + Math.floor(Math.random() * 3);
    } else if (lowercasePrompt.includes('complex') || lowercasePrompt.includes('detailed') || 
               lowercasePrompt.includes('intricate') || lowercasePrompt.includes('rich')) {
      newSettings.complexity = 8 + Math.floor(Math.random() * 4);
    } else {
      newSettings.complexity = 4 + Math.floor(Math.random() * 6);
    }
    
    // Enhanced color detection
    const colorMappings = [
      { keywords: ['blue', 'ocean', 'sky', 'azure', 'navy'], colors: ['#3B82F6', '#0EA5E9', '#1E40AF', '#0F766E'] },
      { keywords: ['purple', 'violet', 'lavender', 'amethyst'], colors: ['#8B5CF6', '#7C3AED', '#581C87', '#6D28D9'] },
      { keywords: ['green', 'jungle', 'forest', 'emerald', 'mint'], colors: ['#10B981', '#059669', '#047857', '#84CC16'] },
      { keywords: ['red', 'crimson', 'ruby', 'rose'], colors: ['#EF4444', '#DC2626', '#B91C1C', '#EC4899'] },
      { keywords: ['orange', 'sunset', 'amber', 'tangerine'], colors: ['#F59E0B', '#F97316', '#EA580C', '#FBBF24'] },
      { keywords: ['gold', 'yellow', 'sunny', 'golden'], colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#F3F4F6'] },
      { keywords: ['pink', 'rose', 'blush', 'coral'], colors: ['#EC4899', '#F472B6', '#F9A8D4', '#FDF2F8'] },
      { keywords: ['gray', 'grey', 'silver', 'slate'], colors: ['#6B7280', '#4B5563', '#374151', '#1F2937'] },
      { keywords: ['black', 'dark', 'charcoal'], colors: ['#1F2937', '#111827', '#0F172A', '#374151'] },
      { keywords: ['white', 'light', 'pearl', 'cream'], colors: ['#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB'] }
    ];
    
    let foundColors = [];
    colorMappings.forEach(mapping => {
      mapping.keywords.forEach(keyword => {
        if (lowercasePrompt.includes(keyword)) {
          foundColors.push(...mapping.colors);
        }
      });
    });
    
    if (foundColors.length > 0) {
      const uniqueColors = [...new Set(foundColors)];
      newSettings.colors = uniqueColors.slice(0, 4);
      if (newSettings.colors.length < 4) {
        newSettings.colors.push(...predefinedColors.slice(0, 4 - newSettings.colors.length));
      }
    } else {
      const randomColors = [];
      for (let i = 0; i < 4; i++) {
        randomColors.push(predefinedColors[Math.floor(Math.random() * predefinedColors.length)]);
      }
      newSettings.colors = randomColors;
    }
    
    // Enhanced scale and rotation
    if (lowercasePrompt.includes('large') || lowercasePrompt.includes('big') || 
        lowercasePrompt.includes('bold') || lowercasePrompt.includes('dramatic')) {
      newSettings.scale = 1.3 + Math.random() * 0.7;
    } else if (lowercasePrompt.includes('small') || lowercasePrompt.includes('delicate') || 
               lowercasePrompt.includes('fine') || lowercasePrompt.includes('tiny')) {
      newSettings.scale = 0.4 + Math.random() * 0.6;
    } else {
      newSettings.scale = 0.8 + Math.random() * 0.8;
    }
    
    if (lowercasePrompt.includes('swirl') || lowercasePrompt.includes('spiral') || 
        lowercasePrompt.includes('twist') || lowercasePrompt.includes('rotate')) {
      newSettings.rotation = 45 + Math.random() * 270;
    } else if (lowercasePrompt.includes('straight') || lowercasePrompt.includes('aligned') || 
               lowercasePrompt.includes('orderly')) {
      newSettings.rotation = Math.random() * 20;
    } else {
      newSettings.rotation = Math.random() * 360;
    }
    
    // Enhanced noise
    if (lowercasePrompt.includes('chaotic') || lowercasePrompt.includes('wild') || 
        lowercasePrompt.includes('messy') || lowercasePrompt.includes('turbulent')) {
      newSettings.noise = 0.4 + Math.random() * 0.4;
    } else if (lowercasePrompt.includes('precise') || lowercasePrompt.includes('ordered') || 
               lowercasePrompt.includes('clean') || lowercasePrompt.includes('crisp')) {
      newSettings.noise = 0.05 + Math.random() * 0.1;
    } else {
      newSettings.noise = 0.15 + Math.random() * 0.25;
    }
    
    return newSettings;
  };

  const handleRandomGenerate = () => {
    const randomPrompts = [
      "Flowing cosmic nebula in deep space colors",
      "Crystalline geometric formations with rainbow hues",
      "Organic cellular structures in microscopic detail",
      "Abstract expressionist paint strokes in bold colors",
      "Minimalist zen garden patterns in earth tones",
      "Fractal mathematics visualization in electric colors"
    ];
    
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(randomPrompt);
    
    setTimeout(() => {
      handlePromptSubmit({ preventDefault: () => {} });
    }, 100);
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
    
    setShowExportModal(false);
  };

  const handleExport = async (format, settings) => {
    if (!canvasRef.current) return;
    try {
      // Get the canvas element
      const canvas = canvasRef.current;
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

  const handleColorChange = (colorIndex, newColor) => {
    const newColors = [...settings.colors];
    newColors[colorIndex] = newColor;
    setSettings({ ...settings, colors: newColors });
    setShowColorPicker(false);
  };

  // Enhanced pattern drawing functions
  function drawGeometricPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    const cellSize = 35 * scale;
    const gridOffset = {
      x: (width % cellSize) / 2,
      y: (height % cellSize) / 2
    };
    
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let x = gridOffset.x; x < width; x += cellSize) {
      for (let y = gridOffset.y; y < height; y += cellSize) {
        const noiseValue = Math.random() * noise;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const alpha = 0.7 + Math.random() * 0.3;
        
        ctx.fillStyle = colors[colorIndex] + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.strokeStyle = colors[(colorIndex + 1) % colors.length] + 'CC';
        
        ctx.save();
        ctx.translate(x + cellSize/2, y + cellSize/2);
        ctx.rotate((rotation + noiseValue * 180) * Math.PI / 180);
        
        const shapeType = Math.floor(Math.random() * 8);
        const shapeComplexity = Math.max(3, Math.floor(Math.random() * complexity) + 3);
        
        switch(shapeType) {
          case 0: // Enhanced mandala
            for (let layer = 0; layer < shapeComplexity; layer++) {
              const radius = (cellSize/2) * (1 - layer/(shapeComplexity + 2));
              ctx.beginPath();
              ctx.arc(0, 0, radius, 0, 2 * Math.PI);
              if (layer % 2 === 0) {
                ctx.fill();
              } else {
                ctx.stroke();
              }
              
              // Add decorative elements
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * radius * 0.8, Math.sin(angle) * radius * 0.8);
                ctx.lineTo(Math.cos(angle) * radius * 1.2, Math.sin(angle) * radius * 1.2);
                ctx.stroke();
              }
            }
            break;
            
          case 1: // Multi-layered star
            for (let layer = 0; layer < 3; layer++) {
              ctx.beginPath();
              const points = shapeComplexity + layer;
              for (let i = 0; i < points * 2; i++) {
                const radius = (i % 2 === 0 ? cellSize/2 : cellSize/3) * (1 - layer * 0.2);
                const angle = (i * Math.PI) / points;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
              }
              ctx.closePath();
              layer % 2 === 0 ? ctx.fill() : ctx.stroke();
            }
            break;
            
          case 2: // Hexagonal pattern
            const hexRadius = cellSize/3;
            for (let ring = 0; ring < 3; ring++) {
              for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                for (let j = 0; j < 6; j++) {
                  const angle = (j * Math.PI) / 3;
                  const radius = hexRadius * (1 + ring * 0.3);
                  const x = Math.cos(angle) * radius + Math.cos(i * Math.PI / 3) * ring * hexRadius * 0.5;
                  const y = Math.sin(angle) * radius + Math.sin(i * Math.PI / 3) * ring * hexRadius * 0.5;
                  j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.closePath();
                ring % 2 === 0 ? ctx.stroke() : ctx.fill();
              }
            }
            break;
            
          case 3: // Diamond grid
            const diamond = cellSize / 4;
            ctx.beginPath();
            ctx.moveTo(0, -diamond);
            ctx.lineTo(diamond, 0);
            ctx.lineTo(0, diamond);
            ctx.lineTo(-diamond, 0);
            ctx.closePath();
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(0, -diamond * 0.6);
            ctx.lineTo(diamond * 0.6, 0);
            ctx.lineTo(0, diamond * 0.6);
            ctx.lineTo(-diamond * 0.6, 0);
            ctx.closePath();
            ctx.stroke();
            break;
            
          default:
            // Enhanced polygon with decorations
            ctx.beginPath();
            for (let i = 0; i < shapeComplexity; i++) {
              const angle = (i * 2 * Math.PI) / shapeComplexity;
              const radius = cellSize/3 + Math.sin(i * 2) * cellSize/8;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.restore();
      }
    }
  }

  function drawOrganicPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    const cellSize = 40 * scale;
    
    ctx.lineWidth = 2 + scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let x = 0; x < width; x += cellSize * 0.8) {
      for (let y = 0; y < height; y += cellSize * 0.8) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const alpha = 0.6 + Math.random() * 0.4;
        
        ctx.fillStyle = colors[colorIndex] + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.strokeStyle = colors[(colorIndex + 1) % colors.length] + 'DD';
        
        ctx.save();
        ctx.translate(x + cellSize/2, y + cellSize/2);
        ctx.rotate((rotation + Math.random() * noise * 360) * Math.PI / 180);
        
        const shapeType = Math.floor(Math.random() * 6);
        
        switch(shapeType) {
          case 0: // Enhanced organic blob
            ctx.beginPath();
            const points = complexity + 4;
            for (let i = 0; i <= points; i++) {
              const angle = (i * 2 * Math.PI) / points;
              const radiusVariation = 0.6 + Math.random() * 0.8 + Math.sin(i * 3) * 0.3;
              const radius = (cellSize/3) * radiusVariation;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                const prevAngle = ((i-1) * 2 * Math.PI) / points;
                const prevRadius = (cellSize/3) * (0.6 + Math.random() * 0.8);
                const prevX = Math.cos(prevAngle) * prevRadius;
                const prevY = Math.sin(prevAngle) * prevRadius;
                
                const cp1X = prevX + (Math.random() - 0.5) * cellSize/4;
                const cp1Y = prevY + (Math.random() - 0.5) * cellSize/4;
                const cp2X = x + (Math.random() - 0.5) * cellSize/4;
                const cp2Y = y + (Math.random() - 0.5) * cellSize/4;
                
                ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
          case 1: // Flower petals
            const petalCount = complexity;
            for (let i = 0; i < petalCount; i++) {
              ctx.save();
              ctx.rotate((i * 2 * Math.PI) / petalCount);
              
              // Petal shape
              ctx.beginPath();
              ctx.ellipse(0, cellSize/4, cellSize/6, cellSize/3, 0, 0, 2 * Math.PI);
              ctx.fill();
              
              // Petal detail
              ctx.beginPath();
              ctx.moveTo(0, cellSize/8);
              ctx.quadraticCurveTo(cellSize/12, cellSize/3, 0, cellSize/2);
              ctx.stroke();
              
              ctx.restore();
            }
            
            // Center
            ctx.beginPath();
            ctx.arc(0, 0, cellSize/8, 0, 2 * Math.PI);
            ctx.fill();
            break;
            
          case 2: // Flowing wave
            ctx.beginPath();
            const waveLength = cellSize;
            const amplitude = cellSize/4;
            const frequency = complexity / 2;
            
            for (let i = 0; i < waveLength; i += 2) {
              const x = i - waveLength/2;
              const y = Math.sin((i / waveLength) * Math.PI * frequency) * amplitude;
              const y2 = Math.cos((i / waveLength) * Math.PI * frequency * 1.5) * amplitude * 0.7;
              
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
              ctx.lineTo(x, y2);
            }
            ctx.stroke();
            
            // Add flowing particles
            for (let i = 0; i < complexity; i++) {
              const particleX = (Math.random() - 0.5) * cellSize;
              const particleY = (Math.random() - 0.5) * cellSize;
              ctx.beginPath();
              ctx.arc(particleX, particleY, 2 + Math.random() * 3, 0, 2 * Math.PI);
              ctx.fill();
            }
            break;
            
          default:
            // Leaf pattern
            ctx.beginPath();
            ctx.ellipse(0, 0, cellSize/4, cellSize/2, 0, 0, 2 * Math.PI);
            ctx.fill();
            
            // Leaf veins
            ctx.beginPath();
            ctx.moveTo(0, -cellSize/2);
            ctx.quadraticCurveTo(0, 0, 0, cellSize/2);
            ctx.stroke();
            
            for (let vein = 1; vein <= complexity/2; vein++) {
              const veinY = (-cellSize/2) + (vein * cellSize / complexity);
              ctx.beginPath();
              ctx.moveTo(-cellSize/8, veinY);
              ctx.quadraticCurveTo(0, veinY + cellSize/16, cellSize/8, veinY);
              ctx.stroke();
            }
        }
        
        ctx.restore();
      }
    }
  }

  function drawAbstractPattern(ctx, width, height, settings) {
    const { scale, complexity, rotation, noise, colors } = settings;
    
    ctx.lineWidth = 2 + scale * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Enhanced background with multiple gradients
    const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    bgGradient.addColorStop(0, colors[0] + '15');
    bgGradient.addColorStop(0.5, colors[1] + '10');
    bgGradient.addColorStop(1, colors[2] + '05');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    const numElements = complexity * 8;
    
    for (let i = 0; i < numElements; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 15 + Math.random() * 80 * scale;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const alpha = Math.floor(40 + Math.random() * 160);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation + Math.random() * noise * 720) * Math.PI / 180);
      
      ctx.fillStyle = colors[colorIndex] + alpha.toString(16).padStart(2, '0');
      ctx.strokeStyle = colors[(colorIndex + 2) % colors.length] + 'BB';
      
      const shapeType = Math.floor(Math.random() * 8);
      
      switch(shapeType) {
        case 0: // Flowing brush stroke
          ctx.beginPath();
          const segments = 8;
          for (let j = 0; j < segments; j++) {
            const segmentX = (-size/2) + (j * size/segments);
            const segmentY = Math.sin(j + rotation/50) * size/3 + (Math.random() - 0.5) * size/4;
            const controlX = segmentX + size/8;
            const controlY = segmentY + (Math.random() - 0.5) * size/6;
            
            j === 0 ? ctx.moveTo(segmentX, segmentY) : ctx.quadraticCurveTo(controlX, controlY, segmentX, segmentY);
          }
          ctx.stroke();
          break;
          
        case 1: // Gradient circle
          const circleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size/2);
          circleGradient.addColorStop(0, colors[colorIndex] + 'DD');
          circleGradient.addColorStop(1, colors[colorIndex] + '22');
          ctx.fillStyle = circleGradient;
          
          ctx.beginPath();
          ctx.arc(0, 0, size/2, 0, 2 * Math.PI);
          ctx.fill();
          break;
          
        case 2: // Triangular burst
          const triangles = 6;
          for (let t = 0; t < triangles; t++) {
            ctx.save();
            ctx.rotate((t * 2 * Math.PI) / triangles);
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(size/4, -size/2);
            ctx.lineTo(-size/4, -size/2);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
          }
          break;
          
        case 3: // Spiral
          ctx.beginPath();
          const spiralTurns = 3;
          const spiralPoints = 50;
          for (let s = 0; s < spiralPoints; s++) {
            const spiralAngle = (s / spiralPoints) * Math.PI * 2 * spiralTurns;
            const spiralRadius = (s / spiralPoints) * size/2;
            const spiralX = Math.cos(spiralAngle) * spiralRadius;
            const spiralY = Math.sin(spiralAngle) * spiralRadius;
            s === 0 ? ctx.moveTo(spiralX, spiralY) : ctx.lineTo(spiralX, spiralY);
          }
          ctx.stroke();
          break;
          
        case 4: // Energy burst
          const rays = 12;
          for (let r = 0; r < rays; r++) {
            const rayAngle = (r * 2 * Math.PI) / rays;
            const rayLength = size/3 + Math.random() * size/2;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(rayAngle) * rayLength, Math.sin(rayAngle) * rayLength);
            
            // Add secondary rays
            ctx.lineTo(
              Math.cos(rayAngle + 0.2) * rayLength * 0.7,
              Math.sin(rayAngle + 0.2) * rayLength * 0.7
            );
            ctx.stroke();
          }
          break;
          
        default: // Complex bezier shape
          ctx.beginPath();
          const bezierPoints = 6;
          for (let b = 0; b < bezierPoints; b++) {
            const angle1 = (b * 2 * Math.PI) / bezierPoints;
            const angle2 = ((b + 1) * 2 * Math.PI) / bezierPoints;
            
            const x1 = Math.cos(angle1) * size/3;
            const y1 = Math.sin(angle1) * size/3;
            const x2 = Math.cos(angle2) * size/3;
            const y2 = Math.sin(angle2) * size/3;
            
            const cp1x = x1 + (Math.random() - 0.5) * size/2;
            const cp1y = y1 + (Math.random() - 0.5) * size/2;
            const cp2x = x2 + (Math.random() - 0.5) * size/2;
            const cp2y = y2 + (Math.random() - 0.5) * size/2;
            
            if (b === 0) {
              ctx.moveTo(x1, y1);
            }
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
      }
      
      ctx.restore();
    }
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Floating elements for the background
  const createFloatingElements = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5
    }));
  };

  const floatingElements = createFloatingElements();

  const FloatingElement = ({ element }) => {
    const { x, y, size, duration, delay } = element;
    
    return (
      <motion.div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size
        }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-gradient-to-br from-primary-400/30 to-purple-400/30 backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${settings.colors[0]}20, ${settings.colors[1]}20)`
          }}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <FloatingElement key={element.id} element={element} />
        ))}
      </div>
      
      {/* Main container with enhanced neumorphic layers */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* AI Prompt Input Section - Enhanced */}
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-8"
        >
          {/* Background layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-3xl transform rotate-1" />
          <div className="absolute inset-0 bg-gradient-to-tl from-indigo-50/60 to-pink-50/60 rounded-3xl transform -rotate-1" />
          
          {/* Main content */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-neu-card border border-white/50">
            <div className="flex items-center mb-6">
              <motion.div 
                className="relative mr-4"
                animate={aiMode ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5, repeat: aiMode ? Infinity : 0 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-neu-button">
                  <SafeIcon icon={isGenerating ? FiLoader : FiCpu} className={`w-8 h-8 text-white ${isGenerating ? 'animate-spin' : ''}`} />
                </div>
                {aiMode && (
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-50 blur-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                  AI Pattern Generator
                  <motion.div
                    className="ml-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full"
                    animate={aiMode ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: aiMode ? Infinity : 0 }}
                  >
                    {isGenerating ? 'Generating...' : 'Ready'}
                  </motion.div>
                </h3>
                <p className="text-gray-600">
                  Describe your vision and watch AI bring it to life with stunning patterns
                </p>
              </div>
            </div>
            
            <form onSubmit={handlePromptSubmit} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 pr-16 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl shadow-neu-pressed-sm focus:shadow-neu-ring focus:border-primary-300 outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
                  placeholder="e.g. flowing ocean waves with turquoise and deep blue gradients..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <motion.button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white disabled:opacity-50 shadow-neu-button hover:shadow-neu-flat transition-all duration-200"
                  disabled={isGenerating || !prompt.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <SafeIcon icon={FiLoader} className="w-6 h-6 animate-spin" />
                  ) : (
                    <SafeIcon icon={FiSend} className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </form>
            
            {/* Enhanced action buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRandomGenerate}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-neu-button hover:shadow-neu-flat transition-all duration-200"
                disabled={isGenerating}
              >
                <SafeIcon icon={FiMagic} className="w-4 h-4" />
                <span>Surprise Me</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={generatePattern}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-neu-button hover:shadow-neu-flat transition-all duration-200"
              >
                <SafeIcon icon={FiRefreshCcw} className="w-4 h-4" />
                <span>Regenerate</span>
              </motion.button>
            </div>
            
            {/* Prompt Suggestions - Enhanced */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700 flex items-center">
                  <SafeIcon icon={FiStar} className="w-4 h-4 mr-2 text-yellow-500" />
                  Trending Prompts
                </p>
                <motion.button
                  onClick={() => {
                    const newSuggestions = [
                      "Crystalline ice formations with arctic blue tones",
                      "Volcanic lava flows in red and orange gradients",
                      "Galaxy spiral with cosmic purple and silver",
                      "Bamboo forest pattern in zen green shades",
                      "Lightning storm abstract in electric blue",
                      "Desert sand dunes in warm earth tones"
                    ];
                    setPromptSuggestions(newSuggestions);
                  }}
                  className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SafeIcon icon={FiRefreshCcw} className="w-3 h-3 mr-1" />
                  Refresh
                </motion.button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-white to-gray-50 shadow-neu-flat-sm hover:shadow-neu-button text-sm text-gray-700 rounded-xl border border-gray-200/50 transition-all duration-200"
                    onClick={() => setPrompt(suggestion)}
                    disabled={isGenerating}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Recent Prompts - Enhanced */}
            {generatedPrompts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-gray-200/50 pt-4"
              >
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2 text-green-500" />
                  Your Recent Creations
                </p>
                <div className="flex flex-wrap gap-2">
                  {generatedPrompts.map((genPrompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 shadow-neu-flat-sm hover:shadow-neu-button text-sm text-gray-700 rounded-xl border border-blue-200/50 flex items-center transition-all duration-200"
                      onClick={() => setPrompt(genPrompt)}
                      disabled={isGenerating}
                    >
                      <SafeIcon icon={FiMessageSquare} className="w-3 h-3 mr-2 text-blue-500" />
                      <span className="max-w-[200px] truncate">
                        {genPrompt.length > 40 ? `${genPrompt.substring(0, 40)}...` : genPrompt}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Pattern Generator UI - Enhanced with deeper neumorphic layers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          {/* Multiple background layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-200/80 rounded-3xl transform rotate-2 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tl from-gray-50/90 to-white/90 rounded-3xl transform -rotate-1 scale-102" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 to-purple-50/30 rounded-3xl" />
          
          {/* Main content container */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-neu-card border border-white/70 overflow-hidden">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-gray-50/80 via-white/90 to-gray-50/80 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-neu-button"
                    animate={isGenerating ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                  >
                    <SafeIcon icon={FiLayers} className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Pattern Studio</h2>
                    <p className="text-gray-600 text-sm">Create and customize your pattern</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generatePattern}
                    className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600 text-white rounded-xl shadow-neu-button hover:shadow-neu-flat transition-all duration-300"
                  >
                    <SafeIcon icon={FiRefreshCcw} className="w-4 h-4" />
                    <span>Generate</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-green-500 via-green-600 to-teal-600 text-white rounded-xl shadow-neu-button hover:shadow-neu-flat transition-all duration-300"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Export</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Canvas Area */}
            <div className="p-8 bg-gradient-to-br from-gray-50/50 via-white/30 to-gray-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Canvas Background Layers */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-white rounded-2xl shadow-neu-pressed transform -rotate-1 group-hover:rotate-0 transition-transform duration-300" />
                    
                    <canvas 
                      ref={canvasRef} 
                      className="relative w-full h-[500px] rounded-2xl shadow-neu-flat bg-white border-4 border-white/90 transition-all duration-300 group-hover:shadow-neu-card" 
                      style={{ 
                        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    
                    {/* Enhanced Generation Overlay */}
                    <AnimatePresence>
                      {isGenerating && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center"
                        >
                          <div className="text-center">
                            <motion.div
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                              }}
                              className="w-20 h-20 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                            >
                              <SafeIcon icon={FiCpu} className="w-10 h-10 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Creating Your Pattern</h3>
                            <p className="text-gray-600">Generating something beautiful...</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                {/* Controls area with enhanced styling */}
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Background layers for controls */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-neu-pressed-sm transform rotate-1" />
                    
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-neu-flat border border-gray-200/50">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-neu-flat-sm">
                          <SafeIcon icon={FiSliders} className="w-4 h-4 text-white" />
                        </div>
                        Pattern Controls
                      </h3>
                      
                      {/* Style Selector - Enhanced */}
                      <div className="mb-6 style-section">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Style
                        </label>
                        <div className="relative">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl shadow-neu-flat-sm hover:shadow-neu-button flex items-center justify-between transition-all duration-200"
                          >
                            <div className="flex items-center">
                              <SafeIcon 
                                icon={styleOptions.find(opt => opt.value === settings.style)?.icon} 
                                className="w-5 h-5 mr-3 text-primary-600" 
                              />
                              <span className="font-medium">
                                {styleOptions.find(opt => opt.value === settings.style)?.label}
                              </span>
                            </div>
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
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-neu-card border border-gray-200/50 z-20 overflow-hidden"
                              >
                                {styleOptions.map((option) => (
                                  <motion.button
                                    key={option.value}
                                    whileHover={{ backgroundColor: '#f8fafc' }}
                                    onClick={() => {
                                      setSettings({ ...settings, style: option.value });
                                      setDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left hover:shadow-neu-pressed-sm transition-all duration-200 flex items-center"
                                  >
                                    <SafeIcon icon={option.icon} className="w-5 h-5 mr-3 text-primary-600" />
                                    <span className="font-medium">{option.label}</span>
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      <div className="settings-section space-y-6">
                        {/* Enhanced sliders */}
                        {[
                          { key: 'complexity', label: 'Complexity', min: 3, max: 12, step: 1 },
                          { key: 'scale', label: 'Scale', min: 0.5, max: 2, step: 0.1 },
                          { key: 'rotation', label: 'Rotation', min: 0, max: 360, step: 1, suffix: '°' },
                          { key: 'noise', label: 'Randomness', min: 0, max: 0.6, step: 0.05, suffix: '%', multiplier: 100 }
                        ].map(({ key, label, min, max, step, suffix = '', multiplier = 1 }) => (
                          <div key={key} className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700">
                              {label} ({(settings[key] * multiplier).toFixed(key === 'scale' ? 1 : 0)}{suffix})
                            </label>
                            <div className="relative">
                              <input
                                type="range"
                                min={min}
                                max={max}
                                step={step}
                                value={settings[key]}
                                onChange={(e) => setSettings({ ...settings, [key]: Number(e.target.value) })}
                                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 shadow-neu-pressed-sm slider"
                                style={{
                                  background: `linear-gradient(to right, ${settings.colors[0]}40 0%, ${settings.colors[1]}40 100%)`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Enhanced Color Picker */}
                      <div className="export-section mt-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Color Palette
                        </label>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {settings.colors.map((color, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="relative w-12 h-12 rounded-xl cursor-pointer shadow-neu-flat hover:shadow-neu-button transition-all duration-200 border-3 border-white overflow-hidden"
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                setSelectedColorIndex(index);
                                setShowColorPicker(true);
                              }}
                            >
                              <div 
                                className="absolute inset-0 bg-gradient-to-br opacity-50"
                                style={{ 
                                  background: `linear-gradient(135deg, ${color}80, ${color}FF)` 
                                }}
                              />
                            </motion.div>
                          ))}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowColorPicker(true)}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-white shadow-neu-flat hover:shadow-neu-button transition-all duration-200 flex items-center justify-center border-2 border-dashed border-gray-300"
                          >
                            <SafeIcon icon={FiPalette} className="w-5 h-5 text-gray-600" />
                          </motion.button>
                        </div>
                        
                        <AnimatePresence>
                          {showColorPicker && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-neu-card border border-gray-200/50"
                            >
                              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                                <SafeIcon icon={FiPalette} className="w-4 h-4 mr-2" />
                                Choose Color
                              </h4>
                              
                              <div className="grid grid-cols-6 gap-3 mb-4">
                                {predefinedColors.map((color, index) => (
                                  <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-lg cursor-pointer shadow-neu-flat-sm hover:shadow-neu-button transition-all duration-200 border-2 border-white"
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(selectedColorIndex, color)}
                                  />
                                ))}
                              </div>
                              
                              <div className="flex space-x-3">
                                <input
                                  type="color"
                                  className="flex-1 h-12 rounded-xl shadow-neu-pressed-sm cursor-pointer border-0"
                                  onChange={(e) => handleColorChange(selectedColorIndex, e.target.value)}
                                  value={settings.colors[selectedColorIndex]}
                                />
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setShowColorPicker(false)}
                                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-neu-button hover:shadow-neu-flat transition-all duration-200"
                                >
                                  Done
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative max-w-lg w-full bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-neu-card border border-white/50"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 p-6 border-b border-gray-200/50">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-neu-button mr-4">
                      <SafeIcon icon={FiDownload} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Export Pattern</h3>
                      <p className="text-gray-600">Choose your preferred export format</p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Format Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExport('png')}
                      className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-neu-flat hover:shadow-neu-button border border-gray-200/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={FiFileText} className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900">PNG Format</h4>
                        <p className="text-sm text-gray-600">High-quality image</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExport('svg')}
                      className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-neu-flat hover:shadow-neu-button border border-gray-200/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={FiFileText} className="w-5 h-5 text-purple-500" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900">SVG Format</h4>
                        <p className="text-sm text-gray-600">Scalable vector</p>
                      </div>
                    </motion.button>
                  </div>

                  {/* Resolution Settings */}
                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                      Export Settings
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Resolution</label>
                        <select className="w-full mt-1 px-3 py-2 bg-white rounded-lg shadow-neu-pressed-sm border border-gray-200/50 outline-none">
                          <option>1024 x 1024 px</option>
                          <option>2048 x 2048 px</option>
                          <option>4096 x 4096 px</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Quality</label>
                        <div className="relative mt-1">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value="100"
                            className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Standard</span>
                            <span>High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50/50 p-6 border-t border-gray-200/50">
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowExportModal(false)}
                      className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow-neu-flat hover:shadow-neu-button transition-all duration-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg shadow-neu-button hover:shadow-neu-flat transition-all duration-200"
                    >
                      Export Pattern
                    </motion.button>
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

export default PatternGenerator;