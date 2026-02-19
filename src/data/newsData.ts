import newsJson from './content/news.json';

export type NewsCategory = 'Info' | 'Works' | 'Recruit';

export interface NewsItem {
  slug: string;
  date: string;
  cat: NewsCategory;
  title: string;
  content: string;
  img: string;
}

const publicUrl = process.env.PUBLIC_URL || '';
export const NEWS_PAGE_SIZE = 6;

const toPublicUrl = (src: string) => {
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith('/')) return `${publicUrl}${src}`;
  return `${publicUrl}/${src}`;
};

const parseDateScore = (date: string) => Number(date.replace(/\./g, ''));

export const newsData: NewsItem[] = [...(newsJson as NewsItem[])]
  .map((item) => ({
    ...item,
    img: toPublicUrl(item.img),
  }))
  .sort((a, b) => parseDateScore(b.date) - parseDateScore(a.date));

export const getNewsBySlug = (slug: string): NewsItem | null =>
  newsData.find((item) => item.slug === slug) ?? null;
