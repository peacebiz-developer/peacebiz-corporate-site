export const ROUTES = {
  home: '/',
  about: '/about',
  company: '/company',
  services: '/services',
  servicesIt: '/services/it-solution',
  servicesEco: '/services/eco-solution',
  servicesOffice: '/services/office-solution',
  servicesEcoCommercialAircon: '/services/eco-solution/commercial-aircon',
  works: '/works',
  work: '/work',
  workDetail: '/work/:slug',
  worksDetail: '/works/:slug',
  news: '/news',
  newsDetail: '/news/:slug',
  contact: '/contact',
  recruit: '/recruit',
  privacy: '/privacy',
  sitePolicy: '/sitepolicy',
  terms: '/terms',
  sparklesDemo: '/sparkles-demo',
} as const;

export type StaticRoutePath =
  | typeof ROUTES.home
  | typeof ROUTES.about
  | typeof ROUTES.company
  | typeof ROUTES.services
  | typeof ROUTES.servicesIt
  | typeof ROUTES.servicesEco
  | typeof ROUTES.servicesOffice
  | typeof ROUTES.servicesEcoCommercialAircon
  | typeof ROUTES.works
  | typeof ROUTES.work
  | typeof ROUTES.news
  | typeof ROUTES.contact
  | typeof ROUTES.recruit
  | typeof ROUTES.privacy
  | typeof ROUTES.sitePolicy
  | typeof ROUTES.terms
  | typeof ROUTES.sparklesDemo;
