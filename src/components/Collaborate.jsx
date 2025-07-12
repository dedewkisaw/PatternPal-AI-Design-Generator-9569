import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiEdit2, FiGitBranch, FiMessageSquare } = FiIcons;

const Collaborate = () => {
  const features = [
    {
      icon: FiEdit2,
      title: "Real-Time Co-Creation",
      description: "Work simultaneously with team members on the same pattern. See changes instantly as they happen.",
      benefits: ["Instant collaboration", "Live preview updates", "Multiple editors"]
    },
    {
      icon: FiGitBranch,
      title: "Version Control",
      description: "Keep track of all pattern versions and variations. Easily switch between different iterations.",
      benefits: ["Version history", "Branch variations", "Merge patterns"]
    },
    {
      icon: FiMessageSquare,
      title: "Feedback & Reviews",
      description: "Get instant feedback from team members and clients directly on your patterns.",
      benefits: ["In-context comments", "Review system", "Approval workflow"]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Collaborative Pattern Design
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your pattern creation workflow with real-time collaboration.
              Perfect for design teams, agencies, and creative partnerships.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-neu-flat"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
              </div>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Start Collaborating Today
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join teams already using PatternPal to streamline their pattern design workflow
            and create stunning designs together.
          </p>
          <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Try Collaboration Features
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Collaborate;