import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Works from './pages/Works';
import Contact from './pages/Contact';
import Recruit from './pages/Recruit';
import SparklesDemo from './pages/SparklesDemo';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        <Header />
        
        <main className="pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/works" element={<Works />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recruit" element={<Recruit />} />
              <Route path="/sparkles-demo" element={<SparklesDemo />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
