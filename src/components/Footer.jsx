import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail, FiX } = FiIcons;

const Footer = () => {
  const [activeDocument, setActiveDocument] = useState(null);

  const documents = {
    privacy: {
      title: 'Privacy Policy',
      content: 'Our privacy policy ensures your data is protected and used responsibly.'
    },
    terms: {
      title: 'Terms of Service',
      content: 'Terms and conditions for using PatternPal services.'
    },
    cookie: {
      title: 'Cookie Policy',
      content: 'Information about how we use cookies to enhance your experience.'
    },
    gdpr: {
      title: 'GDPR Compliance',
      content: 'We are fully compliant with GDPR regulations.'
    },
    about: {
      title: 'About Us',
      content: 'PatternPal is dedicated to empowering designers with powerful pattern generation tools.'
    },
    careers: {
      title: 'Careers',
      content: 'Join our team and help shape the future of design tools.'
    },
    press: {
      title: 'Press',
      content: 'Press releases and media information about PatternPal.'
    }
  };

  return (
    <footer className="bg-neugray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-neu-gradient rounded-xl shadow-neu-flat-sm flex items-center justify-center text-gray-800 font-bold text-sm"
              >
                PP
              </motion.div>
              <span className="text-xl font-bold text-gray-800">
                PatternPal
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Create stunning patterns for your designs with our AI-powered pattern generator.
              Perfect for web designers, graphic artists, textile designers, and anyone who
              needs beautiful patterns for their creative projects.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FiGithub, href: "https://github.com" },
                { icon: FiTwitter, href: "https://twitter.com" },
                { icon: FiLinkedin, href: "https://linkedin.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-neu-gradient rounded-xl shadow-neu-flat-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {['privacy', 'terms', 'cookie', 'gdpr'].map((doc) => (
                <li key={doc}>
                  <motion.button
                    onClick={() => setActiveDocument(doc)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    {documents[doc].title}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {['about', 'careers', 'press'].map((doc) => (
                <li key={doc}>
                  <motion.button
                    onClick={() => setActiveDocument(doc)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    {documents[doc].title}
                  </motion.button>
                </li>
              ))}
              <li>
                <motion.a
                  href="mailto:contact@patternpal.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block px-4 py-2 rounded-lg bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600 hover:text-gray-900 transition-all duration-200"
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PatternPal. All rights reserved. Made with{' '}
            <SafeIcon icon={FiHeart} className="w-4 h-4 inline-block text-red-500" /> by creators
            for creators.
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neu-gradient rounded-neu shadow-neu-card p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {documents[activeDocument].title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveDocument(null)}
                  className="p-2 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {documents[activeDocument].content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;