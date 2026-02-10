import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Zap, Wind, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { ParallaxImage } from '../../components/ui/ParallaxImage';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';

const Eco: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            {/* 1. HERO */}
            <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop"
                        alt="Eco Solution Hero"
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <h1 className="text-sm md:text-lg font-bold tracking-[0.5em] text-brand-green mb-4 uppercase">
                        Eco Solution
                    </h1>
                    <div className="text-5xl md:text-8xl font-black tracking-tight mb-8">
                        <MaskTextReveal text="SUSTAINABLE" />
                        <MaskTextReveal text="FUTURE" delay={0.2} />
                    </div>
                    <p className="text-lg md:text-2xl font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        コスト削減と環境貢献を両立する、<br className="md:hidden" />次世代のエネルギー戦略。
                    </p>
                </div>
            </section>

            {/* 2. OVERVIEW */}
            <section className="py-24 md:py-32 container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Green<br />
                            <span className="text-brand-green">Energy.</span>
                        </h2>
                        <div className="w-20 h-1 bg-brand-green" />
                    </div>
                    <div className="md:w-2/3 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium space-y-8">
                        <p>
                            企業の持続的な成長において、エネルギー効率の最適化は不可欠です。
                            Peace Bizは、太陽光発電システムや高効率空調、LED照明の導入を通じて、
                            ランニングコストの削減とカーボンニュートラルへの貢献を同時に実現します。
                        </p>
                        <p>
                            初期投資の回収シミュレーションから、施工、メンテナンスまで。
                            お客様の施設環境に合わせた、無理のない最適なエコソリューションをご提案します。
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
                                title: "Solar Power",
                                desc: "屋根や遊休地を活用した自家消費型太陽光発電。電力コストの大幅削減と災害時のBCP対策に。",
                                icon: Sun
                            },
                            {
                                title: "Energy Saving",
                                desc: "最新の業務用エアコンやLED照明への入れ替えで、消費電力を最大化に抑制。快適性を損なわず省エネを実現。",
                                icon: Wind
                            },
                            {
                                title: "Power Supply",
                                desc: "新電力（PPS）への切り替えによる電気料金の見直し。初期費用ゼロで、毎月の固定費を削減します。",
                                icon: Zap
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-black p-10 rounded-2xl border border-black/5 dark:border-white/10 hover:border-brand-green/50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green mb-6 group-hover:scale-110 transition-transform">
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
                    {['産業用太陽光発電システム', '自家消費型太陽光発電', '蓄電池システム', '業務用エアコン更新', 'LED照明工事', '新電力（電気料金見直し）', 'キュービクル保安点検'].map((item, i) => (
                        <div key={i} className="flex items-center p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-xl">
                            <CheckCircle2 className="text-brand-green mr-4 w-6 h-6 flex-shrink-0" />
                            <span className="text-lg font-bold">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-40 bg-brand-green text-white text-center px-6">
                <h2 className="text-4xl md:text-6xl font-black mb-8">Cut Costs, Save Earth.</h2>
                <p className="text-green-100 text-lg mb-12 max-w-lg mx-auto">
                    経営にも、環境にも、やさしい選択を。
                </p>
                <Link to="/contact">
                    <Button className="bg-white text-brand-green font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                        CONTACT US
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default Eco;
