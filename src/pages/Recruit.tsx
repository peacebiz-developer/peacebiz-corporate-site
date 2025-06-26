import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Target, 
  Zap, 
  ArrowRight,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Coffee,
  Smile
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Recruit: React.FC = () => {
  const positions = [
    {
      title: '営業職（PrimeSign事業）',
      location: '東京本社',
      type: '正社員',
      description: 'PrimeSign事業の営業職として、PDLCフィルムとプロジェクターの販売を担当していただきます。',
      requirements: [
        '営業経験3年以上',
        'IT・デジタルサイネージ業界での経験歓迎',
        'コミュニケーション能力',
        '提案力・プレゼンテーション能力',
      ],
      benefits: [
        '完全歩合制の給与体系',
        '各種手当完備',
        '社会保険完備',
        '研修制度充実',
      ],
    },
    {
      title: '営業職（UPLINK事業）',
      location: '福岡支社',
      type: '正社員',
      description: '店舗向けアプリの販売代理として、九州・西日本エリアの営業を担当していただきます。',
      requirements: [
        '営業経験2年以上',
        'アプリ・ソフトウェア業界での経験歓迎',
        '地域密着型営業の経験',
        '顧客ニーズの把握能力',
      ],
      benefits: [
        '固定給＋歩合給の給与体系',
        '交通費支給',
        '社会保険完備',
        '資格取得支援',
      ],
    },
    {
      title: '営業職（太陽光・エアコン事業）',
      location: '仙台支社',
      type: '正社員',
      description: '太陽光パネルと業務用エアコンの販売代理として、東北・北関東エリアの営業を担当していただきます。',
      requirements: [
        '営業経験1年以上',
        '建設・設備業界での経験歓迎',
        '技術的な知識・興味',
        '継続的な学習意欲',
      ],
      benefits: [
        '固定給＋歩合給の給与体系',
        '技術研修制度',
        '社会保険完備',
        '福利厚生充実',
      ],
    },
  ];

  const culture = [
    {
      icon: Heart,
      title: 'アットホームな文化',
      description: '19名の小規模チームだからこそ、一人ひとりを大切にするアットホームな雰囲気です。',
    },
    {
      icon: Target,
      title: '明確な目標設定',
      description: '各事業部で明確な目標を設定し、達成に向けてチーム一丸となって取り組みます。',
    },
    {
      icon: Zap,
      title: '迅速な意思決定',
      description: '小規模組織の利点を活かし、迅速な意思決定と実行力を重視しています。',
    },
    {
      icon: Users,
      title: 'チームワーク重視',
      description: '個人の能力を活かしながら、チーム全体の成功を目指す文化です。',
    },
  ];

  const growth = [
    {
      icon: GraduationCap,
      title: '充実した研修制度',
      description: '新入社員研修から専門研修まで、段階的にスキルアップをサポートします。',
    },
    {
      icon: Award,
      title: 'キャリアパス',
      description: '営業職から管理職まで、明確なキャリアパスを提示しています。',
    },
    {
      icon: MapPin,
      title: '支社配属の可能性',
      description: '東京・福岡・仙台の3拠点で、地域に応じた配属の可能性があります。',
    },
    {
      icon: Coffee,
      title: 'メンター制度',
      description: '経験豊富な先輩がメンターとなり、仕事とキャリアの両面をサポートします。',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
              Join <span className="text-accent">Peace Biz</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              私たちと一緒に、お客様のビジネス成長をサポートしませんか？
              アットホームな文化と充実した成長環境で、あなたのキャリアをサポートします。
            </p>
          </motion.div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">○○名</div>
              <div className="text-gray-600 dark:text-gray-400">従業員数</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">3拠点</div>
              <div className="text-gray-600 dark:text-gray-400">東京・福岡・仙台</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">2008年</div>
              <div className="text-gray-600 dark:text-gray-400">設立</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">4事業</div>
              <div className="text-gray-600 dark:text-gray-400">PrimeSign・UPLINK・太陽光・エアコン</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              私たちの文化
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              小規模チームだからこそ実現できる、アットホームで成長しやすい環境です。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {culture.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Growth Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              成長環境
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              あなたのキャリア成長をサポートする、充実した制度と環境を整えています。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {growth.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Positions Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              募集職種
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              現在募集中の職種をご紹介します。あなたの経験とスキルを活かせるポジションをお探しください。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {positions.map((position, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button className="mt-4 lg:mt-0">
                      応募する
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {position.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      求める経験・スキル
                    </h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      福利厚生
                    </h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Smile className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              私たちと一緒に働きませんか？
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              お客様のビジネス成長をサポートし、社会に貢献する企業を一緒に作り上げていきましょう。
              まずはお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="text-lg px-8 py-4">
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                会社概要を見る
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Recruit; 