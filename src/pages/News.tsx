import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { Card } from '../components/ui/card';
import Pagination from '../components/ui/Pagination';
import { NEWS_PAGE_SIZE, newsData } from '../data/newsData';

const categories = ['All', 'Info', 'Works', 'Recruit'] as const;

const catColorMap: Record<string, string> = {
  Info: 'bg-brand-blue',
  Works: 'bg-brand-green',
  Recruit: 'bg-brand-orange',
};

const catTextColorMap: Record<string, string> = {
  Info: 'text-brand-blue',
  Works: 'text-brand-green',
  Recruit: 'text-brand-orange',
};

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [page, setPage] = useState(1);
  const didMountRef = useRef(false);

  const filteredNews = useMemo(
    () =>
      activeCategory === 'All'
        ? newsData
        : newsData.filter((item) => item.cat === activeCategory),
    [activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / NEWS_PAGE_SIZE));
  const paginatedNews = useMemo(
    () => filteredNews.slice((page - 1) * NEWS_PAGE_SIZE, page * NEWS_PAGE_SIZE),
    [filteredNews, page]
  );

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderCategoryButton = (cat: (typeof categories)[number]) => {
    const isActive = activeCategory === cat;
    return (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
          isActive
            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
            : 'border-gray-300 dark:border-zinc-700 text-gray-500 hover:border-black dark:hover:border-white'
        }`}
      >
        {cat}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <section id="news-hero" className="pt-40 pb-12 px-6 md:px-20 container mx-auto scroll-mt-28">
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

      <section id="news-list" className="px-6 md:px-20 container mx-auto scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="md:hidden border-b border-black/10 dark:border-white/10 pb-8"
        >
          <div className="flex flex-wrap gap-3">{renderCategoryButton('All')}</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {categories.filter((cat) => cat !== 'All').map((cat) => renderCategoryButton(cat))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden md:flex flex-wrap gap-3 border-b border-black/10 dark:border-white/10 pb-8"
        >
          {categories.map((cat) => renderCategoryButton(cat))}
        </motion.div>
      </section>

      <section className="px-6 md:px-20 pb-20 pt-12 md:pt-16 container mx-auto">
        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          <AnimatePresence mode="popLayout">
            {paginatedNews.map((news, index) => (
              <motion.div
                key={news.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <Link to={`/news/${news.slug}`} className="block">
                  <Card className="group border-0 bg-transparent shadow-none cursor-pointer">
                    <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                      <div className="sm:col-span-5">
                        <div className="mb-4 md:mb-6">
                          <div className="flex flex-wrap items-center gap-3 md:gap-5">
                            <span
                              className={`inline-block text-xs font-bold border px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                                catColorMap[news.cat]
                                  ? `border-transparent text-white ${catColorMap[news.cat]}`
                                  : 'border-gray-300 dark:border-zinc-600 text-gray-500'
                              }`}
                            >
                              {news.cat}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl leading-tight group-hover:text-brand-blue transition-colors duration-300">
                          {news.title}
                        </h3>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 line-clamp-3 md:mt-5 leading-relaxed">
                          {news.content}
                        </p>
                        <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                          <span className="text-gray-400 font-mono">{news.date}</span>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span className="text-gray-400">株式会社ピース・ビズ</span>
                        </div>
                        <div className="mt-6 flex items-center space-x-2 md:mt-8">
                          <span
                            className={`inline-flex items-center font-semibold md:text-base group-hover:underline ${
                              catTextColorMap[news.cat] || 'text-brand-blue'
                            }`}
                          >
                            <span>詳しく読む</span>
                            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>

                      <div className="order-first sm:order-last sm:col-span-5">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-black/5 dark:border-white/10">
                          <img
                            src={news.img}
                            alt={news.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
                {index < paginatedNews.length - 1 && (
                  <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 border-b border-black/5 dark:border-white/5" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {paginatedNews.length === 0 && (
          <div className="py-20 text-center text-gray-400 font-bold text-lg">
            該当するニュースがありません。
          </div>
        )}
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </section>
    </div>
  );
};

export default News;
