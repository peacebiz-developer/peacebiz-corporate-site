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
import { ROUTES } from './config/routes';

const Top = lazy(() => import('./pages/Top'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ITSolution = lazy(() => import('./pages/services/ITSolution'));
const EcoSolution = lazy(() => import('./pages/services/EcoSolution'));
const OfficeSolution = lazy(() => import('./pages/services/OfficeSolution'));
const CommercialAircon = lazy(() => import('./pages/services/CommercialAircon'));
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

        <main>
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path={ROUTES.home} element={routeWithTransition(<Top />, false)} />
                <Route path={ROUTES.about} element={routeWithTransition(<About />, false)} />
                <Route path={ROUTES.company} element={routeWithTransition(<About />, false)} />
                <Route path={ROUTES.services} element={routeWithTransition(<Services />, false)} />
                <Route path={ROUTES.servicesIt} element={routeWithTransition(<ITSolution />, false)} />
                <Route path={ROUTES.servicesEco} element={routeWithTransition(<EcoSolution />, false)} />
                <Route path={ROUTES.servicesOffice} element={routeWithTransition(<OfficeSolution />, false)} />
                <Route path={ROUTES.servicesEcoCommercialAircon} element={routeWithTransition(<CommercialAircon />, false)} />
                <Route path={ROUTES.works} element={routeWithTransition(<Works />)} />
                <Route path={ROUTES.worksDetail} element={routeWithTransition(<WorkDetail />)} />
                <Route path={ROUTES.work} element={routeWithTransition(<Works />)} />
                <Route path={ROUTES.workDetail} element={routeWithTransition(<WorkDetail />)} />
                <Route path={ROUTES.news} element={routeWithTransition(<News />)} />
                <Route path={ROUTES.newsDetail} element={routeWithTransition(<NewsDetail />)} />
                <Route path={ROUTES.contact} element={routeWithTransition(<Contact />, false)} />
                <Route path={ROUTES.recruit} element={routeWithTransition(<Recruit />, false)} />
                <Route path={ROUTES.privacy} element={routeWithTransition(<Privacy />)} />
                <Route path={ROUTES.sitePolicy} element={routeWithTransition(<SitePolicy />)} />
                <Route path={ROUTES.terms} element={routeWithTransition(<SitePolicy />)} />
                <Route path={ROUTES.sparklesDemo} element={routeWithTransition(<SparklesDemo />, false)} />
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
