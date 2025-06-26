import React from 'react';
import { motion } from 'framer-motion';
import { SparklesPreview, SparklesPreviewDark, SparklesPreviewColorful } from '../components/ui/sparkles-demo';
import { PeaceBizSparkles, HeroSparkles, ServicesSparkles, ContactSparkles } from '../components/ui/peacebiz-sparkles';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SparklesDemo: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-black">
      {/* Header */}
      <div className="p-8">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          SparklesCore デモ
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          様々なSparklesCoreコンポーネントのバリエーションをご確認ください。
        </p>
      </div>

      {/* Original Demos */}
      <section className="mb-16">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            オリジナルデモ
          </h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              SparklesPreview
            </h3>
            <SparklesPreview />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              SparklesPreviewDark
            </h3>
            <SparklesPreviewDark />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              SparklesPreviewColorful
            </h3>
            <SparklesPreviewColorful />
          </div>
        </div>
      </section>

      {/* Peace Biz Custom Demos */}
      <section className="mb-16">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ピース・ビズ専用デモ
          </h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              PeaceBizSparkles - メインデモ
            </h3>
            <PeaceBizSparkles />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              HeroSparkles - ヒーローセクション用
            </h3>
            <HeroSparkles />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              ServicesSparkles - サービスセクション用
            </h3>
            <ServicesSparkles />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-8">
              ContactSparkles - コンタクトセクション用
            </h3>
            <ContactSparkles />
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            使用方法
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                基本的な使用方法
              </h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`import { SparklesCore } from '../components/ui/sparkles';

<SparklesCore
  background="transparent"
  minSize={0.4}
  maxSize={1.2}
  particleDensity={40}
  className="w-full h-full"
  particleColor="#3B82F6"
  speed={0.5}
/>`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                プロパティ一覧
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div><strong>background:</strong> 背景色（デフォルト: "#0d47a1"）</div>
                <div><strong>minSize:</strong> 最小パーティクルサイズ（デフォルト: 1）</div>
                <div><strong>maxSize:</strong> 最大パーティクルサイズ（デフォルト: 3）</div>
                <div><strong>speed:</strong> アニメーション速度（デフォルト: 4）</div>
                <div><strong>particleColor:</strong> パーティクル色（デフォルト: "#ffffff"）</div>
                <div><strong>particleDensity:</strong> パーティクル密度（デフォルト: 120）</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparklesDemo; 