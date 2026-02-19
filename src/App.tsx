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
import RouteMeta from './components/utils/RouteMeta';

import { GridBackground } from './components/layout/GridBackground';
import { TracingBeam } from './components/ui/tracing-beam';

const Top = lazy(() => import('./pages/Top'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ITSolution = lazy(() => import('./pages/services/ITSolution'));
const EcoSolution = lazy(() => import('./pages/services/EcoSolution'));
const OfficeSolution = lazy(() => import('./pages/services/OfficeSolution'));
const Works = lazy(() => import('./pages/Works'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Recruit = lazy(() => import('./pages/Recruit'));
const Privacy = lazy(() => import('./pages/Privacy'));
const SitePolicy = lazy(() => import('./pages/SitePolicy'));
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
      <RouteMeta />
      <ScrollToTop />
      <Preloader />
      <SmoothScroll />
      <NoiseOverlay />
      <CustomCursor />
      <div className="App min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white cursor-none relative">
        <GridBackground />
        <Header />

        <TracingBeam className="px-0">
          <main>
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={routeWithTransition(<Top />, false)} />
                  <Route path="/about" element={routeWithTransition(<About />, false)} />
                  <Route path="/company" element={routeWithTransition(<About />, false)} />
                  <Route path="/services" element={routeWithTransition(<Services />, false)} />
                  <Route path="/services/it-solution" element={routeWithTransition(<ITSolution />, false)} />
                  <Route path="/services/eco-solution" element={routeWithTransition(<EcoSolution />, false)} />
                  <Route path="/services/office-solution" element={routeWithTransition(<OfficeSolution />, false)} />
                  <Route path="/works" element={routeWithTransition(<Works />)} />
                  <Route path="/works/:slug" element={routeWithTransition(<WorkDetail />)} />
                  <Route path="/work" element={routeWithTransition(<Works />)} />
                  <Route path="/work/:slug" element={routeWithTransition(<WorkDetail />)} />
                  <Route path="/news" element={routeWithTransition(<News />)} />
                  <Route path="/news/:slug" element={routeWithTransition(<NewsDetail />)} />
                  <Route path="/contact" element={routeWithTransition(<Contact />, false)} />
                  <Route path="/recruit" element={routeWithTransition(<Recruit />, false)} />
                  <Route path="/privacy" element={routeWithTransition(<Privacy />)} />
                  <Route path="/sitepolicy" element={routeWithTransition(<SitePolicy />)} />
                  <Route path="/terms" element={routeWithTransition(<SitePolicy />)} />
                  <Route path="/sparkles-demo" element={routeWithTransition(<SparklesDemo />, false)} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </TracingBeam>
      </div>
    </Router>
  );
};

export default App;
