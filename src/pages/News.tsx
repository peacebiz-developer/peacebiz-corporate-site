import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Calendar, Tag } from 'lucide-react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { newsData } from '../data/newsData';

const categories = ["All", "Info", "Works", "Recruit"];

const catColorMap: Record<string, string> = {
  Info: "bg-brand-blue",
  Works: "bg-brand-green",
  Recruit: "bg-brand-orange",
};

const News: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews =
    activeCategory === "All"
      ? newsData
      : newsData.filter((n) => n.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <section className="pt-40 pb-12 px-6 md:px-20 container mx-auto">
        <h1 className="text-[12vw] md:text-[8rem] font-black leading-none tracking-tighter mb-6">
          <MaskTextReveal text="NEWS" />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl"
        >
          お知らせ・トピックス
        </motion.p>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-20 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-3 border-b border-black/10 dark:border-white/10 pb-8"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                    : "border-gray-300 dark:border-zinc-700 text-gray-500 hover:border-black dark:hover:border-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* News List */}
      <section className="px-6 md:px-20 pb-40 container mx-auto">
        <div className="border-t border-black/10 dark:border-white/10">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news, i) => (
              <motion.div
                key={`${news.date}-${news.title}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col md:flex-row items-start md:items-center py-8 border-b border-black/10 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-4 -mx-4"
                onClick={() => setSelectedNews(news)}
              >
                <div className="w-48 shrink-0 text-sm font-mono text-gray-500 mb-2 md:mb-0 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {news.date}
                </div>
                <div className="w-32 shrink-0 mb-2 md:mb-0">
                  <span className="text-xs font-bold border border-black/20 dark:border-white/20 px-3 py-1 rounded-full uppercase tracking-wider group-hover:bg-brand-blue group-hover:border-transparent group-hover:text-white transition-colors">
                    {news.cat}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold group-hover:translate-x-2 transition-transform duration-300 w-full group-hover:text-brand-blue">
                  {news.title}
                </h3>
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-brand-blue" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredNews.length === 0 && (
          <div className="py-20 text-center text-gray-400 font-bold text-lg">
            該当するニュースがありません。
          </div>
        )}
      </section>

      {/* News Detail Modal (Portal) */}
      {createPortal(
        <AnimatePresence>
          {selectedNews && (
            <motion.div
              key="news-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 左側：写真 */}
                <div className="relative lg:w-1/2 h-64 lg:h-auto shrink-0">
                  <img
                    src={selectedNews.img}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  {/* モバイル用閉じるボタン */}
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="lg:hidden absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 右側：テキスト情報 */}
                <div className="lg:w-1/2 flex flex-col relative overflow-y-auto">
                  {/* デスクトップ用閉じるボタン */}
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="hidden lg:flex absolute top-6 right-6 w-10 h-10 rounded-full border border-black/10 dark:border-white/10 items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center flex-1">
                    {/* メタ情報 */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        <Calendar className="w-4 h-4" />
                        {selectedNews.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider ${catColorMap[selectedNews.cat] || "bg-gray-600"}`}>
                          {selectedNews.cat}
                        </span>
                      </div>
                    </div>

                    {/* 区切り線 */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-brand-blue to-brand-green mb-8" />

                    {/* タイトル */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-black dark:text-white mb-8">
                      {selectedNews.title}
                    </h3>

                    {/* 本文 */}
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {selectedNews.content}
                    </div>

                    {/* フッター */}
                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800">
                      <button
                        onClick={() => setSelectedNews(null)}
                        className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        ニュース一覧に戻る
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default News;
