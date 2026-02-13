import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LinkPreview } from '../components/ui/link-preview';
import { NoiseBackground } from '../components/ui/noise-background';

/* ───────────────────────────────────────────
   Animated list item
   ─────────────────────────────────────────── */
const AnimatedItem = ({
  scrollYProgress,
  index,
  dotColor,
  color,
  linkTo,
  isFirst = false,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  dotColor: string;
  color: string;
  linkTo?: string;
  isFirst?: boolean;
  children: React.ReactNode;
}) => {
  // First section: offset 'start start' → sticky phase is 0–0.78 (450vh)
  // Other sections: offset 'start end' → animations centred around 0.33–0.67
  const start = isFirst
    ? 0.06 + index * 0.03
    : 0.22 + index * 0.04;
  const end = isFirst
    ? Math.min(start + 0.06, 0.30)
    : Math.min(start + 0.08, 0.55);
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [start, end, 0.64, 0.74] : [start, end, 0.68, 0.82],
    [0, 1, 1, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [60, 0]);

  const inner = (
    <>
      <span className={`w-2.5 h-2.5 rounded-full ${dotColor} flex-shrink-0 group-hover:scale-150 transition-transform duration-300`} />
      <span className="text-base md:text-2xl font-bold text-white flex-1 group-hover:translate-x-2 transition-transform duration-300">
        {children}
      </span>
      <ArrowRight className={`w-4 h-4 ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </>
  );

  return (
    <motion.li
      style={{ opacity, x }}
      className="border-b border-white/15 first:border-t"
    >
      {linkTo ? (
        <Link to={linkTo} className="group flex items-center gap-3 md:gap-5 py-3 md:py-5 cursor-pointer">
          {inner}
        </Link>
      ) : (
        <div className="group flex items-center gap-3 md:gap-5 py-3 md:py-5">
          {inner}
        </div>
      )}
    </motion.li>
  );
};

/* ───────────────────────────────────────────
   Scroll‑driven service section
   ─────────────────────────────────────────── */
const ServiceSection = ({
  service,
  index,
}: {
  service: any;
  index: number;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // First section sits right below the short hero, so on page load its
  // top is already inside the viewport. Using 'start start' ensures
  // progress = 0 until the section top reaches the viewport top.
  // Sticky phase for 'start start → end start' with 250vh section:
  //   0 to (250vh-100vh)/250vh = 0.6   → content is pinned for 60% of range.
  // For other sections 'start end → end start' works fine since they
  // begin fully below the fold.
  const isFirst = index === 0;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isFirst
      ? ['start start', 'end start']
      : ['start end', 'end start'],
  });

  /* Background parallax + scale */
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);

  /* Dark overlay */
  const overlayOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.04, 0.68, 0.78] : [0, 0.15, 0.8, 1],
    [1, 0.5, 0.5, 1],
  );

  /* Label */
  const labelOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0.01, 0.05, 0.66, 0.74] : [0.08, 0.18, 0.7, 0.82],
    [0, 1, 1, 0],
  );
  const labelX = useTransform(
    scrollYProgress,
    isFirst ? [0.01, 0.05] : [0.08, 0.18],
    [-40, 0],
  );

  /* Title */
  const titleOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0.02, 0.07, 0.66, 0.74] : [0.1, 0.22, 0.7, 0.82],
    [0, 1, 1, 0],
  );
  const titleX = useTransform(
    scrollYProgress,
    isFirst ? [0.02, 0.07] : [0.1, 0.22],
    [-80, 0],
  );

  /* Description */
  const descOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0.04, 0.10, 0.66, 0.74] : [0.16, 0.28, 0.7, 0.82],
    [0, 1, 1, 0],
  );
  const descY = useTransform(
    scrollYProgress,
    isFirst ? [0.04, 0.10] : [0.16, 0.28],
    [40, 0],
  );

  /* CTA */
  const ctaOpacity = useTransform(
    scrollYProgress,
    isFirst ? [0.12, 0.18, 0.64, 0.74] : [0.32, 0.42, 0.68, 0.82],
    [0, 1, 1, 0],
  );
  const ctaY = useTransform(
    scrollYProgress,
    isFirst ? [0.12, 0.18] : [0.32, 0.42],
    [24, 0],
  );

  return (
    <div ref={sectionRef} className="relative" style={{ height: isFirst ? '450vh' : '250vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ── Background image with parallax ── */}
        <motion.div
          className="absolute inset-[-15%] z-0"
          style={{ y: bgY, scale: bgScale }}
        >
          <img
            src={service.img}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Dark overlay (animated) ── */}
        <motion.div
          className="absolute inset-0 z-[1] bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 h-full flex items-center pt-14 md:pt-0">
          <div className="w-full max-w-7xl mx-auto px-5 md:px-20">
            <div className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
              <div
                className="absolute -inset-4 md:-inset-8 rounded-2xl z-0"
                style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
              />

              {/* Left: Title Block */}
              <div className="md:w-2/5 relative z-[2]">
                <div className="relative z-[2]">
                  <motion.span
                    style={{ opacity: labelOpacity, x: labelX }}
                    className={`text-xs font-mono tracking-[0.3em] uppercase mb-2 md:mb-4 block ${service.color}`}
                  >
                    0{index + 1} — {service.id.toUpperCase()}
                  </motion.span>

                  <motion.h2
                    style={{ opacity: titleOpacity, x: titleX }}
                    className="text-4xl md:text-7xl font-black tracking-tight leading-[0.95] mb-2 md:mb-4"
                  >
                    <span className={service.color}>{service.titleAccent}</span>
                    <span className="block text-white">{service.titleBase}</span>
                  </motion.h2>

                  <motion.p
                    style={{ opacity: descOpacity, y: descY }}
                    className="text-sm md:text-lg text-gray-200 leading-relaxed mt-3 md:mt-6 max-w-sm"
                  >
                    {service.desc}
                  </motion.p>

                  <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-4 md:mt-8">
                    <Link to={service.path}>
                      <NoiseBackground
                        containerClassName="w-fit p-2 rounded-full"
                        gradientColors={service.gradientColors}
                      >
                        <button className="h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-6 py-3 text-black text-sm font-bold tracking-wider shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-[0.98] dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                          View Details &rarr;
                        </button>
                      </NoiseBackground>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Right: Items List */}
              <div className="md:w-3/5 relative z-[2]">
                <ul className="space-y-0 relative z-[2]">
                  {service.items.map((item: { label: string; url?: string }, i: number) => (
                    <AnimatedItem
                      key={i}
                      scrollYProgress={scrollYProgress}
                      index={i}
                      dotColor={service.dotColor}
                      color={service.color}
                      linkTo={item.url ? undefined : service.path}
                      isFirst={isFirst}
                    >
                      {item.url ? (
                        <LinkPreview
                          url={item.url}
                          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                        >
                          {item.label}
                        </LinkPreview>
                      ) : (
                        item.label
                      )}
                    </AnimatedItem>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────
   Main page
   ─────────────────────────────────────────── */
const Services: React.FC = () => {
  const services = [
    {
      id: 'it',
      titleAccent: 'IT',
      titleBase: 'Solution',
      subtitle: 'Digital Transformation',
      desc: '店舗やオフィス空間に付加価値を提供する「Prime Sign」をはじめ、最新のデジタル技術で空間の価値を最大化します。',
      items: [
        { label: 'Prime Sign', url: 'https://prime-sign.jp' },
        { label: 'LEDサイネージ' },
        { label: 'ホームページ・LP制作' },
        { label: '動画コンテンツ制作' },
        { label: 'デザイン制作' },
      ],
      color: 'text-brand-blue',
      dotColor: 'bg-brand-blue',
      gradientColors: ['rgb(59, 130, 246)', 'rgb(99, 102, 241)', 'rgb(139, 92, 246)'],
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      path: '/services/it-solution',
    },
    {
      id: 'eco',
      titleAccent: 'Eco',
      titleBase: 'Solution',
      subtitle: 'Sustainable Future',
      desc: '業務用エアコン、太陽光発電システム、新電力。コスト削減と環境貢献を両立する最適なプランをご提案。',
      items: [
        { label: '業務用空調' },
        { label: '厨房機器' },
        { label: '太陽光発電システム' },
        { label: '蓄電池' },
        { label: '新電力' },
      ],
      color: 'text-brand-green',
      dotColor: 'bg-brand-green',
      gradientColors: ['rgb(34, 197, 94)', 'rgb(16, 185, 129)', 'rgb(52, 211, 153)'],
      img: `${process.env.PUBLIC_URL || ''}/ecosolution.webp`,
      path: '/services/eco-solution',
    },
    {
      id: 'office',
      titleAccent: 'Office',
      titleBase: 'Solution',
      subtitle: 'Workplace Design',
      desc: 'オフィスに欠かせない複合機・ビジネスフォンや電話・ネット回線など、働く人が輝く、快適で効率的なオフィス環境を構築します。',
      items: [
        { label: 'オフィスサプライ' },
        { label: 'インターネット回線' },
        { label: 'スマートフォン・タブレット' },
      ],
      color: 'text-brand-orange',
      dotColor: 'bg-brand-orange',
      gradientColors: ['rgb(249, 115, 22)', 'rgb(245, 158, 11)', 'rgb(234, 88, 12)'],
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
      path: '/services/office-solution',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 container mx-auto">
        <h1 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter mix-blend-difference text-white mb-8">
          <MaskTextReveal text="SERVICES" />
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start border-t border-black/10 dark:border-white/10 pt-8">
          <p className="text-xl md:text-2xl font-bold tracking-wide">
            3つの事業領域で、
            <span className="block text-gray-400">ビジネスを加速させる。</span>
          </p>
          <p className="text-sm md:text-base text-gray-500 max-w-md mt-4 md:mt-0">
            IT、環境、オフィスの3つの軸で、企業の課題解決をトータルサポート。
            ワンストップでのサービス提供により、お客様の負担を軽減し、
            本業への集中を支援します。
          </p>
        </div>
      </section>

      {/* SCROLL‑DRIVEN SERVICE SECTIONS */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA */}
      <section className="py-40 flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-black text-black dark:text-white">
        <h2 className="text-4xl md:text-6xl font-black mb-8">
          Start Your Project
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg">
          現状の課題やご要望をお聞かせください。
          最適なソリューションをご提案いたします。
        </p>
        <MagneticButton>
          <Link to="/contact">
            <Button className="bg-black text-white dark:bg-white dark:text-black font-bold text-lg px-12 py-8 rounded-full">
              CONTACT US
            </Button>
          </Link>
        </MagneticButton>
      </section>
    </div>
  );
};

export default Services;
