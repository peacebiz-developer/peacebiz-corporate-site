import React, { useLayoutEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNewsBySlug } from '../data/newsData';
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { applySeoMeta } from '../utils/seo';

const BASE_URL = 'https://www.peace-biz.com';

const catColorMap: Record<string, string> = {
  Info: 'bg-brand-blue',
  Works: 'bg-brand-green',
  Recruit: 'bg-brand-orange',
};

const NewsDetail: React.FC = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const news = useMemo(() => getNewsBySlug(slug), [slug]);
  const actionButtonClass =
    'dark:bg-black bg-white text-black dark:text-white flex items-center justify-center gap-2 whitespace-nowrap';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/news');
  };

  useLayoutEffect(() => {
    if (!news) {
      applySeoMeta({
        title: 'ニュース詳細｜Peace Biz',
        description: '指定されたニュースは見つかりませんでした。',
        canonicalUrl: `${BASE_URL}/news`,
        robots: 'noindex, nofollow',
      });
      return;
    }
    applySeoMeta({
      title: `${news.title}｜Peace Biz`,
      description: news.content.replace(/\s+/g, ' ').slice(0, 120),
      canonicalUrl: `${BASE_URL}/news/${news.slug}`,
    });
  }, [news]);

  const articleLd = useMemo(() => {
    if (!news) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: news.title,
      datePublished: news.date,
      dateModified: news.date,
      image: [news.img],
      author: {
        '@type': 'Organization',
        name: '株式会社ピース・ビズ',
      },
      publisher: {
        '@type': 'Organization',
        name: '株式会社ピース・ビズ',
      },
      mainEntityOfPage: `${BASE_URL}/news/${news.slug}`,
      articleBody: news.content,
    };
  }, [news]);

  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <section className="container mx-auto px-6 md:px-20 pt-40 pb-24">
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

      <section className="w-full pt-28 md:pt-32 pb-14">
        <div className="max-w-5xl mx-auto px-6 md:px-20 md:hidden grid grid-cols-2 gap-3 mb-6">
          <HoverBorderGradient
            containerClassName="rounded-full w-full"
            as="button"
            onClick={handleBack}
            className={`${actionButtonClass} w-full`}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back</span>
          </HoverBorderGradient>
          <Link to="/news" className="w-full">
            <HoverBorderGradient
              containerClassName="rounded-full w-full"
              as="button"
              className={`${actionButtonClass} w-full`}
            >
              <span>ニュース一覧</span>
              <ArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
          </Link>
          <Link to="/" className="col-span-2 w-full">
            <HoverBorderGradient
              containerClassName="rounded-full w-full"
              as="button"
              className={`${actionButtonClass} w-full`}
            >
              <span>Topに戻る</span>
            </HoverBorderGradient>
          </Link>
        </div>

        <div className="hidden md:grid xl:hidden grid-cols-3 gap-3 mb-6 max-w-5xl mx-auto px-6 md:px-20">
          <HoverBorderGradient
            containerClassName="rounded-full w-full"
            as="button"
            onClick={handleBack}
            className={`${actionButtonClass} w-full`}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back</span>
          </HoverBorderGradient>
          <Link to="/news" className="w-full">
            <HoverBorderGradient
              containerClassName="rounded-full w-full"
              as="button"
              className={`${actionButtonClass} w-full`}
            >
              <span>ニュース一覧</span>
              <ArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
          </Link>
          <Link to="/" className="w-full">
            <HoverBorderGradient
              containerClassName="rounded-full w-full"
              as="button"
              className={`${actionButtonClass} w-full`}
            >
              <span>Topに戻る</span>
            </HoverBorderGradient>
          </Link>
        </div>

        <div className="hidden xl:block">
          <div className="relative left-1/2 w-screen -translate-x-1/2">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,64rem)_minmax(0,1fr)] items-start gap-6">
              <div className="flex justify-center pt-2">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  onClick={handleBack}
                  className={actionButtonClass}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  <span>Back</span>
                </HoverBorderGradient>
              </div>
              <div>
                <h1 className="text-5xl font-black tracking-tight leading-tight">
                  {news.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-3">
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
              </div>
              <div className="flex flex-col items-center gap-3 pt-2">
                <Link to="/news">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className={actionButtonClass}
                  >
                    <span>ニュース一覧</span>
                    <ArrowRight className="h-4 w-4" />
                  </HoverBorderGradient>
                </Link>
                <Link to="/">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className={actionButtonClass}
                  >
                    <span>Topに戻る</span>
                  </HoverBorderGradient>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-20 xl:hidden">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {news.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 mb-2">
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
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 mb-10">
            <img src={news.img} alt={news.title} className="w-full h-auto object-cover" />
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
