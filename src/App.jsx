import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PatternGenerator from './components/PatternGenerator';
import Gallery from './components/Gallery';
import Collaborate from './components/Collaborate';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                key="home"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Hero />
                <PatternGenerator />
              </motion.div>
            } />
            
            <Route path="/gallery" element={
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
            } />
            
            <Route path="/collaborate" element={
              <motion.div
                key="collaborate"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Collaborate />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;