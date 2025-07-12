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
        <p>We collect information you provide directly to us when using PatternPal, including registration information (name, email address), payment details, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our services, including IP address, browser type, operating system, device information, and usage details.</p>
        
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, respond to inquiries, and for other purposes you've consented to. We may use the information to personalize your experience, develop new features, monitor and analyze trends, and prevent fraud or unauthorized activities.</p>
        
        <h3>3. Sharing of Information</h3>
        <p>We may share your information with third-party vendors who need access to information to perform services on our behalf. We may also share information to comply with legal obligations, protect our rights, or in connection with a business transfer. We do not sell your personal information to third parties.</p>
        
        <h3>4. Your Rights and Choices</h3>
        <p>You may update, correct, or delete your account information at any time by logging into your account settings. You can also opt out of promotional communications by following the instructions in those messages. You may have additional rights depending on your jurisdiction, including the right to access, rectify, and erase your data.</p>
        
        <h3>5. Data Security</h3>
        <p>We implement reasonable measures to help protect the information we collect from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of your information.</p>
        
        <h3>6. International Transfers</h3>
        <p>Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws different from your country.</p>
        
        <h3>7. Changes to This Policy</h3>
        <p>We may update this Privacy Policy periodically to reflect changes in our practices. We will notify you of any material changes by posting the new policy on this page and updating the effective date.</p>
        
        <h3>8. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@patternpal.com.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <h2>Terms of Service</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using PatternPal, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our service. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of those changes.</p>
        
        <h3>2. User Responsibilities</h3>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate and complete information when creating an account and keep your information updated.</p>
        
        <h3>3. Subscription and Payments</h3>
        <p>Some features of PatternPal require a paid subscription. By subscribing to a paid plan, you agree to pay the applicable fees as they become due. All fees are non-refundable unless otherwise stated. We may change subscription fees by giving you advance notice. Failure to maintain an active subscription may result in the loss of access to certain features.</p>
        
        <h3>4. Intellectual Property Rights</h3>
        <p>PatternPal and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, create derivative works, publicly display, republish, or exploit any content without our prior written consent.</p>
        
        <h3>5. User Content</h3>
        <p>You retain ownership of any content you create using our service. By uploading content to PatternPal, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content in connection with providing and promoting our services.</p>
        
        <h3>6. Prohibited Conduct</h3>
        <p>You agree not to use PatternPal for any unlawful purpose or in a way that could damage, disable, or impair the service. Prohibited activities include but are not limited to: violating any laws, infringing on intellectual property rights, transmitting malware, spamming, harvesting data, or interfering with the proper functioning of the service.</p>
        
        <h3>7. Termination</h3>
        <p>We may terminate or suspend your account and access to PatternPal immediately, without prior notice, for conduct that we determine violates these Terms, or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.</p>
        
        <h3>8. Limitation of Liability</h3>
        <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, including but not limited to loss of profits, data, or business opportunities.</p>
        
        <h3>9. Governing Law</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
        
        <h3>10. Contact Information</h3>
        <p>If you have any questions about these Terms, please contact us at terms@patternpal.com.</p>
      `
    },
    about: {
      title: "About PatternPal",
      content: `
        <h2>About PatternPal</h2>
        <p>PatternPal is a cutting-edge pattern generation tool designed for creators, designers, and artists who need beautiful, customizable patterns for their projects.</p>
        
        <h3>Our Mission</h3>
        <p>To empower designers and creators with powerful, easy-to-use pattern generation tools that inspire creativity and elevate their work. We believe that beautiful patterns should be accessible to everyone, regardless of their design experience or technical skills.</p>
        
        <h3>Our Story</h3>
        <p>PatternPal was born out of frustration with existing pattern generation tools that were either too complicated for beginners or too limited for professionals. Our founding team of designers and developers set out to create a tool that would bridge this gap, providing intuitive controls with professional-grade output.</p>
        
        <p>Launched in 2023, PatternPal has quickly become a favorite among designers, web developers, textile artists, and creative professionals across various industries. Our community-driven approach means we're constantly evolving based on user feedback and needs.</p>
        
        <h3>Our Technology</h3>
        <p>PatternPal uses advanced algorithms and machine learning techniques to generate unique, high-quality patterns. Our platform is built on modern web technologies, ensuring fast performance and beautiful results across all devices.</p>
        
        <p>Key features include:</p>
        <ul>
          <li>Multiple pattern styles (geometric, organic, abstract)</li>
          <li>Advanced customization options</li>
          <li>High-resolution exports in various formats</li>
          <li>Collaborative tools for teams</li>
          <li>Pattern library for inspiration and quick access</li>
        </ul>
        
        <h3>Our Team</h3>
        <p>PatternPal is created by a diverse team of designers, developers, and pattern enthusiasts from around the world. We're united by our passion for beautiful design and our commitment to creating tools that make creativity accessible to everyone.</p>
        
        <h3>Contact Us</h3>
        <p>We'd love to hear from you! Reach out to us at hello@patternpal.com for general inquiries, feedback, or partnership opportunities.</p>
        
        <p>Follow us on social media for updates, pattern inspiration, and design tips:</p>
        <ul>
          <li>Twitter: @PatternPalApp</li>
          <li>Instagram: @PatternPalDesign</li>
          <li>LinkedIn: PatternPal</li>
        </ul>
      `
    },
    cookie: {
      title: "Cookie Policy",
      content: `
        <h2>Cookie Policy</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>What Are Cookies</h3>
        <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies allow us to recognize your device and store information about your preferences or past actions.</p>
        
        <h3>How We Use Cookies</h3>
        <p>PatternPal uses cookies for several purposes, including:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.</li>
          <li><strong>Preference Cookies:</strong> These cookies enable us to remember information that changes the way the website behaves or looks, such as your preferred language or the region you are in.</li>
          <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website structure and content.</li>
          <li><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.</li>
        </ul>
        
        <h3>Types of Cookies We Use</h3>
        <p>We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device until they expire or you delete them.</p>
        
        <h3>Third-Party Cookies</h3>
        <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may track your browsing habits across different websites and online services.</p>
        
        <h3>Controlling Cookies</h3>
        <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site, and some services and functionalities may not work as expected.</p>
        
        <h3>Changes to This Policy</h3>
        <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the effective date.</p>
        
        <h3>Contact Us</h3>
        <p>If you have any questions about our Cookie Policy, please contact us at privacy@patternpal.com.</p>
      `
    },
    gdpr: {
      title: "GDPR Compliance",
      content: `
        <h2>GDPR Compliance</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>Our Commitment to GDPR</h3>
        <p>At PatternPal, we are committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have always had a robust and effective data protection program in place which complies with existing law and abides by the data protection principles.</p>
        
        <h3>What is GDPR?</h3>
        <p>The General Data Protection Regulation (GDPR) is a European Union regulation that establishes a new framework for handling and protecting the personal data of EU residents. It came into effect on May 25, 2018, replacing the 1995 EU Data Protection Directive.</p>
        
        <h3>How We Comply with GDPR</h3>
        <p>PatternPal has undertaken the following measures to ensure compliance with GDPR:</p>
        
        <ul>
          <li><strong>Data Protection Officer:</strong> We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and implementation to ensure compliance with GDPR requirements.</li>
          <li><strong>Data Protection Impact Assessments:</strong> We conduct Data Protection Impact Assessments (DPIAs) to identify and minimize risks to data subjects.</li>
          <li><strong>Data Processing Records:</strong> We maintain detailed records of our data processing activities, including the purposes of processing, categories of data subjects and personal data, recipients of personal data, and more.</li>
          <li><strong>Security Measures:</strong> We have implemented appropriate technical and organizational measures to ensure a level of security appropriate to the risk.</li>
          <li><strong>Data Subject Rights:</strong> We have procedures in place to handle data subject rights requests, including the right to access, rectification, erasure, restriction of processing, data portability, and objection.</li>
          <li><strong>Breach Notification:</strong> We have implemented procedures to detect, report, and investigate personal data breaches in accordance with GDPR requirements.</li>
          <li><strong>Training:</strong> Our employees receive training on data protection and GDPR compliance.</li>
        </ul>
        
        <h3>Your Rights Under GDPR</h3>
        <p>Under GDPR, you have the following rights:</p>
        
        <ul>
          <li><strong>Right to Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
          <li><strong>Right to Rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal information we hold about you.</li>
          <li><strong>Right to Erasure (Right to be Forgotten):</strong> You have the right to request that we delete your personal information under certain circumstances.</li>
          <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information under certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> You have the right to request that we provide you with your personal information in a structured, commonly used, and machine-readable format.</li>
          <li><strong>Right to Object:</strong> You have the right to object to the processing of your personal information under certain circumstances.</li>
          <li><strong>Rights Related to Automated Decision Making and Profiling:</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.</li>
        </ul>
        
        <h3>Contact Us</h3>
        <p>If you have any questions about our GDPR compliance or wish to exercise any of your rights under GDPR, please contact our Data Protection Officer at dpo@patternpal.com.</p>
      `
    },
    careers: {
      title: "Careers at PatternPal",
      content: `
        <h2>Careers at PatternPal</h2>
        <p>Join our team and help shape the future of pattern design!</p>
        
        <h3>Why Work With Us</h3>
        <p>PatternPal is revolutionizing the way designers create and share patterns across various industries. As a growing company, we offer a dynamic environment where your contributions have a direct impact on our product and users.</p>
        
        <p>We believe in:</p>
        <ul>
          <li><strong>Innovation:</strong> We're constantly pushing the boundaries of what's possible in pattern generation and design tools.</li>
          <li><strong>Collaboration:</strong> We work closely across teams to create the best possible experience for our users.</li>
          <li><strong>Growth:</strong> We invest in our team members' professional development and career advancement.</li>
          <li><strong>Work-Life Balance:</strong> We value results over hours and believe in flexible work arrangements.</li>
          <li><strong>Diversity & Inclusion:</strong> We're committed to building a team with diverse backgrounds, perspectives, and skills.</li>
        </ul>
        
        <h3>Benefits & Perks</h3>
        <ul>
          <li>Competitive salary and equity packages</li>
          <li>Flexible work arrangements (remote, hybrid, or in-office)</li>
          <li>Comprehensive health, dental, and vision insurance</li>
          <li>Generous paid time off policy</li>
          <li>Professional development budget</li>
          <li>Regular team events and retreats</li>
          <li>Modern equipment and tools</li>
        </ul>
        
        <h3>Open Positions</h3>
        <p>We're always looking for talented individuals to join our team. While we don't have specific openings listed at the moment, we welcome applications from exceptional candidates in the following areas:</p>
        
        <ul>
          <li>Software Engineering (Frontend, Backend, Full Stack)</li>
          <li>Design (UI/UX, Product Design)</li>
          <li>Product Management</li>
          <li>Marketing & Growth</li>
          <li>Customer Success</li>
        </ul>
        
        <h3>How to Apply</h3>
        <p>If you're interested in joining the PatternPal team, please send your resume and a brief introduction to careers@patternpal.com. We'd love to hear about your relevant experience, why you're interested in PatternPal, and how you could contribute to our mission.</p>
        
        <p>For specific inquiries about our hiring process or company culture, feel free to reach out to our talent team at talent@patternpal.com.</p>
      `
    },
    press: {
      title: "Press Kit",
      content: `
        <h2>Press Kit</h2>
        <p>Thank you for your interest in PatternPal. This press kit provides resources and information for media professionals and content creators.</p>
        
        <h3>About PatternPal</h3>
        <p>PatternPal is an innovative pattern generation tool that helps designers, artists, and creatives quickly create beautiful, customizable patterns for their projects. Our mission is to make sophisticated pattern design accessible to everyone, from professional designers to hobbyists.</p>
        
        <p><strong>Founded:</strong> 2023</p>
        <p><strong>Headquarters:</strong> San Francisco, CA</p>
        <p><strong>Users:</strong> Over 50,000 designers and creators worldwide</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>AI-powered pattern generation</li>
          <li>Multiple pattern styles (geometric, organic, abstract)</li>
          <li>Intuitive customization options</li>
          <li>High-resolution exports in various formats</li>
          <li>Collaborative tools for teams</li>
          <li>Extensive pattern library</li>
        </ul>
        
        <h3>Brand Assets</h3>
        <p>Download our logo, screenshots, and other visual assets for use in publications:</p>
        <ul>
          <li>Logo Pack (PNG, SVG, EPS)</li>
          <li>Product Screenshots</li>
          <li>Brand Guidelines</li>
          <li>Promotional Images</li>
        </ul>
        
        <h3>Company Leadership</h3>
        <p><strong>Jane Smith</strong> - CEO & Co-Founder</p>
        <p>Jane is a former design lead at [Tech Company] with over 15 years of experience in design tools and systems.</p>
        
        <p><strong>Michael Chen</strong> - CTO & Co-Founder</p>
        <p>Michael previously led engineering teams at [Tech Company] and has extensive experience in building creative tools.</p>
        
        <h3>Recent News</h3>
        <ul>
          <li>PatternPal Raises $5M in Seed Funding (October 2023)</li>
          <li>PatternPal Launches Collaboration Features (August 2023)</li>
          <li>PatternPal Named "Top Design Tool of 2023" by Design Magazine (July 2023)</li>
        </ul>
        
        <h3>Media Contact</h3>
        <p>For press inquiries, interview requests, or additional information, please contact:</p>
        <p>Sarah Johnson<br>
        Head of Communications<br>
        press@patternpal.com<br>
        (555) 123-4567</p>
        
        <h3>Social Media</h3>
        <ul>
          <li>Twitter: @PatternPalApp</li>
          <li>Instagram: @PatternPalDesign</li>
          <li>LinkedIn: PatternPal</li>
        </ul>
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
              Perfect for web designers, graphic artists, textile designers, and anyone who needs 
              beautiful patterns for their creative projects.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiGithub} className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
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
              <li>
                <button
                  onClick={() => setActiveDocument('cookie')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveDocument('gdpr')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  GDPR Compliance
                </button>
              </li>
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
              <li>
                <button 
                  onClick={() => setActiveDocument('careers')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveDocument('press')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Press Kit
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PatternPal. All rights reserved. Made with{' '}
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
                  dangerouslySetInnerHTML={{
                    __html: documents[activeDocument].content
                  }}
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