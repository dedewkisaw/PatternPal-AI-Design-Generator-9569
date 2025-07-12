import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail, FiX } = FiIcons;

const Footer = () => {
  const [activeDocument, setActiveDocument] = useState(null);

  const documents = {
    privacy: {
      title: "Privacy Policy",
      content: `
        <h2>Privacy Policy</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us when using PatternPal...</p>
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to provide and improve our services...</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <h2>Terms of Service</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using PatternPal, you accept and agree to be bound by these terms...</p>
        <h3>2. User Responsibilities</h3>
        <p>You are responsible for maintaining the confidentiality of your account...</p>
      `
    },
    about: {
      title: "About PatternPal",
      content: `
        <h2>About PatternPal</h2>
        <p>PatternPal is a cutting-edge pattern generation tool designed for creators...</p>
        <h3>Our Mission</h3>
        <p>To empower designers and creators with powerful, easy-to-use pattern generation tools...</p>
      `
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-neu-gradient rounded-lg shadow-neu-flat flex items-center justify-center text-gray-800 font-bold text-sm"
              >
                PP
              </motion.div>
              <span className="text-xl font-bold text-gray-800">
                PatternPal
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Create stunning patterns for your designs with our AI-powered pattern generator.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <SafeIcon icon={FiGithub} className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {['privacy', 'terms'].map((doc) => (
                <li key={doc}>
                  <button
                    onClick={() => setActiveDocument(doc)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {documents[doc].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveDocument('about')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="mailto:contact@patternpal.com" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PatternPal. Made with{' '}
            <SafeIcon icon={FiHeart} className="w-4 h-4 inline-block text-red-500" /> by creators for creators.
          </p>
        </div>
      </div>

      {/* Document Modal */}
      <AnimatePresence>
        {activeDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {documents[activeDocument].title}
                  </h2>
                  <button
                    onClick={() => setActiveDocument(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiX} className="w-6 h-6" />
                  </button>
                </div>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: documents[activeDocument].content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;