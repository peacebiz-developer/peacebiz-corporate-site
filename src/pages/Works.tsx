import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import Pagination from '../components/ui/Pagination';
import { cn } from '../utils/cn';
import {
  WORKS_PAGE_SIZE,
  worksData,
  getBentoSize,
  bentoSizeClass,
  categoryLabels,
  categoryColors,
  categoryAccents,
  categoryTextColors,
  categorySubServices,
  type WorkItem,
} from '../data/worksData';

const Works: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [activeService, setActiveService] = useState<string | null>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filteredWorks = useMemo(() => {
    let works = worksData;
    if (filter !== 'all') {
      works = works.filter((w) => w.category === filter);
    }
    if (activeService) {
      works = works.filter((w) => w.service === activeService);
    }
    return works;
  }, [filter, activeService]);

  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / WORKS_PAGE_SIZE));
  const paginatedWorks = useMemo(
    () => filteredWorks.slice((page - 1) * WORKS_PAGE_SIZE, page * WORKS_PAGE_SIZE),
    [filteredWorks, page]
  );

  useEffect(() => {
    setPage(1);
  }, [filter, activeService]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleAllClick = () => {
    setFilter('all');
    setActiveService(null);
    setExpandedCat(null);
  };

  const handleCategoryClick = (cat: string) => {
    if (filter === cat && !activeService) {
      setFilter('all');
      setActiveService(null);
      setExpandedCat(null);
    } else {
      setFilter(cat);
      setActiveService(null);
      setExpandedCat(cat);
    }
  };

  const handleSubServiceClick = (cat: string, serviceKey: string) => {
    setFilter(cat);
    setActiveService((prev) => (prev === serviceKey ? null : serviceKey));
  };

  const filterLabelMap: Record<'it' | 'eco' | 'office', string> = {
    it: 'IT',
    eco: 'ECO',
    office: 'OFFICE',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <section id="works-hero" className="pt-40 pb-20 px-6 container mx-auto scroll-mt-28">
        <h1 className="text-[12vw] md:text-[8rem] font-black leading-none tracking-tighter mb-12">
          <MaskTextReveal text="事例" />
          <span className="text-gray-400 block">
            <MaskTextReveal text="OUR WORKS" delay={0.1} />
          </span>
        </h1>

        <div className="border-b border-black/10 dark:border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              onClick={handleAllClick}
              className={cn(
                'text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all',
                filter === 'all'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                  : 'border-gray-300 dark:border-zinc-800 text-gray-500 hover:border-black dark:hover:border-white'
              )}
            >
              All
            </button>

            {(['it', 'eco', 'office'] as const).map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  onMouseEnter={() => setExpandedCat(cat)}
                  onMouseLeave={() => {
                    if (filter !== cat) setExpandedCat(null);
                  }}
                  className={cn(
                    'text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all',
                    isActive
                      ? `${categoryColors[cat]} text-white border-transparent`
                      : 'border-gray-300 dark:border-zinc-800 text-gray-500 hover:border-black dark:hover:border-white'
                  )}
                >
                  {filterLabelMap[cat]}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {(() => {
              const activeCat = expandedCat ?? (filter !== 'all' ? filter : null);
              if (!activeCat) return null;
              const subs = categorySubServices[activeCat];
              const accentColor = categoryAccents[activeCat];
              if (!subs) return null;

              return (
                <motion.div
                  key={activeCat}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                  onMouseEnter={() => setExpandedCat(activeCat)}
                  onMouseLeave={() => {
                    if (filter !== activeCat) setExpandedCat(null);
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-1 pt-4">
                    <span className="w-5 h-px shrink-0 mr-1" style={{ backgroundColor: `${accentColor}60` }} />
                    {subs.map((sub, index) => (
                      <React.Fragment key={sub.key}>
                        {index > 0 && <span className="text-gray-300 dark:text-zinc-600 text-[10px] select-none">·</span>}
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => handleSubServiceClick(activeCat, sub.key)}
                          className={cn(
                            'text-[11px] md:text-xs whitespace-nowrap cursor-pointer transition-all duration-200 py-1 px-1.5 rounded select-none',
                            activeService === sub.key
                              ? 'font-bold'
                              : 'font-medium text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                          )}
                          style={activeService === sub.key ? { color: accentColor } : undefined}
                        >
                          {sub.label}
                        </motion.span>
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      <section id="works-gallery" className="px-4 md:px-6 pb-20 container mx-auto scroll-mt-28">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4 md:gap-5 grid-flow-row-dense"
          >
            {paginatedWorks.map((work, index) => {
              const size = getBentoSize(index);
              return (
                <BentoCard
                  key={work.slug}
                  work={work}
                  index={index}
                  sizeClass={bentoSizeClass(size)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {paginatedWorks.length === 0 && (
          <div className="py-20 text-center text-gray-400 font-bold text-lg">
            該当する事例がありません。
          </div>
        )}
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </section>
    </div>
  );
};

interface BentoCardProps {
  work: WorkItem;
  index: number;
  sizeClass: string;
}

const BentoCard = React.memo(({ work, index, sizeClass }: BentoCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={cn('group relative rounded-xl overflow-hidden', sizeClass)}
  >
    <Link to={`/works/${work.slug}`} className="absolute inset-0 z-10" aria-label={work.title} />
    <img
      src={work.img}
      alt={work.title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[3px]"
    />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />

    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
      <span
        className={cn(
          'text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors duration-300',
          categoryTextColors[work.category]
        )}
      >
        {categoryLabels[work.category]}
      </span>
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug mb-1">
        {work.title}
      </h3>
      <p className="text-xs md:text-sm text-white/50 font-medium">
        {work.client} — {work.year}
      </p>
      <div className="mt-3 inline-flex items-center text-xs font-bold tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">
        <ArrowRight className="w-3.5 h-3.5 mr-1.5 transition-transform duration-300 group-hover:translate-x-1" />
        View Details
      </div>
    </div>
  </motion.div>
));

BentoCard.displayName = 'BentoCard';

export default Works;
