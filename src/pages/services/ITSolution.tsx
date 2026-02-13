import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { GlowingEffect } from '../../components/ui/glowing-effect';

/* ─── Shared animation variant ─── */
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
};

/* ─── Service data ─── */
const services = [
    {
        num: '01',
        title: 'Prime Sign',
        subtitle: '新時代の集客ソリューション',
        desc: '次世代型特殊フィルムと映像技術を組み合わせた、新時代の集客ソリューション。窓面へのフィルム施工、動画の撮影から制作、映像機器への反映までをノンストップで提供します。圧倒的な没入感でブランド体験を向上させ、通行人の視線を確実にキャッチ。',
        img: `${process.env.PUBLIC_URL || ''}/primesign.webp`,
        highlights: ['次世代型特殊フィルム', 'オリジナル動画制作', 'リモートコンテンツ管理'],
        link: 'https://prime-sign.jp',
    },
    {
        num: '02',
        title: 'LED Signage',
        subtitle: '高精細LEDビジョン',
        desc: '屋内外を問わず設置可能な高精細LEDビジョン。視認性の高い大画面映像で、効果的な情報発信とブランディングを実現。商業施設、イベント会場、オフィスエントランスなど、あらゆるシーンに対応。',
        img: `${process.env.PUBLIC_URL || ''}/ledvision.webp`,
        highlights: ['屋内外対応', '高輝度・高精細', 'カスタムサイズ対応'],
    },
    {
        num: '03',
        title: 'Creative',
        subtitle: '動画・コンテンツ制作',
        desc: 'サイネージやアプリに表示する動画、ロゴアニメーション、プロモーション映像などを企画から制作まで一貫対応。「何を映すか」まで踏み込み、空間と連動したクリエイティブで集客効果を最大化します。',
        img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop',
        highlights: ['動画制作', 'ロゴアニメーション', 'コンテンツ運用設計'],
    },
];

const lineupItems = [
    { label: 'Prime Sign', tag: 'Signage' },
    { label: '屋内・屋外用LEDビジョン', tag: 'Signage' },
    { label: 'アプリケーション開発', tag: 'Application' },
    { label: '動画制作・プロモーション映像', tag: 'Creative' },
    { label: 'ロゴ・アニメーション制作', tag: 'Creative' },
    { label: 'コンテンツ運用・更新サポート', tag: 'Operation' },
];

/* ═══════════════════════════════════════════
   IT Solution Page
   ═══════════════════════════════════════════ */
