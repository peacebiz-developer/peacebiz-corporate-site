import { type FC, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeoMeta } from '../../utils/seo';

type RouteMetaConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
};

const SITE_NAME = 'Peace Biz';
const BASE_URL = 'https://www.peace-biz.com';

const DEFAULT_META: RouteMetaConfig = {
  title: `${SITE_NAME}｜未来を創り、笑顔を繋ぐ。`,
  description: 'Peace Biz - INNOVATE THE FUTURE',
  canonicalPath: '/',
};

const META_BY_PATH: Record<string, RouteMetaConfig> = {
  '/': DEFAULT_META,
  '/about': {
    title: `会社情報｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの会社情報・理念・拠点情報をご紹介します。',
    canonicalPath: '/about',
  },
  '/company': {
    title: `会社情報｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの会社情報・理念・拠点情報をご紹介します。',
    canonicalPath: '/company',
  },
  '/services': {
    title: `サービス一覧｜${SITE_NAME}`,
    description: 'IT・ECO・OFFICEの3領域から、事業空間に最適なソリューションを提供します。',
    canonicalPath: '/services',
  },
  '/services/it-solution': {
    title: `IT Solution｜${SITE_NAME}`,
    description: 'Prime Sign、LEDサイネージ、動画制作などITソリューションをご紹介します。',
    canonicalPath: '/services/it-solution',
  },
  '/services/eco-solution': {
    title: `Eco Solution｜${SITE_NAME}`,
    description: '業務用空調・厨房機器・太陽光発電・蓄電池・新電力などECOソリューションをご紹介します。',
    canonicalPath: '/services/eco-solution',
  },
  '/services/office-solution': {
    title: `Office Solution｜${SITE_NAME}`,
    description: 'オフィスサプライ・ネット回線・モバイル端末などOfficeソリューションをご紹介します。',
    canonicalPath: '/services/office-solution',
  },
  '/works': {
    title: `事例｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの導入事例をご紹介します。',
    canonicalPath: '/works',
  },
  '/work': {
    title: `事例｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの導入事例をご紹介します。',
    canonicalPath: '/work',
  },
  '/news': {
    title: `ニュース｜${SITE_NAME}`,
    description: '株式会社ピース・ビズからのお知らせ・トピックスをご案内します。',
    canonicalPath: '/news',
  },
  '/contact': {
    title: `お問い合わせ｜${SITE_NAME}`,
    description: 'サービス導入や採用に関するお問い合わせはこちらからご連絡ください。',
    canonicalPath: '/contact',
  },
  '/recruit': {
    title: `採用情報｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの採用情報ページです。募集要項や働き方をご案内します。',
    canonicalPath: '/recruit',
  },
  '/privacy': {
    title: `プライバシーポリシー｜${SITE_NAME}`,
    description: '株式会社ピース・ビズの個人情報保護方針です。',
    canonicalPath: '/privacy',
  },
  '/sitepolicy': {
    title: `サイトポリシー｜${SITE_NAME}`,
    description: '株式会社ピース・ビズのサイト利用に関するポリシーです。',
    canonicalPath: '/sitepolicy',
  },
  '/terms': {
    title: `利用規約｜${SITE_NAME}`,
    description: '株式会社ピース・ビズのサイト利用規約です。',
    canonicalPath: '/terms',
  },
  '/sparkles-demo': {
    title: `Sparkles Demo｜${SITE_NAME}`,
    description: 'UI demonstration page.',
    canonicalPath: '/sparkles-demo',
    robots: 'noindex, nofollow',
  },
};

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
