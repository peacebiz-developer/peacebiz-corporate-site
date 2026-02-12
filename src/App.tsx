import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

import { SmoothScroll } from './components/ui/SmoothScroll';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import PageTransition from './components/ui/PageTransition';
import ScrollToTop from './components/utils/ScrollToTop';

import { GridBackground } from './components/layout/GridBackground';

const Top = lazy(() => import('./pages/Top'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ITSolution = lazy(() => import('./pages/services/ITSolution'));
const EcoSolution = lazy(() => import('./pages/services/EcoSolution'));
const OfficeSolution = lazy(() => import('./pages/services/OfficeSolution'));
const Works = lazy(() => import('./pages/Works'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));
const Recruit = lazy(() => import('./pages/Recruit'));
const Privacy = lazy(() => import('./pages/Privacy'));
const SparklesDemo = lazy(() => import('./pages/SparklesDemo'));

const normalizeBasename = (publicUrl: string): string => {
  if (!publicUrl) return '';

  const path = publicUrl.startsWith('http')
    ? new URL(publicUrl).pathname
    : publicUrl;
  const normalized = path.replace(/\/+$/, '');

  return normalized === '/' ? '' : normalized;
};

const routeWithTransition = (node: React.ReactNode, withTopPadding = true) => (
  withTopPadding ? (
    <div className="pt-24">
      <PageTransition>{node}</PageTransition>
    </div>
  ) : (
    <PageTransition>{node}</PageTransition>
  )
);

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const routerBasename = normalizeBasename(publicUrl);

  return (
    <Router basename={routerBasename}>
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
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={routeWithTransition(<Top />, false)} />
                <Route path="/about" element={routeWithTransition(<About />)} />
                <Route path="/services" element={routeWithTransition(<Services />)} />
                <Route path="/services/it-solution" element={routeWithTransition(<ITSolution />)} />
                <Route path="/services/eco-solution" element={routeWithTransition(<EcoSolution />)} />
                <Route path="/services/office-solution" element={routeWithTransition(<OfficeSolution />)} />
                <Route path="/works" element={routeWithTransition(<Works />)} />
                <Route path="/news" element={routeWithTransition(<News />)} />
                <Route path="/contact" element={routeWithTransition(<Contact />)} />
                <Route path="/recruit" element={routeWithTransition(<Recruit />, false)} />
                <Route path="/privacy" element={routeWithTransition(<Privacy />)} />
                <Route path="/sparkles-demo" element={routeWithTransition(<SparklesDemo />, false)} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
