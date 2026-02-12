import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Phone, Printer, CheckCircle2 } from 'lucide-react';
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

const OfficeSolution: React.FC = () => {
    const services = [
        {
            num: '01',
            title: 'オフィスインフラ',
            desc: '光回線の手配から、安定したWi-Fi環境の構築、LAN配線工事まで。ビジネスの根幹を支えるネットワークの基盤を、確実に整えます。オフィス移転やリニューアルに伴う通信環境の設計から施工、運用開始後のサポートまで、ワンストップで対応。快適で途切れない接続環境を実現します。',
            icon: Wifi,
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
            highlights: ['光回線手配', 'Wi-Fi環境構築', 'LAN配線設計']
        },
        {
            num: '02',
            title: 'OA機器',
            desc: '最新の複合機（コピー機）やビジネスフォンをご提案。業務内容や規模に合わせた最適な機種選定で、ランニングコストの大幅削減に貢献します。リース契約の見直しから、保守・メンテナンスプランの設計まで、お客様の業務効率を最大化するためのトータルサポートを提供。',
            icon: Printer,
            img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
            highlights: ['複合機リース・販売', 'ビジネスフォン', 'コスト最適化']
        },
        {
            num: '03',
            title: '保守サポート',
            desc: 'トラブル時の迅速な対応はもちろん、定期的なメンテナンスで、業務を止めない安心のサポート体制を提供します。専任の担当者が、お客様のオフィス環境を常にベストな状態に保ちます。ITに関するあらゆるお悩みを、気軽にご相談いただけるパートナーとして。',
            icon: Phone,
            img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop',
            highlights: ['24h対応サポート', '定期メンテナンス', 'IT相談窓口']
        }
    ];

    const lineupItems = [
        '複合機（コピー機）リース・販売',
        'ビジネスフォン導入',
        '法人用携帯電話',
        'インターネット回線手配（光コラボ）',
        '社内LAN工事・Wi-Fi構築',
        'オフィス家具・什器',
        '防犯セキュリティシステム'
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* 1. HERO */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                        alt="Office Solution Hero"
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
                        <span className="text-xs font-mono tracking-[0.3em] text-brand-orange border border-brand-orange/50 px-4 py-1 rounded-full">SERVICE</span>
                        <div className="h-px w-12 bg-white/30" />
                    </motion.div>
                    <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-6">
                        <MaskTextReveal text="OFFICE" />
                        <span className="block text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                            <MaskTextReveal text="SOLUTION" delay={0.2} />
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-medium">
                        働く人が輝く、快適で効率的なオフィス環境へ。
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
                                <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase mb-4 block">Our Mission</span>
                                <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
                                    Smart<br />
                                    <span className="text-brand-orange">Office.</span>
                                </h2>
                                <div className="w-20 h-1 bg-brand-orange mt-8" />
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
                                    優秀な人材の確保や生産性の向上において、オフィス環境は重要なファクターです。
                                    Peace Bizは、通信インフラの整備からOA機器の選定、内装デザインまで、
                                    オフィスの立ち上げや移転、リニューアルをワンストップでサポートします。
                                </p>
                                <p>
                                    ストレスのない通信環境、使いやすいビジネスフォン、コストパフォーマンスに優れた複合機。
                                    私たちは、そこで働く「人」を中心のオフィスづくりを提案します。
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
                                                <div className="absolute inset-0 bg-brand-orange/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                            {/* Floating number */}
                                            <div className="absolute -top-6 -left-4 md:-left-8 text-8xl md:text-[10rem] font-black text-brand-orange/10 leading-none select-none pointer-events-none">
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
                                                <span className="text-xs font-mono tracking-[0.2em] text-brand-orange border border-brand-orange/30 px-3 py-1 rounded-full">
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
                                                    <span key={hi} className="text-sm font-bold bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full">
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
                        <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase mb-4 block">Full Lineup</span>
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
                                className="flex items-center p-6 bg-white dark:bg-black border border-black/5 dark:border-white/5 rounded-xl hover:border-brand-orange/30 transition-colors group"
                            >
                                <span className="text-xs font-mono text-brand-orange/50 mr-6 group-hover:text-brand-orange transition-colors">0{i + 1}</span>
                                <CheckCircle2 className="text-brand-orange mr-4 w-5 h-5 flex-shrink-0" />
                                <span className="text-lg font-bold">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="relative py-40 md:py-52 overflow-hidden">
                <div className="absolute inset-0 bg-brand-orange" />
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
                        <span className="text-xs font-mono tracking-[0.3em] text-orange-200 uppercase mb-8 block">Ready to Talk Business?</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Better<br />Workspace.</h2>
                        <p className="text-orange-100 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                            機能性と快適性を追求した、理想のオフィスへ。<br />
                            まずはお気軽にお問い合わせください。
                        </p>
                        <MagneticButton>
                            <Link to="/contact">
                                <Button className="bg-white text-brand-orange font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
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

export default OfficeSolution;
