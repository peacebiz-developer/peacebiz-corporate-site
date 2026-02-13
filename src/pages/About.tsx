import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { Vortex } from '../components/ui/vortex';
import { CanvasRevealEffect } from '../components/ui/canvas-reveal-effect';
import { LayoutTextFlip } from '../components/ui/layout-text-flip';
import { Timeline } from '../components/ui/timeline';

const PhilosophyIcon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const PhilosophyCard = ({
  title,
  desc,
  icon,
  children,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] w-full mx-auto p-4 relative h-[20rem] rounded-lg overflow-hidden"
    >
      <PhilosophyIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <PhilosophyIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <PhilosophyIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <PhilosophyIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center px-4">
        <div className="group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex flex-col items-center justify-center">
          {icon}
          <h5 className="text-xl font-bold mt-4 text-black dark:text-white">{title}</h5>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
        </div>
        <h5 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h5>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  // Timeline Data for Aceternity Timeline component
  const timelineData = [
    {
      title: '2008',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">設立</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            株式会社ピース・ビズを設立し、東京都豊島区、福岡県福岡市で事業を開始。
          </p>
        </div>
      ),
    },
    {
      title: '2009',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">増資</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            資本金を500万円に増資。
          </p>
        </div>
      ),
    },
    {
      title: '2012',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">拠点拡大</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            仙台支店を開設。東北エリアへの進出。
          </p>
        </div>
      ),
    },
    {
      title: '2016',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">提携拡大</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            BBIQ光、トークネット光などの代理店契約を締結。
          </p>
        </div>
      ),
    },
    {
      title: '2020',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">移転</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            仙台支店を青葉区立町へ移転、オフィス環境を強化。
          </p>
        </div>
      ),
    },
    {
      title: '2026',
      content: (
        <div>
          <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white mb-2">未来へ</h4>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            仙台市国分町へ新オフィス移転。オープンイノベーションを加速。
          </p>
        </div>
      ),
    },
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

      {/* 1. HERO: Vortex Background */}
      <section className="relative min-h-[80vh] overflow-hidden pt-20 pb-16">
        <Vortex
          backgroundColor="transparent"
          particleCount={500}
          baseHue={220}
          rangeSpeed={1.2}
          baseRadius={1}
          rangeRadius={2}
          containerClassName="absolute inset-0"
          className="w-full h-full"
        />
        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-20 max-w-[1920px] mx-auto">
          <div className="text-center">
            <div className="overflow-hidden mb-6 flex items-baseline justify-center gap-[0.3em]">
              <MaskTextReveal text="ABOUT" className="text-[10vw] md:text-[6rem] font-black leading-[0.8] tracking-tighter opacity-10 md:opacity-100" />
              <MaskTextReveal text="PEACE BIZ" className="text-[10vw] md:text-[6rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500" delay={0.1} />
            </div>
            <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-8 flex items-baseline justify-center gap-[0.15em] whitespace-nowrap">
              <MaskTextReveal text="最適な価値を、" />
              <MaskTextReveal text="最短距離で。" className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500" delay={0.2} />
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              私たちピース・ビズは、2008年に設立し、<br/>
              東京・福岡・仙台を拠点に、法人・店舗の事業環境を支えてきました。
              <br/><br/>
              IT／ECO／OFFICEの3領域を横断し、<br/>
              分断された課題を一つの戦略へ統合する。
              <br/><br/>
              ピース・ビズは、実行力で価値を届けるソリューションカンパニーです。
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY: Canvas Reveal Cards */}
      <section className="py-32 border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-brand-blue">Philosophy - 理念</h3>
            <div className="flex justify-center">
              <LayoutTextFlip
                text="私たちが目指す "
                words={["VISION", "MISSION", "VALUES"]}
                duration={3000}
                className="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white"
                wordClassName="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Innovation",
                desc: "常に最新技術を追求し、お客様に最適なソリューションを提供し続ける。",
                bgClass: "bg-blue-900",
                colors: [[59, 130, 246], [96, 165, 250]],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                ),
              },
              {
                title: "Passion",
                desc: "お客様への情熱と、品質へのこだわりを大切にする。",
                bgClass: "bg-rose-900",
                colors: [[236, 72, 153], [232, 121, 249]],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                  </svg>
                ),
              },
              {
                title: "Speed",
                desc: "変化の激しい時代において、迅速な意思決定と行動を重視する。",
                bgClass: "bg-emerald-900",
                colors: [[16, 185, 129], [52, 211, 153]],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                ),
              },
              {
                title: "Teamwork",
                desc: "個の力を最大化し、チームとして最高のパフォーマンスを発揮する。",
                bgClass: "bg-sky-900",
                colors: [[125, 211, 252]],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <PhilosophyCard key={i} title={item.title} desc={item.desc} icon={item.icon}>
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName={item.bgClass}
                  colors={item.colors}
                  dotSize={2}
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
              </PhilosophyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPANY INFO: Structured & Large */}
      <section className="py-32 container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row items-start gap-20">
          {/* Left: 50% Profile */}
          <div className="md:w-1/2 md:sticky md:top-32">
            <h3 className="text-5xl font-black mb-12 tracking-tighter">COMPANY</h3>

            <div className="grid md:grid-cols-[180px_1fr] gap-x-4 gap-y-8">
              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">会社名</div>
              <div className="text-2xl font-bold">株式会社ピース・ビズ</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">役員</div>
              <div className="text-lg font-medium leading-relaxed">
                代表取締役社長　大宮 尚憲<br />
                代表取締役社長　羽深 慶太郎<br />
                取締役部長　黒江 寅彦
              </div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">事業内容</div>
              <div className="text-lg font-medium leading-relaxed">
                空間演出／サイネージ（Prime Sign、LED Vision等）<br />
                設備／オフィス環境（空調・什器・通信等）<br />
                エネルギーソリューション（業務用エアコン等）<br />
                IT／アプリ提供（業務支援・システム構築等） <br />
                関連事業（演出商材・飲食店経営）
              </div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">設立</div>
              <div className="text-xl font-medium">2008年5月2日</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">決算期</div>
              <div className="text-xl font-medium">4月</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">資本金</div>
              <div className="text-xl font-medium">5,000,000円</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">顧問弁護士</div>
              <div className="text-lg font-medium">一番町綜合法律事務所／弁護士法人Associates</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">取引銀行</div>
              <div className="text-lg font-medium">西日本シティ銀行／きらぼし銀行／七十七銀行</div>
            </div>
          </div>

          {/* Right: 50% Offices */}
          <div className="md:w-1/2 space-y-24">
            {[
              { name: '東京本社', jp: 'Tokyo Head Office', address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F', phone: '03-3917-3587', img: `${process.env.PUBLIC_URL || ''}/tokyo-hq.webp` },
              { name: '仙台支社', jp: 'Sendai Branch', address: '宮城県仙台市青葉区国分町1-4-9', phone: '022-722-1385', img: `${process.env.PUBLIC_URL || ''}/sendai-branch.webp` },
              { name: '福岡支社', jp: 'Fukuoka Branch', address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F', phone: '092-263-5888', img: `${process.env.PUBLIC_URL || ''}/fukuoka-branch.webp` }
            ].map((office, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 rounded-sm">
                  <ParallaxImage
                    src={office.img}
                    alt={office.name}
                    className="w-full aspect-[16/9] bg-gray-200 grayscale group-hover:grayscale-0 transition-all duration-700 object-cover"
                    offset={20}
                  />
                </div>
                <h4 className="text-3xl font-black mb-2 flex items-baseline gap-4">
                  {office.name}
                  <span className="text-lg font-bold text-gray-400">{office.jp}</span>
                </h4>
                <p className="text-xl text-gray-500 mb-2">{office.address}</p>
                <p className="text-xl font-bold text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-6 group-hover:border-brand-blue transition-colors">
                  TEL: {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HISTORY: Aceternity Timeline */}
      <div className="relative w-full overflow-clip">
        <Timeline data={timelineData} />
      </div>

    </div>
  );
};

export default About;
