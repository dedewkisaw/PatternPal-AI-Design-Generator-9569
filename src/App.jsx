import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import UserProfile from './components/UserProfile';
import TutorialOverlay from './components/TutorialOverlay';
import Footer from './components/Footer';

// Wrapper component to handle tutorial display logic
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTutorial, setShowTutorial] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Set current page based on location
    const path = location.pathname;
    if (path === '/') setCurrentPage('home');
    else if (path === '/editor') setCurrentPage('editor');
    else if (path === '/gallery') setCurrentPage('gallery');
    else if (path === '/profile') setCurrentPage('profile');
    
    // Check if we should show tutorial (only when directly navigating to editor)
    if (path === '/editor') {
      const hasSeenTutorial = localStorage.getItem('hasSeenPatternPalTutorial');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [location]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenPatternPalTutorial', 'true');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {showTutorial && (
        <TutorialOverlay isFirstVisit={true} onComplete={handleTutorialComplete} />
      )}
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div 
                key="home" 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <Landing />
              </motion.div>
            } 
          />
          
          <Route 
            path="/editor" 
            element={
              <motion.div 
                key="editor" 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <Editor />
              </motion.div>
            } 
          />
          
          <Route 
            path="/gallery" 
            element={
              <motion.div 
                key="gallery" 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <Gallery />
              </motion.div>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <motion.div 
                key="profile" 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={pageVariants} 
                transition={pageTransition}
              >
                <UserProfile />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;