import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wifi, Phone, Printer, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { ParallaxImage } from '../../components/ui/ParallaxImage';
import { MaskTextReveal } from '../../components/ui/MaskTextReveal';

const Office: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
            {/* 1. HERO */}
            <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                        alt="Office Solution Hero"
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <h1 className="text-sm md:text-lg font-bold tracking-[0.5em] text-brand-orange mb-4 uppercase">
                        Office Solution
                    </h1>
                    <div className="text-5xl md:text-8xl font-black tracking-tight mb-8">
                        <MaskTextReveal text="WORKPLACE" />
                        <MaskTextReveal text="DESIGN" delay={0.2} />
                    </div>
                    <p className="text-lg md:text-2xl font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        働く人が輝く、<br className="md:hidden" />快適で効率的なオフィス環境へ。
                    </p>
                </div>
            </section>

            {/* 2. OVERVIEW */}
            <section className="py-24 md:py-32 container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="md:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Smart<br />
                            <span className="text-brand-orange">Office.</span>
                        </h2>
                        <div className="w-20 h-1 bg-brand-orange" />
                    </div>
                    <div className="md:w-2/3 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium space-y-8">
                        <p>
                            優秀な人材の確保や生産性の向上において、オフィス環境は重要なファクターです。
                            Peace Bizは、通信インフラの整備からOA機器の選定、内装デザインまで、
                            オフィスの立ち上げや移転、リニューアルをワンストップでサポートします。
                        </p>
                        <p>
                            ストレスのない通信環境、使いやすいビジネスフォン、コストパフォーマンスに優れた複合機。
                            私たちは、そこで働く「人」を中心のオフィスづくりを提案します。
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
                                title: "Infrastructure",
                                desc: "光回線の手配から、安定したWi-Fi環境の構築、LAN配線工事まで。ネットワークの基盤を整えます。",
                                icon: Wifi
                            },
                            {
                                title: "OA Devices",
                                desc: "最新の複合機（コピー機）やビジネスフォンをご提案。業務内容に合わせた機種選定でコスト削減に貢献。",
                                icon: Printer
                            },
                            {
                                title: "Support",
                                desc: "トラブル時の迅速な対応はもちろん、定期的なメンテナンスで、業務を止めない安心のサポート体制を提供。",
                                icon: Phone
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-black p-10 rounded-2xl border border-black/5 dark:border-white/10 hover:border-brand-orange/50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
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
                    {['複合機（コピー機）リース・販売', 'ビジネスフォン導入', '法人用携帯電話', 'インターネット回線手配（光コラボ）', '社内LAN工事・Wi-Fi構築', 'オフィス家具・什器', '防犯セキュリティシステム'].map((item, i) => (
                        <div key={i} className="flex items-center p-6 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-xl">
                            <CheckCircle2 className="text-brand-orange mr-4 w-6 h-6 flex-shrink-0" />
                            <span className="text-lg font-bold">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-40 bg-brand-orange text-white text-center px-6">
                <h2 className="text-4xl md:text-6xl font-black mb-8">Better Workspace.</h2>
                <p className="text-orange-100 text-lg mb-12 max-w-lg mx-auto">
                    機能性と快適性を追求した、理想のオフィスへ。
                </p>
                <Link to="/contact">
                    <Button className="bg-white text-brand-orange font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                        CONTACT US
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default Office;
