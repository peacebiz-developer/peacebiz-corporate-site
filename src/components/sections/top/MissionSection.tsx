import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FlipWords } from '../../ui/flip-words';
import { BlurTextEffect } from '../../ui/BlurTextEffect';
import { AnimatedBlobImage } from '../../ui/AnimatedBlobImage';
import { HoverBorderGradient } from '../../ui/hover-border-gradient';
import { topMissionImageNames } from '../../../data/topPageData';

type MissionSectionProps = {
  publicUrl: string;
};

const MissionSectionComponent: React.FC<MissionSectionProps> = ({ publicUrl }) => {
  const [missionImageIdx, setMissionImageIdx] = useState(0);

  const missionImages = useMemo(
    () => topMissionImageNames.map((img) => `${publicUrl}/${img}`),
    [publicUrl]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionImageIdx((prev) => (prev + 1) % missionImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [missionImages.length]);

  return (
    <>
      <section className="relative bg-white min-h-screen flex items-center justify-center" style={{ overflowX: 'clip', overflowY: 'visible' }}>
        <div className="absolute top-0 -left-[18vw] md:-left-[11vw] w-[67.5vw] md:w-[52.2vw] lg:w-[46.8vw] pointer-events-none opacity-[0.15] md:opacity-90">
          <AnimatedBlobImage
            images={missionImages}
            currentIndex={missionImageIdx}
            alt="Our Mission"
          />
        </div>

        <div className="absolute -top-[10vw] md:-top-[8vw] -right-[25vw] md:-right-[17vw] w-[75vw] md:w-[58vw] lg:w-[52vw] pointer-events-none opacity-[0.15] md:opacity-90">
          <AnimatedBlobImage
            images={missionImages}
            currentIndex={(missionImageIdx + 4) % missionImages.length}
            alt="Our Mission"
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-8 md:top-12 text-center pointer-events-none text-[clamp(2.2rem,11vw,10rem)] font-black tracking-tighter leading-none text-white whitespace-nowrap"
          style={{ mixBlendMode: 'difference' }}
        >
          OUR MISSION
        </motion.h2>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-8 md:px-12 text-center pt-32 md:pt-44">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.6rem,5vw,3.75rem)] font-normal text-neutral-800 leading-[1.3] tracking-tight whitespace-nowrap"
          >
            店舗とオフィスに
            <FlipWords
              words={[" 伝わる体験", " 快適な空間", " 回る基盤", " 続く成果", " 共創の力", " 未来への橋", " 安心の選択肢"]}
              duration={3000}
              className="font-black text-brand-blue"
            />
            を。
          </motion.div>

          <div className="mt-8 text-xl md:text-2xl text-neutral-800 leading-relaxed font-semibold mb-6">
            <BlurTextEffect>
              {"私たちピース・ビズは\n法人・店舗の成長を支える環境を幅広い領域から整える\nソリューション & プロデュース企業です。"}
            </BlurTextEffect>
          </div>

          <div className="hidden md:block text-xl text-neutral-600 leading-relaxed font-medium">
            <BlurTextEffect stagger={0.008}>
              {"Prime Sign／サイネージ／アプリ開発で情報の力を引き出すIT領域\n空調・設備・太陽光でエネルギーを最適化するECO領域\nOA機器・通信・ネットワークで運用を支えるOFFICE領域\n\n分断された課題を、ひとつの設計に。\n現場に合う最適解で、未来を創ります。"}
            </BlurTextEffect>
          </div>

          <div className="md:hidden text-lg text-neutral-600 leading-relaxed font-medium">
            <BlurTextEffect stagger={0.008}>
              {"Prime Sign／サイネージ／アプリ開発で\n情報の力を引き出すIT領域。\n空調・設備・太陽光で\nエネルギーを最適化するECO領域。\nOA機器・通信・ネットワークで\n運用を支えるOFFICE領域。\n\n分断された課題を、ひとつの設計に。\n現場に合う最適解で、未来を創ります。"}
            </BlurTextEffect>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex justify-center"
          >
            <Link to="/about">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>View more</span>
                <ArrowRight className="h-4 w-4" />
              </HoverBorderGradient>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="bg-white flex justify-center py-4">
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
      </div>
    </>
  );
};

export const MissionSection = React.memo(MissionSectionComponent);
