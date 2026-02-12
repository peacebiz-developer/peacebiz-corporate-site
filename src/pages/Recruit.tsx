import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient-animation';
import { DraggableCardBody, DraggableCardContainer } from '../components/ui/draggable-card';
import { WobbleCard } from '../components/ui/wobble-card';

const Recruit: React.FC = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. HERO: Full Screen with Gradient Animation */}
      <section className="relative h-screen w-full overflow-hidden">
        <BackgroundGradientAnimation
          containerClassName="absolute inset-0 h-full w-full"
        >
          <div className="absolute z-50 inset-0 flex items-center justify-center px-6 md:px-20 pointer-events-none">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-white/60 mb-8 uppercase">
                  RECRUIT ― 採用ページ ―
                </h2>
                <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.8]">
                  <span className="block bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/90 to-white/30">
                    RECRUIT
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed font-medium mt-10 drop-shadow-lg">
                  未来を創る、<br />
                  最短距離の挑戦。
                </p>
              </motion.div>
            </div>
          </div>
        </BackgroundGradientAnimation>
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
          <div className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium space-y-8 max-w-2xl">
            <p>
              Peace Bizは、単なるビジネスの遂行者ではありません。
              クライアントのビジネスを加速させ、社会に新しい価値を提供する「変革者」でありたいと考えています。
            </p>
            <p>
              求めるのは、指示を待つ人ではなく、自ら考え、行動し、結果を出す人。
              失敗を恐れず、常に挑戦し続ける情熱を持った仲間を募集しています。
            </p>
          </div>
        </div>
      </section>

      {/* 2.5. BENEFITS: Draggable Cards */}
      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
        <p className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-2xl font-black text-neutral-300 md:text-4xl dark:text-neutral-800">
          私たちと一緒に、<br />未来を創りませんか。
        </p>
        {[
          {
            title: "リモートワーク",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop",
            className: "absolute top-10 left-[20%] rotate-[-5deg]",
          },
          {
            title: "資格取得支援",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
            className: "absolute top-40 left-[25%] rotate-[-7deg]",
          },
          {
            title: "キャリアアップ",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
            className: "absolute top-5 left-[40%] rotate-[8deg]",
          },
          {
            title: "チームワーク",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
            className: "absolute top-32 left-[55%] rotate-[10deg]",
          },
          {
            title: "フレックス制度",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            className: "absolute top-20 right-[35%] rotate-[2deg]",
          },
          {
            title: "インセンティブ",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2671&auto=format&fit=crop",
            className: "absolute top-24 left-[45%] rotate-[-7deg]",
          },
          {
            title: "スキル習得",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
            className: "absolute top-8 left-[30%] rotate-[4deg]",
          },
        ].map((item, i) => (
          <DraggableCardBody key={i} className={item.className}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-md"
            />
            <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>

      {/* 3. WORKING STYLE: WobbleCards */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full relative z-10">
            {/* 1. フレックス & リモート（大きめ 2col） */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-900 min-h-[500px] lg:min-h-[300px]"
              backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop"
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  フレックス & リモートワーク
                </h2>
                <p className="mt-4 text-left text-base/6 text-neutral-200">
                  フレックスタイム制やリモートワークを導入し、一人ひとりが最もパフォーマンスを発揮できる環境を整えています。ライフスタイルに合わせた柔軟な働き方が可能です。
                </p>
              </div>
            </WobbleCard>

            {/* 2. 資格取得支援（1col） */}
            <WobbleCard
              containerClassName="col-span-1 min-h-[300px] bg-neutral-900"
              backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop"
            >
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                資格取得支援制度
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                ITパスポートや宅建など、業務に関連する資格の取得費用を会社が全額負担。スキルアップを全力でバックアップします。
              </p>
            </WobbleCard>

            {/* 3. インセンティブ（1col） */}
            <WobbleCard
              containerClassName="col-span-1 min-h-[300px] bg-neutral-900"
              backgroundImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2671&auto=format&fit=crop"
            >
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                成果連動インセンティブ
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                個人の成果がダイレクトに報酬に反映されるインセンティブ制度を導入。頑張った分だけしっかり還元されます。
              </p>
            </WobbleCard>

            {/* 4. キャリアパス（大きめ 2col） */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-neutral-900 min-h-[500px] lg:min-h-[300px]"
              backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
            >
              <div className="max-w-sm">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  スピード昇進 & キャリアパス
                </h2>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  年功序列ではなく、実力と成果で評価。入社1年目からリーダーに抜擢された実績も。若手でも裁量を持って挑戦できる環境です。
                </p>
              </div>
            </WobbleCard>

            {/* 5. チームワーク & 社内イベント（フル 3col） */}
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-3 bg-neutral-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
              backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
            >
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  チームワーク & 社内コミュニケーション
                </h2>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  部署や役職を超えたフラットな組織文化が自慢。定期的な社内イベントや懇親会を通じて、チームの結束力を高めています。風通しの良い環境で、アイデアが自由に飛び交います。
                </p>
              </div>
            </WobbleCard>
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
              <h3 className="text-2xl md:text-3xl font-bold">Ecoソリューション営業</h3>
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
