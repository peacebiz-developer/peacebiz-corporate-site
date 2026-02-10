import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Heart } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';

const Recruit: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. HERO: Typographic Impact */}
      {/* 1. HERO: Typographic Impact (Matching Contact Page) */}
      <section className="relative py-32 px-6 md:px-20 border-b border-black/10 dark:border-white/10 overflow-hidden min-h-[50vh] flex flex-col justify-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black" />

        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-gray-400 mb-8 uppercase">
              RECRUIT ― 採用情報 ―
            </h2>
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.8]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-500">
                RECRUIT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed font-medium mt-10">
              未来を創る、<br />
              最短距離の挑戦。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MESSAGE: Big Statement */}
      <section className="py-40 px-6 container mx-auto">
        <div className="max-w-5xl mx-auto">
          <p className="text-brand-blue font-bold tracking-widest uppercase mb-8">MESSAGE</p>
          <h2 className="text-4xl md:text-7xl font-black leading-tight mb-16">
            <span className="block mb-2">常識を疑い、</span>
            <span className="block mb-2 text-gray-400">最適解を導き出す。</span>
            <span className="block">それが私たちの流儀。</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium space-y-8">
              <p>
                Peace Bizは、単なるビジネスの遂行者ではありません。
                クライアントのビジネスを加速させ、社会に新しい価値を提供する「変革者」でありたいと考えています。
              </p>
              <p>
                求めるのは、指示を待つ人ではなく、自ら考え、行動し、結果を出す人。
                失敗を恐れず、常に挑戦し続ける情熱を持った仲間を募集しています。
              </p>
            </div>
            <div className="relative h-[400px] md:h-auto overflow-hidden rounded-lg">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team meeting"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKING STYLE: Cards */}
      <section className="py-32 bg-gray-50 dark:bg-zinc-900 border-y border-black/10 dark:border-white/10">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter opacity-10 md:opacity-100 text-gray-200 dark:text-zinc-800 md:absolute left-0 mt-[-2rem] w-full pointer-events-none z-0">
              WORK STYLE
            </h3>
            <h3 className="text-3xl md:text-5xl font-black relative z-10">
              働く環境と制度
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "FLEXIBILITY", sub: "柔軟な働き方", desc: "リモートワークやフレックス制度を活用し、成果を最大化する働き方を推奨しています。", icon: Zap },
              { title: "GROWTH", sub: "成長支援", desc: "書籍購入補助や資格取得支援など、個人のスキルアップを全力でバックアップします。", icon: Star },
              { title: "TEAMWORK", sub: "チームワーク", desc: "フラットな組織で、職種や役職を超えた活発なコミュニケーションを大切にしています。", icon: Heart }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-black p-10 border border-black/5 dark:border-white/10 hover:border-brand-blue transition-colors group">
                <item.icon className="w-10 h-10 mb-6 text-gray-300 group-hover:text-brand-blue transition-colors" />
                <h4 className="text-2xl font-black mb-2">{item.title}</h4>
                <p className="text-sm font-bold text-gray-400 mb-6">{item.sub}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GUIDELINES: Table Layout */}
      <section className="py-40 px-6 container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center tracking-tighter">REQUIREMENTS</h2>

        <div className="space-y-20">
          {/* Position 1 */}
          <div>
            <div className="flex items-baseline gap-4 mb-6 border-l-4 border-brand-blue pl-6">
              <h3 className="text-2xl md:text-3xl font-bold">ITソリューション営業</h3>
              <span className="text-sm font-bold bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">正社員</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-t border-black/10 dark:border-white/10 text-left border-collapse">
                <tbody>
                  {[
                    { label: "業務内容", content: "「PrimeSign」などのデジタルソリューション、プロジェクションマッピング等の提案営業。" },
                    { label: "応募資格", content: "学歴不問 / 未経験OK / 法人営業経験者優遇" },
                    { label: "勤務地", content: "東京本社（池袋） / リモートワーク可" },
                    { label: "給与", content: "月給 25万円〜 + インセンティブ（経験・能力を考慮）" },
                    { label: "勤務時間", content: "9:00 - 18:00（実働8時間 / フレックス制あり）" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <th className="py-6 px-4 w-1/3 md:w-1/4 font-bold text-gray-500 whitespace-nowrap">{row.label}</th>
                      <td className="py-6 px-4 font-medium">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Position 2 */}
          <div>
            <div className="flex items-baseline gap-4 mb-6 border-l-4 border-brand-green pl-6">
              <h3 className="text-2xl md:text-3xl font-bold">エコソリューション営業</h3>
              <span className="text-sm font-bold bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">正社員</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-t border-black/10 dark:border-white/10 text-left border-collapse">
                <tbody>
                  {[
                    { label: "業務内容", content: "太陽光発電システム、業務用エアコン、新電力などの省エネ提案営業。" },
                    { label: "応募資格", content: "普通自動車免許（AT限定可） / 未経験歓迎" },
                    { label: "勤務地", content: "仙台支社 / 福岡支社" },
                    { label: "給与", content: "月給 23万円〜 + 歩合給" },
                    { label: "勤務時間", content: "9:00 - 18:00" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <th className="py-6 px-4 w-1/3 md:w-1/4 font-bold text-gray-500 whitespace-nowrap">{row.label}</th>
                      <td className="py-6 px-4 font-medium">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA ENTRY */}
      <section className="py-40 bg-black text-white text-center px-6 selection:bg-brand-blue selection:text-white">
        <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter">
          <MaskTextReveal text="ENTRY" />
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto">
          あなたの可能性を、ここで試してみませんか？<br />
          まずはカジュアル面談から。
        </p>
        <Link to="/contact">
          <MagneticButton>
            <Button className="bg-white text-black text-xl font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform">
              応募フォームへ <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </MagneticButton>
        </Link>
      </section>

    </div>
  );
};

export default Recruit;