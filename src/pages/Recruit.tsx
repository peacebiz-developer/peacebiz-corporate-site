import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/ui/MagneticButton';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { DraggableCardBody, DraggableCardContainer } from '../components/ui/draggable-card';
import { WobbleCard } from '../components/ui/wobble-card';
import { Marquee } from '../components/ui/Marquee';
import { recruitVoiceColumns } from '../data/recruitVoiceData';

const Recruit: React.FC = () => {
  const containerRef = useRef(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroVisibleRef = useRef(true);
  const benefitsSectionRef = useRef<HTMLDivElement | null>(null);
  const workStyleSectionRef = useRef<HTMLElement | null>(null);
  const [showBenefitsCards, setShowBenefitsCards] = useState(false);
  const [showWorkStyleCards, setShowWorkStyleCards] = useState(false);

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
        if (heroVisibleRef.current) {
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

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setShowBenefitsCards(true);
      setShowWorkStyleCards(true);
      return;
    }

    const observers: IntersectionObserver[] = [];
    const createObserver = (
      element: Element | null,
      onVisible: () => void,
      rootMargin: string
    ) => {
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onVisible();
            observer.disconnect();
          }
        },
        { rootMargin, threshold: 0.01 }
      );
      observer.observe(element);
      observers.push(observer);
    };

    createObserver(benefitsSectionRef.current, () => setShowBenefitsCards(true), "500px 0px");
    createObserver(workStyleSectionRef.current, () => setShowWorkStyleCards(true), "500px 0px");

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. HERO: Full Screen with Video Background */}
      <section id="recruit-hero" className="relative h-screen w-full overflow-hidden scroll-mt-28">
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={`${process.env.PUBLIC_URL || ''}/recruit-background.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="absolute z-10 inset-0 flex items-center justify-center px-6 md:px-20 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-white/60 mb-8 uppercase">
                株式会社ピース・ビズ　-　採用ページ
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
      </section>

      {/* 2. MESSAGE + VOICE MARQUEE + MESSAGE 2 */}
      <div id="recruit-message" className="relative overflow-hidden scroll-mt-28">
        {/* MESSAGE 1: Left-aligned */}
        <section className="relative z-10 pt-40 pb-12 md:pb-16 px-6 container mx-auto content-auto">
        <div className="max-w-5xl mx-auto">
          <p className="text-brand-blue font-bold tracking-widest uppercase mb-8">MESSAGE</p>
          <h2 className="text-4xl md:text-7xl font-black leading-tight mb-16">
            <span className="block mb-2">常識を疑い、</span>
            <span className="block mb-2 text-gray-400">最適解を導き出す。</span>
            <span className="block">それが私たちの流儀。</span>
          </h2>
          <div className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium space-y-8 max-w-2xl">
            <p>
              私たちピース・ビズは、法人・店舗の現場課題に向き合い、<br/>提案から導入・運用までを前に進めるチームです。<br/><br/>
              顧客の課題を見つめ、<br/>質の高いソリューション営業を実現するための ”少数精鋭” 体制。<br/>だからこそ、変化を生み出す余地が多くあります。<br/>
            </p>
            <p>
              求めるのは、指示を待つ人ではなく、<br/>自ら考え、行動し、結果まで届ける人。<br/><br/>
              失敗を恐れず、学び直して挑戦し続けられる仲間を募集しています。
            </p>
          </div>
        </div>
      </section>

        {/* MESSAGE 2: Right-aligned */}
        <section className="relative z-10 pt-12 md:pt-16 pb-40 px-6 container mx-auto content-auto">
          <div className="max-w-5xl mx-auto md:ml-[15%] text-right">
          <h2 className="text-4xl md:text-7xl font-black leading-tight mb-16">
            <span className="block mb-2">仕組みで伸ばし、</span>
            <span className="block mb-2 text-gray-400">現場で磨き、</span>
            <span className="block">価値で応える。</span>
          </h2>
          <div className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium space-y-8 max-w-2xl ml-auto text-right">
            <p>
            私たちが大切にしているのは、年齢や肩書きではなく、<br/>「前に進めたかどうか」。
            <br/><br/>
            数字だけでなく、提案の質を上げた、課題の捉え方が深くなった、<br/>
            チームの成果に繋がる改善を作った―<br/>
            そんな ”価値を増やす行動” も重要な成果です。
            <br/><br/>
            少数精鋭だからこそ、任される範囲は早い段階から広がります。
            <br/><br/>
            考えて動き、学び直し、成果まで届けられる人。<br/>
            そんなあなたと、一緒に前に進みたいと思っています。
            <br/><br/>
            変化を楽しみ、仲間と一緒に成長したい人を歓迎します。
            </p>
          </div>
        </div>
      </section>

        {/* VOICE Marquee — from MESSAGE 1 right margin to MESSAGE 2 left margin */}
        <div
          className="absolute inset-0 z-0 pointer-events-none select-none hidden md:block"
          style={{
            maskImage: 'radial-gradient(ellipse 50% 55% at 50% 50%, black 25%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 55% at 50% 50%, black 25%, transparent 65%)',
          }}
        >
          <div
            className="absolute flex gap-5"
            style={{
              top: '-15%',
              left: '22%',
              bottom: '-15%',
              width: '50%',
              transform: 'rotate(14deg) translateZ(0)',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            {recruitVoiceColumns.map((col, ci) => (
              <Marquee
                key={ci}
                vertical
                reverse={ci % 2 === 1}
                className="flex-1 [--gap:1rem] p-0 pointer-events-auto [contain:content]"
                style={{ '--duration': `${26 + ci * 8}s` } as React.CSSProperties}
                pauseOnHover
                repeat={2}
              >
                {col.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-xl border border-black/6 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 w-full"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <img
                        src={v.photo}
                        alt={v.name}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-black dark:text-white truncate">{v.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{v.role}</p>
                      </div>
                      <span className="ml-auto text-[0.65rem] font-bold text-gray-300 dark:text-gray-600 whitespace-nowrap">{v.years}</span>
                    </div>
                    <p className="text-[0.8rem] leading-relaxed text-gray-500 dark:text-gray-400">{v.quote}</p>
                  </div>
                ))}
              </Marquee>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5. BENEFITS: Draggable Cards */}
      <div id="recruit-benefits" ref={benefitsSectionRef} className="scroll-mt-28">
        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip content-auto">
          <p className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-2xl font-black text-neutral-300 md:text-4xl dark:text-neutral-800">
            私たちと一緒に、<br />未来を創りませんか。
          </p>
          {showBenefitsCards && [
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
      </div>

      {/* 3. WORKING STYLE: WobbleCards */}
      <section id="recruit-workstyle" ref={workStyleSectionRef} className="py-32 bg-gray-50 dark:bg-zinc-900 border-y border-black/10 dark:border-white/10 content-auto scroll-mt-28">
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
            {showWorkStyleCards && <WobbleCard
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
            </WobbleCard>}

            {/* 2. 資格取得支援（1col） */}
            {showWorkStyleCards && <WobbleCard
              containerClassName="col-span-1 min-h-[300px] bg-neutral-900"
              backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop"
            >
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                資格取得支援制度
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                ITパスポートや宅建など、業務に関連する資格の取得費用を会社が全額負担。スキルアップを全力でバックアップします。
              </p>
            </WobbleCard>}

            {/* 3. インセンティブ（1col） */}
            {showWorkStyleCards && <WobbleCard
              containerClassName="col-span-1 min-h-[300px] bg-neutral-900"
              backgroundImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2671&auto=format&fit=crop"
            >
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                成果連動インセンティブ
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                個人の成果がダイレクトに報酬に反映されるインセンティブ制度を導入。頑張った分だけしっかり還元されます。
              </p>
            </WobbleCard>}

            {/* 4. キャリアパス（大きめ 2col） */}
            {showWorkStyleCards && <WobbleCard
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
            </WobbleCard>}

            {/* 5. チームワーク & 社内イベント（フル 3col） */}
            {showWorkStyleCards && <WobbleCard
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
            </WobbleCard>}
          </div>
        </div>
      </section>

      {/* 4. GUIDELINES: Table Layout */}
      <section id="recruit-requirements" className="py-40 px-6 container mx-auto max-w-6xl content-auto scroll-mt-28">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center tracking-tighter">REQUIREMENTS</h2>

        <div className="space-y-20">
          {/* Position 1: ITソリューション営業 */}
          <div>
            <div className="flex items-baseline gap-4 mb-6 border-l-4 border-brand-blue pl-6">
              <h3 className="text-2xl md:text-3xl font-bold">ITソリューション営業</h3>
              <span className="text-sm font-bold bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">正社員</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-t border-black/10 dark:border-white/10 text-left border-collapse">
                <tbody>
                  {([
                    { label: "業務内容", content: "PrimeSignをはじめとするデジタルサイネージ・映像ソリューションの法人向け提案営業" },
                    { label: "営業スタイル", content: "法人向けの提案型営業が中心。\n新規・既存の比率は時期や案件状況により変動します" },
                    { label: "応募資格", content: "学歴不問 / 未経験可（法人営業の経験があれば活かせます）" },
                    { label: "入社後の流れ", content: (
                      <ul className="list-disc list-inside space-y-1 text-[0.95rem]">
                        <li>商材知識と業界理解（座学 + 現場同行）</li>
                        <li>先輩との同行営業で提案の流れを習得</li>
                        <li>小規模案件から担当し、段階的に独り立ちへ</li>
                      </ul>
                    ) },
                    { label: "求める人物像", content: (
                      <ul className="list-disc list-inside space-y-1 text-[0.95rem]">
                        <li>自分で考えて動ける方</li>
                        <li>わからないことを素直に聞ける方</li>
                        <li>結果だけでなくプロセスも大事にできる方</li>
                      </ul>
                    ) },
                    { label: "勤務地", content: "東京本社 / 仙台支社 / 福岡支社" },
                    { label: "給与", content: "月給 25万円〜 + インセンティブ（経験・能力を考慮のうえ決定）" },
                    { label: "勤務時間", content: "9:00 - 18:00（実働8時間 / 休憩1時間）※希望に応じてフレックス / リモートワーク" },
                  ] as { label: string; content: React.ReactNode }[]).map((row, i) => (
                    <tr key={i} className="border-b border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <th className="py-6 px-4 w-1/3 md:w-1/4 font-bold text-gray-500 whitespace-nowrap align-top">{row.label}</th>
                      <td className="py-6 px-4 font-medium">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Position 2: Ecoソリューション営業 */}
          <div>
            <div className="flex items-baseline gap-4 mb-6 border-l-4 border-brand-green pl-6">
              <h3 className="text-2xl md:text-3xl font-bold">Ecoソリューション営業</h3>
              <span className="text-sm font-bold bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full">正社員</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-t border-black/10 dark:border-white/10 text-left border-collapse">
                <tbody>
                  {([
                    { label: "業務内容", content: "太陽光発電システム・業務用空調・新電力などの省エネルギー関連商材の法人向け提案営業" },
                    { label: "営業スタイル", content: "法人・店舗への訪問提案が中心。エリアや時期により新規開拓の比重が変わります" },
                    { label: "応募資格", content: "普通自動車免許（AT限定可） / 未経験歓迎" },
                    { label: "入社後の流れ", content: (
                      <ul className="list-disc list-inside space-y-1 text-[0.95rem]">
                        <li>商材の基礎知識と補助金制度の概要を学習</li>
                        <li>先輩との同行で現場調査・ヒアリングを経験</li>
                        <li>担当エリアを持ち、提案〜見積作成まで一連の流れを習得</li>
                      </ul>
                    ) },
                    { label: "求める人物像", content: (
                      <ul className="list-disc list-inside space-y-1 text-[0.95rem]">
                        <li>フットワーク軽く動ける方</li>
                        <li>数字に対して誠実に向き合える方</li>
                        <li>地道な積み重ねを続けられる方</li>
                      </ul>
                    ) },
                    { label: "勤務地", content: "福岡支社" },
                    { label: "給与", content: "月給 25万円〜 + 歩合給（経験・能力を考慮のうえ決定）" },
                    { label: "勤務時間", content: "9:00 - 18:00（実働8時間 / 休憩1時間）" },
                  ] as { label: string; content: React.ReactNode }[]).map((row, i) => (
                    <tr key={i} className="border-b border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <th className="py-6 px-4 w-1/3 md:w-1/4 font-bold text-gray-500 whitespace-nowrap align-top">{row.label}</th>
                      <td className="py-6 px-4 font-medium">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selection Flow */}
          <div className="pt-16 md:pt-24">
            <div className="mb-12 md:mb-16 text-center">
              <p className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">Selection Flow</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">選考の流れ</h3>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[calc(16.67%-0.5rem)] right-[calc(16.67%-0.5rem)] h-px bg-gradient-to-r from-brand-blue/30 via-brand-blue/20 to-brand-blue/30" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                {[
                  { num: '01', title: '書類選考', desc: '応募書類をもとに、経験やお人柄を確認します。' },
                  { num: '02', title: '面接（1〜2回）', desc: '対面またはオンラインで、お互いの理解を深めます。' },
                  { num: '03', title: '内定', desc: '条件面談を経て、入社日を決定します。' },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center px-4">
                    <div className="relative z-10 w-16 h-16 rounded-full border-2 border-brand-blue/20 dark:border-brand-blue/30 bg-white dark:bg-black flex items-center justify-center mb-5">
                      <span className="text-lg font-black tracking-tight text-brand-blue">{step.num}</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 tracking-tight">{step.title}</h4>
                    <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed max-w-[200px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10 md:mt-14">
              ※ カジュアル面談も受け付けています。お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA ENTRY */}
      <section id="recruit-entry" className="py-40 bg-black text-white text-center px-6 selection:bg-brand-blue selection:text-white content-auto scroll-mt-28">
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
