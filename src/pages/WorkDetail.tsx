import React, { useLayoutEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  categoryAccents,
  categoryColors,
  categoryLabels,
  categorySubServices,
  categoryTextColors,
  getWorkBySlug,
} from '../data/worksData';
import { cn } from '../utils/cn';
import { applySeoMeta } from '../utils/seo';

const BASE_URL = 'https://www.peace-biz.com';

const WorkDetail: React.FC = () => {
  const { slug = '' } = useParams();
  const work = useMemo(() => getWorkBySlug(slug), [slug]);

  useLayoutEffect(() => {
    if (!work) {
      applySeoMeta({
        title: '事例詳細｜Peace Biz',
        description: '指定された事例は見つかりませんでした。',
        canonicalUrl: `${BASE_URL}/works`,
        robots: 'noindex, nofollow',
      });
      return;
    }
    applySeoMeta({
      title: `${work.title}｜Peace Biz`,
      description: `${work.client} / ${categoryLabels[work.category]} / ${work.description}`.slice(0, 120),
      canonicalUrl: `${BASE_URL}/works/${work.slug}`,
    });
  }, [work]);

  const workLd = useMemo(() => {
    if (!work) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: work.title,
      description: work.description,
      image: [work.img],
      creator: {
        '@type': 'Organization',
        name: '株式会社ピース・ビズ',
      },
      url: `${BASE_URL}/works/${work.slug}`,
      dateCreated: work.year,
      keywords: [categoryLabels[work.category], work.service || ''],
    };
  }, [work]);

  if (!work) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <section className="container mx-auto px-6 md:px-20 pt-40 pb-24">
          <p className="text-gray-500 mb-4">指定された事例は見つかりませんでした。</p>
          <Link to="/works" className="inline-flex items-center gap-2 text-brand-blue font-bold">
            <ArrowLeft className="w-4 h-4" />
            事例一覧へ戻る
          </Link>
        </section>
      </div>
    );
  }

  const accent = categoryAccents[work.category] || '#006bb6';
  const serviceLabel =
    work.service
      ? categorySubServices[work.category]?.find((s) => s.key === work.service)?.label ?? work.service
      : '—';

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {workLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }}
        />
      )}

      <section className="container mx-auto px-6 md:px-20 pt-36 pb-14">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Works Archive
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-sm font-mono text-gray-400">{String(work.id).padStart(2, '0')}</span>
          <span className="w-8 h-px bg-gray-300 dark:bg-zinc-600" />
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider',
              categoryColors[work.category]
            )}
          >
            {categoryLabels[work.category]}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-5xl">
          {work.title}
        </h1>
      </section>

      <section className="container mx-auto px-6 md:px-20 pb-24">
        <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 mb-10">
          <img src={work.img} alt={work.title} className="w-full h-auto object-cover" />
        </div>

        <article className="max-w-5xl">
          <div className="w-14 h-0.5 mb-10" style={{ backgroundColor: accent }} />

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-8 border-b border-gray-100 dark:border-zinc-800">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Client</h4>
              <p className="font-bold text-black dark:text-white text-sm">{work.client}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Year</h4>
              <p className="font-bold text-black dark:text-white text-sm">{work.year}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Category</h4>
              <p className={cn('font-bold text-sm', categoryTextColors[work.category])}>
                {categoryLabels[work.category]}
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Service</h4>
              <p className="font-bold text-black dark:text-white text-sm">{serviceLabel}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">プロジェクト概要</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{work.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">対応範囲</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{work.scope}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default WorkDetail;
