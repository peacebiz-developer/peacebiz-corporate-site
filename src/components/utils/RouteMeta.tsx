import { type FC, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeoMeta } from '../../utils/seo';
import {
  DEFAULT_STATIC_ROUTE_META,
  STATIC_ROUTE_META_BY_PATH,
  toAbsoluteUrl,
  toCanonicalUrl,
} from '../../config/staticRouteMeta';

const resolveMeta = (pathname: string) => STATIC_ROUTE_META_BY_PATH[pathname] || DEFAULT_STATIC_ROUTE_META;
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
    const canonicalUrl = toCanonicalUrl(normalizedPath);
    applySeoMeta({
      title: meta.title,
      description: meta.description,
      canonicalUrl,
      robots: meta.robots,
      imageUrl: meta.ogImagePath ? toAbsoluteUrl(meta.ogImagePath) : undefined,
    });
  }, [location.pathname]);

  return null;
};

export default RouteMeta;
