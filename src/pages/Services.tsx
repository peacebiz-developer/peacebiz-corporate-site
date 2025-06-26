import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Smartphone, 
  Sun, 
  Snowflake, 
  ArrowRight,
  Check,
  Film,
  Projector,
  Store,
  Home
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Services: React.FC = () => {
  const services = [
    {
      icon: Monitor,
      title: 'PrimeSign事業',
      description: 'PDLCフィルム + プロジェクター + 動画制作・納品の総合ソリューション',
      features: ['PDLCフィルム', 'プロジェクター', '動画制作・納品', '施工・メンテナンス'],
      price: 'お見積り',
      category: 'メイン事業',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    },
    {
      icon: Smartphone,
      title: 'UPLINK事業',
      description: '店舗向けアプリの販売代理。お客様の店舗運営を効率化するソリューション',
      features: ['店舗向けアプリ', '販売代理', '導入サポート', '運用サポート'],
      price: 'お見積り',
      category: '販売代理',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    },
    {
      icon: Sun,
      title: '太陽光事業',
      description: '一般住宅向け太陽光パネルの販売代理。環境にやさしいエネルギーソリューション',
      features: ['太陽光パネル', '一般住宅向け', '販売代理', '設置サポート'],
      price: 'お見積り',
      category: '販売代理',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    },
    {
      icon: Snowflake,
      title: 'エアコン事業',
      description: '店舗向け業務用エアコンの販売代理。快適な環境づくりをサポート',
      features: ['業務用エアコン', '店舗向け', '販売代理', '設置・メンテナンス'],
      price: 'お見積り',
      category: '販売代理',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    },
  ];

  const pastServices = [
    {
      icon: Store,
      title: 'インターネット回線',
      description: '店舗向けインターネット回線の販売代理',
    },
    {
      icon: Smartphone,
      title: '携帯端末',
      description: '法人向け携帯端末の販売代理',
    },
    {
      icon: Monitor,
      title: 'アプリ開発',
      description: 'カスタムアプリケーションの開発・販売',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              PrimeSign事業を中心に、店舗向けソリューションから太陽光・エアコンまで、
              お客様のビジネス成長をサポートする包括的なサービスを提供します。
            </p>
          </motion.div>

          {/* Main Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      主なサービス
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-accent">
                      {service.price}
                    </div>
                    <Button variant="outline" size="sm">
                      詳細を見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Past Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              過去の事業実績
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              これまでに手がけた事業から得たノウハウとストック収益を活かし、
              現在の事業展開に活かしています。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pastServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <service.icon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Business Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ご提案プロセス
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              お客様のニーズに最適なソリューションを提供します。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { step: '01', title: 'アポイント', description: 'お客様との面談を設定し、詳細な要件をヒアリング' },
              { step: '02', title: 'ご提案', description: '迅速な提案と導入で、お客様の課題を解決' },
              { step: '03', title: 'ご導入', description: 'これまで培ってきた実績とノウハウをもとに、最適な導入を実現' },
              { step: '04', title: 'アフターサポート', description: '導入後のサポートとメンテナンスを継続提供' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              お客様のビジネスに最適なソリューションをご提案
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              お客様のニーズを詳しくお聞かせください。
              最適なソリューションをご提案いたします。
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              お問い合わせ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 