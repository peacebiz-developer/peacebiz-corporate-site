import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TextHoverEffect } from '../components/ui/text-hover-effect';
import { ArrowRight } from 'lucide-react';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import clsx from 'clsx';
import CaseSnapshotCarousel from '../components/ui/CaseSnapshotCarousel';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { newsData } from '../data/newsData';
import { topNewsCategoryColorMap } from '../data/topPageData';
import { MissionSection } from '../components/sections/top/MissionSection';
import { assetPaths } from '../config/assets';

const latestNews = newsData.slice(0, 3);

const DomainBentoCard: React.FC<{
  title: React.ReactNode;
  description: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
  featured?: boolean;
  accentColor?: string;
  compact?: boolean;
}> = React.memo(({ title, description, imgSrc, imgAlt, featured = false, accentColor, compact = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={clsx(
      "group relative overflow-hidden rounded-2xl h-full cursor-pointer",
      compact ? "min-h-[18rem] md:min-h-[22rem]" : "min-h-[22rem] md:min-h-[28rem]",
      "bg-black shadow-lg ring-1 ring-black/10"
    )}
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
      <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase px-3 py-1 mb-4 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
        {featured ? "Featured" : "Core Business"}
      </span>
      <p className="text-2xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </p>
      <p className={clsx("mt-2 text-white/60 leading-relaxed line-clamp-2", compact ? "text-sm md:text-base" : "text-base md:text-lg")}>
        {description}
      </p>
      <div className={clsx(
        "mt-4 flex items-center text-xs md:text-sm font-bold tracking-widest uppercase",
        "opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1",
        accentColor || "text-white/60"
      )}>
        View Details <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
      </div>
    </div>
  </motion.div>
));

const Top: React.FC = () => {
  const containerRef = useRef(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVisibleRef = useRef(true);
  const preloaderDoneRef = useRef(false);
  const ownerVoiceRef = useRef<HTMLHeadingElement>(null);
  const [logoPhaseComplete, setLogoPhaseComplete] = useState(false);

  // For parallax or scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = assetPaths.top.heroPoster;
    preloadLink.setAttribute('fetchpriority', 'high');
    document.head.appendChild(preloadLink);

    const video = heroVideoRef.current;
    if (!video || !("IntersectionObserver" in window)) {
      return () => preloadLink.remove();
    }

    video.pause();
    video.currentTime = 0;

    const tryPlay = () => {
      if (!preloaderDoneRef.current) return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    };

    const preloaderTimer = setTimeout(() => {
      preloaderDoneRef.current = true;
      video.currentTime = 0;
      if (heroVisibleRef.current) {
        tryPlay();
      }
    }, 2500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting && entry.intersectionRatio > 0.05;
        if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.05, 0.2] }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (heroVisibleRef.current) {
        tryPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const logoTimer = setTimeout(() => setLogoPhaseComplete(true), 6900);

    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(logoTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      preloadLink.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black selection:bg-brand-blue selection:text-white dark:selection:bg-brand-blue dark:selection:text-white border-l border-r border-black/5 dark:border-white/5 max-w-[1920px] mx-auto box-border">

      {/* 1. HERO SECTION (gnmd.com inspired) */}
      <section id="top-hero" className="relative min-h-screen w-full overflow-hidden flex flex-col scroll-mt-28">
        {/* Video Background with Parallax Scale */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <video
            ref={heroVideoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster={assetPaths.top.heroPoster}
            className="w-full h-full object-cover"
          >
            <source src={assetPaths.videos.topHeroWebm} type="video/webm" />
            <source src={assetPaths.videos.topHeroMp4} type="video/mp4" />
          </video>
        </motion.div>

        {/* Logo overlay during white intro — delayed until after preloader */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            delay: 2.5,
            duration: 4.4,
            times: [0, 0.18, 0.89, 1],
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <img
            src={assetPaths.brand.logoEn}
            alt="Peace Biz"
            width={960}
            height={240}
            decoding="async"
            className="w-48 md:w-72 lg:w-96"
          />
        </motion.div>

        {/* Hero Main: TextHoverEffect (left-aligned, stacked) — appears after logo fades */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-white pt-20 px-4 md:px-8 lg:px-16 lg:pt-32">
          <div className="w-full max-w-[1000px] relative rounded-2xl px-2 py-4 md:px-4 md:py-6" style={logoPhaseComplete ? { backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' } : undefined}>
            <div className="pointer-events-auto flex flex-col">
              <div className="w-[min(92vw,46rem)]">
                <TextHoverEffect text="PEACE BIZ" delay={7.2} />
              </div>
              <div className="-mt-[2.5vw] lg:-mt-[30px] w-[min(92vw,46rem)]">
                <TextHoverEffect text="Innovate the Future of Business Spaces" outline delay={7.6} centered />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 8.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 md:mt-3 w-[min(92vw,46rem)] text-lg md:text-2xl lg:text-3xl font-bold tracking-wide text-white/80 text-center"
            >
              ⸺ 未来を創り、笑顔を繋ぐ。
            </motion.p>
          </div>
        </div>

        {/* Hero Bottom: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.2, duration: 1 }}
          className="relative z-10 pb-12 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
            />
          </div>
        </motion.div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Spacer between hero and mission */}
      <div className="h-20 md:h-32 bg-white" />

      <section id="top-mission" className="scroll-mt-28">
        <MissionSection publicUrl={process.env.PUBLIC_URL || ""} />
      </section>

      {/* 2.5. CASE SNAPSHOT */}
      <section id="top-voice" className="relative overflow-hidden bg-white scroll-mt-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 bg-white">
          <div className="pl-3 md:pl-4 lg:pl-6 pt-16 md:pt-24 pb-8 md:pb-4 overflow-visible">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 md:mb-4 pl-1"
            >
              <span className="text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.3em] text-neutral-300">
                導入の声
              </span>
            </motion.div>

            <motion.h2
              ref={ownerVoiceRef}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (ownerVoiceRef.current) ownerVoiceRef.current.style.transform = 'none';
              }}
              className="relative z-[2] font-black tracking-tighter leading-none -ml-[0.03em] overflow-visible md:mix-blend-difference"
            >
              <span className="md:hidden text-[clamp(2rem,11.5vw,3.5rem)] whitespace-nowrap text-neutral-800">
                OWNER'S VOICE
              </span>
              <span className="hidden md:inline text-[clamp(3.5rem,12vw,10rem)] text-white">
                OWNER'S VOICE
              </span>
            </motion.h2>
          </div>

          <CaseSnapshotCarousel />

          <div className="pb-8 md:pb-12" />
        </div>
      </section>

      {/* 3. BUSINESS DOMAINS: Bento Grid */}
      <section id="top-domain" className="relative bg-white content-auto overflow-hidden scroll-mt-28">
        <div className="relative">
          {/* DOMAINS Title — right-aligned */}
          <div className="pr-3 md:pr-4 lg:pr-6 pt-24 md:pt-36 pb-4 md:pb-6 text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 md:mb-4 pr-1"
            >
              <span className="text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.3em] text-neutral-500">
                事業領域 ⸺
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tighter leading-[0.85]"
            >
              <span className="md:hidden text-[clamp(2rem,11.5vw,3.5rem)] whitespace-nowrap text-neutral-800">
                DOMAINS
              </span>
              <span className="hidden md:inline text-[clamp(3.5rem,12vw,10rem)]">
                <span
                  className="relative z-20"
                  style={{
                    background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 40%, #2a2a2a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >DOMAINS</span>
              </span>
            </motion.h2>
          </div>

          {/* Grid content */}
          <div className="px-4 md:px-10 pb-24 md:pb-32 max-w-[1920px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-2xl font-medium tracking-tight text-neutral-400 mb-8 md:mb-12 pr-1 text-right"
            >
              3つの事業領域で、ビジネスを加速。
            </motion.p>

            {/* Core Business cards */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Link to="/services/it-solution">
                <DomainBentoCard
                  title="IT Solution"
                  description="デジタル技術で空間価値を最大化。Prime Sign / LEDサイネージ / クリエイティブ"
                  imgSrc={assetPaths.services.itSolution}
                  imgAlt="IT Solution"
                  accentColor="text-brand-blue"
                  compact
                />
              </Link>
              <Link to="/services/eco-solution">
                <DomainBentoCard
                  title="Eco Solution"
                  description="コスト削減と環境貢献の両立。業務用空調 / 太陽光発電 / 新電力"
                  imgSrc={assetPaths.services.ecoSolution}
                  imgAlt="Eco Solution"
                  accentColor="text-brand-green"
                  compact
                />
              </Link>
              <Link to="/services/office-solution">
                <DomainBentoCard
                  title="Office Solution"
                  description="働く人が輝く環境を構築。OA機器 / 通信 / ネットワーク"
                  imgSrc={assetPaths.services.officeSolution}
                  imgAlt="Office Solution"
                  accentColor="text-brand-orange"
                  compact
                />
              </Link>
            </div>

          </div>

          {/* FEATURED sub-title — pinned to left edge */}
          <div id="top-featured" className="pl-3 md:pl-4 lg:pl-6 pt-10 md:pt-16 pb-4 md:pb-6 scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-1 md:mb-2 pl-1"
            >
              <span className="text-sm md:text-lg lg:text-xl font-bold tracking-[0.3em] text-neutral-500">
              ⸺ ピックアップ
              </span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tighter leading-[0.85] -ml-[0.03em]"
            >
              <span className="md:hidden text-[clamp(1.4rem,7vw,2.2rem)] whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #0d1f30 0%, #0d2614 60%, #3a1504 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                FEATURED
              </span>
              <span className="hidden md:inline text-[clamp(2rem,7vw,6rem)]">
                <span
                  className="relative z-20"
                  style={{
                    background: 'linear-gradient(90deg, #0d1f30 0%, #0d2614 50%, #3a1504 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >FEATURED</span>
              </span>
            </motion.h3>
          </div>

          {/* Featured cards + View more */}
          <div className="px-4 md:px-10 pb-24 md:pb-32 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <a href="https://prime-sign.jp" target="_blank" rel="noopener noreferrer">
                <DomainBentoCard
                  title="Prime Sign"
                  description="デジタルサイネージで空間に新しい体験価値を。情報発信の力を最大化します。"
                  imgSrc={assetPaths.services.primeSign}
                  imgAlt="Prime Sign"
                  featured
                  accentColor="text-brand-blue"
                />
              </a>
              <Link to="/services/eco-solution">
                <DomainBentoCard
                  title="業務用エアコン"
                  description="最新の省エネ技術で、快適な空間環境と大幅なコスト削減を実現します。"
                  imgSrc={assetPaths.services.airConditioner}
                  imgAlt="業務用エアコン"
                  featured
                  accentColor="text-brand-green"
                />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24 flex justify-center"
            >
              <Link to="/services">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>View more</span>
                  <ArrowRight className="h-4 w-4" />
                </HoverBorderGradient>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. NEWS: Blog7-style Cards */}
      <section id="top-news" className="py-24 md:py-32 content-auto scroll-mt-28">
        <div className="container mx-auto px-6 md:px-16">
          {/* Header Row: LATEST NEWS (left) — VIEW ARCHIVES (right) */}
          <motion.div
            id="top-news-heading"
            className="scroll-mt-28 flex items-end justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">LATEST NEWS</h2>
            <MagneticButton>
              <Link to="/news" className="inline-flex items-center text-sm font-bold tracking-widest hover:text-brand-blue transition-colors">
                VIEW ARCHIVES <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Thin separator */}
          <div className="border-b border-black/[0.06] dark:border-white/[0.06] mb-10 md:mb-14" />

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {latestNews.map((news, i) => (
              <motion.div
                key={news.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <Link to={`/news/${news.slug}`} className="w-full h-full block">
                  <Card className="group flex flex-col cursor-pointer border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden rounded-xl w-full h-full">
                    <div className="aspect-[16/9] w-full overflow-hidden shrink-0">
                      <img
                        src={news.img}
                        alt={news.title}
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white ${topNewsCategoryColorMap[news.cat] || "bg-gray-500"}`}>
                          {news.cat}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{news.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold md:text-xl leading-snug group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                        {news.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">{news.content}</p>
                    </CardContent>
                    <CardFooter>
                      <span className="inline-flex items-center text-sm font-bold text-brand-blue group-hover:underline">
                        Read more
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
};

export default Top;
