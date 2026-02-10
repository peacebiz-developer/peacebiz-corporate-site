import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, Zap, Heart, MapPin, Calendar, Building } from 'lucide-react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';

const About: React.FC = () => {
  // Timeline Data (Simplified)
  const history = [
    { year: '2008', title: '設立', desc: '東京都豊島区・福岡県福岡市にて株式会社ピース・ビズ設立(資本金300万円)。' },
    { year: '2009', title: '増資', desc: '資本金を500万円に増資。' },
    { year: '2012', title: '拠点拡大', desc: '仙台支店を開設。東北エリアへの進出。' },
    { year: '2016', title: '提携拡大', desc: 'BBIQ光、トークネット光などの代理店契約を締結。' },
    { year: '2020', title: '移転', desc: '仙台支店を青葉区立町へ移転、オフィス環境を強化。' },
    { year: '2025', title: '未来へ', desc: '仙台市国分町へ新オフィス移転。オープンイノベーションを加速。' },
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

      {/* 1. HERO: Architectural Vertical Text */}
      <section className="relative h-[80vh] flex items-center px-6 md:px-20 max-w-[1920px] mx-auto pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full h-full items-center">
          <div>
            <div className="overflow-hidden mb-6">
              <MaskTextReveal text="ABOUT US" className="text-[15vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter opacity-10 md:opacity-100" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              <MaskTextReveal text="最適な価値を、" />
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500"><MaskTextReveal text="最短距離で。" delay={0.2} /></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed">
              Peace Bizは、テクノロジーと情熱で企業の課題を解決するプロフェッショナル集団です。
              常識にとらわれない発想で、新しいビジネスの形を創造します。
            </p>
          </div>
          <div className="h-full w-full hidden md:block relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] grayscale hover:grayscale-0 transition-all duration-700">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            {/* Vertical Japanese line - Removed per request */}
            <div className="absolute right-0 top-0 h-full writing-vertical-rl text-xs tracking-[0.5em] py-20 border-r border-black/10 dark:border-white/10 pr-6 text-gray-400 opacity-0">
              {/* Hidden/Removed */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY: Structural Layout */}
      <section className="py-32 border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-brand-blue">Philosophy</h3>
              <h4 className="text-4xl font-black mb-8">
                <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400"><MaskTextReveal text="VISION" /></span>
                <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500"><MaskTextReveal text="MISSION" delay={0.1} /></span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500"><MaskTextReveal text="VALUE" delay={0.2} /></span>
              </h4>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: "Innovation", desc: "常に最新技術を追求し、お客様に最適なソリューションを提供し続ける。", color: "text-brand-blue" },
                { title: "Passion", desc: "お客様への情熱と、品質へのこだわりを大切にする。", color: "text-brand-orange" },
                { title: "Speed", desc: "変化の激しい時代において、迅速な意思決定と行動を重視する。", color: "text-brand-green" },
                { title: "Teamwork", desc: "個の力を最大化し、チームとして最高のパフォーマンスを発揮する。", color: "text-gray-900 dark:text-white" }
              ].map((item, i) => (
                <div key={i} className="border-t border-black/20 dark:border-white/20 pt-6">
                  <h5 className={`text-2xl font-bold mb-4 ${item.color}`}>{item.title}</h5>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HISTORY: Clean Timeline */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 max-w-4xl relative">
          <h3 className="text-8xl font-black absolute -top-20 -left-10 text-black/10 dark:text-white/10 z-0 select-none">HISTORY</h3>

          <div className="relative z-10 border-l border-black/20 dark:border-white/20 ml-4 md:ml-0 pl-8 md:pl-16 space-y-20 py-10">
            {history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 rounded-full bg-black dark:bg-white ring-4 ring-gray-50 dark:ring-zinc-900" />
                {/* Year Display - Made visible/blackish */}
                <span className="text-6xl md:text-8xl font-black text-black/10 dark:text-white/10 absolute -top-10 -left-6 -z-10 select-none">
                  {item.year}
                </span>
                <div className="mt-2">
                  {/* Explicit Year for readability */}
                  <span className="block text-2xl font-bold text-black dark:text-white mb-1">{item.year}</span>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-500 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. COMPANY INFO: Structured & Large */}
      <section className="py-32 container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row items-start gap-20">
          {/* Left: 50% Profile */}
          <div className="md:w-1/2 sticky top-32">
            <h3 className="text-5xl font-black mb-12 tracking-tighter">COMPANY</h3>

            <div className="grid md:grid-cols-[180px_1fr] gap-x-4 gap-y-8">
              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">会社名</div>
              <div className="text-2xl font-bold">株式会社ピース・ビズ</div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">代表者</div>
              <div className="text-lg font-medium leading-relaxed">
                代表取締役 羽深 慶太郎<br />
                取締役 黒江 寅彦<br />
                取締役 永野 元太
              </div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">事業内容</div>
              <div className="text-lg font-medium leading-relaxed">
                店舗・オフィス・施設の空間プロデュース<br />
                デジタルサイネージの企画・販売・施工<br />
                省エネソリューションの提案<br />
                通信インフラの整備
              </div>

              <div className="text-xs font-bold text-brand-blue tracking-widest uppercase py-1">設立</div>
              <div className="text-xl font-medium">2008年 5月 2日</div>

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
              { name: '東京本社', jp: 'Tokyo Head Office', address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F', phone: '03-3917-3587', img: '/tokyo-hq.png' },
              { name: '仙台支社', jp: 'Sendai Branch', address: '宮城県仙台市青葉区国分町1-4-9', phone: '022-722-1385', img: '/sendai-branch.png' },
              { name: '福岡支社', jp: 'Fukuoka Branch', address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F', phone: '092-233-5888', img: '/fukuoka-branch.png' }
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

    </div>
  );
};

export default About; 