const ITSolution: React.FC = () => {

    /* ─── Responsive showcase height (JS) ─── */
    const [showcaseHeight, setShowcaseHeight] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < 768 ? '500vh' : '900vh'
    );

    useEffect(() => {
        const update = () => {
            setShowcaseHeight(window.innerWidth < 768 ? '500vh' : '900vh');
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    /* ─── Scroll showcase transforms ─── */
    const showcaseRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: sp } = useScroll({
        target: showcaseRef,
        offset: ['start start', 'end end'],
    });

    // Total height = 900vh, effective scroll = 800vh
    // S1 & S3 get ~3× S2 raw distance to counter perception bias

    // --- Service 1: Prime Sign (hold 0.01–0.36 = 280vh) ---
    const img0Op = useTransform(sp, [0, 0.01, 0.38, 0.42], [0, 1, 1, 0]);
    const img0Sc = useTransform(sp, [0, 0.42], [1.15, 1.0]);
    const txt0Op = useTransform(sp, [0, 0.01, 0.36, 0.41], [0, 1, 1, 0]);
    const txt0Y = useTransform(sp, [0, 0.01], [50, 0]);

    // --- Service 2: LED Signage (hold 0.43–0.54 = 88vh) ---
    const img1Op = useTransform(sp, [0.40, 0.42, 0.55, 0.58], [0, 1, 1, 0]);
    const img1Sc = useTransform(sp, [0.40, 0.58], [1.15, 1.0]);
    const txt1Op = useTransform(sp, [0.41, 0.43, 0.54, 0.57], [0, 1, 1, 0]);
    const txt1Y = useTransform(sp, [0.41, 0.43], [50, 0]);

    // --- Service 3: Creative (hold 0.59–1.0 = 328vh) ---
    const img2Op = useTransform(sp, [0.56, 0.58, 0.98, 1], [0, 1, 1, 1]);
    const img2Sc = useTransform(sp, [0.57, 1], [1.15, 1.0]);
    const txt2Op = useTransform(sp, [0.57, 0.59, 0.98, 1], [0, 1, 1, 1]);
    const txt2Y = useTransform(sp, [0.57, 0.59], [50, 0]);

    // Progress bar
    const progressW = useTransform(sp, [0, 1], ['0%', '100%']);

    // Collect into arrays for iteration
    const imgOps = [img0Op, img1Op, img2Op];
    const imgScales = [img0Sc, img1Sc, img2Sc];
    const txtOps = [txt0Op, txt1Op, txt2Op];
    const txtYs = [txt0Y, txt1Y, txt2Y];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* ═══════════════════════════════════
                1. HERO — Background Image
            ═══════════════════════════════════ */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background image (底面) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Noise texture */}
                <div
                    className="absolute inset-0 z-[3] pointer-events-none"
                    style={{
                        opacity: 0.08,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />

                {/* Hero content — left/right split */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
                        {/* Single unified backdrop blur */}
                        <div className="relative">
                            <div
                                className="absolute -inset-6 md:-inset-10 rounded-3xl z-0"
                                style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
                            />
                            <div className="relative z-[1] flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">

                                {/* Left: badge + title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
                                    className="flex-shrink-0"
                                >
                                    {/* Service badge */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-brand-blue border border-brand-blue/40 px-4 py-1.5 rounded-full uppercase">
                                            Service 01
                                        </span>
                                        <div className="h-px w-16 bg-white/20" />
                                        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-white/30 uppercase">
                                            Digital Transformation
                                        </span>
                                    </div>

                                    {/* Main title — single line */}
                                    <h1 className="text-5xl md:text-[7rem] lg:text-[9rem] font-black leading-[0.85] tracking-tighter text-white">
                                        <MaskTextReveal text="IT Solution" />
                                    </h1>
                                </motion.div>

                                {/* Right: subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-lg md:text-2xl lg:text-3xl text-white/60 max-w-md leading-relaxed font-medium md:pb-3"
                                >
                                    サイネージから映像制作まで、<br />
                                    「届く体験」をワンストップで。
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute right-6 md:right-16 lg:right-20 bottom-8 flex flex-col items-center gap-3 z-10"
                >
                    <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase [writing-mode:vertical-lr]">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
                    />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════
                2. VISION — Editorial Split Layout
            ═══════════════════════════════════ */}
            <section className="pt-20 md:pt-28 pb-32 md:pb-48 border-b border-black/5 dark:border-white/5 overflow-hidden">
                {/* Full-width "Beyond Digital." decorative heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 md:mb-24"
                >
                    <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 mb-4 text-center">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-brand-blue uppercase block">
                            Our Vision
                        </span>
                    </div>
                    <h2 className="text-[15vw] md:text-[12vw] lg:text-[11vw] font-black leading-[0.85] tracking-tighter whitespace-nowrap text-center">
                        Beyond <span className="text-brand-blue">Digital.</span>
                    </h2>
                </motion.div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
                    <div className="flex flex-col md:flex-row md:items-stretch gap-12 md:gap-12 lg:gap-16">
                        {/* Left: Highlighted lead sentence — vertically centered */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                            variants={fadeInUp}
                            className="md:w-1/2 flex items-center"
                        >
                            <div className="relative">
                                <div className="absolute -left-4 md:-left-5 top-0 bottom-0 w-1 bg-brand-blue rounded-full" />
                                <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-100 leading-[1.6] font-bold pl-4 md:pl-5">
                                    ピース・ビズのITソリューションは、<br />
                                    単なる機器の導入ではなく、<br />
                                    届く体験の設計です。
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Description paragraphs */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={2}
                            variants={fadeInUp}
                            className="md:w-1/2 space-y-10"
                        >
                            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-[2]">
                                「Prime Sign」をはじめとするデジタルサイネージ、LEDビジョン、アプリケーション開発、動画・ロゴ・アニメーションなどのコンテンツ制作まで。
                            </p>
                            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-[2]">
                                「何を映すか」から「どう届けるか」まで、表示機器の選定・設置・映像制作・運用設計をワンストップで手がけ、ビジネスの成長を加速させる最適な環境を構築します。
                            </p>
                        </motion.div>
                    </div>

                    {/* Strength cards — GlowingEffect */}
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        variants={fadeInUp}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-24 md:mt-32 list-none"
                    >
                        {[
                            { title: '5領域カバー', desc: 'サイネージ／アプリ／制作物／AI機器までまとめて設計' },
                            { title: '伝わる設計', desc: '表示する映像・導線から逆算して、体験として組み立てる' },
                            { title: '現場まで落とす', desc: '機材選定・施工・設置条件まで、運用前提で詰める' },
                            { title: '更新し続ける前提', desc: '「作って終わり」ではなく、改善・差し替えを前提にした構成' },
                        ].map((item, i) => (
                            <li key={i} className="min-h-[10rem] list-none">
                                <div className="relative h-full rounded-2xl border border-black/5 dark:border-white/5 p-2 md:rounded-3xl md:p-3">
                                    <GlowingEffect
                                        spread={40}
                                        glow={true}
                                        disabled={false}
                                        proximity={64}
                                        inactiveZone={0.01}
                                    />
                                    <div className="relative flex h-full flex-col justify-center gap-3 overflow-hidden rounded-xl bg-gray-50/50 dark:bg-white/[0.02] px-8 py-10 md:px-12 md:py-12 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                                        <span className="block text-xl md:text-2xl font-black tracking-tight text-brand-blue">
                                            {item.title}
                                        </span>
                                        <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            {/* ═══════════════════════════════════
                3. SCROLL SHOWCASE — Pinned Service Gallery
            ═══════════════════════════════════ */}
            <div ref={showcaseRef} style={{ height: showcaseHeight }} className="relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                    {/* Stacked background images with crossfade */}
                    {services.map((svc, i) => (
                        <motion.div
                            key={svc.num}
                            className="absolute inset-0"
                            style={{ opacity: imgOps[i] }}
                        >
                            <motion.img
                                src={svc.img}
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ scale: imgScales[i] }}
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>
                    ))}

                    {/* Gradient overlay: dark left, lighter right */}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/50 to-black/20" />

                    {/* Additional bottom gradient for readability */}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 z-[2] pointer-events-none"
                        style={{
                            opacity: 0.08,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                        }}
                    />

                    {/* Grid lines */}
                    <div className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none hidden md:block">
                        <div className="absolute left-[20%] top-0 w-px h-full bg-white" />
                        <div className="absolute left-[40%] top-0 w-px h-full bg-white" />
                        <div className="absolute left-[60%] top-0 w-px h-full bg-white" />
                        <div className="absolute left-[80%] top-0 w-px h-full bg-white" />
                    </div>

                    {/* Section label — top left */}
                    <div className="absolute top-8 left-6 md:left-16 lg:left-20 z-20">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/30 uppercase">
                            Service Showcase
                        </span>
                    </div>

                    {/* Large decorative counter number — right side */}
                    <div className="absolute right-[-3%] md:right-[5%] top-1/2 -translate-y-1/2 z-[3] pointer-events-none select-none hidden md:block">
                        {services.map((svc, i) => (
                            <motion.span
                                key={svc.num}
                                className="absolute right-0 text-[16rem] lg:text-[22rem] font-black text-white/[0.04] tracking-tighter leading-none"
                                style={{
                                    opacity: txtOps[i],
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}
                            >
                                {svc.num}
                            </motion.span>
                        ))}
                    </div>

                    {/* Text content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
                            <div className="relative max-w-xl">
                                {services.map((svc, i) => (
                                    <motion.div
                                        key={svc.num}
                                        className={i === 0 ? 'relative' : 'absolute top-0 left-0 w-full'}
                                        style={{ opacity: txtOps[i] }}
                                    >
                                        <motion.div style={{ y: txtYs[i] }}>
                                            {/* Number + subtitle */}
                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-brand-blue uppercase">
                                                    Service {svc.num}
                                                </span>
                                                <div className="h-px w-10 bg-white/20" />
                                                <span className="text-[10px] md:text-xs font-mono tracking-wider text-white/30">
                                                    {svc.subtitle}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                                                {svc.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm md:text-base lg:text-lg text-white/50 leading-relaxed mb-10 max-w-md">
                                                {svc.desc}
                                            </p>

                                            {/* Highlights */}
                                            <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                                                {svc.highlights.map((h, hi) => (
                                                    <span
                                                        key={hi}
                                                        className="text-xs md:text-sm font-bold bg-white/[0.06] backdrop-blur-sm text-white/70 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/[0.08]"
                                                    >
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Link */}
                                            {svc.link ? (
                                                <a
                                                    href={svc.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-brand-blue hover:translate-x-2 transition-transform duration-300"
                                                >
                                                    View More <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <Link
                                                    to="/contact"
                                                    className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-brand-blue hover:translate-x-2 transition-transform duration-300"
                                                >
                                                    お問い合わせ <ArrowUpRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress bar — bottom */}
                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-16 lg:left-20 right-6 md:right-16 lg:right-20 z-20">
                        <div className="flex justify-between text-[9px] md:text-[10px] font-mono text-white/25 mb-3 tracking-wider">
                            {services.map((svc) => (
                                <span key={svc.num}>{svc.num} — {svc.title}</span>
                            ))}
                        </div>
                        <div className="h-px bg-white/10 w-full relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-brand-blue"
                                style={{ width: progressW }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════
                4. LINEUP — Minimal Service List
            ═══════════════════════════════════ */}
            <section className="py-32 md:py-40 bg-gray-50/80 dark:bg-zinc-950 border-t border-b border-black/5 dark:border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
                    {/* Section header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        variants={fadeInUp}
                        className="text-center mb-16 md:mb-24"
                    >
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-brand-blue uppercase mb-4 block">
                            Full Lineup
                        </span>
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                            Service <span className="text-gray-300 dark:text-gray-700">Lineup</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed mt-6">
                            サイネージ・映像制作・アプリ開発まで、空間を動かすIT領域をフルカバー。
                        </p>
                    </motion.div>

                    {/* List items */}
                    <div className="border-t border-black/10 dark:border-white/10">
                        {lineupItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeInUp}
                                className="group flex items-center py-6 md:py-8 border-b border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.02] transition-colors duration-300 cursor-default -mx-4 md:-mx-6 px-4 md:px-6"
                            >
                                {/* Number */}
                                <span className="text-[10px] md:text-xs font-mono text-gray-300 dark:text-gray-600 w-8 md:w-12 shrink-0 group-hover:text-brand-blue transition-colors duration-300">
                                    0{i + 1}
                                </span>

                                {/* Icon */}
                                <CheckCircle2 className="text-brand-blue/40 group-hover:text-brand-blue mr-3 md:mr-5 w-4 h-4 md:w-5 md:h-5 shrink-0 transition-colors duration-300" />

                                {/* Label */}
                                <span className="text-base md:text-xl font-bold flex-1 group-hover:translate-x-2 transition-transform duration-300">
                                    {item.label}
                                </span>

                                {/* Tag */}
                                <span className="hidden md:inline text-[10px] font-mono tracking-widest text-gray-300 dark:text-gray-600 uppercase group-hover:text-brand-blue/60 transition-colors duration-300">
                                    {item.tag}
                                </span>

                                {/* Arrow */}
                                <ArrowUpRight className="w-4 h-4 text-gray-200 dark:text-gray-700 group-hover:text-brand-blue ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════
                5. CTA — Atmospheric Full-Width
            ═══════════════════════════════════ */}
            <section className="relative py-40 md:py-56 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-brand-blue" />

                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                    <div className="absolute left-[20%] top-0 w-px h-full bg-white" />
                    <div className="absolute left-[40%] top-0 w-px h-full bg-white" />
                    <div className="absolute left-[60%] top-0 w-px h-full bg-white" />
                    <div className="absolute left-[80%] top-0 w-px h-full bg-white" />
                    <div className="absolute left-0 top-[33%] w-full h-px bg-white" />
                    <div className="absolute left-0 top-[66%] w-full h-px bg-white" />
                </div>

                {/* Noise texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        variants={fadeInUp}
                        className="text-center"
                    >
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-blue-200/60 uppercase mb-10 block">
                            Get Started
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                            Ready to Transform?
                        </h2>
                        <p className="text-base md:text-lg text-blue-100/60 leading-relaxed mb-14">
                            サイネージ・映像・アプリ——デジタルの力で、あなたのビジネスを次のステージへ。
                        </p>
                        <MagneticButton>
                            <Link to="/contact">
                                <Button className="bg-white text-brand-blue font-bold text-base md:text-lg px-10 md:px-14 py-7 md:py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                                    CONTACT US
                                </Button>
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* Large decorative text */}
                <div className="absolute bottom-[-2rem] md:bottom-[-4rem] right-[-1rem] md:right-8 pointer-events-none select-none">
                    <span className="text-[8rem] md:text-[16rem] font-black text-white/[0.06] tracking-tighter leading-none">
                        IT
                    </span>
                </div>
            </section>
        </div>
    );
};

export default ITSolution;
