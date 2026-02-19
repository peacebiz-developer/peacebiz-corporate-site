import React from 'react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { Vortex } from '../components/ui/vortex';
import { LayoutTextFlip } from '../components/ui/layout-text-flip';
import { HorizontalTimeline } from '../components/ui/horizontal-timeline';
import { ThreeDMarquee } from '../components/ui/3d-marquee';
import { cn } from '../utils/cn';
import { LinkPreview } from '../components/ui/link-preview';
import { AnimatedFeatureSpotlight } from '../components/ui/animated-feature-spotlight';
import { Button } from '../components/ui/button';
import {
  aboutMarqueeImageOrder,
  aboutOffices,
  aboutPhilosophyCards,
  aboutTimelineData,
} from '../data/aboutPageData';

const About: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

      {/* 1. HERO: Left Text + Right 3D Marquee */}
      <section id="about-hero" className="relative h-screen overflow-x-clip scroll-mt-28">
        {/* Layer 0: Vortex Background */}
        <Vortex
          backgroundColor="transparent"
          particleCount={500}
          baseHue={220}
          rangeSpeed={1.2}
          baseRadius={1}
          rangeRadius={2}
          containerClassName="absolute inset-0 z-1"
          className="w-full h-full"
        />

        {/* Layer 1: 3D Marquee - absolute positioned right side */}
        <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full z-[1]">
          <ThreeDMarquee
            images={aboutMarqueeImageOrder.map(n => `${publicUrl}/about-image-carousel-${n}.webp`)}
            className="h-full w-full rounded-none"
          />
        </div>

        {/* Layer 2: Text Content - always on top */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:pl-[12%]">
            <div className="text-left max-w-2xl rounded-xl px-4 py-4 bg-white/75 dark:bg-black/75 backdrop-blur-md lg:bg-transparent lg:dark:bg-transparent lg:bg-gradient-to-br lg:from-white/50 lg:via-white/30 lg:to-transparent lg:dark:from-black/50 lg:dark:via-black/30 lg:dark:to-transparent lg:backdrop-blur-[2px]">
            <div className="mb-6 flex flex-row items-baseline gap-[0.3em] whitespace-nowrap">
              <MaskTextReveal text="ABOUT" className="text-[8vw] md:text-[5rem] font-black leading-[0.8] tracking-tighter" />
              <MaskTextReveal text="PEACE BIZ" className="text-[8vw] md:text-[5rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 pr-1" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-8 flex flex-wrap items-baseline gap-[0.15em]">
              <MaskTextReveal text="事業空間に、" />
              <MaskTextReveal text="最適なソリューションを。" className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500" />
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
              私たちピース・ビズは<br/>
              店舗やオフィスの”事業空間”に最適なソリューションを設計し、<br/>
              導入まで伴走するパートナーです。
              <br/><br/>
              2008年の設立以来、現場の課題に向き合い続け、<br/>
              IT・ECO・OFFICEの3領域から空間の価値を最適化してきました。
              <br/><br/>
              大切にしているのは、課題の表層に対する対処ではなく、原因の整理から導入後の運用までを含めた設計です。
              <br/><br/>
              現場の状況を踏まえて要件を定義し、最適な手段を選定・組み合わせることで、空間の快適性と事業成果の両立をめざします。
              <br/><br/>
              点ではなく、全体として機能する設計を。<br/>
              それが、事業の成果を持続的に支える、私たちのアプローチです。
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY: Background Overlay Cards */}
      <section id="about-philosophy" className="pt-48 md:pt-64 pb-32 scroll-mt-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-brand-blue">Philosophy - 理念</h3>
            <div className="flex justify-center">
              <LayoutTextFlip
                text="私たちの"
                words={["VISION", "MISSION", "VALUES"]}
                duration={3000}
                className="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white"
                wordClassName="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutPhilosophyCards.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "group w-full cursor-pointer overflow-hidden relative h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-6 border border-transparent dark:border-neutral-800",
                  "bg-cover bg-center",
                  "transition-all duration-500"
                )}
                style={{ backgroundImage: `url(${publicUrl}/${item.bgImageFile})` }}
              >
                {/* Hover image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{ backgroundImage: `url(${publicUrl}/${item.hoverImageFile})` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-[1]" />
                {/* Content */}
                <div className="relative z-10">
                  <h5 className="font-bold text-xl md:text-2xl text-gray-50">
                    {item.title}
                  </h5>
                  <p className="font-normal text-sm text-gray-50/80 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPANY INFO: Structured & Large */}
      <section id="about-company" className="pt-32 pb-16 container mx-auto px-6 max-w-[1400px] scroll-mt-28">
        <div className="flex flex-col md:flex-row items-start gap-20">
          {/* Left: 50% Profile */}
          <div className="md:w-1/2 md:sticky md:top-32">
            <h3 className="text-6xl font-black mb-12 tracking-tighter">COMPANY</h3>

            <div className="grid md:grid-cols-[180px_1fr] gap-x-0 gap-y-6">
              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">会社名</div>
              <div className="text-base font-normal">株式会社ピース・ビズ</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">役員</div>
              <div className="text-base font-normal leading-relaxed">
                代表取締役　大宮 尚憲<br />
                代表取締役　羽深 慶太郎<br />
                取締役　黒江 寅彦
              </div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">事業内容</div>
              <div className="text-base font-normal leading-relaxed">
                空間演出事業<br />
                オフィス環境事業<br />
                エネルギーソリューション事業<br />
                ITソリューション事業<br />
                飲食店経営
              </div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">設立</div>
              <div className="text-base font-normal">2008年5月2日</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">決算期</div>
              <div className="text-base font-normal">4月</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">資本金</div>
              <div className="text-base font-normal">5,000,000円</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">顧問弁護士</div>
              <div className="text-base font-normal">弁護士法人一番町綜合法律事務所／弁護士法人Associates</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">取引銀行</div>
              <div className="text-base font-normal">西日本シティ銀行／きらぼし銀行／七十七銀行</div>

              <div className="text-sm font-bold text-brand-blue tracking-widest uppercase py-1">グループ企業</div>
              <div className="text-base font-normal">
                <LinkPreview
                  url="https://rejoice-biz.com"
                  className="font-medium underline decoration-brand-blue/30 underline-offset-4 hover:decoration-brand-blue transition-colors"
                >
                  株式会社リジョイス・ビズ
                </LinkPreview>
              </div>
            </div>
          </div>

          {/* Right: 50% Offices */}
          <div className="md:w-1/2">
            {aboutOffices.map((office, i, arr) => (
              <React.Fragment key={i}>
                <AnimatedFeatureSpotlight
                  preheaderText={office.jp}
                  heading={office.name}
                  imageUrl={`${publicUrl}/${office.imageFile}`}
                  imageAlt={office.name}
                  className="border-0 rounded-none bg-transparent shadow-none"
                  description={
                    <div className="space-y-3">
                      <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">{office.address}</p>
                      <div className="flex items-center gap-2 text-[15px] font-medium text-brand-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {office.phone}
                      </div>
                    </div>
                  }
                  buttons={
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button size="lg" variant="outline" className="w-full" asChild>
                        <a href={`tel:${office.phone}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Call
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" className="w-full" asChild>
                        <a
                          href={office.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          Map
                        </a>
                      </Button>
                    </div>
                  }
                />
                {i < arr.length - 1 && (
                  <div className="my-10 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HISTORY: Horizontal Timeline */}
      <section id="about-history" className="scroll-mt-28">
        <HorizontalTimeline data={aboutTimelineData} />
      </section>

    </div>
  );
};

export default About;
