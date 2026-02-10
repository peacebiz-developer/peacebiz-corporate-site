import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Leaf, Building2, ArrowRight } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { MagneticButton } from '../components/ui/MagneticButton';

const Services: React.FC = () => {
  // Services Data
  const services = [
    {
      id: 'it',
      title: 'IT Solution',
      subtitle: 'Digital Transformation',
      desc: '店舗やオフィス空間に付加価値を提供する「Prime Sign」をはじめ、最新のデジタル技術で空間の価値を最大化します。',
      items: ['Prime Sign', 'LEDサイネージ', 'ホームページ・LP制作', '動画コンテンツ制作', 'デザイン制作'],
      icon: Monitor,
      color: 'text-brand-blue',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      path: '/services/primesign'
    },
    {
      id: 'eco',
      title: 'Eco Solution',
      subtitle: 'Sustainable Future',
      desc: '業務用エアコン、太陽光発電システム、新電力。コスト削減と環境貢献を両立する最適なプランをご提案。',
      items: ['業務用空調', '厨房機器', '太陽光発電システム', '蓄電池', '新電力'],
      icon: Leaf,
      color: 'text-brand-green',
      img: '/ecosolution.jpg', // Solar Image
      path: '/services/eco'
    },
    {
      id: 'office',
      title: 'Office Solution',
      subtitle: 'Workplace Design',
      desc: 'オフィスに欠かせない複合機・ビジネスフォンや電話・ネット回線など、働く人が輝く、快適で効率的なオフィス環境を構築します。',
      items: ['オフィスサプライ', 'インターネット回線', 'スマートフォン・タブレット'],
      icon: Building2,
      color: 'text-brand-orange',
      img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
      path: '/services/office'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. HERO: Minimalist Big Type */}
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

      {/* 2. STICKY SCROLL SECTION */}
      <div className="relative">
        {services.map((service, index) => (
          <ServiceSection key={index} service={service} index={index} />
        ))}
      </div>

      {/* 3. CTA */}
      <section className="py-40 flex flex-col items-center justify-center text-center px-6">
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

// Sub-component for Sticky Scroll Effect
const ServiceSection = ({ service, index }: { service: any, index: number }) => {
  return (
    <section className="min-h-screen flex items-center py-20 border-t border-black/10 dark:border-white/10 sticky top-0 bg-white dark:bg-black z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Left: Text Content */}
        <div className="order-2 md:order-1">
          <span className={`text-sm font-bold tracking-[0.3em] uppercase mb-4 block ${service.color}`}>0{index + 1} / {service.id}</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            {service.title}
            <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-2">{service.subtitle}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-lg">
            {service.desc}
          </p>

          <ul className="space-y-4 mb-10">
            {service.items.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-xl font-medium">
                <span className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                {item === "Prime Sign" ? (
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    {item}
                  </span>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>

          <MagneticButton>
            <Link to={service.path}>
              <Button variant="light" className="pl-0 text-lg font-bold group">
                Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </MagneticButton>
        </div>

        {/* Right: Parallax Image */}
        <div className="order-1 md:order-2 h-[50vh] md:h-[70vh] w-full relative overflow-hidden rounded-2xl md:rounded-none">
          <ParallaxImage
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover"
            offset={40}
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default Services;
