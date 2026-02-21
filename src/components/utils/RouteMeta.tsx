import { type FC, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeoMeta } from '../../utils/seo';
import { BASE_URL, SITE_NAME } from '../../config/site';
import routeMetaJson from '../../data/content/static-route-meta.json';

type RouteMetaConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  includeInPrerender?: boolean;
  includeInSitemap?: boolean;
};

const DEFAULT_META: RouteMetaConfig = {
  title: `${SITE_NAME}｜未来を創り、笑顔を繋ぐ。`,
  description: 'Peace Biz - INNOVATE THE FUTURE',
  canonicalPath: '/',
};

const META_BY_PATH: Record<string, RouteMetaConfig> = routeMetaJson;

const resolveMeta = (pathname: string): RouteMetaConfig => META_BY_PATH[pathname] || DEFAULT_META;
const normalizePathname = (pathname: string): string =>
  pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

const RouteMeta: FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const normalizedPath = normalizePathname(location.pathname);
    if (
      normalizedPath.startsWith('/news/') ||
      normalizedPath.startsWith('/works/') ||
      normalizedPath.startsWith('/work/')
    ) {
      return;
    }
    const meta = resolveMeta(normalizedPath);
    const canonicalUrl = `${BASE_URL}${meta.canonicalPath}`.replace(/\/+$/, '') || BASE_URL;
    applySeoMeta({
      title: meta.title,
      description: meta.description,
      canonicalUrl,
      robots: meta.robots,
    });
  }, [location.pathname]);

  return null;
};

export default RouteMeta;
