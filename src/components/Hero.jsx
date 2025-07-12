import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="pt-24 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Create{' '}
          <span className="bg-gradient-to-r from-primary-600 via-red-500 to-black bg-clip-text text-transparent">
            Stunning Patterns
          </span>
          <br /> 
          <span className="bg-gradient-to-r from-black via-red-500 to-black bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4">
          Generate unique, beautiful patterns for your designs using our
          AI-powered pattern generator.
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;