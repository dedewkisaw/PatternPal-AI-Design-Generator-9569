import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { aiService } from '../services/aiService';
import supabase from '../lib/supabase';
import html2canvas from 'html2canvas';

const {
  FiEdit2, FiDownload, FiRefreshCcw, FiSave, FiSliders, FiCommand,
  FiSend, FiZap, FiLayers, FiCpu, FiImage, FiGrid, FiCheck,
  FiEye, FiEyeOff, FiPlus, FiMinus, FiRotateCcw, FiRotateCw,
  FiCopy, FiTrash2, FiShare2, FiBookmark, FiStar, FiInfo, FiX,
  FiSettings, FiTool, FiHelpCircle, FiLoader, FiMaximize, FiMinimize
} = FiIcons;

const Editor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activePanel, setActivePanel] = useState('main'); // main, layers, export, history
  const [layers, setLayers] = useState([
    { id: 1, name: 'Base Layer', visible: true, locked: false, opacity: 1, blendMode: 'normal' }
  ]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [patternHistory, setPatternHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [savedVersions, setSavedVersions] = useState([]);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [colorPalettes, setColorPalettes] = useState([]);
  const [activePalette, setActivePalette] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Pattern Settings
  const [settings, setSettings] = useState({
    patternType: 'geometric',
    complexity: 5,
    scale: 1,
    density: 0.5,
    rotation: 0,
    layerCount: 2,
    harmony: 0.7,
    contrast: 0.5,
    noise: 0.2,
    colors: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899']
  });
  
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([
    "Geometric pattern with flowing lines and circles in blue tones",
    "Abstract organic shapes with vibrant colors and subtle texture",
    "Minimal grid pattern with monochrome gradient and fine details",
    "Nature-inspired flowing pattern with earthy colors and organic forms",
    "Futuristic tech pattern with glowing neon elements on dark background",
    "Elegant pattern with gold accents and sophisticated curves"
  ]);
  
  const [patternVariations, setPatternVariations] = useState([]);
  const [aiEnhancementOptions, setAiEnhancementOptions] = useState([
    { id: 'colorRefinement', name: 'Color Refinement', description: 'Intelligently adjust colors for better harmony' },
    { id: 'complexityBoost', name: 'Complexity Boost', description: 'Enhance pattern with more intricate details' },
    { id: 'harmonize', name: 'Harmonize', description: 'Improve overall balance and cohesion' },
    { id: 'contrast', name: 'Contrast Enhancement', description: 'Increase visual distinction between elements' }
  ]);
  
  // Export settings
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    width: 1080,
    height: 1080,
    quality: 90,
    transparent: false,
    includeMetadata: true
  });
  
  // Pattern info for saving
  const [patternInfo, setPatternInfo] = useState({
    name: 'Untitled Pattern',
    description: '',
    isPublic: false,
    tags: []
  });
  
  // Initialize canvas with pattern when component mounts or settings change
  useEffect(() => {
    const drawPattern = () => {
      if (isGenerating) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const rect = canvasContainerRef.current.getBoundingClientRect();
      
      // Set canvas size to match container
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw based on pattern type
      switch (settings.patternType) {
        case 'geometric':
          drawGeometricPattern(ctx, canvas.width, canvas.height, settings);
          break;
        case 'organic':
          drawOrganicPattern(ctx, canvas.width, canvas.height, settings);
          break;
        case 'abstract':
          drawAbstractPattern(ctx, canvas.width, canvas.height, settings);
          break;
        default:
          drawMixedPattern(ctx, canvas.width, canvas.height, settings);
      }
      
      // Generate preview
      generatePreview();
    };
    
    // Add a small delay to ensure container is properly sized
    const timer = setTimeout(drawPattern, 100);
    
    return () => clearTimeout(timer);
  }, [settings, isGenerating]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        const drawPattern = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const rect = canvasContainerRef.current.getBoundingClientRect();
          
          canvas.width = rect.width;
          canvas.height = rect.height;
          
          // Redraw with current settings
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          switch (settings.patternType) {
            case 'geometric':
              drawGeometricPattern(ctx, canvas.width, canvas.height, settings);
              break;
            case 'organic':
              drawOrganicPattern(ctx, canvas.width, canvas.height, settings);
              break;
            case 'abstract':
              drawAbstractPattern(ctx, canvas.width, canvas.height, settings);
              break;
            default:
              drawMixedPattern(ctx, canvas.width, canvas.height, settings);
          }
          
          generatePreview();
        };
        
        drawPattern();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [settings]);
  
  // Add to history when settings change
  useEffect(() => {
    // Skip on initial load
    if (currentHistoryIndex === -1 && patternHistory.length === 0) {
      setPatternHistory([{ ...settings, timestamp: new Date().toISOString() }]);
      setCurrentHistoryIndex(0);
      return;
    }
    
    // Check if settings are different from current history entry
    if (currentHistoryIndex >= 0 && patternHistory.length > 0) {
      const currentSettings = patternHistory[currentHistoryIndex];
      const isEqual = JSON.stringify(currentSettings) === JSON.stringify(settings);
      
      if (!isEqual) {
        // If we're not at the end of the history, remove future entries
        const newHistory = patternHistory.slice(0, currentHistoryIndex + 1);
        newHistory.push({ ...settings, timestamp: new Date().toISOString() });
        setPatternHistory(newHistory);
        setCurrentHistoryIndex(newHistory.length - 1);
      }
    }
  }, [settings]);
  
  // Generate a preview for thumbnails and exports
  const generatePreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    
    const previewCtx = previewCanvas.getContext('2d');
    const size = 300; // Preview size
    
    previewCanvas.width = size;
    previewCanvas.height = size;
    
    // Draw the pattern scaled to the preview canvas
    previewCtx.drawImage(canvas, 0, 0, size, size);
  };
  
  // Handle prompt submission for AI generation
  const handlePromptSubmit = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    
    try {
      const result = await aiService.generatePattern(prompt);
      
      if (result.success) {
        // Update settings with AI generated values
        setSettings(result.settings);
        
        // Generate color palettes
        const colorResult = await aiService.suggestColors(prompt, 4);
        if (colorResult.success) {
          setColorPalettes(colorResult.colorSchemes);
        }
        
        // Generate variations
        const variationResult = await aiService.generateVariations(result.settings, 4);
        if (variationResult.success) {
          setPatternVariations(variationResult.variations);
        }
      }
    } catch (error) {
      console.error("Error generating pattern:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Apply an AI enhancement
  const applyEnhancement = async (enhancementType) => {
    setIsGenerating(true);
    
    try {
      const result = await aiService.enhancePattern(settings, enhancementType);
      
      if (result.success) {
        setSettings(result.settings);
      }
    } catch (error) {
      console.error("Error enhancing pattern:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Apply a variation
  const applyVariation = (index) => {
    if (patternVariations[index]) {
      setSettings(patternVariations[index]);
    }
  };
  
  // Apply a color palette
  const applyColorPalette = (index) => {
    if (colorPalettes[index]) {
      setSettings({
        ...settings,
        colors: colorPalettes[index]
      });
      setActivePalette(index);
    }
  };
  
  // History navigation
  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setSettings(patternHistory[currentHistoryIndex - 1]);
    }
  };
  
  const redo = () => {
    if (currentHistoryIndex < patternHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setSettings(patternHistory[currentHistoryIndex + 1]);
    }
  };
  
  // Export the pattern
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a new canvas with the desired export dimensions
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportSettings.width;
    exportCanvas.height = exportSettings.height;
    
    const exportCtx = exportCanvas.getContext('2d');
    
    // If not transparent, fill with white background
    if (!exportSettings.transparent) {
      exportCtx.fillStyle = '#FFFFFF';
      exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    }
    
    // Draw the pattern
    switch (settings.patternType) {
      case 'geometric':
        drawGeometricPattern(exportCtx, exportCanvas.width, exportCanvas.height, settings);
        break;
      case 'organic':
        drawOrganicPattern(exportCtx, exportCanvas.width, exportCanvas.height, settings);
        break;
      case 'abstract':
        drawAbstractPattern(exportCtx, exportCanvas.width, exportCanvas.height, settings);
        break;
      default:
        drawMixedPattern(exportCtx, exportCanvas.width, exportCanvas.height, settings);
    }
    
    // Add metadata if requested
    if (exportSettings.includeMetadata) {
      exportCtx.font = '14px Arial';
      exportCtx.fillStyle = 'rgba(0,0,0,0.5)';
      exportCtx.fillText(`PatternPal - ${patternInfo.name}`, 10, exportCanvas.height - 20);
    }
    
    // Convert to data URL and download
    let type;
    switch (exportSettings.format) {
      case 'jpg':
        type = 'image/jpeg';
        break;
      case 'svg':
        // SVG export would require different handling
        console.log('SVG export not implemented yet');
        return;
      case 'webp':
        type = 'image/webp';
        break;
      default:
        type = 'image/png';
    }
    
    const dataURL = exportCanvas.toDataURL(type, exportSettings.quality / 100);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${patternInfo.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${exportSettings.format}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Save the pattern to Supabase
  const savePattern = async () => {
    setIsSaving(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please sign in to save patterns');
        setIsSaving(false);
        return;
      }
      
      // Generate thumbnail
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const thumbnailCanvas = document.createElement('canvas');
      thumbnailCanvas.width = 300;
      thumbnailCanvas.height = 300;
      const thumbnailCtx = thumbnailCanvas.getContext('2d');
      
      // Draw the pattern to thumbnail
      switch (settings.patternType) {
        case 'geometric':
          drawGeometricPattern(thumbnailCtx, thumbnailCanvas.width, thumbnailCanvas.height, settings);
          break;
        case 'organic':
          drawOrganicPattern(thumbnailCtx, thumbnailCanvas.width, thumbnailCanvas.height, settings);
          break;
        case 'abstract':
          drawAbstractPattern(thumbnailCtx, thumbnailCanvas.width, thumbnailCanvas.height, settings);
          break;
        default:
          drawMixedPattern(thumbnailCtx, thumbnailCanvas.width, thumbnailCanvas.height, settings);
      }
      
      const thumbnailURL = thumbnailCanvas.toDataURL('image/png');
      
      // Save to Supabase
      const { data: pattern, error } = await supabase
        .from('patterns_oe83fkvm7d')
        .insert({
          user_id: user.id,
          name: patternInfo.name,
          description: patternInfo.description,
          prompt: prompt,
          thumbnail: thumbnailURL,
          settings: settings,
          is_public: patternInfo.isPublic
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Add tags if any
      if (patternInfo.tags.length > 0) {
        const tagObjects = patternInfo.tags.map(tag => ({
          pattern_id: pattern.id,
          tag
        }));
        
        await supabase.from('pattern_tags_oe83fkvm7d').insert(tagObjects);
      }
      
      // Add version
      await supabase.from('pattern_versions_oe83fkvm7d').insert({
        pattern_id: pattern.id,
        version: 1,
        settings: settings,
        prompt: prompt
      });
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Error saving pattern:", error);
      alert('Failed to save pattern');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowControls(!isFullscreen);
  };
  
  // Pattern drawing functions
  const drawGeometricPattern = (ctx, width, height, patternSettings) => {
    const {
      complexity, scale, density, rotation, colors, 
      harmony, contrast, noise, layerCount
    } = patternSettings;
    
    // Apply global rotation
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-width / 2, -height / 2);
    
    // Calculate base grid size based on complexity and scale
    const baseSize = Math.max(10, 50 / (complexity / 5)) * scale;
    const gridSize = baseSize * (1 - density * 0.5); // Adjust spacing based on density
    
    // Draw each layer
    for (let layer = 0; layer < layerCount; layer++) {
      // Calculate layer-specific parameters
      const layerOffset = layer * 10;
      const layerScale = 1 - (layer * 0.15);
      const layerOpacity = 1 - (layer * 0.2);
      
      // Generate shapes for this layer
      for (let x = -layerOffset; x < width + layerOffset; x += gridSize) {
        for (let y = -layerOffset; y < height + layerOffset; y += gridSize) {
          // Add some noise to positions if requested
          const noiseX = noise > 0 ? (Math.random() - 0.5) * noise * gridSize : 0;
          const noiseY = noise > 0 ? (Math.random() - 0.5) * noise * gridSize : 0;
          
          // Pick a shape type based on position and complexity
          const shapeType = Math.floor((x + y + layer) * complexity) % 4;
          
          // Pick a color
          const colorIndex = Math.floor(Math.random() * colors.length);
          const color = colors[colorIndex];
          
          // Set fill style with opacity
          ctx.globalAlpha = layerOpacity * (0.5 + contrast * 0.5);
          ctx.fillStyle = color;
          
          // Draw the shape
          ctx.beginPath();
          
          switch (shapeType) {
            case 0: // Circle
              ctx.arc(
                x + noiseX + gridSize / 2, 
                y + noiseY + gridSize / 2, 
                (gridSize / 2) * layerScale * harmony, 
                0, 
                Math.PI * 2
              );
              break;
            case 1: // Rectangle
              ctx.rect(
                x + noiseX,
                y + noiseY,
                gridSize * layerScale * harmony,
                gridSize * layerScale * harmony
              );
              break;
            case 2: // Triangle
              ctx.moveTo(x + noiseX + gridSize / 2, y + noiseY);
              ctx.lineTo(x + noiseX, y + noiseY + gridSize);
              ctx.lineTo(x + noiseX + gridSize, y + noiseY + gridSize);
              break;
            case 3: // Line patterns
              const lineCount = Math.ceil(complexity / 2);
              for (let i = 0; i < lineCount; i++) {
                const startX = x + noiseX;
                const startY = y + noiseY + (i * gridSize / lineCount);
                const endX = x + noiseX + gridSize;
                const endY = y + noiseY + (i * gridSize / lineCount);
                
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
              }
              ctx.lineWidth = 1 + scale;
              ctx.strokeStyle = color;
              ctx.stroke();
              continue; // Skip the fill for lines
          }
          
          ctx.fill();
          
          // Add stroke for definition if contrast is high
          if (contrast > 0.7) {
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    
    ctx.globalAlpha = 1;
    ctx.restore();
  };
  
  const drawOrganicPattern = (ctx, width, height, patternSettings) => {
    const {
      complexity, scale, density, rotation, colors, 
      harmony, contrast, noise, layerCount
    } = patternSettings;
    
    // Apply global rotation
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-width / 2, -height / 2);
    
    // Calculate parameters
    const baseSize = Math.max(30, 100 / (complexity / 5)) * scale;
    const pointCount = Math.ceil(complexity * 2);
    const waveAmplitude = baseSize * density;
    
    // Draw each layer
    for (let layer = 0; layer < layerCount; layer++) {
      const layerOpacity = 1 - (layer * 0.2);
      const layerOffset = layer * 20;
      
      // Draw flowing curves
      for (let i = 0; i < width; i += baseSize * 1.5) {
        // Select color
        const colorIndex = Math.floor((i / baseSize) % colors.length);
        ctx.fillStyle = colors[colorIndex];
        ctx.globalAlpha = layerOpacity * (0.3 + contrast * 0.3);
        
        // Create a flowing path
        ctx.beginPath();
        
        const points = [];
        for (let j = 0; j <= pointCount; j++) {
          const x = i + (Math.sin(j / pointCount * Math.PI * 2 * harmony) * waveAmplitude);
          const y = (j / pointCount) * height;
          
          // Add noise
          const noiseFactorX = noise * baseSize * (Math.random() - 0.5);
          const noiseFactorY = noise * baseSize * (Math.random() - 0.5);
          
          points.push({
            x: x + noiseFactorX + layerOffset,
            y: y + noiseFactorY
          });
        }
        
        // Draw the curve
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let j = 0; j < points.length - 1; j++) {
          const cp1x = points[j].x + (points[j+1].x - points[j-1 < 0 ? 0 : j-1].x) / 6;
          const cp1y = points[j].y + (points[j+1].y - points[j-1 < 0 ? 0 : j-1].y) / 6;
          const cp2x = points[j+1].x - (points[j+2 > points.length-1 ? points.length-1 : j+2].x - points[j].x) / 6;
          const cp2y = points[j+1].y - (points[j+2 > points.length-1 ? points.length-1 : j+2].y - points[j].y) / 6;
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[j+1].x, points[j+1].y);
        }
        
        // Close the path to the right edge
        ctx.lineTo(points[points.length - 1].x + baseSize * 2, points[points.length - 1].y);
        ctx.lineTo(points[points.length - 1].x + baseSize * 2, height);
        ctx.lineTo(points[0].x, height);
        ctx.closePath();
        
        ctx.fill();
        
        // Add stroke if contrast is high
        if (contrast > 0.6) {
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Add some organic circles for texture if complexity is high
      if (complexity > 6) {
        const circleCount = Math.ceil(complexity * density * 5);
        
        for (let i = 0; i < circleCount; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = (Math.random() * baseSize * 0.5) + (baseSize * 0.2);
          
          const colorIndex = Math.floor(Math.random() * colors.length);
          ctx.fillStyle = colors[colorIndex];
          ctx.globalAlpha = layerOpacity * 0.4;
          
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    ctx.globalAlpha = 1;
    ctx.restore();
  };
  
  const drawAbstractPattern = (ctx, width, height, patternSettings) => {
    const {
      complexity, scale, density, rotation, colors, 
      harmony, contrast, noise, layerCount
    } = patternSettings;
    
    // Apply global rotation
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-width / 2, -height / 2);
    
    // Parameters for abstract pattern
    const elementCount = Math.ceil(complexity * density * 10);
    const maxSize = 100 * scale;
    const minSize = 20 * scale;
    
    // Draw each layer
    for (let layer = 0; layer < layerCount; layer++) {
      const layerOpacity = 1 - (layer * 0.15);
      
      // Draw random abstract elements
      for (let i = 0; i < elementCount; i++) {
        // Random position with some grid alignment based on harmony
        let x, y;
        
        if (harmony > 0.7) {
          // More organized positioning
          const gridSize = maxSize * 1.5;
          const gridX = Math.floor((width / gridSize) * harmony);
          const gridY = Math.floor((height / gridSize) * harmony);
          
          x = (Math.floor(Math.random() * gridX) * gridSize) + (gridSize / 2);
          y = (Math.floor(Math.random() * gridY) * gridSize) + (gridSize / 2);
          
          // Add some noise
          x += (Math.random() - 0.5) * gridSize * noise;
          y += (Math.random() - 0.5) * gridSize * noise;
        } else {
          // More random positioning
          x = Math.random() * width;
          y = Math.random() * height;
        }
        
        // Random size based on scale and some variation
        const size = minSize + (Math.random() * (maxSize - minSize));
        
        // Select color
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        // Set opacity based on layer and contrast
        ctx.globalAlpha = layerOpacity * (0.3 + (contrast * 0.5));
        
        // Select a random shape type
        const shapeType = Math.floor(Math.random() * 6);
        
        ctx.fillStyle = color;
        
        switch (shapeType) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          
          case 1: // Square
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
            break;
          
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          
          case 3: // Random polygon
            const sides = 3 + Math.floor(Math.random() * 5);
            ctx.beginPath();
            for (let j = 0; j < sides; j++) {
              const angle = (j / sides) * Math.PI * 2;
              const pointX = x + Math.cos(angle) * (size / 2);
              const pointY = y + Math.sin(angle) * (size / 2);
              
              if (j === 0) {
                ctx.moveTo(pointX, pointY);
              } else {
                ctx.lineTo(pointX, pointY);
              }
            }
            ctx.closePath();
            ctx.fill();
            break;
          
          case 4: // Curved shape
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            const curvePoints = 3 + Math.floor(Math.random() * 3);
            for (let j = 0; j < curvePoints; j++) {
              const angle = (j / curvePoints) * Math.PI * 2;
              const distance = (size / 2) * (0.7 + Math.random() * 0.6);
              const pointX = x + Math.cos(angle) * distance;
              const pointY = y + Math.sin(angle) * distance;
              
              const controlX = x + Math.cos(angle - Math.PI/4) * distance * 1.5;
              const controlY = y + Math.sin(angle - Math.PI/4) * distance * 1.5;
              
              ctx.quadraticCurveTo(controlX, controlY, pointX, pointY);
            }
            
            ctx.closePath();
            ctx.fill();
            break;
          
          case 5: // Lines
            ctx.strokeStyle = color;
            ctx.lineWidth = 2 + (Math.random() * 3 * scale);
            
            const lineCount = 3 + Math.floor(Math.random() * 5);
            for (let j = 0; j < lineCount; j++) {
              const angle1 = Math.random() * Math.PI * 2;
              const angle2 = angle1 + Math.PI + (Math.random() - 0.5);
              
              const x1 = x + Math.cos(angle1) * (size / 2);
              const y1 = y + Math.sin(angle1) * (size / 2);
              const x2 = x + Math.cos(angle2) * (size / 2);
              const y2 = y + Math.sin(angle2) * (size / 2);
              
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
            break;
        }
        
        // Add stroke for definition if contrast is high
        if (contrast > 0.6 && shapeType < 5) {
          ctx.strokeStyle = 'rgba(0,0,0,0.3)';
          ctx.lineWidth = 1 + scale;
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1;
    ctx.restore();
  };
  
  const drawMixedPattern = (ctx, width, height, patternSettings) => {
    // Mix different pattern types
    const { layerCount } = patternSettings;
    
    // First layer - geometric base
    drawGeometricPattern(ctx, width, height, {
      ...patternSettings,
      layerCount: Math.ceil(layerCount / 3),
      complexity: patternSettings.complexity * 0.8
    });
    
    // Second layer - organic elements with reduced opacity
    ctx.globalAlpha = 0.6;
    drawOrganicPattern(ctx, width, height, {
      ...patternSettings,
      layerCount: Math.ceil(layerCount / 3),
      complexity: patternSettings.complexity * 0.7
    });
    
    // Third layer - abstract accents with even lower opacity
    ctx.globalAlpha = 0.4;
    drawAbstractPattern(ctx, width, height, {
      ...patternSettings,
      layerCount: Math.ceil(layerCount / 3),
      complexity: patternSettings.complexity * 0.6
    });
    
    ctx.globalAlpha = 1;
  };
  
  return (
    <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'pt-20 pb-16 bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`flex justify-between items-center mb-4 ${isFullscreen ? 'pt-4' : ''}`}
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SafeIcon icon={FiEdit2} className="w-8 h-8 mr-3 text-primary-600" />
            AI Pattern Studio
          </h1>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <SafeIcon icon={isFullscreen ? FiMinimize : FiMaximize} className="w-4 h-4" />
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </motion.button>
            
            {!isFullscreen && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTutorial(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                  <span>Help</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={savePattern}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={isSaved ? FiCheck : isSaving ? FiLoader : FiSave} className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                  <span>{isSaved ? 'Saved!' : isSaving ? 'Saving...' : 'Save'}</span>
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
        
        {/* AI Prompt Section */}
        {(!isFullscreen || showControls) && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SafeIcon icon={FiCommand} className="w-5 h-5 mr-2 text-primary-600" />
                AI Pattern Generator
              </h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the pattern you want to create..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePromptSubmit}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 min-w-[140px] justify-center"
                >
                  <SafeIcon icon={isGenerating ? FiLoader : FiSend} className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                </motion.button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content - Canvas and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow">
          {/* Canvas Area */}
          <div className={`${(!isFullscreen || showControls) ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-4 h-full"
            >
              <div className="relative h-full">
                <div 
                  ref={canvasContainerRef}
                  className="w-full h-full border border-gray-200 rounded-lg bg-white flex items-center justify-center overflow-hidden"
                  style={{ minHeight: isFullscreen ? 'calc(100vh - 100px)' : '500px' }}
                >
                  <canvas ref={canvasRef} className="w-full h-full" />
                  
                  {isGenerating && (
                    <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
                      <p className="text-gray-700 font-medium">Generating pattern...</p>
                    </div>
                  )}
                </div>
                
                {/* Fullscreen controls overlay */}
                {isFullscreen && (
                  <div className="absolute bottom-4 right-4 flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowControls(!showControls)}
                      className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    >
                      <SafeIcon icon={showControls ? FiEyeOff : FiEye} className="w-5 h-5 text-gray-700" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleFullscreen}
                      className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    >
                      <SafeIcon icon={FiMinimize} className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Pattern Variations */}
            {(!isFullscreen || showControls) && patternVariations.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <SafeIcon icon={FiGrid} className="w-5 h-5 mr-2 text-primary-600" />
                  Pattern Variations
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {patternVariations.map((variation, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="relative cursor-pointer"
                      onClick={() => applyVariation(index)}
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                        {/* We would render the pattern preview here */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                        <div 
                          className="absolute inset-0" 
                          style={{ 
                            backgroundColor: variation.colors[0],
                            backgroundImage: `radial-gradient(circle at 70% 30%, ${variation.colors[1]}80 0%, transparent 50%),
                                             radial-gradient(circle at 30% 70%, ${variation.colors[2]}80 0%, transparent 50%)`
                          }}
                        ></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Apply
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Palettes */}
            {(!isFullscreen || showControls) && colorPalettes.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <SafeIcon icon={FiLayers} className="w-5 h-5 mr-2 text-primary-600" />
                  Color Palettes
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorPalettes.map((palette, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className={`p-3 rounded-lg cursor-pointer ${activePalette === index ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => applyColorPalette(index)}
                    >
                      <div className="flex space-x-2 mb-2">
                        {palette.map((color, i) => (
                          <div 
                            key={i} 
                            className="w-8 h-8 rounded-full" 
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        {activePalette === index && (
                          <SafeIcon icon={FiCheck} className="w-4 h-4 mr-1 text-primary-600" />
                        )}
                        Palette {index + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Controls Panel */}
          {(!isFullscreen || showControls) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Control Tabs */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b border-gray-200">
                  {[
                    { id: 'main', label: 'Controls', icon: FiSliders },
                    { id: 'layers', label: 'Layers', icon: FiLayers },
                    { id: 'ai', label: 'AI', icon: FiCpu },
                    { id: 'history', label: 'History', icon: FiRotateCcw },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePanel(tab.id)}
                      className={`flex-1 py-3 flex flex-col items-center justify-center ${activePanel === tab.id ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <SafeIcon icon={tab.icon} className="w-5 h-5 mb-1" />
                      <span className="text-xs">{tab.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="p-6">
                  {/* Main Controls Panel */}
                  {activePanel === 'main' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pattern Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['geometric', 'organic', 'abstract', 'mixed'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSettings({ ...settings, patternType: type })}
                              className={`py-2 px-3 rounded-lg capitalize ${settings.patternType === type ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Complexity: {settings.complexity.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.1"
                          value={settings.complexity}
                          onChange={(e) => setSettings({ ...settings, complexity: parseFloat(e.target.value) })}
                          className="w-full slider"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scale: {settings.scale.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={settings.scale}
                          onChange={(e) => setSettings({ ...settings, scale: parseFloat(e.target.value) })}
                          className="w-full slider"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Density: {settings.density.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={settings.density}
                          onChange={(e) => setSettings({ ...settings, density: parseFloat(e.target.value) })}
                          className="w-full slider"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rotation: {settings.rotation.toFixed(0)}°
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={settings.rotation}
                            onChange={(e) => setSettings({ ...settings, rotation: parseFloat(e.target.value) })}
                            className="w-full slider"
                          />
                          <button
                            onClick={() => setSettings({ ...settings, rotation: (settings.rotation + 90) % 360 })}
                            className="ml-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          >
                            <SafeIcon icon={FiRotateCw} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Layers: {settings.layerCount}
                        </label>
                        <div className="flex items-center">
                          <button
                            onClick={() => setSettings({ ...settings, layerCount: Math.max(1, settings.layerCount - 1) })}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={settings.layerCount <= 1}
                          >
                            <SafeIcon icon={FiMinus} className="w-4 h-4" />
                          </button>
                          <div className="flex-1 text-center font-medium">
                            {settings.layerCount}
                          </div>
                          <button
                            onClick={() => setSettings({ ...settings, layerCount: Math.min(5, settings.layerCount + 1) })}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={settings.layerCount >= 5}
                          >
                            <SafeIcon icon={FiPlus} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Colors
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {settings.colors.map((color, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={color}
                                onChange={(e) => {
                                  const newColors = [...settings.colors];
                                  newColors[index] = e.target.value;
                                  setSettings({ ...settings, colors: newColors });
                                }}
                                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={color}
                                onChange={(e) => {
                                  const newColors = [...settings.colors];
                                  newColors[index] = e.target.value;
                                  setSettings({ ...settings, colors: newColors });
                                }}
                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => {
                              if (settings.colors.length > 1) {
                                setSettings({ 
                                  ...settings, 
                                  colors: settings.colors.slice(0, -1)
                                });
                              }
                            }}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={settings.colors.length <= 1}
                          >
                            <SafeIcon icon={FiMinus} className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => {
                              const newColor = settings.colors.length > 0 
                                ? settings.colors[settings.colors.length - 1] 
                                : '#000000';
                              setSettings({ 
                                ...settings, 
                                colors: [...settings.colors, newColor]
                              });
                            }}
                            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={settings.colors.length >= 8}
                          >
                            <SafeIcon icon={FiPlus} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const canvas = canvasRef.current;
                          if (canvas) {
                            const ctx = canvas.getContext('2d');
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            switch (settings.patternType) {
                              case 'geometric':
                                drawGeometricPattern(ctx, canvas.width, canvas.height, settings);
                                break;
                              case 'organic':
                                drawOrganicPattern(ctx, canvas.width, canvas.height, settings);
                                break;
                              case 'abstract':
                                drawAbstractPattern(ctx, canvas.width, canvas.height, settings);
                                break;
                              default:
                                drawMixedPattern(ctx, canvas.width, canvas.height, settings);
                            }
                            
                            generatePreview();
                          }
                        }}
                        className="w-full mt-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Generate Pattern
                      </motion.button>
                    </div>
                  )}
                  
                  {/* Layers Panel */}
                  {activePanel === 'layers' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">Pattern Layers</h3>
                        <button
                          onClick={() => {
                            if (layers.length < 5) {
                              const newId = Math.max(...layers.map(l => l.id)) + 1;
                              setLayers([
                                ...layers,
                                { 
                                  id: newId, 
                                  name: `Layer ${newId}`, 
                                  visible: true, 
                                  locked: false, 
                                  opacity: 1, 
                                  blendMode: 'normal' 
                                }
                              ]);
                            }
                          }}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          disabled={layers.length >= 5}
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {layers.map((layer) => (
                          <motion.div
                            key={layer.id}
                            whileHover={{ y: -2 }}
                            className={`p-3 rounded-lg border cursor-pointer ${activeLayerId === layer.id ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setActiveLayerId(layer.id)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLayers(layers.map(l => 
                                      l.id === layer.id ? { ...l, visible: !l.visible } : l
                                    ));
                                  }}
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                  <SafeIcon icon={layer.visible ? FiEye : FiEyeOff} className="w-4 h-4" />
                                </button>
                                <span className="ml-2 font-medium text-gray-800">{layer.name}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (layers.length > 1) {
                                      setLayers(layers.filter(l => l.id !== layer.id));
                                      if (activeLayerId === layer.id) {
                                        setActiveLayerId(layers[0].id);
                                      }
                                    }
                                  }}
                                  className="p-1 text-gray-500 hover:text-red-500"
                                  disabled={layers.length <= 1}
                                >
                                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {activeLayerId === layer.id && (
                              <div className="mt-3 space-y-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Opacity</label>
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={layer.opacity}
                                    onChange={(e) => {
                                      setLayers(layers.map(l => 
                                        l.id === layer.id ? { ...l, opacity: parseFloat(e.target.value) } : l
                                      ));
                                    }}
                                    className="w-full slider"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Blend Mode</label>
                                  <select
                                    value={layer.blendMode}
                                    onChange={(e) => {
                                      setLayers(layers.map(l => 
                                        l.id === layer.id ? { ...l, blendMode: e.target.value } : l
                                      ));
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                                  >
                                    {['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'].map(mode => (
                                      <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* AI Panel */}
                  {activePanel === 'ai' && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">AI Enhancements</h3>
                      
                      <div className="space-y-2">
                        {aiEnhancementOptions.map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ y: -2 }}
                            className="p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer"
                            onClick={() => applyEnhancement(option.id)}
                          >
                            <div className="flex items-start">
                              <div className="p-2 bg-primary-100 rounded-lg mr-3">
                                <SafeIcon icon={FiZap} className="w-4 h-4 text-primary-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{option.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Pattern Information</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Pattern Name</label>
                            <input
                              type="text"
                              value={patternInfo.name}
                              onChange={(e) => setPatternInfo({ ...patternInfo, name: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Give your pattern a name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                            <textarea
                              value={patternInfo.description}
                              onChange={(e) => setPatternInfo({ ...patternInfo, description: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Describe your pattern"
                              rows={3}
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isPublic"
                              checked={patternInfo.isPublic}
                              onChange={(e) => setPatternInfo({ ...patternInfo, isPublic: e.target.checked })}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                              Make pattern public
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* History Panel */}
                  {activePanel === 'history' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">Pattern History</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={undo}
                            disabled={currentHistoryIndex <= 0}
                            className={`p-2 rounded-lg ${currentHistoryIndex > 0 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                          >
                            <SafeIcon icon={FiRotateCcw} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={redo}
                            disabled={currentHistoryIndex >= patternHistory.length - 1}
                            className={`p-2 rounded-lg ${currentHistoryIndex < patternHistory.length - 1 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                          >
                            <SafeIcon icon={FiRotateCw} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {patternHistory.map((historyItem, index) => {
                          const date = new Date(historyItem.timestamp);
                          const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          
                          return (
                            <motion.div
                              key={index}
                              whileHover={{ y: -2 }}
                              className={`p-3 rounded-lg border cursor-pointer ${index === currentHistoryIndex ? 'bg-primary-50 border-primary-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                              onClick={() => {
                                setCurrentHistoryIndex(index);
                                setSettings(historyItem);
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <span className="ml-2 font-medium text-gray-800">
                                    {index === 0 ? 'Initial Pattern' : `Change ${index}`}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">{timeString}</span>
                              </div>
                              
                              {index === currentHistoryIndex && (
                                <div className="mt-2 grid grid-cols-4 gap-1">
                                  {historyItem.colors.slice(0, 4).map((color, i) => (
                                    <div
                                      key={i}
                                      className="h-3 rounded-sm"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Hidden canvas for previews */}
      <canvas ref={previewCanvasRef} className="hidden" width="300" height="300" />
      
      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <SafeIcon icon={FiInfo} className="w-6 h-6 mr-2 text-primary-600" />
                  Pattern Studio Guide
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTutorial(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Pattern Generation</h3>
                  <p className="text-gray-600">
                    Type a description of the pattern you want to create in the AI prompt field at the top of the editor.
                    Be as specific as possible about colors, shapes, style, and mood. Our AI will generate a pattern based on your description.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pattern Controls</h3>
                  <p className="text-gray-600 mb-3">
                    Fine-tune your pattern using the controls panel on the right side of the editor:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <SafeIcon icon={FiSliders} className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Adjust complexity, scale, density and more to customize your pattern</span>
                    </li>
                    <li className="flex items-start">
                      <SafeIcon icon={FiLayers} className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Work with multiple layers to create complex designs</span>
                    </li>
                    <li className="flex items-start">
                      <SafeIcon icon={FiRotateCcw} className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Use the history panel to undo/redo changes or revert to previous versions</span>
                    </li>
                    <li className="flex items-start">
                      <SafeIcon icon={FiCpu} className="w-5 h-5 mr-2 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>Apply AI enhancements to refine and improve your pattern</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Exporting Your Pattern</h3>
                  <p className="text-gray-600">
                    Click the Export button to save your pattern in various formats and resolutions.
                    You can choose PNG, JPG or SVG formats and set custom dimensions for your export.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Saving Your Work</h3>
                  <p className="text-gray-600">
                    Click the Save button to store your pattern in your account. You can give it a name,
                    add a description, and choose to make it public or private. Saved patterns appear in your gallery.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">
                    Tip: Try different pattern types (geometric, organic, abstract) to see what works best for your design needs!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Export Options Modal */}
      <AnimatePresence>
        {showExportOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2 text-primary-600" />
                  Export Pattern
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowExportOptions(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['png', 'jpg', 'svg'].map((format) => (
                      <button
                        key={format}
                        onClick={() => setExportSettings({ ...exportSettings, format })}
                        className={`py-2 px-3 rounded-lg uppercase ${exportSettings.format === format ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <div className="flex space-x-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Width</label>
                      <input
                        type="number"
                        value={exportSettings.width}
                        onChange={(e) => setExportSettings({ ...exportSettings, width: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Height</label>
                      <input
                        type="number"
                        value={exportSettings.height}
                        onChange={(e) => setExportSettings({ ...exportSettings, height: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality: {exportSettings.quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={exportSettings.quality}
                    onChange={(e) => setExportSettings({ ...exportSettings, quality: parseInt(e.target.value) })}
                    className="w-full slider"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="transparentBg"
                    checked={exportSettings.transparent}
                    onChange={(e) => setExportSettings({ ...exportSettings, transparent: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="transparentBg" className="ml-2 text-sm text-gray-700">
                    Transparent background
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeMetadata"
                    checked={exportSettings.includeMetadata}
                    onChange={(e) => setExportSettings({ ...exportSettings, includeMetadata: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="includeMetadata" className="ml-2 text-sm text-gray-700">
                    Include pattern metadata
                  </label>
                </div>
                
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleExport();
                      setShowExportOptions(false);
                    }}
                    className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
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
  );
};

export default Editor;