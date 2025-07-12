import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit2, FiDownload, FiShare2, FiZap, FiLayers, FiPalette, FiStar, FiHeart, FiCpu, FiAperture, FiTarget, FiTrendingUp } = FiIcons;

const Landing = () => {
  // Create new dynamic floating elements with more variety
  const createFloatingElements = () => {
    const iconSets = [
      { icon: FiStar, color: '#FFD700', glow: '#FFE55C' },
      { icon: FiHeart, color: '#FF6B9D', glow: '#FFB3D1' },
      { icon: FiCpu, color: '#00D4FF', glow: '#66E0FF' },
      { icon: FiAperture, color: '#7C3AED', glow: '#A855F7' },
      { icon: FiTarget, color: '#10B981', glow: '#34D399' },
      { icon: FiTrendingUp, color: '#F59E0B', glow: '#FBBF24' },
      { icon: FiZap, color: '#EF4444', glow: '#F87171' },
      { icon: FiLayers, color: '#8B5CF6', glow: '#A78BFA' }
    ];

    return Array.from({ length: 15 }, (_, i) => {
      const iconSet = iconSets[i % iconSets.length];
      return {
        id: i,
        icon: iconSet.icon,
        color: iconSet.color,
        glow: iconSet.glow,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30 + Math.random() * 40,
        initialRotation: Math.random() * 360,
        floatDuration: 8 + Math.random() * 12,
        pulseDuration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        amplitude: 30 + Math.random() * 50
      };
    });
  };

  const floatingElements = createFloatingElements();

  const FloatingIcon = ({ element }) => {
    const {
      icon,
      color,
      glow,
      x,
      y,
      size,
      initialRotation,
      floatDuration,
      pulseDuration,
      delay,
      amplitude
    } = element;

    // Floating animation - figure-8 pattern
    const floatingVariants = {
      animate: {
        x: [0, amplitude, 0, -amplitude, 0],
        y: [0, -amplitude/2, -amplitude, -amplitude/2, 0],
        rotate: [initialRotation, initialRotation + 360, initialRotation + 720],
        transition: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }
    };

    // Pulsing glow effect
    const pulseVariants = {
      animate: {
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.7, 0.3],
        transition: {
          duration: pulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5
        }
      }
    };

    // Icon scale animation
    const iconVariants = {
      animate: {
        scale: [1, 1.1, 1],
        transition: {
          duration: pulseDuration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.3
        }
      }
    };

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size
        }}
        variants={floatingVariants}
        animate="animate"
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${glow}40 0%, ${glow}20 50%, transparent 70%)`,
            filter: 'blur(15px)'
          }}
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Main container */}
        <motion.div
          className="relative w-full h-full rounded-2xl backdrop-blur-sm flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}30)`,
            border: `1px solid ${color}50`,
            boxShadow: `0 8px 32px ${color}25, inset 0 1px 0 ${color}40`
          }}
          variants={iconVariants}
          animate="animate"
        >
          {/* Inner glow */}
          <div
            className="absolute inset-1 rounded-xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${glow}30, transparent 70%)`
            }}
          />
          
          {/* Icon */}
          <SafeIcon
            icon={icon}
            className="relative z-10"
            style={{ 
              color: color,
              fontSize: size * 0.4,
              filter: `drop-shadow(0 2px 4px ${color}40)`
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  // Particle system for additional ambience
  const createParticles = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10
    }));
  };

  const particles = createParticles();

  const Particle = ({ particle }) => {
    const { x, y, size, duration, delay } = particle;

    return (
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size
        }}
        animate={{
          y: [-20, 20, -20],
          opacity: [0.1, 0.5, 0.1],
          scale: [0.5, 1, 0.5]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
      />
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <FloatingIcon key={element.id} element={element} />
        ))}
        
        {/* Ambient particles */}
        {particles.map((particle) => (
          <Particle key={particle.id} particle={particle} />
        ))}
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-purple-50/30 pointer-events-none" />
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
              Generate complex patterns instantly with our optimized algorithms. Real-time preview and instant feedback for rapid iteration.
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
              Choose from geometric, organic, and abstract pattern styles. Each style offers unique customization options and creative possibilities.
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
              Fine-tune every aspect of your patterns with advanced color controls. Create harmonious palettes that match your brand perfectly.
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