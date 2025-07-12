import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit2, FiDownload, FiShare2, FiZap, FiLayers, FiPalette } = FiIcons;

const Landing = () => {
  // Beautiful floating pattern elements
  const createFloatingElements = () => {
    const elements = [];
    const patterns = [
      // Geometric shapes
      { type: 'circle', color: '#3B82F6' },
      { type: 'triangle', color: '#8B5CF6' },
      { type: 'hexagon', color: '#F59E0B' },
      { type: 'diamond', color: '#EC4899' },
      { type: 'star', color: '#10B981' },
      { type: 'circle', color: '#EF4444' },
    ];

    for (let i = 0; i < 8; i++) {
      const pattern = patterns[i % patterns.length];
      elements.push({
        id: i,
        type: pattern.type,
        color: pattern.color,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 80,
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      });
    }
    return elements;
  };

  const floatingElements = createFloatingElements();

  const PatternElement = ({ element }) => {
    const { type, color, size, x, y, rotation, duration, delay } = element;

    const renderShape = () => {
      const baseClasses = "absolute transform-gpu";
      const style = { 
        width: size, 
        height: size, 
        backgroundColor: color + '40', // Semi-transparent
        border: `2px solid ${color}60`,
      };

      switch (type) {
        case 'circle':
          return (
            <div 
              className={`${baseClasses} rounded-full`} 
              style={style}
            />
          );
        case 'triangle':
          return (
            <div 
              className={`${baseClasses}`}
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size/2}px solid transparent`,
                borderRight: `${size/2}px solid transparent`,
                borderBottom: `${size}px solid ${color}40`,
              }}
            />
          );
        case 'hexagon':
          return (
            <div 
              className={`${baseClasses} hexagon`}
              style={{
                width: size,
                height: size * 0.866,
                backgroundColor: color + '40',
                position: 'relative',
              }}
            >
              <div 
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${size/2}px solid transparent`,
                  borderRight: `${size/2}px solid transparent`,
                  borderBottom: `${size * 0.289}px solid ${color}40`,
                  top: `-${size * 0.289}px`,
                }}
              />
              <div 
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${size/2}px solid transparent`,
                  borderRight: `${size/2}px solid transparent`,
                  borderTop: `${size * 0.289}px solid ${color}40`,
                  bottom: `-${size * 0.289}px`,
                }}
              />
            </div>
          );
        case 'diamond':
          return (
            <div 
              className={`${baseClasses} transform rotate-45`}
              style={style}
            />
          );
        case 'star':
          return (
            <div 
              className={`${baseClasses} star`}
              style={{
                width: size,
                height: size,
                background: `conic-gradient(from 0deg, ${color}40, ${color}80, ${color}40)`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          );
        default:
          return (
            <div 
              className={`${baseClasses} rounded-lg`} 
              style={style}
            />
          );
      }
    };

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        initial={{
          rotate: rotation,
          scale: 0,
        }}
        animate={{
          rotate: [rotation, rotation + 360],
          scale: [0, 1, 1, 0],
          x: [0, Math.sin(y) * 50, 0],
          y: [0, Math.cos(x) * 30, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {renderShape()}
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Beautiful Floating Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <PatternElement key={element.id} element={element} />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 text-center z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Create{' '}
              <span className="bg-gradient-to-r from-primary-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Stunning Patterns
              </span>
              <br />
              <span className="text-4xl md:text-6xl bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Generate unique, beautiful patterns for your designs using our AI-powered pattern generator. 
              Perfect for designers, developers, and creative professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/editor">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Creating
                </motion.button>
              </Link>
              
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-neu-gradient shadow-neu-flat hover:shadow-neu-pressed rounded-xl text-lg font-semibold text-gray-800 transition-all duration-200"
                >
                  View Gallery
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need to create amazing patterns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional tools and intuitive interface designed for creators of all skill levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-neu-flat hover:shadow-neu-pressed transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Generate complex patterns instantly with our optimized algorithms. 
              Real-time preview and instant feedback for rapid iteration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-neu-flat hover:shadow-neu-pressed transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiLayers} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Multiple Styles
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from geometric, organic, and abstract pattern styles. 
              Each style offers unique customization options and creative possibilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-neu-flat hover:shadow-neu-pressed transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <SafeIcon icon={FiPalette} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Custom Colors
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Fine-tune every aspect of your patterns with advanced color controls. 
              Create harmonious palettes that match your brand perfectly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
            <div className="absolute top-8 right-12 w-6 h-6 border-2 border-white transform rotate-45"></div>
            <div className="absolute bottom-8 left-12 w-10 h-10 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-white transform rotate-45"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to create something amazing?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of designers who are already using PatternPal to bring their creative visions to life.
            </p>
            <Link to="/editor">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-primary-600 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started for Free
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;