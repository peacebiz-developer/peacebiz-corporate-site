import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
} from '../ui/resizable-navbar';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Top', link: '/' },
    { name: 'Service', link: '/services' },
    { name: 'Company', link: '/about' },
    { name: 'Works', link: '/works' },
    { name: 'News', link: '/news' },
    { name: 'Recruit', link: '/recruit' },
    { name: 'Contact', link: '/contact' },
  ];

  const menuItems = [
    { label: 'Top', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Works', path: '/works' },
    { label: 'News', path: '/news' },
    { label: 'Recruit', path: '/recruit' },
    { label: 'Contact', path: '/contact' },
  ];

  const serviceItems = [
    { label: 'IT Solution', path: '/services/it-solution' },
    { label: 'Eco Solution', path: '/services/eco-solution' },
    { label: 'Office Solution', path: '/services/office-solution' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex flex-shrink-0 items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 group text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              aria-label="Open Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              aria-label="Open Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white text-black flex overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Grid overlay lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
              <div className="absolute left-1/4 top-0 w-px h-full bg-black" />
              <div className="absolute left-2/4 top-0 w-px h-full bg-black" />
              <div className="absolute left-3/4 top-0 w-px h-full bg-black" />
            </div>

            {/* Top bar in overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="font-black text-xl md:text-2xl tracking-tighter text-black hover:opacity-70 transition-opacity"
              >
                PEACE BIZ
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Menu Content - Mobile: scrollable column / Desktop: center + right */}

            {/* Mobile Layout */}
            <div className="lg:hidden w-full h-full pt-20 overflow-y-auto">
              <div className="px-6 py-8">
                <nav className="flex flex-col gap-0">
                  {menuItems.map((item, index) => (
                    <div key={item.path} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-baseline gap-4 py-3 border-b border-black/10 hover:border-black/30 transition-all group"
                        >
                          <span className="text-xs font-mono text-black/25 tracking-widest group-hover:text-brand-blue transition-colors w-6">
                            0{index + 1}
                          </span>
                          <span className="text-3xl font-black tracking-tighter text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:via-brand-green group-hover:to-brand-orange transition-all">
                            {item.label.toUpperCase()}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </nav>

                {/* Service Sub-links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-10 pt-8 border-t border-black/10"
                >
                  <h4 className="text-xs font-bold tracking-[0.3em] text-black/35 uppercase mb-6">Service</h4>
                  <div className="space-y-3">
                    {serviceItems.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-base font-bold text-black/50 hover:text-brand-blue transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-10 pb-8"
                >
                  <div className="space-y-3 text-sm text-black/30 font-medium">
                    <p>Peace Biz Inc.</p>
                    <p>Tokyo - Sendai - Fukuoka</p>
                    <p>EST. 2008</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block relative w-full h-full pt-20">
              {/* Center: Main Navigation */}
              <div className="absolute inset-0 pt-20 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto px-16">
                  <nav className="flex flex-col gap-1">
                    {menuItems.map((item, index) => (
                      <div key={item.path} className="overflow-hidden">
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-100%" }}
                          transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-baseline gap-6 py-4 border-b border-black/10 hover:border-black/30 transition-all group"
                          >
                            <span className="text-xs font-mono text-black/25 tracking-widest group-hover:text-brand-blue transition-colors w-8">
                              0{index + 1}
                            </span>
                            <span className="text-6xl lg:text-7xl font-black tracking-tighter text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:via-brand-green group-hover:to-brand-orange transition-all">
                              {item.label.toUpperCase()}
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Right: Sub-links & Info */}
              <div className="absolute right-0 top-20 bottom-0 w-auto flex flex-col justify-between px-12 lg:px-16 py-20 border-l border-black/10">
                {/* Service Sub-links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h4 className="text-xs font-bold tracking-[0.3em] text-black/35 uppercase mb-8">Service</h4>
                  <div className="space-y-4">
                    {serviceItems.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg lg:text-xl font-bold text-black/50 hover:text-brand-blue transition-colors hover:translate-x-2 transform duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="space-y-4 text-sm text-black/30 font-medium">
                    <p>Peace Biz Inc.</p>
                    <p>Tokyo - Sendai - Fukuoka</p>
                    <p>EST. 2008</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
