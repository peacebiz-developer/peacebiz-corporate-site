import React, { useLayoutEffect, useMemo } from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getNewsBySlug } from '../data/newsData';
import { applySeoMeta } from '../utils/seo';
import { BASE_URL, ORGANIZATION_LOGO_URL, ORGANIZATION_NAME, SITE_NAME } from '../config/site';

const catColorMap: Record<string, string> = {
  Info: 'bg-brand-blue',
  Works: 'bg-brand-green',
  Recruit: 'bg-brand-orange',
};

const toAbsoluteUrl = (url: string) => (/^https?:\/\//.test(url) ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`);
const toIsoDate = (value: string) => {
  const parts = value.split('.');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return value;
};

const NewsDetail: React.FC = () => {
  const { slug = '' } = useParams();
  const news = useMemo(() => getNewsBySlug(slug), [slug]);
  const imageUrl = useMemo(() => (news ? toAbsoluteUrl(news.img) : `${BASE_URL}/assets/images/brand/logo.png`), [news]);
  const publishedDate = useMemo(() => (news ? toIsoDate(news.date) : ''), [news]);

  useLayoutEffect(() => {
    if (!news) {
      applySeoMeta({
        title: `ニュース詳細｜${SITE_NAME}`,
        description: '指定されたニュースは見つかりませんでした。',
        canonicalUrl: `${BASE_URL}/news`,
        robots: 'noindex, nofollow',
      });
      return;
    }
    applySeoMeta({
      title: `${news.title}｜${SITE_NAME}`,
      description: news.content.replace(/\s+/g, ' ').slice(0, 120),
      canonicalUrl: `${BASE_URL}/news/${news.slug}`,
      imageUrl,
      ogType: 'article',
    });
  }, [imageUrl, news]);

  const articleLd = useMemo(() => {
    if (!news) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: news.title,
      datePublished: publishedDate,
      dateModified: publishedDate,
      image: [imageUrl],
      author: {
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: ORGANIZATION_NAME,
        logo: {
          '@type': 'ImageObject',
          url: ORGANIZATION_LOGO_URL,
        },
      },
      mainEntityOfPage: `${BASE_URL}/news/${news.slug}`,
      articleBody: news.content,
    };
  }, [imageUrl, news, publishedDate]);

  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <section className="container mx-auto px-6 md:px-20 pt-12 pb-24">
          <p className="text-gray-500 mb-4">指定されたニュースは見つかりませんでした。</p>
          <Link to="/news" className="inline-flex items-center gap-2 text-brand-blue font-bold">
            <ArrowLeft className="w-4 h-4" />
            ニュース一覧へ戻る
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {articleLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
      )}

      <section className="container mx-auto px-6 md:px-20 pt-8 md:pt-10 pb-14">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            News Archive
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] px-4 py-2 text-sm text-gray-500 dark:text-gray-300 font-mono">
              <Calendar className="w-4 h-4" />
              {news.date}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] px-3 py-2">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider ${
                  catColorMap[news.cat] || 'bg-gray-600'
                }`}
              >
                {news.cat}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {news.title}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 mb-10">
            <img
              src={news.img}
              alt={news.title}
              width={1600}
              height={900}
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>
          <article className="w-full">
            <div className="w-14 h-0.5 bg-gradient-to-r from-brand-blue to-brand-green mb-10" />
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-8 whitespace-pre-line">
              {news.content}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
