import React, { useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';
import { Button, Chip } from "@nextui-org/react";
import { MaskTextReveal } from '../components/ui/MaskTextReveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import { MagneticButton } from '../components/ui/MagneticButton';

// Mock Data
const worksData = [
  { id: 1, category: 'it', title: 'Digital Transformation', client: 'Major Retailer', year: '2024', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', size: 'large' },
  { id: 2, category: 'eco', title: 'LED Renewal Project', client: 'Shopping Mall', year: '2023', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', size: 'small' },
  { id: 3, category: 'office', title: 'Global HQ Office', client: 'Tech Company', year: '2023', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', size: 'medium' },
  { id: 4, category: 'it', title: 'Security System', client: 'Financial Institution', year: '2024', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', size: 'small' },
  { id: 5, category: 'eco', title: 'Solar Power Plant', client: 'Energy Corp', year: '2022', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop', size: 'medium' },
  { id: 6, category: 'office', title: 'Creative Studio', client: 'Design Firm', year: '2024', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop', size: 'large' },
];

const Works: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredWorks = useMemo(() => {
    return filter === 'all' ? worksData : worksData.filter(w => w.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* 1. Header */}
      <section className="pt-40 pb-20 px-6 container mx-auto">
        <h1 className="text-[12vw] md:text-[8rem] font-black leading-none tracking-tighter mb-12">
          <MaskTextReveal text="SELECTED" />
          <span className="text-gray-400 block"><MaskTextReveal text="WORKS" delay={0.1} /></span>
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
                onClick={() => setFilter(cat)}
                className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isActive ? activeClass : 'border-gray-300 dark:border-zinc-800 text-gray-500 hover:border-black dark:hover:border-white'}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* 2. Masonry Grid */}
      <section className="px-4 md:px-6 pb-40 container mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <WorkItem key={work.id} work={work} onClick={() => setSelectedId(work.id)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Modal Overlay */}
      <AnimatePresence>
        {selectedId && createPortal(
          <motion.div
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
              {/* Modal Content */}
              <div className="relative h-[400px]">
                <img
                  src={worksData.find(w => w.id === selectedId)?.img}
                  className="w-full h-full object-cover"
                  alt="Detail"
                />
                <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <span className={`font-bold tracking-widest uppercase mb-2 block ${worksData.find(w => w.id === selectedId)?.category === 'it' ? 'text-brand-blue' :
                  worksData.find(w => w.id === selectedId)?.category === 'eco' ? 'text-brand-green' :
                    worksData.find(w => w.id === selectedId)?.category === 'office' ? 'text-brand-orange' : 'text-primary'
                  }`}>{worksData.find(w => w.id === selectedId)?.category}</span>
                <h2 className="text-4xl font-black mb-6">{worksData.find(w => w.id === selectedId)?.title}</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  プロジェクトの詳細内容がここに入ります。
                  例えば、クライアントの課題、導入したソリューション、
                  そして得られた成果について具体的に記述します。
                </p>
                <div className="grid grid-cols-2 gap-6 border-t border-gray-200 dark:border-zinc-800 pt-6">
                  <div>
                    <h4 className="font-bold text-gray-400 text-sm uppercase mb-1">Client</h4>
                    <p className="font-medium">{worksData.find(w => w.id === selectedId)?.client}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-400 text-sm uppercase mb-1">Year</h4>
                    <p className="font-medium">{worksData.find(w => w.id === selectedId)?.year}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

    </div>
  );
};

// Optimized Item Component using React.memo
const WorkItem = React.memo(({ work, onClick }: { work: any, onClick: () => void }) => {
  // Size Logic for Masonry Awareness (Simple version)
  const isLarge = work.size === 'large';
  const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`${colSpan} group cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3] rounded-sm mb-4">
        <ParallaxImage
          src={work.img}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          offset={20}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-white/50 text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Plus className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-4 group-hover:border-black dark:group-hover:border-white transition-colors">
        <div>
          <h3 className="text-2xl font-bold">{work.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{work.client} — {work.year}</p>
        </div>
        <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>
    </motion.div>
  );
});

export default Works;
