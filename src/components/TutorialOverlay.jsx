import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiX, FiArrowRight, FiCheck, FiDownload, FiLayers, 
  FiSliders, FiZap, FiSave, FiFileText 
} = FiIcons;

const TutorialOverlay = ({ isFirstVisit, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(isFirstVisit);

  const tutorials = [
    {
      title: "Welcome to PatternPal!",
      description: "Let's walk through the key features to help you create amazing patterns.",
      icon: FiZap,
      position: "center",
    },
    {
      title: "Choose Your Template",
      description: "Start by selecting a template style that matches your vision.",
      icon: FiLayers,
      target: ".template-section",
    },
    {
      title: "Customize Your Pattern",
      description: "Adjust colors, complexity, and other settings to make it unique.",
      icon: FiSliders,
      target: ".settings-section",
    },
    {
      title: "Export Options",
      description: "Export your pattern in various formats including SVG, PNG, and PDF.",
      icon: FiDownload,
      target: ".export-section",
    },
    {
      title: "Save & Share",
      description: "Save your patterns to your profile and share with the community.",
      icon: FiSave,
      target: ".save-section",
    }
  ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNext = () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      onComplete?.();
    }
  };

  const handleSkip = () => {
    setShowTutorial(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl p-6 max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <SafeIcon 
                    icon={tutorials[currentStep].icon} 
                    className="w-5 h-5 text-primary-600" 
                  />
                </div>
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {tutorials.length}
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {tutorials[currentStep].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {tutorials[currentStep].description}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Skip Tutorial
              </button>
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <span>{currentStep === tutorials.length - 1 ? 'Get Started' : 'Next'}</span>
                <SafeIcon 
                  icon={currentStep === tutorials.length - 1 ? FiCheck : FiArrowRight} 
                  className="w-4 h-4" 
                />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TutorialOverlay;