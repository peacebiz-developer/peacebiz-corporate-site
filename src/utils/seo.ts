import { ORGANIZATION_LOGO_URL } from '../config/site';

export interface SeoMetaInput {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  imageUrl?: string;
  ogType?: string;
}

const upsertMetaByName = (name: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const applySeoMeta = (meta: SeoMetaInput) => {
  const imageUrl = meta.imageUrl || ORGANIZATION_LOGO_URL;
  document.title = meta.title;
  upsertMetaByName(
    'robots',
    meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  upsertMetaByName('description', meta.description);
  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', meta.title);
  upsertMetaByName('twitter:description', meta.description);
  upsertMetaByName('twitter:image', imageUrl);
  upsertMetaByProperty('og:type', meta.ogType || 'website');
  upsertMetaByProperty('og:title', meta.title);
  upsertMetaByProperty('og:description', meta.description);
  upsertMetaByProperty('og:url', meta.canonicalUrl);
  upsertMetaByProperty('og:image', imageUrl);
  upsertCanonical(meta.canonicalUrl);
};
