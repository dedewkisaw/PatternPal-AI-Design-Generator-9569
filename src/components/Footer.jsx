import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail } = FiIcons;

const Footer = () => {
  const links = [
    { name: 'Product', items: ['Features', 'Templates', 'Pricing', 'API'] },
    { name: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
    { name: 'Resources', items: ['Documentation', 'Help Center', 'Community', 'Tutorials'] },
    { name: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] }
  ];

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiMail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              >
                PP
              </motion.div>
              <span className="text-xl font-bold text-white">PatternPal</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Create stunning, unique patterns with our AI-powered generator. 
              Perfect for designers, marketers, and creative professionals.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {links.map((section) => (
            <div key={section.name}>
              <h3 className="text-white font-semibold mb-4">{section.name}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 2 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PatternPal. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <SafeIcon icon={FiHeart} className="w-4 h-4 mx-1 text-red-500" /> by the PatternPal team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;