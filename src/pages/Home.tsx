import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { SparklesCore } from '../components/ui/sparkles';
import { PeaceBizSparkles } from '../components/ui/peacebiz-sparkles';

const Home: React.FC = () => {
  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="home-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.5}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Main Content - PeaceBizSparkles Demo */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <PeaceBizSparkles />
        </div>
      </div>

      {/* Bottom Section - Sits at the bottom of the viewport */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link to="/services">
              <Button size="lg" className="text-lg px-8 py-4">
                事業内容を見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                お問い合わせ
              </Button>
            </Link>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2008</div>
              <div className="text-gray-600 dark:text-gray-400">設立年</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">20,000+</div>
              <div className="text-gray-600 dark:text-gray-400">総顧客数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">3拠点</div>
              <div className="text-gray-600 dark:text-gray-400">東京・福岡・仙台</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">4事業</div>
              <div className="text-gray-600 dark:text-gray-400">PrimeSign 他</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center mb-4"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Home; 