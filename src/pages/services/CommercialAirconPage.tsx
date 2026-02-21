import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  type LucideIcon,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Command,
  Gem,
  Ghost,
  Hexagon,
  Phone,
  Scale,
  Settings,
  ShieldCheck,
  Star,
  Triangle,
  Truck,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { GlowingEffect } from '../../components/ui/glowing-effect';
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

const CLIENTS: Array<{ name: string; icon: LucideIcon }> = [
  { name: 'DAIKIN', icon: Hexagon },
  { name: 'MITSUBISHI', icon: Triangle },
  { name: 'HITACHI', icon: Command },
  { name: 'Panasonic', icon: Ghost },
  { name: 'TOSHIBA', icon: Gem },
];

const checkSigns = [
  { title: '冷暖房の効きムラ', desc: '部屋全体が均一に冷えない・暖まらない状態が続いている。' },
  { title: '異音・異臭がする', desc: '運転中にガタガタ・カタカタ等の異音、またはカビ臭・焦げ臭がある。' },
  { title: '水漏れが発生している', desc: 'ドレンパンや配管周りからの水漏れが頻繁に起きる。' },
  { title: '電気代が上がった', desc: '使い方を変えていないのに、電力料金が以前より増えてきた。' },
  { title: '修理が増えてきた', desc: '部品交換や修理の頻度が上がり、繁忙期の停止リスクが不安。' },
  { title: '室内環境が追いつかない', desc: '厨房の排熱や人の出入りが多く、空調が能力不足になっている。' },
];

const benefits = [
  {
    title: '省エネ',
    desc: '運転効率（APF）の改善により、電力負担を最適化します。削減幅は使用状況・既設機種により異なります。',
    icon: Zap,
  },
  {
    title: '快適',
    desc: '気流制御や温度センシングの進化で、ムラの少ない快適な空間を実現します。',
    icon: Wind,
  },
  {
    title: '安心',
    desc: '故障リスクを低減し、突発停止の不安を解消。計画的な更新サイクルをつくりやすくなります。',
    icon: ShieldCheck,
  },
  {
    title: '法令・管理',
    desc: 'フロン排出抑制法に基づく簡易点検・定期点検・記録保存・回収の整合を、更新工事の中で整えます。',
    icon: Scale,
  },
];

const scopeItems = [
  {
    title: '対応機種',
    desc: '天井カセット形・壁掛形・床置形・ダクト形・ビル用マルチなど、主要メーカーの業務用機器に幅広く対応します。',
    icon: Settings,
  },
  {
    title: '現地調査',
    desc: '冷暖房能力・配管経路・電源容量・搬入経路を確認し、現場条件に合った機器選定を行います。',
    icon: ClipboardList,
  },
  {
    title: '施工',
    desc: '営業への影響を最小化するため、夜間工事や休業日施工をご提案。短工期での入替を目指します。',
    icon: Wrench,
  },
  {
    title: '撤去・処分・フロン回収',
    desc: '既設機器の撤去・廃棄処分に加え、フロン排出抑制法に準拠した冷媒回収まで一括で対応します。',
    icon: Truck,
  },
];

