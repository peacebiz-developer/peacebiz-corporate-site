import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Play,
  Filter,
  Monitor,
  Store,
  Building,
  X,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  location: string;
  client: string;
  featured: boolean;
  video: string;
}

const Works: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: '仙台氏 根岸交差点',
      category: 'retail',
      description: '仙台市でも有数の交通量をもつ根岸交差点に、屋外用LEDディスプレイを設置。動画広告とプロジェクターを組み合わせた革新的なディスプレイソリューション。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', '大型ビジョン'],
      location: '宮城県仙台市',
      client: '大手広告代理店',
      featured: true,
      video: 'https://example.com/video1.mp4',
    },
    {
      id: 2,
      title: '○○市超有名フィットネスジム',
      category: 'retail',
      description: '***',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', '店舗ディスプレイ'],
      location: '東京都中央区',
      client: '高級ブランド店',
      featured: true,
      video: 'https://example.com/video2.mp4',
    },
    {
      id: 3,
      title: '大阪梅田 商業施設',
      category: 'commercial',
      description: '大阪梅田の大型商業施設に設置された複数台のPDLCフィルムディスプレイ。施設全体の情報発信と広告収益を両立。',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', '複数台設置'],
      location: '大阪府大阪市',
      client: '大型商業施設',
      featured: false,
      video: 'https://example.com/video3.mp4',
    },
    {
      id: 4,
      title: '福岡天神 オフィスビル',
      category: 'office',
      description: '福岡天神のオフィスビルロビーに設置されたPDLCフィルムディスプレイ。企業情報の発信と来訪者への案内を兼ねたソリューション。',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', 'オフィス向け'],
      location: '福岡県福岡市',
      client: 'オフィスビル',
      featured: false,
      video: 'https://example.com/video4.mp4',
    },
    {
      id: 5,
      title: '仙台駅前 ホテル',
      category: 'hotel',
      description: '仙台駅前のホテルに設置されたPDLCフィルムディスプレイ。宿泊客への案内と地域情報の発信を実現。',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', 'ホテル向け'],
      location: '宮城県仙台市',
      client: 'ホテル',
      featured: false,
      video: 'https://example.com/video5.mp4',
    },
    {
      id: 6,
      title: '名古屋栄 レストラン',
      category: 'restaurant',
      description: '名古屋栄のレストランに設置されたPDLCフィルムディスプレイ。料理の魅力を伝える動画コンテンツで集客効果を向上。',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      technologies: ['PDLCフィルム', 'プロジェクター', '動画制作', '飲食店向け'],
      location: '愛知県名古屋市',
      client: 'レストラン',
      featured: false,
      video: 'https://example.com/video6.mp4',
    },
  ];

  const categories = [
    { id: 'all', label: 'すべて', icon: Filter },
    { id: 'retail', label: '小売店', icon: Store },
    { id: 'commercial', label: '商業施設', icon: Building },
    { id: 'office', label: 'オフィス', icon: Monitor },
    { id: 'hotel', label: 'ホテル', icon: Building },
    { id: 'restaurant', label: '飲食店', icon: Store },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const nextProject = () => {
    setCurrentProject((prev) => 
      prev === featuredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevProject = () => {
    setCurrentProject((prev) => 
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
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
              PrimeSign <span className="text-accent">Works</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              PrimeSign事業の施工事例・導入実績をご紹介します。
              PDLCフィルムとプロジェクターを組み合わせた革新的なディスプレイソリューションで、
              お客様のビジネスに新しい価値を創造しています。
            </p>
          </motion.div>

          {/* Featured Project Slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              注目事例
            </h2>
            
            <div className="relative max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full">
                      <img
                        src={featuredProjects[currentProject].image}
                        alt={featuredProjects[currentProject].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <button
                        onClick={() => setSelectedProject(featuredProjects[currentProject])}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {featuredProjects[currentProject].title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {featuredProjects[currentProject].description}
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          {featuredProjects[currentProject].location}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          使用技術
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {featuredProjects[currentProject].technologies.map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button onClick={() => setSelectedProject(featuredProjects[currentProject])}>
                          <Play className="mr-2 h-4 w-4" />
                          詳細を見る
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          お問い合わせ
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentProject 
                        ? 'bg-accent' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="mr-2 h-3 w-3" />
                      詳細
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">プロジェクト詳細</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedProject.location}
                      </div>
                      <div>クライアント: {selectedProject.client}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">使用技術</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    動画を見る
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    お問い合わせ
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Works; 