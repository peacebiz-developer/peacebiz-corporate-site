export interface NewsItem {
  date: string;
  cat: string;
  title: string;
  content: string;
  img: string;
}

const publicUrl = process.env.PUBLIC_URL || '';

export const newsData: NewsItem[] = [
  {
    date: "2026.02.12",
    cat: "Info",
    title: "コーポレートサイトをリニューアルいたしました。",
    content:
      "本日、当社のコーポレートサイトを全面的にリニューアルいたしました。より見やすく、分かりやすいサイトを目指し、デザインや構成を一新しております。今後とも株式会社ピース・ビズをよろしくお願いいたします。",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    date: "2025.01.15",
    cat: "Info",
    title: "Prime Sign サービス提供開始のお知らせ",
    content:
      "窓面プロジェクションサイネージ「Prime Sign」のサービス提供を開始いたしました。\n\n空間そのものをメディア化する新たな情報発信ソリューションとして、法人・店舗の集客およびブランド価値向上を支援いたします。\nITと空間設計を融合させた次世代型サービスとして展開してまいります。",
    img: `${publicUrl}/primesign.webp`,
  },
  {
    date: "2024.02.01",
    cat: "Recruit",
    title: "2025年度新卒採用のエントリー受付を開始しました。",
    content:
      "2025年度の新卒採用エントリーを開始いたしました。私たちと共に未来を創る、情熱あふれる仲間を募集しています。詳細は採用ページをご覧ください。",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop",
  },
  {
    date: "2023.06.01",
    cat: "Info",
    title: "業務用エアコン導入累計3,500件突破",
    content:
      "当社がご提案する業務用エアコンの導入件数が累計3,500件を突破いたしました。\n\n法人・店舗向け設備ソリューションとして、多くのお客様にご採用いただいております。\n今後も品質と迅速な対応を追求し、信頼されるパートナーとして価値を提供してまいります。",
    img: "https://images.unsplash.com/photo-1681505531034-8d67054e07f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    date: "2022.02.01",
    cat: "Info",
    title: "店舗向けアプリケーション提供開始のお知らせ",
    content:
      "法人・店舗向けアプリケーションサービスの提供を開始いたしました。\n\n業務効率化や情報発信の最適化を目的とし、現場運用に即した設計・開発を強みとしています。\nITソリューション領域の強化を通じて、事業成長を支援してまいります。",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    date: "2020.09.15",
    cat: "Info",
    title: "ホームページをリニューアルしました。",
    content:
      "従来のホームページから刷新。私たちの事業内容や理念をより分かりやすく、より美しく伝えることができるようになりました。",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
  },
  {
    date: "2020.07.01",
    cat: "Info",
    title: "仙台支店を移転しました。",
    content:
      "仙台支店を宮城県仙台市青葉区立町1-2へ移転、オフィス環境を強化しました。",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    date: "2020.03.01",
    cat: "Recruit",
    title: "2021年 新卒・中途採用募集",
    content:
      "株式会社ピース・ビズでは、2021年度入社の新卒採用ならびに中途採用の募集を開始いたしました。事業拡大および体制強化を目的に、未来をともに創り上げていく新たな仲間を募集いたします。\n\n新卒採用では、専門知識の有無にかかわらず、主体性を持って挑戦できる方を歓迎します。\n\n中途採用では、営業・技術・企画など各分野で即戦力として活躍いただける方を募集しております。\n\n私たちとともに、事業を通じて社会に価値を届けていきたいという想いを持つ方のご応募をお待ちしております。\n\n詳細は採用ページをご覧ください。",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  },
];
