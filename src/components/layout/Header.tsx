import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
} from '../ui/resizable-navbar';

type NavPreviewItem = {
  title: string;
  description: string;
  to: string;
  image?: string;
  external?: boolean;
};

type NavPreviewGroup = {
  label: string;
  items: NavPreviewItem[];
};

type NavConfig = {
  key: string;
  name: string;
  link: string;
  groups: NavPreviewGroup[];
};

const PreviewItem: React.FC<{
  item: NavPreviewItem;
  onSelect: () => void;
  compact?: boolean;
}> = ({ item, onSelect, compact = false }) => {
  const frameClass = compact
    ? 'rounded-lg border border-white/90 bg-white/92 hover:bg-white backdrop-blur-xl transition-colors p-2.5'
    : 'rounded-xl border border-white/90 bg-white/94 hover:bg-white backdrop-blur-xl transition-colors p-3';
  const imageClass = compact ? 'h-12 w-20' : 'h-16 w-24';
  const titleClass = compact ? 'text-sm' : 'text-sm md:text-base';

  const content = (
    <div className={frameClass}>
      {item.image ? (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className={`${imageClass} shrink-0 rounded-md object-cover border border-black/5`}
            loading="lazy"
          />
          <div className="min-w-0">
            <p className={`font-bold text-black ${titleClass}`}>{item.title}</p>
            <p className="text-xs text-black/70 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className={`font-bold text-black ${titleClass}`}>{item.title}</p>
            <p className="text-xs text-black/70 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-black/40 shrink-0" />
        </div>
      )}
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSelect}
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.to} onClick={onSelect} className="block">
      {content}
    </Link>
  );
};

