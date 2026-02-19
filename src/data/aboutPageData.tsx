import React from 'react';
import type { HorizontalTimelineItem } from '../components/ui/horizontal-timeline';

export const aboutTimelineData: HorizontalTimelineItem[] = [
  {
    year: '2008',
    title: '創業',
    summary: '東京・福岡の2拠点で事業を開始。',
    detail: (
      <div className="space-y-2">
        <p>2008年5月2日　株式会社ピース・ビズを設立。</p>
        <p>2008/05　東京都千代田区内神田に資本金300万円で設立</p>
        <p>2008/06　セキュリティ／防犯カメラ販売、IT事業部を開設</p>
        <p>2008/10　福岡支店を開設</p>
        <p>2008/11　移動体事業部・回線事業部を開設／ソフトバンク代理店締結</p>
        <p>2008/11　本社を豊島区池袋へ移転</p>
        <p>2009/05　資本金を500万円に増資</p>
      </div>
    ),
  },
  {
    year: '2010',
    title: '店舗の業務改善へ',
    summary: '店舗向けの顧客管理・コンサル領域を立ち上げ。',
    detail: (
      <div className="space-y-2">
        <p>2010/05　店舗向け顧客管理システムの販売を開始</p>
        <p>2010/05　店舗コンサルティング事業部を開設</p>
      </div>
    ),
  },
  {
    year: '2012',
    title: '東北へ展開',
    summary: '仙台拠点を開設し、地域に根ざした体制を構築。',
    detail: (
      <div className="space-y-2">
        <p>2012/02　仙台支店を開設</p>
        <p>2012/08　仙台支店を国分町へ移転</p>
        <p>2020/07　仙台支店を立町へ移転（体制強化）</p>
      </div>
    ),
  },
  {
    year: '2016',
    title: '通信パートナー提携',
    summary: '各地の通信サービスと提携し、提供領域を拡張。',
    detail: (
      <div className="space-y-2">
        <p>2016/02　BBIQ光（QTnet）代理店契約</p>
        <p>2016/10　トークネット光（東北インテリジェント通信）代理店契約</p>
        <p>2018/06　メガ・エッグ光ビジネス（エネルギア・コミュニケーションズ）代理店契約</p>
      </div>
    ),
  },
  {
    year: '2021',
    title: '空調ソリューションを本格化',
    summary: '機器入替まで一貫対応。計4,000事業所／8,000台突破。',
    detail: (
      <div className="space-y-2">
        <p>業務用エアコンの取扱いと、機器入替工事まで一貫した提供を開始</p>
        <p><b>累計：4,000事業所／8,000台突破</b></p>
      </div>
    ),
  },
  {
    year: '2022',
    title: '店舗向けアプリケーションの提供開始',
    summary: '店舗運用を支えるアプリを展開。800店舗超で導入。',
    detail: (
      <div className="space-y-2">
        <p>店舗向けアプリケーションの提供を開始</p>
        <p><b>導入実績：800店舗以上</b></p>
      </div>
    ),
  },
  {
    year: '2025',
    title: '映像・空間演出領域を強化',
    summary: 'Prime Sign、LEDサイネージ、動画コンテンツ制作の一貫対応を開始。',
    detail: (
      <div className="space-y-2">
        <p>Prime Sign のサービス提供を開始</p>
        <p>LEDサイネージの取扱いを開始</p>
        <p>動画コンテンツ制作の一貫対応を開始</p>
      </div>
    ),
  },
  {
    year: '2026 ～ Future',
    title: '次の課題への挑戦',
    summary: '現場に効く仕組みを、より速く、より確実に。',
    detail: (
      <div className="space-y-2">
        <p>AIやブラウザベースのソリューションを検討中</p>
      </div>
    ),
  },
];

export const aboutMarqueeImageOrder = [1, 2, 3, 4, 5, 6, 7, 16, 8, 9, 10, 11, 12, 13, 14, 15, 1, 6];

export const aboutPhilosophyCards = [
  {
    title: "Innovation",
    desc: "常に最新技術を追求し、お客様に最適なソリューションを提供し続ける。",
    bgImageFile: 'about-philosophy-innovation-1.webp',
    hoverImageFile: 'about-philosophy-innovation-2.webp',
  },
  {
    title: "Passion",
    desc: "お客様への情熱と品質へのこだわりを、細部まで徹底し貫き通す。",
    bgImageFile: 'about-philosophy-passion-1.webp',
    hoverImageFile: 'about-philosophy-passion-2.webp',
  },
  {
    title: "Speed",
    desc: "変化の激しい時代に、迅速な意思決定で、素早く実行へつなげる。",
    bgImageFile: 'about-philosophy-speed-1.webp',
    hoverImageFile: 'about-philosophy-speed-2.webp',
  },
  {
    title: "Teamwork",
    desc: "個々の力を最大化し、チームとして連携し、最高の成果を生み出す。",
    bgImageFile: 'about-philosophy-team-1.webp',
    hoverImageFile: 'about-philosophy-team-2.webp',
  },
];

export type AboutOffice = {
  name: string;
  jp: string;
  address: string;
  phone: string;
  imageFile: string;
  mapUrl: string;
};

export const aboutOffices: AboutOffice[] = [
  {
    name: '東京本社',
    jp: 'Tokyo Head Office',
    address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F',
    phone: '03-3917-3587',
    imageFile: 'tokyo-hq.webp',
    mapUrl: 'https://maps.app.goo.gl/HP1rpAtN7AgS6Wo59',
  },
  {
    name: '仙台支社',
    jp: 'Sendai Branch',
    address: '宮城県仙台市青葉区国分町1-4-9',
    phone: '022-722-1385',
    imageFile: 'sendai-branch.webp',
    mapUrl: 'https://maps.app.goo.gl/Bw2iD4eqb2UNQh839',
  },
  {
    name: '福岡支社',
    jp: 'Fukuoka Branch',
    address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F',
    phone: '092-263-5888',
    imageFile: 'fukuoka-branch.webp',
    mapUrl: 'https://maps.app.goo.gl/yos1MYmWeHzDpF2F7',
  },
];
