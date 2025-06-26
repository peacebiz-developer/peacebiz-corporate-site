"use client";
import React from "react";
import { SparklesCore } from "./sparkles";

// ピース・ビズ専用のSparklesCoreコンポーネント
export function PeaceBizSparkles() {
  return (
    <div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      {/* Background Sparkles */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="peacebiz-background"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.8}
        />
      </div>
      
      <div className="flex flex-col items-center translate-y-[151px]">
        {/* Main Content */}
        <div className="relative z-20 text-center">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Peace Biz
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ビジネスの未来を創造する
          </p>
        </div>

        {/* Foreground Sparkles */}
        <div className="w-[40rem] h-40 relative mt-8">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={800}
            className="w-full h-full"
            particleColor="#3B82F6"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
}

// ヒーローセクション用のSparklesCore
export function HeroSparkles() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Sparkles */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="hero-background"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.6}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="block">ビジネスの</span>
            <span className="block text-accent">未来を創造</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            2008年の設立以来、PrimeSign事業を中心に、店舗向けソリューションから
            太陽光・エアコンまで、お客様のビジネス成長をサポートしてきました。
          </p>
        </div>
      </div>
    </div>
  );
}

// サービスセクション用のSparklesCore
export function ServicesSparkles() {
  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="services-background"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.4}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            私たちのサービス
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            PrimeSign事業を中心に、お客様のビジネス成長をサポート
          </p>
        </div>
      </div>
    </div>
  );
}

// コンタクトセクション用のSparklesCore
export function ContactSparkles() {
  return (
    <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="contact-background"
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#3B82F6"
          speed={0.3}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            お問い合わせ
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            お客様のビジネスに最適なソリューションをご提案いたします
          </p>
        </div>
      </div>
    </div>
  );
} 