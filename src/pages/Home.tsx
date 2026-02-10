import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ArrowRight, Monitor, Leaf, Building2, X } from 'lucide-react';

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // For parallax or scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]); // Reduced scale for performance
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black selection:bg-brand-blue selection:text-white dark:selection:bg-brand-blue dark:selection:text-white border-l border-r border-black/5 dark:border-white/5 max-w-[1920px] mx-auto box-border">

      {/* 1. HERO SECTION: Massively Structural */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center border-b border-black/10 dark:border-white/10">
        {/* Video Background with Parallax Scale */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Custom Background Video */}
            <source src={`${process.env.PUBLIC_URL || ""}/herosection_background.mp4`} type="video/mp4" />
          </video>
        </motion.div>

        {/* Center Content: Structural Typography */}
        <div className="relative z-10 w-full px-6 md:px-20 flex flex-col justify-center h-full pb-20 md:pb-0 pointer-events-none">

          {/* Grid Lines Overlay */}
          <div className="absolute inset-0 z-0 flex justify-between pointer-events-none opacity-20">
            <div className="w-px h-full bg-white/20" />
            <div className="w-px h-full bg-white/20" />
            <div className="w-px h-full bg-white/20" />
          </div>

          <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 p-12 md:p-20 rounded-3xl">
            <div className="overflow-hidden">
              <MaskTextReveal
                text="INNOVATE"
                className="text-[10vw] font-black leading-[0.7] tracking-tighter text-white mix-blend-overlay"
                delay={2.6}
              />
            </div>
            <div className="overflow-hidden">
              <MaskTextReveal
                text="FUTURE"
                className="text-[10vw] font-black leading-[0.7] tracking-tighter text-outline-white text-transparent"
                delay={2.7}
                style={{ WebkitTextStroke: "2px white" }}
              />
            </div>

            {/* Japanese Slogan Structure */}
            <div className="mt-8 flex flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-black/50 dark:bg-white/50" />
                <p className="text-black dark:text-white text-3xl tracking-[0.3em] font-medium mix-blend-screen">
                  <MaskTextReveal text="未来を創り、笑顔をつなぐ。" delay={3} />
                </p>
              </div>

              {/* EST Text Moved Here */}
              <div className="text-xs text-black/60 dark:text-white/60 tracking-[0.3em] font-mono pl-24">
                <MaskTextReveal text="EST. 2008 / TOKYO - SENDAI - FUKUOKA" delay={3.2} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. ABOUT: Split Structural Layout */}

      {/* 2. ABOUT: Refactored (No Image, Expanded Text) */}
      <section className="relative border-b border-black/10 dark:border-white/10 bg-gray-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6 md:px-20 py-32 flex flex-col md:flex-row gap-20 items-start">
          {/* Left: Headers */}
          <div className="md:w-1/3 sticky top-32">
            <h2 className="text-xs font-bold tracking-[0.3em] mb-6 text-brand-blue uppercase">About Us</h2>
            <h3 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
              <MaskTextReveal text="ピース・ビズについて" />
            </h3>
            <Link to="/about">
              <MagneticButton>
                <Button variant="light" className="group text-lg font-bold tracking-widest px-0 hover:text-brand-orange">
                  VIEW MISSION <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </MagneticButton>
            </Link>
          </div>

          {/* Right: Expanded Description (Moved from Left) */}
          <div className="md:w-2/3">
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-sm space-y-12 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              <p>
                <strong className="text-2xl text-black dark:text-white block mb-4">「最適」を、デザインする。</strong>
                <b>私たちピース・ビズは、<br />店舗や企業の現場から、事業の基盤づくりを支えるソリューションパートナーです。</b><br />
                <br />私たちは店舗やオフィスの現場に向き合い、<br />空間・設備・デジタル環境を横断しながら、<br />その事業にとって最適な形を組み立ててきました。
              </p>
              <p>
                2008年の設立以来、東京・仙台・福岡を拠点に、<br />
                空間演出、コスト改善、業務環境の整備に向き合っています。<br />
                一つの答えに縛られず、選び抜いた手段を、最後までやり切る。<br />
                それが私たちの強みです。<br />
              </p>
              <p>
                関わるすべての人にとって価値ある選択を重ね、<br />
                未来を創り、笑顔をつないでいく。<br />
                ピース・ビズは、現場に根ざした解決力で歩み続けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS DOMAINS: Architectural & Sticky Layout (New) */}
      <section className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black content-auto relative z-0">
        <div className="container mx-auto px-6 md:px-20 py-32 flex flex-col md:flex-row gap-20 items-start">

          {/* Left: Sticky Header */}
          <div className="md:w-1/3 sticky top-32 z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              DOMAINS
            </h2>
            <span className="text-sm font-mono tracking-widest text-gray-400 mb-2 block">OUR CORE COMPETENCE</span>
            <div className="w-20 h-px bg-brand-blue mt-8" />
          </div>

          {/* Right: List Layout */}
          <div className="md:w-2/3 flex flex-col gap-32">
            {[
              { title: "IT Solution", sub: "DX / Signage", desc: "デジタル技術で空間価値を最大化。", icon: Monitor, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", color: "text-brand-blue", bg: "bg-brand-blue" },
              { title: "Eco Solution", sub: "Energy / LED", desc: "コスト削減と環境貢献の両立。", icon: Leaf, img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop", color: "text-brand-green", bg: "bg-brand-green" }, // Solar Image
              { title: "Office Solution", sub: "Space Design", desc: "働く人が輝く環境を構築。", icon: Building2, img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", color: "text-brand-orange", bg: "bg-brand-orange" }
            ].map((item, idx) => {
              // User Request: Eco Solution (idx 1) -> Image Left, Text Right.
              // IT (0): Image Right. Office (2): Image Right.
              // So if idx === 1, reverse order.
              // Current layout inside map:
              // TextDiv: order-2 md:order-1 (Left)
              // ImageDiv: order-1 md:order-2 (Right)
              // So Default is Text Left, Image Right.
              // We need Eco to be Image Left, Text Right.
              // So if idx === 1, swap orders.
              const isEco = idx === 1;

              return (
                <Link to="/services" key={idx} className="group block relative border-b border-black/10 dark:border-white/10 pb-20 last:border-0 hover:opacity-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Side */}
                    <div className={`relative z-10 ${isEco ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`text-xs font-mono border border-black/30 dark:border-white/30 px-3 py-1 rounded-full group-hover:${item.bg} group-hover:text-white group-hover:border-transparent transition-colors duration-300`}>0{idx + 1}</span>
                        <div className="h-px w-10 bg-black/10 dark:bg-white/10" />
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight group-hover:text-brand-blue transition-colors duration-300">{item.title}</h3>
                      <p className="text-lg font-bold mb-4 text-gray-400">{item.sub}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
                        {item.desc}
                      </p>
                      <div className="flex items-center text-sm font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform text-brand-blue">
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`relative z-10 flex justify-center ${isEco ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
                      <div className="relative w-full aspect-square rounded-full overflow-hidden border border-black/5 dark:border-white/10 group-hover:scale-105 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]">
                        <ParallaxImage
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                          offset={10}
                        />
                        <div className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500 mixed-blend-overlay`} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NEWS: Minimal & Structural */}
      <section className="py-20 px-8 md:px-20 content-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h2 className="text-4xl font-black tracking-tight">NEWS</h2>
          <MagneticButton>
            <Link to="/works" className="flex items-center text-sm font-bold tracking-widest hover:text-brand-blue transition-colors">
              VIEW ARCHIVE <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </MagneticButton>
        </div>

        <div className="border-t border-black/10 dark:border-white/10">
          {[
            { date: "2024.04.01", cat: "Info", title: "コーポレートサイトをリニューアルいたしました。", content: "本日、当社のコーポレートサイトを全面的にリニューアルいたしました。より見やすく、分かりやすいサイトを目指し、デザインや構成を一新しております。今後とも株式会社ピース・ビズをよろしくお願いいたします。" },
            { date: "2024.03.15", cat: "Works", title: "大手商業施設へのデジタルサイネージ導入実績を公開。", content: "都内大手商業施設のメインエントランスおよび各フロアに、当社のLEDビジョンシステムが導入されました。空間演出と広告配信を兼ね備えた、最先端のサイネージソリューションです。" },
            { date: "2024.02.01", cat: "Recruit", title: "2025年度新卒採用のエントリー受付を開始しました。", content: "2025年度の新卒採用エントリーを開始いたしました。私たちと共に未来を創る、情熱あふれる仲間を募集しています。詳細は採用ページをご覧ください。" }
          ].map((news, i) => (
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

      {/* News Details Modal (Center Peak) */}
      {/* News Details Modal (Portal Fixed Center) */}
      {selectedNews && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-mono text-gray-400">{selectedNews.date}</span>
                  <button onClick={() => setSelectedNews(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-black dark:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-bold mb-4 uppercase tracking-wider">
                  {selectedNews.cat}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight text-black dark:text-white">
                  {selectedNews.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {selectedNews.content}
                </p>

                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                  <Button onClick={() => setSelectedNews(null)} className="font-bold">
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div >
  );
};

export default Home;