const Header: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDesktopKey, setActiveDesktopKey] = useState<string | null>(null);
  const [hoveredDesktopKey, setHoveredDesktopKey] = useState<string | null>(null);
  const [activeMobileKey, setActiveMobileKey] = useState<string | null>(null);
  const desktopCloseTimerRef = useRef<number | null>(null);

  const navConfigs = useMemo<NavConfig[]>(
    () => [
      {
        key: 'top',
        name: 'Top',
        link: '/',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'Hero', description: 'ファーストビューへ', to: '/#top-hero' },
              { title: 'Mission', description: 'ミッションセクションへ', to: '/#top-mission' },
              { title: "Owner's Voice", description: '導入の声セクションへ', to: '/#top-voice' },
              { title: 'Core Business', description: '事業領域へ', to: '/#top-core-business' },
              { title: 'Latest News', description: '最新ニュースへ', to: '/#top-news' },
            ],
          },
        ],
      },
      {
        key: 'about',
        name: 'About',
        link: '/about',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'Overview', description: '会社概要トップへ', to: '/about#about-hero' },
              { title: 'Philosophy', description: '理念セクションへ', to: '/about#about-philosophy' },
              { title: 'Company', description: '会社情報へ', to: '/about#about-company' },
              { title: 'History', description: '沿革タイムラインへ', to: '/about#about-history' },
            ],
          },
        ],
      },
      {
        key: 'service',
        name: 'Service',
        link: '/services',
        groups: [
          {
            label: 'CORE BUSINESS',
            items: [
              {
                title: 'IT Solution',
                description: 'Prime Sign / LEDサイネージ / クリエイティブ',
                to: '/services/it-solution',
                image: `${publicUrl}/it-solution.webp`,
              },
              {
                title: 'Eco Solution',
                description: '業務用空調 / 太陽光発電 / 新電力',
                to: '/services/eco-solution',
                image: `${publicUrl}/eco-solution.webp`,
              },
              {
                title: 'Office Solution',
                description: 'OA機器 / 通信 / ネットワーク',
                to: '/services/office-solution',
                image: `${publicUrl}/office-solution.webp`,
              },
            ],
          },
          {
            label: 'FEATURED',
            items: [
              {
                title: 'Prime Sign',
                description: 'デジタルサイネージの注力サービス',
                to: 'https://prime-sign.jp',
                image: `${publicUrl}/primesign.webp`,
                external: true,
              },
              {
                title: '業務用エアコン',
                description: '省エネ空調ソリューション',
                to: '/#top-featured',
                image: `${publicUrl}/air-conditioner.webp`,
              },
            ],
          },
        ],
      },
      {
        key: 'works',
        name: 'Works',
        link: '/works',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'Works Top', description: '事例ページトップへ', to: '/works#works-hero' },
            ],
          },
        ],
      },
      {
        key: 'news',
        name: 'News',
        link: '/news',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'News Top', description: 'ニュースページトップへ', to: '/news#news-hero' },
            ],
          },
        ],
      },
      {
        key: 'recruit',
        name: 'Recruit',
        link: '/recruit',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'Message', description: 'メッセージセクションへ', to: '/recruit#recruit-message' },
              { title: 'Benefits', description: '制度・福利厚生へ', to: '/recruit#recruit-benefits' },
              { title: 'Requirements', description: '募集要項へ', to: '/recruit#recruit-requirements' },
              { title: 'Entry', description: '応募導線へ', to: '/recruit#recruit-entry' },
            ],
          },
        ],
      },
      {
        key: 'contact',
        name: 'Contact',
        link: '/contact',
        groups: [
          {
            label: 'SECTIONS',
            items: [
              { title: 'Contact Top', description: 'ページトップへ', to: '/contact#contact-hero' },
            ],
          },
        ],
      },
    ],
    [publicUrl]
  );

  const serviceItems = [
    { label: 'IT Solution', path: '/services/it-solution' },
    { label: 'Eco Solution', path: '/services/eco-solution' },
    { label: 'Office Solution', path: '/services/office-solution' },
  ];

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimerRef.current === null) return;
    window.clearTimeout(desktopCloseTimerRef.current);
    desktopCloseTimerRef.current = null;
  };

  const scheduleDesktopClose = () => {
    clearDesktopCloseTimer();
    desktopCloseTimerRef.current = window.setTimeout(() => {
      setActiveDesktopKey(null);
      setHoveredDesktopKey(null);
    }, 180);
  };

  const closeAllMenus = () => {
    clearDesktopCloseTimer();
    setIsOpen(false);
    setActiveDesktopKey(null);
    setHoveredDesktopKey(null);
    setActiveMobileKey(null);
  };

  useEffect(() => {
    clearDesktopCloseTimer();
    setIsOpen(false);
    setActiveDesktopKey(null);
    setHoveredDesktopKey(null);
    setActiveMobileKey(null);
  }, [location.pathname, location.hash]);

  useEffect(() => () => clearDesktopCloseTimer(), []);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />

          <div
            onMouseEnter={clearDesktopCloseTimer}
            onMouseLeave={scheduleDesktopClose}
            className="relative hidden flex-1 items-center justify-center lg:flex"
          >
            <div className="flex items-center space-x-2">
              {navConfigs.map((item) => (
                <div
                  key={item.key}
                  onMouseEnter={() => {
                    clearDesktopCloseTimer();
                    setHoveredDesktopKey(item.key);
                    setActiveDesktopKey(item.key);
                  }}
                  onMouseLeave={scheduleDesktopClose}
                  className="relative"
                >
                  <Link
                    to={item.link}
                    onFocus={() => {
                      clearDesktopCloseTimer();
                      setHoveredDesktopKey(item.key);
                      setActiveDesktopKey(item.key);
                    }}
                    onClick={() => setActiveDesktopKey(null)}
                    className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300"
                  >
                    {hoveredDesktopKey === item.key && (
                      <motion.div
                        layoutId="desktop-nav-hover"
                        className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                      />
                    )}
                    <span className="relative z-20">{item.name}</span>
                  </Link>

                  <AnimatePresence>
                    {activeDesktopKey === item.key && (
                      <div
                        onMouseEnter={() => {
                          clearDesktopCloseTimer();
                          setHoveredDesktopKey(item.key);
                          setActiveDesktopKey(item.key);
                        }}
                        onMouseLeave={scheduleDesktopClose}
                        className="absolute left-1/2 top-full z-[70] pt-3"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96, y: 6, x: '-50%' }}
                          animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                          exit={{ opacity: 0, scale: 0.96, y: 6, x: '-50%' }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                        >
                          <div className={`${item.key === 'service' ? 'w-[min(92vw,760px)]' : 'w-[min(92vw,520px)]'} rounded-2xl border border-white/60 bg-white/45 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.2)] backdrop-blur-2xl`}>
                            <div className={`grid gap-5 ${item.groups.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                              {item.groups.map((group) => (
                                <div key={group.label} className="min-w-0">
                                  <p className="text-[11px] font-bold tracking-[0.22em] text-black/40 mb-3">
                                    {group.label}
                                  </p>
                                  <div className="space-y-2.5">
                                    {group.items.map((previewItem) => (
                                      <PreviewItem key={`${group.label}-${previewItem.title}`} item={previewItem} onSelect={closeAllMenus} />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

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
            <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between">
              <Link
                to="/"
                onClick={closeAllMenus}
                className="font-black text-xl md:text-2xl tracking-tighter text-black hover:opacity-70 transition-opacity px-2 py-1"
              >
                PEACE BIZ
              </Link>
              <button
                onClick={closeAllMenus}
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden w-full h-full pt-14 overflow-y-auto">
              <div className="px-6 py-8">
                <nav className="flex flex-col gap-0">
                  {navConfigs.map((item, index) => {
                    const isExpanded = activeMobileKey === item.key;
                    return (
                      <div key={item.key} className="overflow-hidden">
                        <motion.div
                          initial={{ y: '100%' }}
                          animate={{ y: 0 }}
                          exit={{ y: '-100%' }}
                          transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveMobileKey((prev) => (prev === item.key ? null : item.key))}
                            className="w-full flex items-center justify-between gap-4 py-3 border-b border-black/10 hover:border-black/30 transition-all group text-left"
                          >
                            <div className="flex items-baseline gap-4 min-w-0">
                              <span className="text-xs font-mono text-black/25 tracking-widest group-hover:text-brand-blue transition-colors w-6">
                                0{index + 1}
                              </span>
                              <span className="text-3xl font-black tracking-tighter text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:via-brand-green group-hover:to-brand-orange transition-all">
                                {item.name.toUpperCase()}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-black/35 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </motion.div>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pl-10 pr-1 py-3 space-y-3">
                                <Link
                                  to={item.link}
                                  onClick={closeAllMenus}
                                  className="inline-flex items-center text-xs font-bold tracking-[0.2em] text-black/45 hover:text-brand-blue"
                                >
                                  PAGE TOP <ArrowRight className="w-3 h-3 ml-1.5" />
                                </Link>
                                {item.groups.map((group) => (
                                  <div key={`${item.key}-${group.label}`}>
                                    <p className="text-[11px] font-bold tracking-[0.2em] text-black/35 mb-2.5">
                                      {group.label}
                                    </p>
                                    <div className="space-y-2.5">
                                      {group.items.map((previewItem) => (
                                        <PreviewItem
                                          key={`${item.key}-${group.label}-${previewItem.title}`}
                                          item={previewItem}
                                          onSelect={closeAllMenus}
                                          compact
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>

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
            <div className="hidden lg:block relative w-full h-full pt-14">
              {/* Center: Main Navigation */}
              <div className="absolute inset-0 pt-14 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto px-16">
                  <nav className="flex flex-col gap-1">
                    {navConfigs.map((item, index) => (
                      <div key={item.key} className="overflow-hidden">
                        <motion.div
                          initial={{ y: '100%' }}
                          animate={{ y: 0 }}
                          exit={{ y: '-100%' }}
                          transition={{ delay: 0.15 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            to={item.link}
                            onClick={closeAllMenus}
                            className="flex items-baseline gap-6 py-4 border-b border-black/10 hover:border-black/30 transition-all group"
                          >
                            <span className="text-xs font-mono text-black/25 tracking-widest group-hover:text-brand-blue transition-colors w-8">
                              0{index + 1}
                            </span>
                            <span className="text-6xl lg:text-7xl font-black tracking-tighter text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:via-brand-green group-hover:to-brand-orange transition-all">
                              {item.name.toUpperCase()}
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Right: Sub-links & Info */}
              <div className="absolute right-0 top-14 bottom-0 w-auto flex flex-col justify-between px-12 lg:px-16 py-20 border-l border-black/10">
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
                        onClick={closeAllMenus}
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
