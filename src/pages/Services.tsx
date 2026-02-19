import React from 'react';
import { motion } from 'motion/react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import WebGLServiceSlider from '../components/ui/WebGLServiceSlider';
import type { ServiceSectionData } from '../components/ui/animated-service-sections';

const Services: React.FC = () => {
  const services: ServiceSectionData[] = [
    {
      id: 'it',
      titleAccent: 'IT',
      titleBase: 'Solution',
      desc: '店舗やオフィス空間に付加価値を提供する「Prime Sign」をはじめ、最新のデジタル技術で空間の価値を最大化します。',
      items: [
        { label: 'Prime Sign', labelEn: 'Prime Sign', url: 'https://prime-sign.jp' },
        { label: 'LEDサイネージ', labelEn: 'LED Signage' },
        { label: 'ホームページ・LP制作', labelEn: 'Website & LP Design' },
        { label: '動画コンテンツ制作', labelEn: 'Video Content' },
        { label: 'デザイン制作', labelEn: 'Design Production' },
      ],
      color: 'text-brand-blue',
      dotColor: 'bg-brand-blue',
      img: `${process.env.PUBLIC_URL || ''}/it-solution.webp`,
      path: '/services/it-solution',
    },
    {
      id: 'eco',
      titleAccent: 'Eco',
      titleBase: 'Solution',
      desc: '業務用エアコン、太陽光発電システム、新電力。コスト削減と環境貢献を両立する最適なプランをご提案。',
      items: [
        { label: '業務用空調機器', labelEn: 'Commercial HVAC' },
        { label: '厨房機器', labelEn: 'Kitchen Equipment' },
        { label: '太陽光発電システム', labelEn: 'Solar Power System' },
        { label: '蓄電池', labelEn: 'Battery Storage' },
        { label: '新電力', labelEn: 'New Energy Provider' },
      ],
      color: 'text-brand-green',
      dotColor: 'bg-brand-green',
      img: `${process.env.PUBLIC_URL || ''}/eco-solution.webp`,
      path: '/services/eco-solution',
    },
    {
      id: 'office',
      titleAccent: 'Office',
      titleBase: 'Solution',
      desc: 'オフィスに欠かせない複合機・ビジネスフォンや電話・ネット回線など、働く人が輝く、快適で効率的なオフィス環境を構築します。',
      items: [
        { label: 'オフィスサプライ', labelEn: 'Office Supply' },
        { label: 'インターネット回線', labelEn: 'Internet Connection' },
        { label: 'スマートフォン・タブレット', labelEn: 'Smartphone & Tablet' },
      ],
      color: 'text-brand-orange',
      dotColor: 'bg-brand-orange',
      img: `${process.env.PUBLIC_URL || ''}/office-solution.webp`,
      path: '/services/office-solution',
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      {/* ── HERO (1 screen) ── */}
      <section id="services-hero" className="h-screen relative flex flex-col justify-center overflow-hidden scroll-mt-28">
        {/* Decorative vertical grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[25, 50, 75].map((p) => (
            <div
              key={p}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-black/[0.04] dark:via-white/[0.04] to-transparent"
              style={{ left: `${p}%` }}
            />
          ))}
        </div>

        {/* Large decorative number */}
        <div className="absolute top-[20%] right-4 md:right-16 text-[10rem] md:text-[22rem] font-black text-black/[0.02] dark:text-white/[0.03] leading-none select-none tracking-tighter pointer-events-none">
          03
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6 md:mb-10">
              What We Do
            </p>
          </motion.div>

          <h1 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-black dark:text-white mb-8">
            <MaskTextReveal text="SERVICES" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row justify-between items-start border-t border-black/10 dark:border-white/10 pt-8"
          >
            <p className="text-xl md:text-2xl font-bold tracking-wide">
              3つの事業領域で、
              <span className="block text-gray-400">ビジネスを加速させる。</span>
            </p>
            <p className="text-sm md:text-base text-gray-500 max-w-md mt-4 md:mt-0 leading-relaxed">
              IT、環境、オフィスの3つの軸で、企業の課題解決をトータルサポート。
              ワンストップでのサービス提供により、お客様の負担を軽減し、
              本業への集中を支援します。
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 font-bold">
            Scroll
          </span>
          <div className="w-5 h-8 border border-gray-300 dark:border-gray-600 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── WebGL SERVICE SLIDER (1 screen) ── */}
      <section id="services-core-business" className="scroll-mt-28">
        <WebGLServiceSlider sections={services} />
      </section>
    </div>
  );
};

export default Services;
