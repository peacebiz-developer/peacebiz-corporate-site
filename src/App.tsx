import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import PrimeSign from './pages/services/PrimeSign';
import Eco from './pages/services/Eco';
import Office from './pages/services/Office';
import Works from './pages/Works';
import Contact from './pages/Contact';
import Recruit from './pages/Recruit';
import SparklesDemo from './pages/SparklesDemo';
import './App.css';

import { SmoothScroll } from './components/ui/SmoothScroll';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import PageTransition from './components/ui/PageTransition';
import ScrollToTop from './components/utils/ScrollToTop';

import { GridBackground } from './components/layout/GridBackground';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';

  return (
    <Router basename={publicUrl}>
      <ScrollToTop />
      <Preloader />
      <SmoothScroll />
      <NoiseOverlay />
      <CustomCursor />
      <div className="App min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white cursor-none relative">
        <GridBackground />
        {/* Global Faint Background Logo Watermark */}
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
          <img src={`${publicUrl}/logo.png`} alt="" className="w-[80vw] max-w-[800px] object-contain" />
        </div>
        <Header />

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<div className="pt-24"><PageTransition><About /></PageTransition></div>} />
              <Route path="/services" element={<div className="pt-24"><PageTransition><Services /></PageTransition></div>} />
              <Route path="/services/primesign" element={<div className="pt-24"><PageTransition><PrimeSign /></PageTransition></div>} />
              <Route path="/services/eco" element={<div className="pt-24"><PageTransition><Eco /></PageTransition></div>} />
              <Route path="/services/office" element={<div className="pt-24"><PageTransition><Office /></PageTransition></div>} />
              <Route path="/works" element={<div className="pt-24"><PageTransition><Works /></PageTransition></div>} />
              <Route path="/contact" element={<div className="pt-24"><PageTransition><Contact /></PageTransition></div>} />
              <Route path="/recruit" element={<div className="pt-24"><PageTransition><Recruit /></PageTransition></div>} />
              <Route path="/sparkles-demo" element={<PageTransition><SparklesDemo /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
