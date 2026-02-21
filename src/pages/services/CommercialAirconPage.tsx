import React, { useLayoutEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  type LucideIcon,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileCheck,
  Phone,
  Scale,
  Settings,
  ShieldCheck,
  Star,
  Truck,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { Marquee } from '../../components/ui/Marquee';
import { MasonryGrid } from '../../components/ui/MasonryGrid';
import { BentoGridShowcase } from '../../components/ui/BentoGridShowcase';
import { assetPaths } from '../../config/assets';
import { BASE_URL } from '../../config/site';
import { ROUTES } from '../../config/routes';
import { getStaticRouteMeta, toCanonicalUrl } from '../../config/staticRouteMeta';

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const BRANDS = ['DAIKIN', 'MITSUBISHI', 'HITACHI', 'Panasonic', 'TOSHIBA'];

const checkSigns = [
  { title: '冷暖房の効きムラ', desc: '部屋全体が均一に冷えない・暖まらない状態が続いている。' },
  { title: '異音・異臭がする', desc: '運転中にガタガタ・カタカタ等の異音、またはカビ臭・焦げ臭がある。' },
  { title: '水漏れが発生している', desc: 'ドレンパンや配管周りからの水漏れが頻繁に起きる。' },
  { title: '電気代が上がった', desc: '使い方を変えていないのに、電力料金が以前より増えてきた。' },
  { title: '修理が増えてきた', desc: '部品交換や修理の頻度が上がり、繁忙期の停止リスクが不安。' },
  { title: '室内環境が追いつかない', desc: '厨房の排熱や人の出入りが多く、空調が能力不足になっている。' },
];

const benefits: Array<{ title: string; desc: string; icon: LucideIcon; stat: string; statLabel: string }> = [
  {
    title: '省エネ',
    desc: '運転効率（APF）の改善により、電力負担を最適化します。削減幅は使用状況・既設機種により異なります。',
    icon: Zap,
    stat: 'APF',
    statLabel: '効率改善',
  },
  {
    title: '快適',
    desc: '気流制御や温度センシングの進化で、ムラの少ない快適な空間を実現します。',
    icon: Wind,
    stat: '360°',
    statLabel: '気流制御',
  },
  {
    title: '安心',
    desc: '故障リスクを低減し、突発停止の不安を解消。計画的な更新サイクルをつくりやすくなります。',
    icon: ShieldCheck,
    stat: '10年',
    statLabel: '長寿命設計',
  },
  {
    title: '法令・管理',
    desc: 'フロン排出抑制法に基づく簡易点検・定期点検・記録保存・回収の整合を、更新工事の中で整えます。',
    icon: Scale,
    stat: '準拠',
    statLabel: 'フロン法対応',
  },
];

const scopeItems = [
  {
    title: '対応機種',
    desc: '天井カセット形・壁掛形・床置形・ダクト形・ビル用マルチなど、主要メーカーの業務用機器に幅広く対応します。',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: '現地調査',
    desc: '冷暖房能力・配管経路・電源容量・搬入経路を確認し、現場条件に合った機器選定を行います。',
    icon: ClipboardList,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: '施工',
    desc: '営業への影響を最小化するため、夜間工事や休業日施工をご提案。短工期での入替を目指します。',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: '撤去・処分・フロン回収',
    desc: '既設機器の撤去・廃棄処分に加え、フロン排出抑制法に準拠した冷媒回収まで一括で対応します。',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1770&auto=format&fit=crop',
  },
];

const flowSteps = [
  { num: '01', title: 'ヒアリング', desc: '現状の課題やご要望を伺い、最適なご提案の土台をつくります。', icon: Phone },
  { num: '02', title: '選定・見積り', desc: '現場条件に合った機器と費用をご提案します。', icon: ClipboardList },
  { num: '03', title: '契約', desc: '内容にご納得いただけましたら、正式にご契約いただきます。', icon: FileCheck },
  { num: '04', title: '現地調査', desc: '設置環境・配管・電源を現地で確認します。', icon: Settings },
  { num: '05', title: '試運転・引渡', desc: '動作確認後、操作方法をご説明します。', icon: ShieldCheck },
  { num: '06', title: '運用サポート', desc: 'メンテナンスや点検のご相談を承ります。', icon: Wrench },
];

const costFactors = [
  '冷暖房能力（馬力・台数）',
  '設置方式（天カセ・壁掛・ダクト等）',
  '既設配管の流用可否',
  '足場・高所作業の有無',
  '搬入経路の条件（階段・クレーン等）',
  '夜間・休日施工の要否',
  '撤去処分・フロン回収費用',
];

const caseStudies = [
  {
    title: '飲食チェーン店舗',
    tag: '天井カセット形 3台',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: 'オフィスビル 5F',
    tag: 'ビル用マルチ',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: '美容サロン',
    tag: '壁掛形 2台',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: 'クリニック',
    tag: '天井カセット形 4台',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: 'アパレルショップ',
    tag: 'ダクト形',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1770&auto=format&fit=crop',
  },
  {
    title: '学習塾',
    tag: '壁掛形 6台',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1770&auto=format&fit=crop',
  },
];

const faqItems = [
  {
    q: '概算費用はいつ頃わかりますか？',
    a: 'ヒアリング内容をもとに、目安の概算は数営業日以内にご提示可能です。正式なお見積りは現地調査後となります。',
  },
  {
    q: '営業しながら工事できますか？',
    a: 'はい。夜間工事や休業日施工のご提案が可能です。店舗・テナントの営業スケジュールに合わせた工程を調整します。',
  },
  {
    q: '工期の目安を教えてください。',
    a: '1〜2台の入替であれば1〜2日が目安です。台数や配管工事の範囲、搬入条件により変動しますので、現地調査後に具体的な工期をお伝えします。',
  },
  {
    q: '修理と入替、どちらが良いですか？',
    a: '設置から10年以上経過している場合や、修理費用が高額になる場合は入替をおすすめするケースが多いです。状況を伺い、比較のご提案も可能です。',
  },
  {
    q: 'フロンの点検・回収はどうなりますか？',
    a: 'フロン排出抑制法に基づき、更新工事の際に既設機器の冷媒回収を実施します。点検記録の整理についてもご案内可能です。',
  },
  {
    q: 'メーカーの指定はできますか？',
    a: 'ダイキン・三菱電機・日立・パナソニック・東芝など、主要メーカーから現場条件に合った機種を選定します。ご指定がある場合もお知らせください。',
  },
  {
    q: '既設の配管は流用できますか？',
    a: '配管の状態や径、冷媒の種類によります。現地調査で確認し、流用の可否と費用への影響をお伝えします。',
  },
  {
    q: '更新後のメンテナンスは対応していますか？',
    a: 'はい。定期点検やフィルター清掃、故障対応など、導入後のメンテナンスもご相談いただけます。',
  },
];

const sceneVisuals = [
  {
    image:
      'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=1770&auto=format&fit=crop',
    title: '現地調査・診断',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1770&auto=format&fit=crop',
    title: '機器選定・施工',
  },
];

const FAQItem: React.FC<{ item: (typeof faqItems)[number]; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      variants={fadeInUp}
      className="border-b border-black/8 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left md:py-8"
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0 text-sm font-mono tracking-wider text-brand-green">
            Q{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-bold leading-relaxed text-gray-800 md:text-lg">
            {item.q}
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-8">
          <p className="text-base leading-8 text-gray-500 pl-10 md:pl-12">{item.a}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CommercialAircon: React.FC = () => {
  const routeMeta = getStaticRouteMeta(ROUTES.servicesEcoCommercialAircon);
  const canonicalUrl = toCanonicalUrl(ROUTES.servicesEcoCommercialAircon);

  const [activeScopeIndex, setActiveScopeIndex] = useState(0);
  const handleScopeSelect = useCallback((i: number) => setActiveScopeIndex(i), []);

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useLayoutEffect(() => {
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${BASE_URL}${ROUTES.home}` },
        { '@type': 'ListItem', position: 2, name: 'サービス', item: `${BASE_URL}${ROUTES.services}` },
        { '@type': 'ListItem', position: 3, name: 'Eco Solution', item: `${BASE_URL}${ROUTES.servicesEco}` },
        {
          '@type': 'ListItem',
          position: 4,
          name: routeMeta?.title || '業務用エアコン更新',
          item: canonicalUrl,
        },
      ],
    };

    const upsertJsonLd = (id: string, payload: object) => {
      let node = document.getElementById(id) as HTMLScriptElement | null;
      if (!node) {
        node = document.createElement('script');
        node.type = 'application/ld+json';
        node.id = id;
        document.head.appendChild(node);
      }
      node.textContent = JSON.stringify(payload);
    };

    upsertJsonLd('commercial-aircon-faq-jsonld', faqJsonLd);
    upsertJsonLd('commercial-aircon-breadcrumb-jsonld', breadcrumbJsonLd);

    return () => {
      document.getElementById('commercial-aircon-faq-jsonld')?.remove();
      document.getElementById('commercial-aircon-breadcrumb-jsonld')?.remove();
    };
  }, [canonicalUrl, routeMeta?.title]);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ═══════════════════════════════════
          HERO — Centered, compelling copy
      ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src={assetPaths.services.airConditioner}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white" />
        </motion.div>

        <motion.div
          className="relative z-10 flex min-h-screen flex-col items-start justify-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
            <nav aria-label="パンくずリスト" className="mb-12">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-black/40">
                <li>
                  <Link to={ROUTES.home} className="transition-colors hover:text-black">Home</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li>
                  <Link to={ROUTES.services} className="transition-colors hover:text-black">Services</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li>
                  <Link to={ROUTES.servicesEco} className="transition-colors hover:text-black">Eco Solution</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-black/70">Commercial Aircon</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white/80 px-5 py-2 backdrop-blur-md">
                <Star className="h-4 w-4 text-brand-green" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
                  Commercial Aircon
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[0.92] tracking-tighter md:text-7xl lg:text-[6.5rem]">
                止まらない空調を、
                <br />
                <span className="bg-gradient-to-r from-brand-green to-emerald-400 bg-clip-text text-transparent">
                  止まらない経営を。
                </span>
              </h1>

              <div className="mt-8 max-w-2xl">
                <MaskTextReveal
                  text="現地調査から機器選定・施工・フロン回収まで一括対応。店舗やオフィスの空調を、ダウンタイムなく最新鋭へ。"
                  className="text-lg leading-relaxed text-black/55 md:text-xl"
                />
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton>
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-full bg-brand-green px-9 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-green/90"
                  >
                    現地調査を依頼
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-9 py-4 text-base font-bold text-black backdrop-blur-md transition-colors hover:bg-white"
                >
                  <ClipboardList className="h-4 w-4 text-brand-green" />
                  概算見積を相談
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-64 bg-gradient-to-t from-white via-white/95 via-[40%] to-transparent" />
      </section>

      {/* ═══════════════════════════════════
          BRAND MARQUEE — Seamlessly connected
      ═══════════════════════════════════ */}
      <section className="relative z-10 -mt-16 overflow-hidden bg-white py-8 md:py-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent md:w-48" />
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem] md:[--gap:5rem]">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="select-none whitespace-nowrap text-3xl font-black tracking-[0.15em] text-black/8 md:text-5xl"
            >
              {brand}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ═══════════════════════════════════
          BENTO GRID — Service overview
      ═══════════════════════════════════ */}
      <section className="bg-white px-6 pb-28 pt-16 md:px-16 md:pb-36 md:pt-24 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Service Overview</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">ワンストップで、最適解へ。</h2>
          </motion.div>

          <BentoGridShowcase
            integrations={
              <div className="flex h-full flex-col justify-between rounded-2xl border border-black/5 bg-gray-50/60 p-7 md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3">Supported Brands</p>
                  <p className="text-base text-gray-500 leading-relaxed">主要5メーカーの業務用エアコンに対応。最適な機器を選定します。</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {BRANDS.map((b) => (
                    <span key={b} className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-gray-700 shadow-sm">{b}</span>
                  ))}
                </div>
              </div>
            }
            mainFeature={
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl">
                <img
                  src={sceneVisuals[0].image}
                  alt="現地調査"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={800}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Main Service</p>
                  <h3 className="text-2xl font-black text-white tracking-tight md:text-3xl">現地調査から<br />施工・運用まで</h3>
                  <p className="mt-3 text-base text-white/60 leading-relaxed">入替に関わるすべての工程を、ワンストップで対応します。</p>
                </div>
              </div>
            }
            featureTags={
              <div className="flex h-full flex-col justify-center rounded-2xl border border-black/5 bg-gray-50/60 p-7 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-4">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {['夜間施工可', 'フロン回収', '全メーカー対応', 'リース可', '短工期'].map((tag) => (
                    <span key={tag} className="rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-sm font-bold text-brand-green">{tag}</span>
                  ))}
                </div>
              </div>
            }
            secondaryFeature={
              <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-green p-7 md:p-8">
                <Wind className="h-8 w-8 text-white/80 mb-4" />
                <h3 className="text-xl font-black text-white tracking-tight md:text-2xl">快適な空間を、<br />省エネで実現</h3>
                <p className="mt-3 text-base text-white/60 leading-relaxed">最新の気流制御で、ムラのない温度環境を実現します。</p>
              </div>
            }
            statistic={
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-black/5 bg-gray-50/60 p-7 text-center md:p-8">
                <p className="text-7xl font-black text-brand-green md:text-8xl">5</p>
                <p className="mt-2 text-lg font-bold text-gray-800">メーカー対応</p>
                <p className="mt-3 text-base text-gray-400 leading-relaxed">ダイキン・三菱電機・日立・パナソニック・東芝</p>
                <div className="mt-6 h-px w-16 bg-brand-green/30" />
                <p className="mt-6 text-5xl font-black text-brand-green md:text-6xl">24h</p>
                <p className="mt-2 text-lg font-bold text-gray-800">夜間施工対応</p>
                <p className="mt-3 text-base text-gray-400 leading-relaxed">営業への影響を最小限に</p>
              </div>
            }
            journey={
              <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl">
                <img
                  src={sceneVisuals[1].image}
                  alt="施工完了"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={800}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="relative z-10 flex h-full items-center p-7 md:p-8">
                  <div>
                    <Building2 className="h-6 w-6 text-white/80 mb-3" />
                    <h3 className="text-xl font-black text-white tracking-tight md:text-2xl">導入後も安心</h3>
                    <p className="mt-2 text-base text-white/60">定期点検・メンテナンスまでサポート</p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* ═══════════════════════════════════
          WARNING SIGNS — MasonryGrid layout
      ═══════════════════════════════════ */}
      <section id="warning-signs" className="scroll-mt-32 bg-white px-6 pb-28 pt-8 md:px-16 md:pb-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Warning Signs</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
              こんな症状、<br className="md:hidden" />ありませんか？
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              以下のサインが複数あてはまる場合、入替を検討するタイミングかもしれません。
            </p>
          </motion.div>

          <MasonryGrid columns={3} gap={5} className="hidden md:block">
            {checkSigns.map((item, i) => {
              const isLarge = i === 0 || i === 3;
              return (
                <div
                  key={item.title}
                  className={`group rounded-2xl border border-black/5 bg-gray-50/50 p-7 transition-colors hover:border-brand-green/20 hover:bg-brand-green/[0.03] md:p-9 ${
                    isLarge ? 'pb-12 md:pb-16' : ''
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/8 transition-colors group-hover:bg-brand-green/15">
                      <AlertTriangle className="h-4.5 w-4.5 text-brand-green" />
                    </div>
                    <span className="text-xs font-mono tracking-wider text-black/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-800">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </MasonryGrid>

          <div className="space-y-3 md:hidden">
            {checkSigns.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
                className="group flex items-start gap-4 rounded-xl border border-black/5 bg-gray-50/50 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/8">
                  <AlertTriangle className="h-4 w-4 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-gray-800">{item.title}</h3>
                  <p className="mt-1 text-base leading-7 text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BENEFITS — Highlight banner + dividers
      ═══════════════════════════════════ */}
      <section id="benefits" className="scroll-mt-32 bg-white px-6 pb-28 md:px-16 md:pb-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Benefits</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">更新で変わること</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green to-emerald-600 md:mb-16"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: '128px 128px',
              }}
            />
            <div className="relative flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:gap-16 md:p-14">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm md:h-28 md:w-28">
                <Zap className="h-10 w-10 text-white md:h-14 md:w-14" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Top Benefit</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{benefits[0].title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{benefits[0].desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-5xl font-black text-white md:text-7xl">{benefits[0].stat}</p>
                <p className="text-base font-bold text-white/50">{benefits[0].statLabel}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-0 divide-y divide-black/6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-y-0">
            {benefits.slice(1).map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeInUp}
                className="py-8 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/8">
                    <item.icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-brand-green">{item.stat}</p>
                    <p className="text-xs font-mono tracking-wider text-gray-400">{item.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-800">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VISUAL FOCUS — Full-bleed, taller
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-48 bg-gradient-to-b from-white via-white/90 via-[35%] to-transparent" />
        <div className="relative h-[65vh] md:h-[80vh]">
          <img
            src={sceneVisuals[1].image}
            alt={sceneVisuals[1].title}
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeInUp}
                className="max-w-2xl"
              >
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">Visual Focus</p>
                <h3 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
                  空間全体の<br />空調品質を<br />再設計。
                </h3>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
                  調査・選定・施工・運用サポートを一連で整えることで、現場に合わせた空調更新を実現します。
                </p>
                <div className="mt-8">
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center gap-2 text-base font-bold tracking-[0.1em] uppercase text-white/80 transition-colors hover:text-white"
                  >
                    お問い合わせ <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-white via-white/90 via-[35%] to-transparent" />
      </section>

      {/* ═══════════════════════════════════
          COVERAGE — Interactive image gallery
      ═══════════════════════════════════ */}
      <section id="coverage" className="scroll-mt-32 bg-white px-6 py-24 md:px-16 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Coverage</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">対応範囲</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              調査から撤去・フロン回収まで、入替に関わる工程をワンストップで対応します。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUp}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 lg:aspect-auto lg:min-h-[520px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeScopeIndex}
                  src={scopeItems[activeScopeIndex].image}
                  alt={scopeItems[activeScopeIndex].title}
                  className="absolute inset-0 h-full w-full object-cover"
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeScopeIndex}
                    className="text-xl font-bold text-white md:text-2xl"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    {scopeItems[activeScopeIndex].title}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="absolute bottom-7 right-7 z-10 flex gap-1.5">
                {scopeItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScopeSelect(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeScopeIndex ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`${scopeItems[i].title}を表示`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="space-y-0">
              {scopeItems.map((item, i) => (
                <motion.button
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeInUp}
                  onClick={() => handleScopeSelect(i)}
                  className={`group flex w-full items-start gap-5 border-b border-black/6 py-7 text-left transition-all md:gap-6 md:py-8 ${
                    activeScopeIndex === i
                      ? 'bg-brand-green/[0.03]'
                      : 'hover:bg-gray-50/60'
                  }`}
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors md:h-16 md:w-16 ${
                    activeScopeIndex === i
                      ? 'bg-brand-green text-white'
                      : 'bg-brand-green/8 text-brand-green group-hover:bg-brand-green/15'
                  }`}>
                    <item.icon className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`text-lg font-bold tracking-tight md:text-xl ${
                        activeScopeIndex === i ? 'text-brand-green' : 'text-gray-800'
                      }`}>
                        {item.title}
                      </h3>
                      <motion.div
                        animate={{ x: activeScopeIndex === i ? 4 : 0 }}
                        className={`transition-opacity ${activeScopeIndex === i ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <ArrowRight className="h-4 w-4 text-brand-green" />
                      </motion.div>
                    </div>
                    <p className="mt-2 text-base leading-7 text-gray-400">{item.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CASE STUDIES — MasonryGrid
      ═══════════════════════════════════ */}
      <section className="bg-white px-6 pb-28 md:px-16 md:pb-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Case Studies</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">施工事例</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              さまざまな業種・規模の空調更新を手がけています。
            </p>
          </motion.div>

          <MasonryGrid columns={3} gap={5} className="hidden md:block">
            {caseStudies.map((item, i) => {
              const isLarge = i === 1 || i === 4;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className={`relative w-full overflow-hidden ${isLarge ? 'h-80' : 'h-56'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm mb-2">
                        {item.tag}
                      </span>
                      <h3 className="text-lg font-bold text-white md:text-xl">{item.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </MasonryGrid>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {caseStudies.map((item) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm mb-1.5">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PROCESS FLOW — Cards with numbered circles
      ═══════════════════════════════════ */}
      <section id="process-flow" className="scroll-mt-32 bg-white px-6 py-24 md:px-16 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Process Flow</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">導入の流れ</h2>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-[3.5rem] hidden h-px bg-gradient-to-r from-transparent via-brand-green/25 to-transparent md:block" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {flowSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/20 transition-transform group-hover:scale-110">
                      <span className="text-sm font-black">{step.num}</span>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div className="hidden h-px flex-1 bg-gradient-to-r from-brand-green/20 to-transparent sm:block lg:hidden" />
                    )}
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-gray-50/40 p-7 transition-all group-hover:border-brand-green/15 group-hover:bg-brand-green/[0.02] group-hover:shadow-lg group-hover:shadow-brand-green/5 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <step.icon className="h-5 w-5 text-brand-green" />
                      <h3 className="text-xl font-bold tracking-tight md:text-2xl">{step.title}</h3>
                    </div>
                    <p className="text-base leading-7 text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PRICING — Matched height split
      ═══════════════════════════════════ */}
      <section className="bg-white px-6 py-24 md:px-16 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Pricing</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">費用の考え方</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUp}
              className="flex flex-col rounded-3xl border border-black/5 bg-gray-50/50 p-8 md:p-10"
            >
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-brand-green">Cost Factors</p>
              <h3 className="mb-6 text-2xl font-black tracking-tight md:text-3xl">入替費用の変動要因</h3>
              <p className="mb-8 text-base leading-7 text-gray-400">
                業務用エアコンの入替費用は、以下の要因により変動します。現地調査のうえ、条件を確認してからお見積りをご提示します。
              </p>
              <div className="flex-1 space-y-3">
                {costFactors.map((factor, i) => (
                  <div key={factor} className="flex items-center gap-4 rounded-xl bg-white px-5 py-3.5 shadow-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-sm font-bold text-brand-green">
                      {i + 1}
                    </span>
                    <span className="text-base text-gray-600">{factor}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUp}
              className="flex flex-col overflow-hidden rounded-3xl border border-black/5"
            >
              <div className="relative h-56 w-full overflow-hidden md:h-64 lg:h-72">
                <img
                  src={assetPaths.services.airConditioner}
                  alt="業務用エアコン更新"
                  className="h-full w-full object-cover"
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10">
                    <Phone className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">リース・割賦もご案内可能</h3>
                </div>
                <p className="text-base leading-8 text-gray-500">
                  初期費用を抑えたい場合は、リースや割賦払いの選択肢もございます。月々の負担と導入効果を比較しながら、最適なお支払い方法をご提案します。
                </p>
                <p className="mt-4 text-sm leading-6 text-gray-400">
                  ※ リース・割賦の可否は審査によります。詳細はお問い合わせください。
                </p>
                <div className="mt-8">
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-green/8 px-6 py-3 text-base font-bold text-brand-green transition-colors hover:bg-brand-green/15"
                  >
                    お問い合わせへ <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FAQ — Clean accordion
      ═══════════════════════════════════ */}
      <section id="faq" className="scroll-mt-32 bg-white px-6 pb-32 pt-8 md:px-16 md:pb-40 lg:px-20">
        <div className="mx-auto max-w-[960px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">FAQ</p>
            <h2 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">よくあるご質問</h2>
          </motion.div>

          <div>
            {faqItems.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA — Ultra-smooth gradient bridge
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="h-48 md:h-64"
          style={{
            background: 'linear-gradient(to bottom, rgb(255,255,255) 0%, rgba(255,255,255,0.97) 15%, rgba(0,144,59,0.04) 35%, rgba(0,144,59,0.12) 55%, rgba(0,144,59,0.35) 75%, rgba(0,144,59,0.7) 90%, rgb(0,144,59) 100%)',
          }}
        />

        <div className="relative bg-brand-green px-6 pb-28 pt-16 md:px-16 md:pb-40 md:pt-24 lg:px-20">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px 128px',
            }}
          />

          <div className="absolute -bottom-8 right-0 pointer-events-none select-none md:-bottom-12">
            <span className="text-[8rem] font-black text-white/[0.06] tracking-tighter leading-none md:text-[16rem]">
              HVAC
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="relative z-10 mx-auto max-w-[1000px] text-center"
          >
            <p className="mb-6 text-xs font-mono uppercase tracking-[0.3em] text-white/50">Get Started</p>
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl">
              まずは現地状況の<br className="md:hidden" />確認から。
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-white/60">
              目的とご予算に合わせて、最適な更新プランをご提案します。<br />
              現地調査・概算見積のご相談はお気軽にどうぞ。
            </p>

            <MagneticButton>
              <Link
                to={ROUTES.contact}
                className="inline-flex touch-manipulation items-center justify-center rounded-full bg-white px-12 py-5 text-lg font-bold text-brand-green shadow-xl transition-transform hover:scale-105 md:px-16 md:py-6"
              >
                お問い合わせへ
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommercialAircon;
