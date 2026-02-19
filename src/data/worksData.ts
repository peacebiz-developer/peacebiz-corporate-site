import worksJson from './content/works.json';
export type BentoSize = '1x1' | '2x1' | '1x2' | '2x2';

export interface WorkItem {
  id: number;
  slug: string;
  category: 'it' | 'eco' | 'office';
  service?: string;
  title: string;
  client: string;
  year: string;
  img: string;
  description: string;
  scope: string;
}

export interface SubService {
  key: string;
  label: string;
}

export const categorySubServices: Record<string, SubService[]> = {
  it: [
    { key: 'prime-sign', label: 'Prime Sign' },
    { key: 'led-signage', label: 'LEDサイネージ' },
    { key: 'web-design', label: 'HP・LP制作' },
    { key: 'video', label: '動画制作' },
    { key: 'design', label: 'デザイン' },
  ],
  eco: [
    { key: 'hvac', label: '業務用空調' },
    { key: 'kitchen', label: '厨房機器' },
    { key: 'solar', label: '太陽光発電' },
    { key: 'battery', label: '蓄電池' },
    { key: 'energy', label: '新電力' },
  ],
  office: [
    { key: 'supply', label: 'オフィスサプライ' },
    { key: 'internet', label: 'ネット回線' },
    { key: 'mobile', label: 'スマホ・タブレット' },
  ],
};

const publicUrl = process.env.PUBLIC_URL || '';
export const WORKS_PAGE_SIZE = 9;

const toPublicUrl = (src: string) => {
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith('/')) return `${publicUrl}${src}`;
  return `${publicUrl}/${src}`;
};

export const worksData: WorkItem[] = (worksJson as WorkItem[]).map((item) => ({
  ...item,
  img: toPublicUrl(item.img),
}));

const BENTO_PATTERN: BentoSize[] = ['2x2', '1x1', '1x2', '1x1', '2x1', '1x1'];

export const getBentoSize = (index: number): BentoSize =>
  BENTO_PATTERN[index % BENTO_PATTERN.length];

export const bentoSizeClass = (size: BentoSize): string => {
  switch (size) {
    case '2x1': return 'lg:col-span-2';
    case '1x2': return 'lg:row-span-2';
    case '2x2': return 'lg:col-span-2 lg:row-span-2';
    default:    return '';
  }
};

export const categoryLabels: Record<string, string> = {
  it: 'IT Solution',
  eco: 'Eco Solution',
  office: 'Office Solution',
};

export const categoryColors: Record<string, string> = {
  it: 'bg-brand-blue',
  eco: 'bg-brand-green',
  office: 'bg-brand-orange',
};

export const categoryAccents: Record<string, string> = {
  it: '#006bb6',
  eco: '#00903b',
  office: '#ea5712',
};

export const categoryTextColors: Record<string, string> = {
  it: 'text-brand-blue',
  eco: 'text-brand-green',
  office: 'text-brand-orange',
};

export const getWorkBySlug = (slug: string): WorkItem | null =>
  worksData.find((item) => item.slug === slug) ?? null;
