import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { cn } from '../utils/cn';

// Mock Data
const worksData = [
  {
    id: 1,
    category: 'it',
    title: '準備中',
    client: '準備中',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
  {
    id: 2,
    category: 'eco',
    title: '準備中',
    client: '準備中',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
  {
    id: 3,
    category: 'office',
    title: '準備中',
    client: '準備中',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
  {
    id: 4,
    category: 'it',
    title: '準備中',
    client: '準備中',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
  {
    id: 5,
    category: 'eco',
    title: '準備中',
    client: '準備中',
    year: '2022',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
  {
    id: 6,
    category: 'office',
    title: '準備中',
    client: '準備中',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    description: '準備中',
    scope: '準備中',
  },
];

const Works: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const filteredWorks = useMemo(() => {
    return filter === 'all' ? worksData : worksData.filter(w => w.category === filter);
  }, [filter]);

  const selectedWork = worksData.find(w => w.id === selectedId);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. Header */}
      <section className="pt-40 pb-20 px-6 container mx-auto">
        <h1 className="text-[12vw] md:text-[8rem] font-black leading-none tracking-tighter mb-12">
          <MaskTextReveal text="事例" />
          <span className="text-gray-400 block"><MaskTextReveal text="OUR WORKS" delay={0.1} /></span>
        </h1>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 border-b border-black/10 dark:border-white/10 pb-8">
          {['all', 'it', 'eco', 'office'].map((cat) => {
            const isActive = filter === cat;
            let activeClass = 'bg-black text-white dark:bg-white dark:text-black border-transparent';
            if (isActive) {
              if (cat === 'it') activeClass = 'bg-brand-blue text-white border-brand-blue';
              else if (cat === 'eco') activeClass = 'bg-brand-green text-white border-brand-green';
              else if (cat === 'office') activeClass = 'bg-brand-orange text-white border-brand-orange';
            }

            return (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setHovered(null); }}
                className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isActive ? activeClass : 'border-gray-300 dark:border-zinc-800 text-gray-500 hover:border-black dark:hover:border-white'}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* 2. Focus Cards Grid */}
      <section className="px-4 md:px-6 pb-40 container mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full"
          >
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
                  hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
                )}
              >
                <img
                  src={work.img}
                  alt={work.title}
                  loading="lazy"
                  className="object-cover absolute inset-0 w-full h-full"
                />
                {/* 常時表示のオーバーレイ + テキスト情報 */}
                <div className="absolute inset-0 bg-black/50" />
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-opacity duration-300",
                    hovered === index ? "opacity-0" : "opacity-100"
                  )}
                >
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-widest mb-2",
                    work.category === 'it' ? 'text-blue-400' :
                    work.category === 'eco' ? 'text-green-400' :
                    'text-orange-400'
                  )}>
                    {work.category}
                  </span>
                  <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                    {work.title}
                  </div>
                  <p className="text-sm text-white/60 mt-1 font-medium">
                    {work.client} — {work.year}
                  </p>
                </div>
                {/* ホバー時に表示される「詳細を見る」ボタン */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10",
                    hovered === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <div
                    onClick={() => setSelectedId(work.id)}
                    className="cursor-pointer"
                  >
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="span"
                      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    >
                      <span>詳細を見る</span>
                    </HoverBorderGradient>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. Modal Overlay (Portal) */}
      {createPortal(
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              key="works-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] grid place-items-center p-4"
              onClick={() => setSelectedId(null)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl overflow-hidden relative z-10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Image */}
                <div className="relative h-[300px] md:h-[400px]">
                  <img
                    src={selectedWork.img}
                    className="w-full h-full object-cover"
                    alt={selectedWork.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {/* カテゴリバッジ（画像上） */}
                  <div className="absolute bottom-6 left-8 md:left-12">
                    <span className={cn(
                      "inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white",
                      selectedWork.category === 'it' ? 'bg-brand-blue' :
                      selectedWork.category === 'eco' ? 'bg-brand-green' :
                      selectedWork.category === 'office' ? 'bg-brand-orange' : 'bg-gray-600'
                    )}>
                      {selectedWork.category === 'it' ? 'IT Solution' :
                       selectedWork.category === 'eco' ? 'Eco Solution' :
                       selectedWork.category === 'office' ? 'Office Solution' : selectedWork.category}
                    </span>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-black dark:text-white">
                    {selectedWork.title}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-zinc-800">
                    <div>
                      <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-1">Client</h4>
                      <p className="font-bold text-black dark:text-white">{selectedWork.client}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-1">Year</h4>
                      <p className="font-bold text-black dark:text-white">{selectedWork.year}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-1">Category</h4>
                      <p className={cn(
                        "font-bold",
                        selectedWork.category === 'it' ? 'text-brand-blue' :
                        selectedWork.category === 'eco' ? 'text-brand-green' :
                        selectedWork.category === 'office' ? 'text-brand-orange' : ''
                      )}>
                        {selectedWork.category === 'it' ? 'IT Solution' :
                         selectedWork.category === 'eco' ? 'Eco Solution' :
                         selectedWork.category === 'office' ? 'Office Solution' : selectedWork.category}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">プロジェクト概要</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {selectedWork.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">対応範囲</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {selectedWork.scope}
                    </p>
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

export default Works;
