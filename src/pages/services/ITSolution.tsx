import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Cpu, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { ParallaxImage } from '../../components/ui/ParallaxImage';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
};

const ITSolution: React.FC = () => {
    const services = [
        {
            num: '01',
            title: 'Prime Sign',
            desc: '次世代型特殊フィルムと映像技術を組み合わせた、新時代の集客ソリューション。透過型ディスプレイにより、窓ガラスそのものを高精細なスクリーンへ変貌させます。圧倒的な没入感でブランド体験を向上させ、通行人の視線を確実にキャッチ。店舗の「顔」を、テクノロジーで進化させます。',
            icon: Monitor,
            img: `${process.env.PUBLIC_URL || ''}/primesign.webp`,
            highlights: ['透過型ディスプレイ', 'リモートコンテンツ管理', 'AI連動コンテンツ配信'],
            link: 'https://prime-sign.jp',
        },
        {
            num: '02',
            title: 'LED Vision',
            desc: '屋内外を問わず設置可能な高精細LEDビジョン。視認性の高い大画面映像で、効果的な情報発信とブランディングを実現。商業施設、イベント会場、オフィスエントランスなど、あらゆるシーンに最適なサイズと仕様をご提案します。',
            icon: Cpu,
            img: `${process.env.PUBLIC_URL || ''}/ledvision.webp`,
            highlights: ['屋内外対応', '高輝度・高精細', 'カスタムサイズ対応'],
        },
        {
            num: '03',
            title: 'AI Security',
            desc: '顔認証や行動分析を備えた最先端のAIカメラシステム。防犯・セキュリティだけでなく、来店者の属性分析や動線解析など、マーケティングデータとしても活用可能。安全と経営改善を同時に実現する、次世代の防犯ソリューションです。',
            icon: Lock,
            img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop',
            highlights: ['顔認証システム', '行動分析AI', 'マーケティング連携'],
        }
    ];

    const lineupItems = [
        'Prime Sign（透過型デジタルサイネージ）',
        '屋内・屋外用LEDビジョン',
        '液晶デジタルサイネージ',
        'AIセキュリティカメラ',
        'ネットワーク構築・Wi-Fi整備',
        'POSレジシステム導入支援'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* 1. HERO */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                        alt="IT Solution Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                {/* Noise texture overlay */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        opacity: 0.15,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />
                {/* Grid overlay */}
                <div className="absolute inset-0 z-[2] opacity-10">
                    <div className="absolute left-1/4 top-0 w-px h-full bg-white" />
                    <div className="absolute left-2/4 top-0 w-px h-full bg-white" />
                    <div className="absolute left-3/4 top-0 w-px h-full bg-white" />
                </div>
                <div className="relative z-10 container mx-auto px-6 md:px-20 pb-20 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <span className="text-xs font-mono tracking-[0.3em] text-brand-blue border border-brand-blue/50 px-4 py-1 rounded-full">SERVICE</span>
                        <div className="h-px w-12 bg-white/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-6">
                        <MaskTextReveal text="IT" />
                        <span className="block text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                            <MaskTextReveal text="SOLUTION" delay={0.2} />
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-medium">
                        空間の価値を最大化する、最先端のデジタルソリューション。
                    </p>
                </div>
            </section>

            {/* 2. MISSION / OVERVIEW (gnmd style) */}
            <section className="py-32 md:py-40 border-b border-black/10 dark:border-white/10">
                <div className="container mx-auto px-6 md:px-20 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-20 items-start">
                        <div className="md:w-2/5">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={0}
                                variants={fadeInUp}
                            >
                                <span className="text-xs font-bold tracking-[0.3em] text-brand-blue uppercase mb-4 block">Our Mission</span>
                                <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                                    Beyond<br />
                                    <span className="text-brand-blue">Technology.</span>
                                </h2>
                                <div className="w-20 h-1 bg-brand-blue mt-8" />
                            </motion.div>
                        </div>
                        <div className="md:w-3/5">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={1}
                                variants={fadeInUp}
                                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium space-y-8"
                            >
                                <p>
                                    Peace BizのITソリューションは、単なる機器の導入ではありません。
                                    「Prime Sign」をはじめとするデジタルサイネージ、AIカメラ、ネットワークインフラなど、
                                    多角的なアプローチで店舗やオフィスの課題を解決します。
                                </p>
                                <p>
                                    集客力の向上、業務効率化、そしてセキュリティ強化。
                                    私たちは、最新のテクノロジーとデザインを融合させ、
                                    ビジネスの成長を加速させる最適な環境を構築します。
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. NUMBERED SERVICE SECTIONS (gnmd style) */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 md:px-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        variants={fadeInUp}
                        className="mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Service</h2>
                    </motion.div>

                    <div className="space-y-0">
                        {services.map((service, idx) => {
                            const isReversed = idx % 2 === 1;
                            return (
                                <div
                                    key={idx}
                                    className="border-t border-black/10 dark:border-white/10 py-20 md:py-32"
                                >
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center ${isReversed ? '' : ''}`}>
                                        {/* Image */}
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            custom={0}
                                            variants={fadeInUp}
                                            className={`relative group ${isReversed ? 'md:order-2' : 'md:order-1'}`}
                                        >
                                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                                                <ParallaxImage
                                                    src={service.img}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                            {/* Floating number */}
                                            <div className="absolute -top-6 -left-4 md:-left-8 text-8xl md:text-[10rem] font-black text-brand-blue/10 leading-none select-none pointer-events-none">
                                                {service.num}
                                            </div>
                                        </motion.div>

                                        {/* Text */}
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            custom={1}
                                            variants={fadeInUp}
                                            className={`${isReversed ? 'md:order-1' : 'md:order-2'}`}
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-xs font-mono tracking-[0.2em] text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full">
                                                    Service {service.num}
                                                </span>
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                                                {service.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-3 mb-8">
                                                {service.highlights.map((highlight, hi) => (
                                                    <span key={hi} className="text-sm font-bold bg-brand-blue/5 dark:bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full">
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                            {service.link && (
                                                <a
                                                    href={service.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-brand-blue hover:translate-x-2 transition-transform cursor-pointer"
                                                >
                                                    View more <ArrowRight className="ml-2 w-4 h-4" />
                                                </a>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. SERVICE LINEUP */}
            <section className="py-32 bg-gray-50 dark:bg-zinc-900/50 border-t border-b border-black/10 dark:border-white/10">
                <div className="container mx-auto px-6 md:px-20 max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold tracking-[0.3em] text-brand-blue uppercase mb-4 block">Full Lineup</span>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight">Service Lineup</h3>
                    </motion.div>
                    <div className="space-y-4">
                        {lineupItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeInUp}
                                className="flex items-center p-6 bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-xl hover:border-brand-blue/30 transition-colors group"
                            >
                                <span className="text-xs font-mono text-brand-blue/50 mr-6 group-hover:text-brand-blue transition-colors">0{i + 1}</span>
                                <CheckCircle2 className="text-brand-blue mr-4 w-5 h-5 flex-shrink-0" />
                                <span className="text-lg font-bold">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="relative py-40 md:py-52 overflow-hidden">
                <div className="absolute inset-0 bg-brand-blue" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute left-1/4 top-0 w-px h-full bg-white" />
                    <div className="absolute left-2/4 top-0 w-px h-full bg-white" />
                    <div className="absolute left-3/4 top-0 w-px h-full bg-white" />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        variants={fadeInUp}
                    >
                        <span className="text-xs font-mono tracking-[0.3em] text-blue-200 uppercase mb-8 block">Ready to Talk Business?</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to<br />Transform?</h2>
                        <p className="text-blue-100 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                            デジタルの力で、あなたのビジネスを次のステージへ。<br />
                            まずはお気軽にお問い合わせください。
                        </p>
                        <MagneticButton>
                            <Link to="/contact">
                                <Button className="bg-white text-brand-blue font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                                    CONTACT US
                                </Button>
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ITSolution;