const flowSteps = [
  { num: '01', title: 'ヒアリング', desc: '現状の課題やご要望を伺います。' },
  { num: '02', title: '現地調査', desc: '設置環境・配管・電源を確認します。' },
  { num: '03', title: '選定・見積', desc: '条件に合った機器と費用をご提案します。' },
  { num: '04', title: '施工', desc: '営業影響を抑えた工程で施工します。' },
  { num: '05', title: '試運転・引渡', desc: '動作確認後、操作方法をご説明します。' },
  { num: '06', title: '運用サポート', desc: 'メンテナンスや点検のご相談を承ります。' },
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
    note: '調査から撤去・フロン回収まで、入替に関わる工程をワンストップで対応します。',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1770&auto=format&fit=crop',
    title: '機器選定・施工',
    note: '営業への影響を最小化するため、夜間工事や休業日施工をご提案。短工期での入替を目指します。',
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
      className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md"
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="shrink-0 text-xs font-mono tracking-wider text-brand-green md:text-sm">
            Q{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-bold leading-relaxed text-gray-800 md:text-base">
            {item.q}
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-6 md:px-7 md:pb-7">
          <p className="text-sm leading-8 text-gray-500 md:text-base">{item.a}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CommercialAircon: React.FC = () => {
  const routeMeta = getStaticRouteMeta(ROUTES.servicesEcoCommercialAircon);
  const canonicalUrl = toCanonicalUrl(ROUTES.servicesEcoCommercialAircon);

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
    <div className="relative overflow-hidden bg-[#fbfdfd] text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(16,185,129,0.16),transparent_38%),radial-gradient(circle_at_90%_2%,rgba(56,189,248,0.14),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_42%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl"
        animate={{ x: [0, 32, -14, 0], y: [0, 20, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[28rem] h-80 w-80 rounded-full bg-sky-300/20 blur-3xl"
        animate={{ x: [0, -30, 18, 0], y: [0, -18, 14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section className="relative min-h-[88vh] overflow-hidden pt-6 md:pt-10">
        <div className="absolute inset-0">
          <img
            src={assetPaths.services.airConditioner}
            alt=""
            className="h-full w-full object-cover object-center"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(250,252,252,0.96)_10%,rgba(250,252,252,0.78)_42%,rgba(250,252,252,0.35)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.08,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[82vh] w-full max-w-[1440px] items-center px-6 pb-10 pt-12 md:px-16 md:pt-14 lg:px-20 lg:pt-16">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeInUp}
              className="lg:col-span-7 lg:-translate-y-8"
            >
              <nav aria-label="パンくずリスト" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-wider text-black/45 md:text-xs">
                  <li>
                    <Link to={ROUTES.home} className="transition-colors hover:text-black">
                      Home
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-3 w-3" />
                  </li>
                  <li>
                    <Link to={ROUTES.services} className="transition-colors hover:text-black">
                      Services
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-3 w-3" />
                  </li>
                  <li>
                    <Link
                      to={ROUTES.servicesEco}
                      className="transition-colors hover:text-black"
                    >
                      Eco Solution
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-3 w-3" />
                  </li>
                  <li className="text-black/70">Commercial Aircon</li>
                </ol>
              </nav>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white/75 px-4 py-1.5 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 text-brand-green" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-green md:text-xs">
                  Eco-Friendly Solution
                </span>
              </div>

              <p className="text-sm font-mono tracking-[0.3em] text-black/45">Commercial Aircon</p>
              <h1 className="mt-2 text-5xl font-black leading-[0.95] tracking-tighter text-black md:text-7xl lg:text-8xl">
                業務用エアコン
                <br />
                <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">更新</span>
              </h1>

              <div className="mt-7 max-w-3xl text-base leading-relaxed text-black/65 md:text-lg">
                <MaskTextReveal text="店舗・オフィスの現地調査から、機器選定・施工・フロン回収まで一括対応。目的とご予算に合わせた最適な更新プランをご提案します。" />
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={ROUTES.contact}
                  className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-green/90"
                >
                  現地調査を依頼
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-full border border-black/10 bg-white/75 px-8 py-4 text-sm font-bold text-black backdrop-blur-md transition-colors hover:bg-white"
                >
                  <ClipboardList className="h-4 w-4 text-brand-green" />
                  概算見積を相談
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeInUp}
              className="relative lg:col-span-5"
            >
              <div className="relative mx-auto h-[18rem] w-[18rem] max-w-full overflow-hidden rounded-full border border-white/70 shadow-2xl md:h-[22rem] md:w-[22rem] lg:ml-auto">
                <img
                  src={sceneVisuals[0].image}
                  alt={sceneVisuals[0].title}
                  className="h-full w-full object-cover"
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.25),rgba(255,255,255,0.05))]" />
              </div>

              <div className="absolute -bottom-8 left-4 h-28 w-28 overflow-hidden rounded-full border border-white/75 shadow-xl md:h-36 md:w-36">
                <img
                  src={sceneVisuals[1].image}
                  alt={sceneVisuals[1].title}
                  className="h-full w-full object-cover"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="absolute -right-2 top-10 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md md:right-0 md:px-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">Supported Brands</p>
                <div className="mt-2 space-y-1.5">
                  {CLIENTS.slice(0, 3).map((client) => (
                    <div key={client.name} className="flex items-center gap-2">
                      <client.icon className="h-3.5 w-3.5 text-brand-green" />
                      <span className="text-xs font-bold tracking-wide text-black/70 md:text-sm">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-14 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-xl backdrop-blur-md md:mt-16 md:p-7">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-black text-brand-green md:text-xl">主要</p>
                    <p className="text-[10px] font-mono tracking-wider text-black/45 md:text-xs">メーカー対応</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-brand-green md:text-xl">夜間</p>
                    <p className="text-[10px] font-mono tracking-wider text-black/45 md:text-xs">休日施工可</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-brand-green md:text-xl">回収</p>
                    <p className="text-[10px] font-mono tracking-wider text-black/45 md:text-xs">フロン排出法準拠</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-2 flex max-w-[1440px] flex-wrap gap-2 px-6 md:px-16 lg:px-20">
        {[
          { href: '#warning-signs', label: 'こんな症状、ありませんか？' },
          { href: '#benefits', label: '更新で変わること' },
          { href: '#coverage', label: '対応範囲' },
          { href: '#process-flow', label: '導入の流れ' },
          { href: '#faq', label: 'よくあるご質問' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border border-black/10 bg-white/75 px-4 py-2 text-[11px] font-bold tracking-wider text-black/70 transition-colors hover:bg-brand-green hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>

      <section id="warning-signs" className="relative z-10 scroll-mt-32 px-6 pb-24 pt-16 md:px-16 md:pb-28 md:pt-20 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 md:mb-16"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Warning Signs</p>
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">こんな症状、ありませんか？</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
              以下のサインが複数あてはまる場合、入替を検討するタイミングかもしれません。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {checkSigns.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeInUp}
                  className="relative min-h-[11rem] rounded-2xl border border-black/8 bg-white/75 p-2 backdrop-blur-md"
                >
                  <GlowingEffect spread={34} glow proximity={64} inactiveZone={0.01} disabled={false} />
                  <div className="relative h-full rounded-xl bg-white/70 px-5 py-6 md:px-6 md:py-7">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-brand-green" />
                      <h3 className="text-base font-black tracking-tight text-gray-800 md:text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-7 text-gray-500 md:text-base md:leading-8">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              {sceneVisuals.map((scene, index) => (
                <motion.article
                  key={scene.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 2}
                  variants={fadeInUp}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white/75 backdrop-blur-md"
                >
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-44 w-full object-cover"
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="px-5 py-5 md:px-6">
                    <h3 className="mb-2 text-base font-black tracking-tight md:text-lg">{scene.title}</h3>
                    <p className="text-sm leading-7 text-gray-500">{scene.note}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-8 md:px-16 lg:px-20">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[16rem] lg:col-span-5">
              <img
                src={sceneVisuals[1].image}
                alt={sceneVisuals[1].title}
                className="h-full w-full object-cover"
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,252,252,0.86),rgba(250,252,252,0.22))]" />
            </div>
            <div className="p-6 lg:col-span-7 md:p-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Visual Focus</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight md:text-4xl">空間全体の空調品質を再設計。</h3>
              <p className="mt-4 text-sm leading-8 text-gray-500 md:text-base">
                調査・選定・施工・運用サポートを一連で整えることで、現場に合わせた空調更新を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="relative z-10 scroll-mt-32 px-6 pb-24 pt-12 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Benefits</p>
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">更新で変わること</h2>
          </motion.div>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="relative mb-5 overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 backdrop-blur-md"
          >
            <img
              src={sceneVisuals[0].image}
              alt={sceneVisuals[0].title}
              className="absolute inset-0 h-full w-full object-cover"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(250,252,252,0.95)_20%,rgba(250,252,252,0.75)_46%,rgba(250,252,252,0.45)_100%)]" />
            <div className="relative grid grid-cols-1 gap-6 px-6 py-7 md:px-9 md:py-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                    {React.createElement(benefits[0].icon, { className: 'h-5 w-5 text-brand-green' })}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-brand-green md:text-3xl">{benefits[0].title}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-8 text-gray-600 md:text-base">{benefits[0].desc}</p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/80 shadow-xl md:h-44 md:w-44">
                  <img
                    src={sceneVisuals[1].image}
                    alt={sceneVisuals[1].title}
                    className="h-full w-full object-cover"
                    width={700}
                    height={700}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.28),rgba(255,255,255,0.08))]" />
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {benefits.slice(1).map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeInUp}
                className="relative rounded-2xl border border-black/10 bg-white/70 p-2 backdrop-blur-md"
              >
                <GlowingEffect spread={36} glow proximity={62} inactiveZone={0.01} disabled={false} />
                <div className="relative h-full rounded-xl bg-white/85 px-5 py-7 md:px-6 md:py-8">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                      <item.icon className="h-5 w-5 text-brand-green" />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-brand-green md:text-xl">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-8 text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="coverage" className="relative z-10 scroll-mt-32 px-6 pb-24 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="pointer-events-none absolute right-0 top-10 hidden h-[24rem] w-[24rem] overflow-hidden rounded-full border border-white/80 opacity-45 blur-[1px] md:block">
            <img
              src={sceneVisuals[0].image}
              alt=""
              className="h-full w-full object-cover"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 md:mb-16"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Coverage</p>
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">対応範囲</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-500 md:text-lg">
              調査から撤去・フロン回収まで、入替に関わる工程をワンストップで対応します。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {scopeItems.map((item, i) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
                className="group rounded-2xl border border-black/10 bg-white/70 px-6 py-8 backdrop-blur-md transition-colors hover:bg-white md:px-8 md:py-10"
              >
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 transition-colors group-hover:bg-brand-green/20">
                    <item.icon className="h-6 w-6 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-gray-800 md:text-xl">{item.title}</h3>
                </div>
                <p className="text-sm leading-8 text-gray-500 md:text-base">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="process-flow" className="relative z-10 scroll-mt-32 px-6 pb-24 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Process Flow</p>
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">導入の流れ</h2>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute left-6 right-6 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-green/35 to-transparent lg:block" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {flowSteps.map((step, i) => (
              <motion.article
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeInUp}
                className="rounded-2xl border border-black/10 bg-white/70 px-6 py-7 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10 text-sm font-black text-brand-green">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight md:text-xl">{step.title}</h3>
                </div>
                <p className="text-sm leading-7 text-gray-500 md:text-base">{step.desc}</p>
              </motion.article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="rounded-2xl border border-black/10 bg-white/70 px-6 py-8 backdrop-blur-md md:px-8 md:py-10"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">Pricing</p>
            <h2 className="mb-5 text-3xl font-black tracking-tighter md:text-5xl">費用の考え方</h2>
            <p className="mb-6 text-sm leading-8 text-gray-500 md:text-base">
              業務用エアコンの入替費用は、以下の要因により変動します。現地調査のうえ、条件を確認してからお見積りをご提示します。
            </p>
            <ul className="space-y-2">
              {costFactors.map((factor, i) => (
                <li key={factor} className="flex items-start gap-2 text-sm leading-7 text-gray-600 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  <span>
                    {i + 1}. {factor}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md"
          >
            <div className="relative h-52 w-full overflow-hidden md:h-56">
              <img
                src={assetPaths.services.airConditioner}
                alt="業務用エアコン更新のイメージ"
                className="h-full w-full object-cover"
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/15 to-transparent" />
            </div>
            <div className="px-6 py-8 md:px-8 md:py-10">
              <div className="mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-brand-green" />
                <h3 className="text-lg font-bold tracking-tight md:text-xl">リース・割賦もご案内可能</h3>
              </div>
              <p className="mb-4 text-sm leading-8 text-gray-500 md:text-base">
                初期費用を抑えたい場合は、リースや割賦払いの選択肢もございます。月々の負担と導入効果を比較しながら、最適なお支払い方法をご提案します。
              </p>
              <p className="text-xs leading-6 text-gray-400">
                ※ リース・割賦の可否は審査によります。詳細はお問い合わせください。
              </p>
            </div>
          </motion.article>
        </div>
      </section>
      <section id="faq" className="relative z-10 scroll-mt-32 px-6 pb-24 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="mb-14 text-center md:mb-16"
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green md:text-xs">FAQ</p>
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">よくあるご質問</h2>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-24 pt-2 md:px-16 md:pb-28 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUp}
          className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/75 text-center shadow-xl backdrop-blur-md"
        >
          <img
            src={sceneVisuals[1].image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(250,252,252,0.94)_14%,rgba(250,252,252,0.86)_52%,rgba(250,252,252,0.72)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.08,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px 128px',
            }}
          />

          <div className="relative z-10 py-16 md:py-20">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-green/80 md:text-xs">Get Started</p>
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-black md:text-6xl lg:text-7xl">
              まずは現地状況の
              <br className="md:hidden" />
              確認から。
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              目的とご予算に合わせて、最適な更新プランをご提案します。<br />
              現地調査・概算見積のご相談はお気軽にどうぞ。
            </p>

            <MagneticButton>
              <Link
                to={ROUTES.contact}
                className="inline-flex touch-manipulation items-center justify-center rounded-full bg-brand-green px-10 py-5 text-base font-bold text-white shadow-xl transition-transform hover:scale-105 hover:bg-brand-green/90 md:px-14 md:py-6 md:text-lg"
              >
                お問い合わせへ
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CommercialAircon;
