import staticRouteMetaJson from '../data/content/static-route-meta.json';
import { BASE_URL } from './site';
import { ROUTES, type StaticRoutePath } from './routes';

export type StaticRouteMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  includeInPrerender?: boolean;
  includeInSitemap?: boolean;
  ogImagePath?: string;
};

export const STATIC_ROUTE_META_BY_PATH = staticRouteMetaJson as Record<string, StaticRouteMeta>;

export const DEFAULT_STATIC_ROUTE_META: StaticRouteMeta = STATIC_ROUTE_META_BY_PATH[ROUTES.home] || {
  title: '株式会社ピース・ビズ｜店舗・オフィスの空間を設計する',
  description:
    '業務用空調、デジタルサイネージ「Prime Sign」、ICT整備まで。株式会社ピース・ビズは店舗・オフィスの環境を設計し、導入から運用まで一貫して支援します。',
  canonicalPath: ROUTES.home,
};

export const getStaticRouteMeta = (path: StaticRoutePath | string): StaticRouteMeta | undefined =>
  STATIC_ROUTE_META_BY_PATH[path];

export const toAbsoluteUrl = (urlOrPath: string): string => {
  if (/^https?:\/\//.test(urlOrPath)) return urlOrPath;
  return `${BASE_URL}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;
};

export const toCanonicalUrl = (path: StaticRoutePath | string): string => {
  const canonicalPath = getStaticRouteMeta(path)?.canonicalPath || path;
  return toAbsoluteUrl(canonicalPath);
};
