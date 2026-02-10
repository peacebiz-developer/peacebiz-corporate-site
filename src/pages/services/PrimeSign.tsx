import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Network, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { ParallaxImage } from '../../components/ui/ParallaxImage';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';

const PrimeSign: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            {/* 1. HERO */}
            <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                        alt="IT Solution Hero"
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <h1 className="text-sm md:text-lg font-bold tracking-[0.5em] text-brand-blue mb-4 uppercase">
                        IT Solution
                    </h1>
                    <div className="text-5xl md:text-8xl font-black tracking-tight mb-8">
                        <MaskTextReveal text="DIGITAL" />
                        <MaskTextReveal text="TRANSFORMATION" delay={0.2} />
                    </div>
                    <p className="text-lg md:text-2xl font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        空間の価値を最大化する、<br className="md:hidden" />最先端のデジタルソリューション。
                    </p>
                </div>
            </section>

            {/* 2. OVERVIEW */}
            <section className="py-24 md:py-32 container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Beyond<br />
                            <span className="text-brand-blue">Technology.</span>
                        </h2>
                        <div className="w-20 h-1 bg-brand-blue" />
                    </div>
                    <div className="md:w-2/3 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium space-y-8">
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
                    </div>
                </div>
            </section>

            {/* 3. MENU / FEATURES */}
            <section className="py-20 bg-gray-50 dark:bg-zinc-900">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Prime Sign",
                                desc: "空間を彩るプロジェクションマッピング・サイネージ。圧倒的な没入感でブランド体験を向上させます。",
                                icon: Monitor
                            },
                            {
                                title: "LED Vision",
                                desc: "屋内外を問わず設置可能な高精細LEDビジョン。視認性の高い映像で、効果的な情報発信を実現。",
                                icon: Cpu
                            },
                            {
                                title: "AI Security",
                                desc: "顔認証や行動分析を備えたAIカメラシステム。防犯だけでなく、マーケティングデータとしても活用可能。",
                                icon: Lock
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-black p-10 rounded-2xl border border-black/5 dark:border-white/10 hover:border-brand-blue/50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. DETAIL LIST */}
            <section className="py-32 container mx-auto px-6 max-w-4xl">
                <h3 className="text-3xl font-black mb-12 text-center">Service Lineup</h3>
                <div className="space-y-4">
                    {['プロジェクションマッピング "Prime Sign"', '屋内・屋外用LEDビジョン', '液晶デジタルサイネージ', 'AIセキュリティカメラ', 'ネットワーク構築・Wi-Fi整備', 'POSレジシステム導入支援'].map((item, i) => (
                        <div key={i} className="flex items-center p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-xl">
                            <CheckCircle2 className="text-brand-blue mr-4 w-6 h-6 flex-shrink-0" />
                            <span className="text-lg font-bold">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-40 bg-brand-blue text-white text-center px-6">
                <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Transform?</h2>
                <p className="text-blue-100 text-lg mb-12 max-w-lg mx-auto">
                    デジタルの力で、あなたのビジネスを次のステージへ。
                </p>
                <Link to="/contact">
                    <Button className="bg-white text-brand-blue font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                        CONTACT US
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default PrimeSign;
