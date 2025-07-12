import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGithub, FiTwitter, FiLinkedin, FiMail, FiX, FiChevronRight, FiFileText, FiShield, FiInfo } = FiIcons;

const Footer = () => {
  const [activeDocument, setActiveDocument] = useState(null);

  const documents = {
    privacy: {
      title: 'Privacy Policy',
      icon: FiShield,
      content: `
        <h2 class="text-2xl font-bold mb-6">Privacy Policy</h2>
        
        <div class="space-y-6">
          <section>
            <h3 class="text-lg font-semibold mb-3">1. Information We Collect</h3>
            <p>We collect information you provide directly to us when using PatternPal:</p>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Account information (email, username)</li>
              <li>Pattern designs and preferences</li>
              <li>Usage data and interactions</li>
            </ul>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
            <p>We use the collected information to:</p>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Send important updates and notifications</li>
            </ul>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">3. Data Security</h3>
            <p>We implement industry-standard security measures to protect your data. Your patterns and personal information are encrypted and securely stored.</p>
          </section>
        </div>
      `
    },
    terms: {
      title: 'Terms of Service',
      icon: FiFileText,
      content: `
        <h2 class="text-2xl font-bold mb-6">Terms of Service</h2>
        
        <div class="space-y-6">
          <section>
            <h3 class="text-lg font-semibold mb-3">1. User Agreement</h3>
            <p>By using PatternPal, you agree to these terms and conditions. We reserve the right to modify these terms at any time.</p>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">2. Intellectual Property</h3>
            <p>You retain rights to your created patterns. However, we maintain rights to:</p>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>The PatternPal platform and technology</li>
              <li>Our brand assets and interface designs</li>
              <li>Generated pattern algorithms</li>
            </ul>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">3. Usage Guidelines</h3>
            <p>Users must:</p>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Respect other users' intellectual property</li>
              <li>Not misuse or attempt to exploit our services</li>
              <li>Maintain appropriate conduct in community interactions</li>
            </ul>
          </section>
        </div>
      `
    },
    cookie: {
      title: 'Cookie Policy',
      icon: FiInfo,
      content: `
        <h2 class="text-2xl font-bold mb-6">Cookie Policy</h2>
        
        <div class="space-y-6">
          <section>
            <h3 class="text-lg font-semibold mb-3">1. What Are Cookies</h3>
            <p>Cookies are small text files stored on your device that help us provide and improve our services.</p>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">2. How We Use Cookies</h3>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Essential cookies for site functionality</li>
              <li>Analytics cookies to improve our service</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">3. Managing Cookies</h3>
            <p>You can control cookie preferences through your browser settings. Note that disabling certain cookies may limit functionality.</p>
          </section>
        </div>
      `
    },
    about: {
      title: 'About Us',
      icon: FiInfo,
      content: `
        <h2 class="text-2xl font-bold mb-6">About PatternPal</h2>
        
        <div class="space-y-6">
          <section>
            <h3 class="text-lg font-semibold mb-3">Our Mission</h3>
            <p>PatternPal empowers creators with innovative tools to design stunning patterns effortlessly. We believe in making professional design accessible to everyone.</p>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">Our Story</h3>
            <p>Founded by designers for designers, PatternPal emerged from the need for powerful yet intuitive pattern creation tools. We've grown into a platform trusted by thousands of creative professionals worldwide.</p>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">Our Values</h3>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Innovation in Design</li>
              <li>User-First Approach</li>
              <li>Community Empowerment</li>
              <li>Creative Excellence</li>
            </ul>
          </section>
        </div>
      `
    },
    careers: {
      title: 'Careers',
      icon: FiInfo,
      content: `
        <h2 class="text-2xl font-bold mb-6">Join Our Team</h2>
        
        <div class="space-y-6">
          <section>
            <h3 class="text-lg font-semibold mb-3">Why PatternPal?</h3>
            <p>Join a team passionate about revolutionizing digital design. We offer:</p>
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Remote-first culture</li>
              <li>Competitive compensation</li>
              <li>Professional growth opportunities</li>
              <li>Creative work environment</li>
            </ul>
          </section>

          <section>
            <h3 class="text-lg font-semibold mb-3">Open Positions</h3>
            <div class="space-y-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium">Senior Frontend Developer</h4>
                <p class="text-sm text-gray-600">Shape the future of our design tools</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium">UX Designer</h4>
                <p class="text-sm text-gray-600">Create intuitive design experiences</p>
              </div>
            </div>
          </section>
        </div>
      `
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
              <span className="text-xl font-bold text-gray-800">PatternPal</span>
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
              {['privacy', 'terms', 'cookie'].map((doc) => (
                <li key={doc}>
                  <motion.button
                    onClick={() => setActiveDocument(doc)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <SafeIcon icon={documents[doc].icon} className="w-4 h-4 mr-2" />
                      <span>{documents[doc].title}</span>
                    </div>
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
              {['about', 'careers'].map((doc) => (
                <li key={doc}>
                  <motion.button
                    onClick={() => setActiveDocument(doc)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <SafeIcon icon={documents[doc].icon} className="w-4 h-4 mr-2" />
                      <span>{documents[doc].title}</span>
                    </div>
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
                  <div className="flex items-center">
                    <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
                    <span>Contact</span>
                  </div>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PatternPal. All rights reserved. Made with{' '}
            <SafeIcon icon={FiHeart} className="w-4 h-4 inline-block text-red-500" /> by
            creators for creators.
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
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <SafeIcon
                      icon={documents[activeDocument].icon}
                      className="w-5 h-5 text-primary-600"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {documents[activeDocument].title}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveDocument(null)}
                  className="p-2 rounded-full bg-neu-gradient shadow-neu-flat-sm hover:shadow-neu-button"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </motion.button>
              </div>
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: documents[activeDocument].content }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;