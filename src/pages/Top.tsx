import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TextHoverEffect } from '../components/ui/text-hover-effect';
import { FlipWords } from '../components/ui/flip-words';
import { ThreeDMarquee } from '../components/ui/3d-marquee';
import { ArrowRight, X, Calendar, Tag } from 'lucide-react';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { CometCard } from '../components/ui/comet-card';
import { newsData, NewsItem } from '../data/newsData';

const catColorMap: Record<string, string> = {
  Info: "bg-brand-blue",
  Works: "bg-brand-green",
  Recruit: "bg-brand-orange",
};

const Top: React.FC = () => {
  const containerRef = useRef(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVisibleRef = useRef(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const latestNews = newsData.slice(0, 3);

  // For parallax or scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]); // Reduced scale for performance
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { });
      }
    };

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
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black selection:bg-brand-blue selection:text-white dark:selection:bg-brand-blue dark:selection:text-white border-l border-r border-black/5 dark:border-white/5 max-w-[1920px] mx-auto box-border">

      {/* 1. HERO SECTION (gnmd.com inspired) */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col border-b border-black/10 dark:border-white/10">
        {/* Video Background with Parallax Scale */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={`${process.env.PUBLIC_URL || ""}/herosection_background_poster.webp`}
            className="w-full h-full object-cover"
          >
            <source src={`${process.env.PUBLIC_URL || ""}/herosection_background.webm`} type="video/webm" />
            <source src={`${process.env.PUBLIC_URL || ""}/herosection_background.mp4`} type="video/mp4" />
          </video>
        </motion.div>

        {/* Hero Main: TextHoverEffect (left-aligned, stacked) */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-white pt-20 px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-[1000px] relative rounded-2xl px-2 py-4 md:px-4 md:py-6" style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}>
            <div className="pointer-events-auto flex flex-col">
              <div>
                <TextHoverEffect text="INNOVATE" delay={2.6} />
              </div>
              <div className="-mt-4 md:-mt-16">
                <TextHoverEffect text="THE FUTURE" outline delay={3.0} />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1 md:mt-3 text-lg md:text-2xl lg:text-3xl font-bold tracking-wide text-white/80"
              style={{ marginLeft: '1.4%' }}
            >
              ⸺ 未来を創り、笑顔を繋ぐ。
            </motion.p>
          </div>
        </div>

        {/* Hero Bottom: Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
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
      </section>

      {/* 1.5. OUR MISSION SECTION */}
      <section className="relative border-b border-black/10 overflow-hidden bg-white">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10">
          {/* FlipWords Hero - centered heading */}
          <div className="flex flex-col justify-center items-center px-6 pt-32 pb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.4em] text-neutral-400 uppercase">
                <span className="w-8 h-px bg-neutral-300" />
                Our Mission
                <span className="w-8 h-px bg-neutral-300" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal text-neutral-600 leading-[1.3] tracking-tight"
            >
              私たちは
              <FlipWords
                words={["最適な未来", "笑顔の連鎖", "確かな価値", "新しい可能性"]}
                duration={3000}
                className="font-black text-brand-blue"
              />
              <br />
              を創造する。
            </motion.div>
          </div>

          {/* Two-column: Text left 45% + 3D Marquee right 55% */}
          <div className="flex flex-col lg:flex-row w-full lg:h-[600px]">
            {/* Left: Description + Button */}
            <div className="lg:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 py-12 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed font-semibold mb-4">
                  私たちピース・ビズは<br />法人・店舗の成長を支える環境を<br />IT・ECO・OFFICEの3軸から<br />再設計するソリューション企業です。<br /><br />
                </p>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed font-medium">
                  Prime SignやLEDサイネージ、アプリケーション、コンテンツ制作によるIT領域。
                  <br />
                  エネルギー設備・業務用空調機器・太陽光発電システムによるECO領域。
                  <br />
                  OA機器・モバイル・通信インフラを統合するOFFICE領域。
                  <br /><br />
                  それぞれを個別最適に終わらせない。
                  <br />
                  空間と情報、エネルギーをひとつの戦略として組み上げ、<br />未来を創り、笑顔を繋ぎます。
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex justify-center"
              >
                <Link to="/about">
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

            {/* Right: 3D Marquee */}
            <div className="lg:w-[55%] h-[400px] lg:h-full bg-gray-950/5 ring-1 ring-neutral-700/10 overflow-hidden">
              <ThreeDMarquee
                images={[
                  ...[...Array(16)].map((_, i) => `${process.env.PUBLIC_URL || ""}/home-image-carousel-${i + 1}.webp`),
                  ...[...Array(16)].map((_, i) => `${process.env.PUBLIC_URL || ""}/home-image-carousel-${i + 1}.webp`),
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS DOMAINS: Architectural & Sticky Layout */}
      <section className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black content-auto relative">

        {/* Mobile-only: Sticky title + flowing sub-content */}
        <div className="md:hidden">
          <div className="sticky top-16 z-30 bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
            <div className="px-6 pt-8 pb-4">
              <Link to="/services" className="block hover:opacity-70 transition-opacity">
                <h2 className="text-5xl font-black tracking-tighter leading-none">
                  DOMAINS
                </h2>
              </Link>
            </div>
          </div>
          <div className="px-6 pt-4 pb-5">
            <Link to="/services" className="block hover:opacity-70 transition-opacity">
              <span className="text-2xl font-black tracking-tighter leading-none block text-gray-300 dark:text-gray-600">
                事業
              </span>
            </Link>
            <span className="text-sm font-mono tracking-widest text-gray-400 mt-3 mb-1 block">OUR CORE COMPETENCE</span>
            <div className="w-20 h-px bg-brand-blue mt-3" />
          </div>
        </div>

        {/* Main Layout: sidebar on desktop, stacked on mobile */}
        <div className="container mx-auto px-6 md:px-20 py-16 md:py-32 md:flex md:flex-row md:gap-20 md:items-start">

          {/* Desktop-only: Sticky Sidebar */}
          <div className="hidden md:block md:w-1/3 sticky top-[calc(50vh-120px)] z-10">
            <Link to="/services" className="block hover:opacity-70 transition-opacity">
              <h2 className="text-8xl font-black tracking-tighter leading-none mb-2">
                DOMAINS
              </h2>
              <span className="text-5xl font-black tracking-tighter leading-none block text-gray-300 dark:text-gray-600">
                事業
              </span>
            </Link>
            <span className="text-sm font-mono tracking-widest text-gray-400 mt-4 mb-2 block">OUR CORE COMPETENCE</span>
            <div className="w-20 h-px bg-brand-blue mt-8" />
          </div>

          {/* Items */}
          <div className="md:w-2/3 flex flex-col gap-20 md:gap-32">
            {[
              { title: "IT Solution", sub: "DX / Signage", desc: "デジタル技術で空間価値を最大化。", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", color: "text-brand-blue", bg: "bg-brand-blue", hoverBg: "group-hover:bg-brand-blue", hoverText: "group-hover:text-brand-blue", link: "/services/it-solution" },
              { title: "Eco Solution", sub: "Energy / LED", desc: "コスト削減と環境貢献の両立。", img: `${process.env.PUBLIC_URL || ''}/ecosolution.webp`, color: "text-brand-green", bg: "bg-brand-green", hoverBg: "group-hover:bg-brand-green", hoverText: "group-hover:text-brand-green", link: "/services/eco-solution" },
              { title: "Office Solution", sub: "Space Design", desc: "働く人が輝く環境を構築。", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", color: "text-brand-orange", bg: "bg-brand-orange", hoverBg: "group-hover:bg-brand-orange", hoverText: "group-hover:text-brand-orange", link: "/services/office-solution" }
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group block relative border-b border-black/10 dark:border-white/10 pb-12 md:pb-20 last:border-0 hover:opacity-100">
                <div className="grid grid-cols-[3fr_2fr] md:grid-cols-2 gap-4 md:gap-12 items-center">

                  {/* Text Side - always left */}
                  <div className="relative">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <span className={`text-[10px] md:text-xs font-mono border border-black/30 dark:border-white/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full ${item.hoverBg} group-hover:text-white group-hover:border-transparent transition-colors duration-300`}>0{idx + 1}</span>
                      <div className="h-px w-6 md:w-10 bg-black/10 dark:bg-white/10" />
                    </div>
                    <h3 className={`text-2xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight ${item.hoverText} transition-colors duration-300`}>{item.title}</h3>
                    <p className="text-sm md:text-lg font-bold mb-2 md:mb-4 text-gray-400">{item.sub}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-base leading-relaxed mb-4 md:mb-8 hidden sm:block">
                      {item.desc}
                    </p>
                    <div className={`flex items-center text-[10px] md:text-sm font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform ${item.color}`}>
                      View Details <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </div>

                  {/* Image Side - always right */}
                  <div className="relative flex justify-center">
                    <CometCard className="w-full">
                      <div
                        className="flex w-full cursor-pointer flex-col items-stretch rounded-[12px] md:rounded-[16px] border-0 bg-[#1F2121] p-1.5 md:p-4"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="mx-1 md:mx-2 flex-1">
                          <div className="relative aspect-[3/4] w-full">
                            <img
                              loading="lazy"
                              className="absolute inset-0 h-full w-full rounded-[12px] md:rounded-[16px] bg-black object-cover contrast-75 grayscale group-hover:grayscale-0 transition-all duration-700"
                              alt={item.title}
                              src={item.img}
                              style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px" }}
                            />
                            <div className={`absolute inset-0 rounded-[12px] md:rounded-[16px] ${item.bg} opacity-0 group-hover:opacity-15 transition-opacity duration-500 mix-blend-overlay`} />
                          </div>
                        </div>
                        <div className="mt-1 md:mt-2 flex flex-shrink-0 items-center justify-between px-2 py-2 md:p-4 font-mono text-white">
                          <div className="text-[9px] md:text-xs truncate">{item.title}</div>
                          <div className="text-[9px] md:text-xs text-gray-300 opacity-50 truncate ml-1">{item.sub}</div>
                        </div>
                      </div>
                    </CometCard>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWS: Minimal & Structural */}
      <section className="py-20 px-8 md:px-20 content-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h2 className="text-4xl font-black tracking-tight">NEWS</h2>
          <MagneticButton>
            <Link to="/news" className="flex items-center text-sm font-bold tracking-widest hover:text-brand-blue transition-colors">
              VIEW ARCHIVE <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </MagneticButton>
        </div>

        <div className="border-t border-black/10 dark:border-white/10">
          {latestNews.map((news, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row items-start md:items-center py-8 border-b border-black/10 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-4 -mx-4"
              onClick={() => setSelectedNews(news)}
            >
              <div className="w-48 shrink-0 text-sm font-mono text-gray-500 mb-2 md:mb-0 group-hover:text-black dark:group-hover:text-white transition-colors">{news.date}</div>
              <div className="w-32 shrink-0 mb-2 md:mb-0">
                <span className="text-xs font-bold border border-black/20 dark:border-white/20 px-3 py-1 rounded-full uppercase tracking-wider group-hover:bg-brand-blue group-hover:border-transparent group-hover:text-white transition-colors">{news.cat}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold group-hover:translate-x-2 transition-transform duration-300 w-full group-hover:text-brand-blue">{news.title}</h3>
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-brand-blue" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News Details Modal (Portal) */}
      {createPortal(
        <AnimatePresence>
          {selectedNews && (
            <motion.div
              key="news-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 左側：写真 */}
                <div className="relative lg:w-1/2 h-64 lg:h-auto shrink-0">
                  <img
                    src={selectedNews.img}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  {/* モバイル用閉じるボタン */}
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="lg:hidden absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 右側：テキスト情報 */}
                <div className="lg:w-1/2 flex flex-col relative overflow-y-auto">
                  {/* デスクトップ用閉じるボタン */}
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="hidden lg:flex absolute top-6 right-6 w-10 h-10 rounded-full border border-black/10 dark:border-white/10 items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center flex-1">
                    {/* メタ情報 */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        <Calendar className="w-4 h-4" />
                        {selectedNews.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider ${catColorMap[selectedNews.cat] || "bg-gray-600"}`}>
                          {selectedNews.cat}
                        </span>
                      </div>
                    </div>

                    {/* 区切り線 */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-brand-blue to-brand-green mb-8" />

                    {/* タイトル */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-black dark:text-white mb-8">
                      {selectedNews.title}
                    </h3>

                    {/* 本文 */}
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {selectedNews.content}
                    </div>

                    {/* フッター */}
                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800">
                      <button
                        onClick={() => setSelectedNews(null)}
                        className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        閉じる
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div >
  );
};

export default Top;
