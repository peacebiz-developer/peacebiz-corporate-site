import React from 'react';
import { motion } from 'motion/react';
import { Sun, Zap, Wind, CheckCircle2 } from 'lucide-react';
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

const EcoSolution: React.FC = () => {
    const services = [
        {
            num: '01',
            title: '太陽光発電システム',
            desc: '屋根や遊休地を活用した自家消費型太陽光発電システム。電力コストの大幅削減と災害時のBCP対策を同時に実現します。初期投資の回収シミュレーションから、施工、運用後のメンテナンスまで、長期的な視点でお客様のエネルギー戦略をサポート。企業の持続的な成長を、エネルギーの側面から支えます。',
            icon: Sun,
            img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop',
            highlights: ['自家消費型太陽光', 'BCP対策', '投資回収シミュレーション']
        },
        {
            num: '02',
            title: '業務用エアコン／厨房機器',
            desc: '最新の業務用エアコンや厨房機器の入れ替えで、消費電力を抑制し、環境効果を最大化します。快適性を損なわず省エネを実現します。施設全体のエネルギー消費を可視化し、最も効果的な改善ポイントを特定。無駄のない投資で、大きなリターンを生み出します。',
            icon: Wind,
            img: `${process.env.PUBLIC_URL || ''}/air-conditioner.webp`,
            highlights: ['業務用エアコン入替', '厨房機器', 'エネルギー可視化', '節電・環境効果']
        },
        {
            num: '03',
            title: '新電力',
            desc: '新電力（PPS）への切り替えによる電気料金の見直し。初期費用ゼロで、毎月の固定費を削減します。お客様の電力使用パターンを詳細に分析し、最適な料金プランをご提案。面倒な手続きはすべて私たちが代行し、スムーズな移行をサポートします。',
            icon: Zap,
            img: `${process.env.PUBLIC_URL || ''}/new-electricity-retailer.webp`,
            highlights: ['新電力切り替え', '初期費用ゼロ', '電力コスト分析']
        }
    ];

    const lineupItems = [
        '産業用太陽光発電システム',
        '自家消費型太陽光発電',
        '蓄電池システム',
        '業務用エアコン更新',
        'LED照明工事',
        '新電力（電気料金見直し）',
        'キュービクル保安点検'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* 1. HERO */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop"
                        alt="Eco Solution Hero"
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
                        <span className="text-xs font-mono tracking-[0.3em] text-brand-green border border-brand-green/50 px-4 py-1 rounded-full">SERVICE</span>
                        <div className="h-px w-12 bg-white/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-6">
                        <MaskTextReveal text="ECO" />
                        <span className="block text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                            <MaskTextReveal text="SOLUTION" delay={0.2} />
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-medium">
                        コスト削減と環境貢献を両立する、次世代のエネルギー戦略。
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
                                <span className="text-xs font-bold tracking-[0.3em] text-brand-green uppercase mb-4 block">Our Mission</span>
                                <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                                    Green<br />
                                    <span className="text-brand-green">Energy.</span>
                                </h2>
                                <div className="w-20 h-1 bg-brand-green mt-8" />
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
                                    企業の持続的な成長において、エネルギー効率の最適化は不可欠です。
                                    Peace Bizは、太陽光発電システムや高効率空調、LED照明の導入を通じて、
                                    ランニングコストの削減とカーボンニュートラルへの貢献を同時に実現します。
                                </p>
                                <p>
                                    初期投資の回収シミュレーションから、施工、メンテナンスまで。
                                    お客様の施設環境に合わせた、無理のない最適なエコソリューションをご提案します。
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
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
                                                <div className="absolute inset-0 bg-brand-green/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                            {/* Floating number */}
                                            <div className="absolute -top-6 -left-4 md:-left-8 text-8xl md:text-[10rem] font-black text-brand-green/10 leading-none select-none pointer-events-none">
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
                                                <span className="text-xs font-mono tracking-[0.2em] text-brand-green border border-brand-green/30 px-3 py-1 rounded-full">
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
                                                    <span key={hi} className="text-sm font-bold bg-brand-green/5 dark:bg-brand-green/10 text-brand-green px-4 py-2 rounded-full">
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
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
                        <span className="text-xs font-bold tracking-[0.3em] text-brand-green uppercase mb-4 block">Full Lineup</span>
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
                                className="flex items-center p-6 bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-xl hover:border-brand-green/30 transition-colors group"
                            >
                                <span className="text-xs font-mono text-brand-green/50 mr-6 group-hover:text-brand-green transition-colors">0{i + 1}</span>
                                <CheckCircle2 className="text-brand-green mr-4 w-5 h-5 flex-shrink-0" />
                                <span className="text-lg font-bold">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="relative py-40 md:py-52 overflow-hidden">
                <div className="absolute inset-0 bg-brand-green" />
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
                        <span className="text-xs font-mono tracking-[0.3em] text-green-200 uppercase mb-8 block">Ready to Talk Business?</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Cut Costs,<br />Save Earth.</h2>
                        <p className="text-green-100 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                            経営にも、環境にも、やさしい選択を。<br />
                            まずはお気軽にお問い合わせください。
                        </p>
                        <MagneticButton>
                            <Link to="/contact">
                                <Button className="bg-white text-brand-green font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
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

export default EcoSolution;
