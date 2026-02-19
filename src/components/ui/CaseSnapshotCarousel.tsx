import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './case-snapshot-carousel.css';

interface CaseSlideData {
  quote: string;
  client: string;
  service: string;
  challenge: string;
  solution: string;
  outcome: string;
  keyResult: string;
  accent: string;
  imageUrl: string;
  label: string;
}

const caseSlides: CaseSlideData[] = [
  {
    quote: '「求人も集客も、見せたい瞬間を伝えられるようになった」',
    client: '首都圏｜サービス業（複数店舗）｜運営責任者',
    service: 'IT Solution｜Prime Sign',
    challenge:
      '店頭の情報が散らかりがちで、紙掲示は更新が追いつかない。視線対策をすると今度は “営業してる感” が弱くなる。採用も、他の求人に埋もれてしまう。',
    solution:
      'ガラス面の “見せ方” を設計し、時間帯で投影映像を切替。求人動画は短尺で統一し、来店導線と干渉しない運用に。',
    outcome:
      '店の空気感が入口で伝わり、スタッフの説明負荷も下がる。採用は「見て分かる」入口ができる。',
    keyResult: '応募導線が強くなる（目安：応募数 +10〜20%）、店頭案内の更新が当日反映、',
    accent: '#006bb6',
    imageUrl:
      `${process.env.PUBLIC_URL || ''}/top-ownersvoice-primesign.webp`,
    label: 'サービス業 店舗',
  },
  {
    quote: '「ビルの“顔”ができて、空室の動きが早くなった」',
    client: '首都圏｜不動産（自社ビル）｜社長',
    service: 'IT Solution｜LEDサイネージ',
    challenge:
      'ビルの視認性が弱く、テナント募集や案内の訴求が分散。看板更新も手間で、情報が古くなりがち。',
    solution:
      '視認距離と通行量からサイズと輝度を設計し、大型LEDを壁面に最適配置。表示はテンプレ化して運用負荷を下げた。',
    outcome:
      '建物の印象が揃い、募集・案内の反映が早い。認知の取りこぼしが減る。',
    keyResult: '視認性が上がる（目安：問い合わせ +5〜15%）、掲出変更が即日対応',
    accent: '#006bb6',
    imageUrl:
      `${process.env.PUBLIC_URL || ''}/top-ownersvoice-ledsignage.webp`,
    label: '不動産 ビル',
  },
  {
    quote: '「入れ替えじゃなくて、店に合う “効かせ方” だった」',
    client: '福岡｜飲食店｜男性オーナー',
    service: 'Eco Solution｜業務用エアコン入替',
    challenge:
      'ピーク時に厨房が暑くて客席は冷える、席によって風当たりが強い／弱い。既設のダクト位置・天井構造・室外機の置き場制約もあって、単純な入替だと解決しにくい。',
    solution:
      '厨房の排熱・客席レイアウト・滞在時間・ピーク稼働人数を前提に、ゾーニングと吹出口を再設計。能力選定だけでなく、運転ルールまで含めて最適解を提案。',
    outcome:
      '客席の体感ムラが減り、厨房の暑さも抑えやすくなる。ピーク時の不満や突発対応が減って、営業に集中できる。',
    keyResult: '客席の体感ムラを抑える、厨房の暑さ・ピーク負荷に合わせて “効かせ方” まで設計',
    accent: '#00903b',
    imageUrl:
      `${process.env.PUBLIC_URL || ''}/top-ownersvoice-aircon.webp`,
    label: '飲食店 店舗',
  },
  {
    quote: '「欲しいものがバラバラじゃなくて、まとめて整った」',
    client: '首都圏｜一般企業｜総務部長',
    service: 'Office / IT Solution｜オフィスサプライ / カスタムアプリケーション',
    challenge:
      '備品、OA機器、回線、ツールの窓口が分散して、請求も問い合わせもバラバラ。割り込みが多く、総務が疲弊しがち。',
    solution:
      'サプライだけでなく、OA機器・回線・必要なアプリまで“業務の流れ”で整理し、相談窓口を一本化。運用が回る形に寄せた。',
    outcome:
      '困りごとの初動が速くなり、請求・管理の手間が減る。総務が本来の改善業務に時間を使える。',
    keyResult: '窓口一本化で対応が早い（目安：対応工数 -20〜35%）、調達〜運用が一気通貫',
    accent: '#ea5712',
    imageUrl:
      `${process.env.PUBLIC_URL || ''}/top-ownersvoice-officesupply.webp`,
    label: '一般企業 オフィス',
  },
];

const SLIDE_DURATION = 8000;
const TRANSITION_DURATION = 800;

export default function CaseSnapshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % caseSlides.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + caseSlides.length) % caseSlides.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setIsPaused(false);
  };

  const slide = caseSlides[currentIndex];
  const cls = (base: string) =>
    `${base} ${isTransitioning ? 'transitioning' : 'visible'}`;

  return (
    <div
      className="carousel-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}12 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        {/* Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            <div className={cls('carousel-collection-num')}>
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(caseSlides.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className={cls('carousel-title')} style={{ borderLeftColor: slide.accent }}>{slide.quote}</h3>

            <p className={cls('carousel-client')}>— {slide.client}</p>

            <p
              className={cls('carousel-subtitle')}
              style={{ color: slide.accent }}
            >
              {slide.service}
            </p>

            <div className={cls('carousel-body')}>
              <div className="carousel-body-section">
                <h4 className="carousel-body-heading">Before</h4>
                <p>{slide.challenge}</p>
              </div>
              <div className="carousel-body-section">
                <h4 className="carousel-body-heading">What we did</h4>
                <p>{slide.solution}</p>
              </div>
              <div className="carousel-body-section">
                <h4 className="carousel-body-heading">After</h4>
                <p>{slide.outcome}</p>
              </div>
            </div>

            <div
              className={cls('carousel-key-result')}
              style={{ borderLeftColor: slide.accent }}
            >
              <span className="carousel-key-result-label">Key Result</span>
              <p className="carousel-key-result-text">{slide.keyResult}</p>
            </div>

          </div>

          <div className="carousel-bottom">
            <div className="carousel-actions-row">
              <div className="carousel-nav-arrows">
                <button
                  onClick={goPrev}
                  className="carousel-arrow-btn"
                  aria-label="Previous slide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="carousel-arrow-btn"
                  aria-label="Next slide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link to="/works" className="carousel-view-more-btn">
                導入事例を見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="carousel-progress-bar">
              {caseSlides.map((s, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="carousel-progress-track">
                    <div
                      className="carousel-progress-fill"
                      style={{
                        width:
                          index === currentIndex
                            ? `${progress}%`
                            : index < currentIndex
                              ? '100%'
                              : '0%',
                        backgroundColor:
                          index === currentIndex ? slide.accent : undefined,
                      }}
                    />
                  </div>
                  <span className="carousel-progress-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="carousel-image-container">
          <div className={cls('carousel-image-frame')}>
            <img
              src={slide.imageUrl}
              alt={slide.client}
              className="carousel-image"
              loading="lazy"
            />
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${slide.accent}15 0%, transparent 50%)`,
              }}
            />
          </div>
          <div
            className="carousel-frame-corner carousel-frame-corner--tl"
            style={{ borderColor: slide.accent }}
          />
          <div
            className="carousel-frame-corner carousel-frame-corner--br"
            style={{ borderColor: slide.accent }}
          />
        </div>
      </div>
    </div>
  );
}
