import React, { useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileCheck,
  Star,
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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const BRANDS = ['DAIKIN', 'MITSUBISHI', 'HITACHI', 'Panasonic', 'TOSHIBA'];

const promises = [
  {
    title: '営業を止めない段取りを組みます',
    icon: Building2,
    bullets: ['閉店後・休業日に合わせた工程を設計', '養生・清掃を工程に含めて現場負担を軽減', '翌営業日に向けた引き渡し手順を事前共有（条件により調整）'],
    evidence: '証拠（例）: 工程表・作業前後チェックリスト。TODO(実案件に差し替え)',
  },
  {
    title: '見積の認識ズレを減らします',
    icon: ClipboardList,
    bullets: ['増額になりやすい条件を初回相談で確認', '標準工事と追加工事の境界を事前に明記', '内容同意後に着工し、変更時は再確認を実施'],
    evidence: '証拠（例）: 見積内訳サンプル・変更同意フロー。TODO(実案件に差し替え)',
  },
  {
    title: '撤去・回収・証跡まで完了させます',
    icon: FileCheck,
    bullets: ['既設機器の撤去と回収手配を一括対応', 'フロン回収や関連書類の対応範囲を明示', '保証・責任分界を事前に共有し運用不安を軽減'],
    evidence: '証拠（例）: 回収証明・引渡し資料。TODO(実案件に差し替え)',
  },
];

const timelineSteps = [
  { time: '19:00', title: '搬入・事前養生', note: '近隣動線と搬入経路を確認しながら準備' },
  { time: '20:00', title: '既設機器の撤去', note: '店舗設備への影響を抑えつつ撤去' },
  { time: '22:00', title: '新規機器据付・配管接続', note: '機種・配管条件に応じて作業' },
  { time: '00:30', title: '真空引き・試運転', note: '運転状態と設定を確認' },
  { time: '02:00', title: '清掃・最終確認', note: '作業エリアを原状復帰' },
  { time: '翌朝', title: '引き渡し', note: '操作説明と注意点をご案内' },
];

const costFactors = [
  '冷暖房能力（馬力・台数）',
  '設置方式（天カセ・壁掛・ダクト等）',
  '既設配管の流用可否',
  '高所作業や足場の必要性',
  '搬入経路の条件（階段・クレーン等）',
  '夜間・休業日施工の調整有無',
  '撤去・回収・証跡対応の範囲',
];

const includedLikely = ['標準搬入（条件が満たせる場合）', '基本据付・試運転', '養生・清掃の基本作業'];
const extraLikely = ['電源増設や分電盤改修', '長距離配管・特殊架台', '深夜帯の作業延長や交通誘導'];

const compareRows = [
  {
    axis: '価格の出し方',
    budget: '初期価格は抑えやすい傾向。総額比較には内訳確認が必要',
    national: '標準化された提示で比較しやすいが、現場差分は後工程で調整される場合あり',
    us: '増減条件を先に確認し、比較しやすい内訳化を支援',
  },
  {
    axis: '工程調整',
    budget: '施工会社都合に左右される場合がある',
    national: '標準工程中心で安定しやすい',
    us: '店舗営業への影響を踏まえて調整（要相談）',
  },
  {
    axis: '責任分界・書類',
    budget: '販売・施工が分かれやすく確認が必要',
    national: '体制は整備されているが窓口が分かれる場合あり',
    us: '更新完了までの流れを一本化して案内',
  },
];

const fitNotes = [
  { category: '価格重視（ネット/仲介）', note: '向いている人: 条件がシンプルで初期費用重視の方' },
  { category: '全国ネット型', note: '向いている人: 標準化された進行や拠点展開を重視する方' },
  { category: '当社（店舗の更新完了型）', note: '向いている人: 営業影響を抑えながら更新完了まで任せたい方' },
];

const caseStudies = [
  {
    title: '飲食店（路面店）',
    tag: '業種: 飲食',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
    details: ['台数・形: 天カセ3台（例）', '工期目安: 夜間1回（条件で変動）', '営業影響: 閉店後で実施'],
    note: 'TODO(実案件に差し替え)',
  },
  {
    title: '美容サロン',
    tag: '業種: 美容',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop',
    details: ['台数・形: 壁掛2台（例）', '工期目安: 2日（条件で変動）', '営業影響: 休業日を活用'],
    note: 'TODO(実案件に差し替え)',
  },
  {
    title: 'クリニック',
    tag: '業種: クリニック',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    details: ['台数・形: 天吊2台（例）', '工期目安: 夜間〜早朝（要相談）', '営業影響: 診療時間外で調整'],
    note: 'TODO(実案件に差し替え)',
  },
];

const faqItems = [
  {
    q: '写真3枚で概算できますか？',
    a: 'はい。室内機・室外機・銘板の写真をお送りいただければ目安の概算をご案内します。正式見積は現地調査後に確定します。',
  },
  {
    q: '追加費用が出やすいのはどんな場合ですか？',
    a: '電源改修、搬入条件、配管延長などで増額する場合があります。着工前に理由と金額の考え方をご説明し、同意後に進行します。',
  },
  {
    q: '夜間・休業日施工は可能ですか？',
    a: '可能です（要相談）。建物ルール、作業時間帯、台数によって調整内容が変わります。',
  },
  {
    q: '撤去・フロン回収の証跡はもらえますか？',
    a: '対応範囲をご説明した上で、必要書類をご案内します。案件条件により提出書類は異なります。',
  },
  {
    q: '保証と保守の範囲はどうなりますか？',
    a: 'メーカー保証、工事保証、保守契約はそれぞれ範囲が異なります。開始前に責任分界を明確化してご説明します。',
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
          <span className="shrink-0 text-sm font-mono tracking-wider text-brand-green">Q{String(index + 1).padStart(2, '0')}</span>
          <span className="text-base font-bold leading-relaxed text-gray-800 md:text-lg">{item.q}</span>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 pl-10 text-base leading-8 text-gray-500 md:pl-12">{item.a}</p>
      </motion.div>
    </motion.div>
  );
};

const CommercialAircon: React.FC = () => {
  const routeMeta = getStaticRouteMeta(ROUTES.servicesEcoCommercialAircon);
  const canonicalUrl = toCanonicalUrl(ROUTES.servicesEcoCommercialAircon);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useLayoutEffect(() => {
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${BASE_URL}${ROUTES.home}` },
        { '@type': 'ListItem', position: 2, name: 'サービス', item: `${BASE_URL}${ROUTES.services}` },
        { '@type': 'ListItem', position: 3, name: 'Eco Solution', item: `${BASE_URL}${ROUTES.servicesEco}` },
        { '@type': 'ListItem', position: 4, name: routeMeta?.title || '業務用エアコン更新', item: canonicalUrl },
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
    <div className="min-h-screen bg-white text-black pb-20 md:pb-0">
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img src={assetPaths.services.airConditioner} alt="" className="h-full w-full object-cover" width={1920} height={1080} loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/30 to-white" />
        </motion.div>

        <motion.div className="relative z-10 flex min-h-screen flex-col items-start justify-center" style={{ opacity: heroOpacity }}>
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-20">
            <nav aria-label="パンくずリスト" className="mb-12">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-black/40">
                <li><Link to={ROUTES.home} className="transition-colors hover:text-black">Home</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><Link to={ROUTES.services} className="transition-colors hover:text-black">Services</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><Link to={ROUTES.servicesEco} className="transition-colors hover:text-black">Eco Solution</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-black/70">Commercial Aircon</li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-white/80 px-5 py-2 backdrop-blur-md">
              <Star className="h-4 w-4 text-brand-green" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">Commercial Aircon LP</span>
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl lg:text-[5.6rem]">
              店舗の空調入替、<br />
              <span className="bg-gradient-to-r from-brand-green to-emerald-400 bg-clip-text text-transparent">営業を止めずに終わらせます。</span>
            </h1>

            <div className="mt-7 max-w-3xl">
              <MaskTextReveal
                text="閉店後・休業日で施工を調整。見積の増額ポイントを先に確認し、撤去・フロン回収・証跡まで一括対応。"
                className="text-lg leading-relaxed text-black/55 md:text-xl"
              />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {['営業を止めない', '見積が揉めない', '撤去・証跡まで完了'].map((chip, i) => (
                <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 text-sm font-semibold text-gray-700 backdrop-blur">
                  {i === 0 ? <Building2 className="h-4 w-4 text-brand-green" /> : i === 1 ? <ClipboardList className="h-4 w-4 text-brand-green" /> : <FileCheck className="h-4 w-4 text-brand-green" />}
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton>
                <Link to={ROUTES.contact} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-9 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-green/90">
                  写真3枚で概算
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <Link to={ROUTES.contact} className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-9 py-4 text-base font-bold text-black backdrop-blur-md transition-colors hover:bg-white">
                現地調査の相談
              </Link>
            </div>

            <p className="mt-5 text-sm text-black/55">
              当日即日や在庫確約はお約束できません。現場条件に合わせて最短の段取りをご提案します。
            </p>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-64 bg-gradient-to-t from-white via-white/95 via-[40%] to-transparent" />
      </section>

      <section className="relative z-10 -mt-16 overflow-hidden bg-white py-8 md:py-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent md:w-48" />
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem] md:[--gap:5rem]">
          {BRANDS.map((brand) => (
            <span key={brand} className="select-none whitespace-nowrap text-3xl font-black tracking-[0.15em] text-black/8 md:text-5xl">{brand}</span>
          ))}
        </Marquee>
      </section>

      <section className="bg-white px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <BentoGridShowcase
            integrations={<div className="h-full rounded-2xl border border-black/10 bg-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Supported Brands</p><p className="mt-4 text-3xl font-black">5メーカー対応</p><p className="mt-3 text-sm text-gray-500">既設条件を確認し、候補機種をご案内します。</p></div>}
            featureTags={<div className="h-full rounded-2xl border border-black/10 bg-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Key Features</p><div className="mt-4 flex flex-wrap gap-2">{['夜間・休業日（要相談）', '工程表', '見積内訳の明確化', 'フロン回収', 'リース相談可'].map((tag) => (<span key={tag} className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">{tag}</span>))}</div></div>}
            mainFeature={<div className="h-full rounded-2xl border border-black/10 bg-gradient-to-b from-brand-green/[0.08] to-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Main Focus</p><h3 className="mt-4 text-3xl font-black tracking-tight text-gray-900">止めずに、揉めずに、完了まで。</h3><p className="mt-4 text-gray-600">販売だけでなく、工程・見積・証跡まで一連で設計。店舗運営に合わせた更新を目指します。</p></div>}
            secondaryFeature={<div className="h-full rounded-2xl border border-black/10 bg-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Estimate</p><p className="mt-4 text-xl font-bold">相見積もり歓迎</p><p className="mt-3 text-sm text-gray-500">内訳が揃う形で比較できるようご案内します。</p></div>}
            statistic={<div className="h-full rounded-2xl border border-black/10 bg-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Schedule</p><p className="mt-4 text-2xl font-black">夜間・早朝施工（要相談）</p><p className="mt-3 text-sm text-gray-500">建物ルールや台数に応じて工程を調整します。</p></div>}
            journey={<div className="h-full rounded-2xl border border-black/10 bg-white p-6"><p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-green">Documentation</p><p className="mt-4 text-xl font-bold">撤去・回収・証跡の流れを事前共有</p></div>}
          />
        </div>
      </section>

      <section className="bg-gray-50/50 px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">3 Promises</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">3つの約束</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {promises.map((item, i) => (
              <motion.article key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeInUp} className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3"><item.icon className="h-6 w-6 text-brand-green" /><h3 className="text-lg font-bold">{item.title}</h3></div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-gray-600">{item.bullets.map((bullet) => (<li key={bullet}>・{bullet}</li>))}</ul>
                <p className="mt-4 rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-500">{item.evidence}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Timeline Example</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">工程例（ナイトスワップ）</h2>
            <p className="mt-4 text-base text-gray-500">※ 夜間施工のタイムライン例です。台数・建物条件・搬入制限で変動します。</p>
            <div className="mt-8 space-y-4">
              {timelineSteps.map((step, i) => (
                <motion.div key={step.time} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeInUp} className="flex gap-4 rounded-xl border border-black/10 bg-white p-4">
                  <div className="w-16 shrink-0 text-sm font-bold text-brand-green">{step.time}</div>
                  <div><p className="font-bold text-gray-800">{step.title}</p><p className="text-sm text-gray-500">{step.note}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-gray-50 p-7">
            <h3 className="text-xl font-bold text-gray-800">事前に確認する条件</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
              <li>・夜間作業が可能な時間帯と騒音ルール</li>
              <li>・搬入経路（エレベーター・階段・駐車動線）</li>
              <li>・停電作業や一時停止の可否</li>
              <li>・在庫・納期は機種や時期で変動</li>
            </ul>
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <AlertTriangle className="mb-2 h-4 w-4" />
              在庫確約や当日即日対応をお約束するものではありません。条件に応じて現実的な工程をご提案します。
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50/50 px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Estimate Transparency</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">見積の透明性</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">追加費用につながる条件を先に確認し、比較しやすい見積を目指します。</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-6"><h3 className="font-bold">先に確認する項目</h3><ul className="mt-4 space-y-2 text-sm text-gray-600">{costFactors.map((factor) => (<li key={factor}>・{factor}</li>))}</ul></div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-6"><h4 className="font-bold text-brand-green">標準に含まれやすい（例）</h4><ul className="mt-3 space-y-2 text-sm text-gray-600">{includedLikely.map((item) => (<li key={item}>・{item}</li>))}</ul></div>
              <div className="rounded-2xl border border-black/10 bg-white p-6"><h4 className="font-bold text-gray-800">別途になりやすい（例）</h4><ul className="mt-3 space-y-2 text-sm text-gray-600">{extraLikely.map((item) => (<li key={item}>・{item}</li>))}</ul></div>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-600">相見積もり歓迎。内訳が揃う形で比較できるようご案内します。</p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Category Comparison</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">競合カテゴリ比較</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/10">
            <div className="grid grid-cols-4 bg-gray-50 text-sm font-bold text-gray-700">
              <div className="p-4">比較軸</div><div className="p-4">価格重視（ネット/仲介）</div><div className="p-4">全国ネット型</div><div className="p-4">当社（更新完了型）</div>
            </div>
            {compareRows.map((row) => (
              <div key={row.axis} className="grid grid-cols-1 border-t border-black/10 text-sm md:grid-cols-4">
                <div className="bg-gray-50/60 p-4 font-semibold">{row.axis}</div>
                <div className="p-4 text-gray-600">{row.budget}</div>
                <div className="p-4 text-gray-600">{row.national}</div>
                <div className="p-4 text-gray-600">{row.us}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fitNotes.map((note) => (
              <div key={note.category} className="rounded-xl border border-black/10 bg-white p-4"><p className="font-bold">{note.category}</p><p className="mt-2 text-sm text-gray-600">{note.note}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-20 md:px-16 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">Case Studies</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">施工事例</h2>
          <p className="mt-5 text-lg text-gray-500">実績情報は例示です。順次、実案件データへ更新します。</p>
          <MasonryGrid columns={3} gap={5} className="mt-8 hidden md:block">
            {caseStudies.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                <div className="relative h-56"><img src={item.image} alt={item.title} className="h-full w-full object-cover" width={600} height={400} loading="lazy" decoding="async" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-4 left-4"><span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur">{item.tag}</span><p className="mt-2 text-lg font-bold text-white">{item.title}</p></div></div>
                <div className="space-y-1 p-4 text-sm text-gray-600">{item.details.map((detail) => (<p key={detail}>{detail}</p>))}<p className="pt-2 text-xs text-gray-500">{item.note}</p></div>
              </div>
            ))}
          </MasonryGrid>
          <div className="mt-8 grid gap-4 md:hidden">
            {caseStudies.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" width={500} height={320} loading="lazy" decoding="async" />
                <div className="p-4"><p className="text-xs text-brand-green">{item.tag}</p><h3 className="mt-1 text-lg font-bold">{item.title}</h3>{item.details.map((detail) => (<p key={detail} className="text-sm text-gray-600">{detail}</p>))}<p className="mt-2 text-xs text-gray-500">{item.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50/50 px-6 py-20 md:px-16 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-brand-green">FAQ</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">よくある質問</h2>
          <div className="mt-8 rounded-2xl border border-black/10 bg-white px-6 md:px-10">
            {faqItems.map((item, i) => (<FAQItem key={item.q} item={item} index={i} />))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 md:px-16 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1200px] rounded-3xl border border-white/15 bg-gradient-to-br from-brand-green/35 via-black/40 to-black p-8 md:p-12">
          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">写真3枚で、まず概算。</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">室内機・室外機・銘板の写真で、概算と進め方をご案内します（正式見積は現地調査後）。</p>
          <div className="mt-8"><MagneticButton><Link to={ROUTES.contact} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black">写真3枚で概算を依頼<ArrowRight className="h-4 w-4" /></Link></MagneticButton></div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <Link to={ROUTES.contact} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white">
          写真3枚で概算
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CommercialAircon;
