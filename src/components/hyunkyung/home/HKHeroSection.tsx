'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    id: 1,
    title: '신뢰와 기술로\n짓는 내일',
    subtitle: 'PVC 창호 & 복층유리 스마트 제조',
    gradient: 'from-[#050D1A] via-[#0C1B3A] to-[#0A1628]',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(196,146,42,0.08) 0%, transparent 50%)',
  },
  {
    id: 2,
    title: '전 공정 자동화\n스마트팩토리',
    subtitle: '대지 3,300평 · 350평 스마트팩토리 증축',
    gradient: 'from-[#0A1628] via-[#0C1B3A] to-[#050D1A]',
    pattern: 'linear-gradient(135deg, rgba(196,146,42,0.06) 25%, transparent 25%, transparent 50%, rgba(196,146,42,0.06) 50%, rgba(196,146,42,0.06) 75%, transparent 75%)',
  },
  {
    id: 3,
    title: '4년간 매출\n428% 성장',
    subtitle: '2021년 13.1억 → 2024년 56.1억',
    gradient: 'from-[#050D1A] via-[#0F2240] to-[#0A1628]',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(196,146,42,0.04) 80px, rgba(196,146,42,0.04) 81px)',
  },
  {
    id: 4,
    title: '전국 5개 권역\n공급 체계',
    subtitle: '수도권 · 충청 · 호남 · 영남 · 강원',
    gradient: 'from-[#0A1628] via-[#050D1A] to-[#0C1B3A]',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(196,146,42,0.06) 0%, transparent 40%)',
  },
];

export default function HKHeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* 슬라이드 배경 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* 그라데이션 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          {/* 기하학적 패턴 */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: slide.pattern, backgroundSize: '160px 160px' }}
          />
          {/* 그리드 오버레이 */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196,146,42,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196,146,42,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 텍스트 오버레이 — 좌하단 */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1400px] w-full mx-auto px-6 pb-32 md:pb-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* 라벨 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-16 bg-[var(--hk-gold)]" />
                <span className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase">
                  {slide.subtitle}
                </span>
              </div>

              {/* 메인 타이틀 */}
              <h1 className="!text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight whitespace-pre-line mb-8">
                {slide.title}
              </h1>

              {/* CTA */}
              <div className="flex items-center gap-6">
                <Link
                  href="/hyunkyung/inquiry"
                  className="group inline-flex items-center gap-3 bg-[var(--hk-gold)] hover:bg-[#D4A233] text-white font-semibold px-8 py-4 transition-all duration-300 text-sm tracking-wide"
                >
                  프로젝트 문의
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/hyunkyung/about"
                  className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors border-b border-white/20 hover:border-white/60 pb-0.5"
                >
                  기업소개
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 슬라이드 인디케이터 — 좌하단 번호 */}
      <div className="absolute bottom-10 left-6 md:left-[calc((100%-1400px)/2+24px)] flex items-center gap-4">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`text-sm font-semibold transition-all duration-300 ${
              i === current
                ? 'text-[var(--hk-gold)]'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
            {i === current && (
              <motion.div
                layoutId="heroIndicator"
                className="h-[2px] bg-[var(--hk-gold)] mt-1"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
        <span className="text-white/20 text-xs ml-2">/ {String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* 스크롤 다운 가이드 — 우하단 */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-10 right-6 md:right-[calc((100%-1400px)/2+24px)] flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase writing-vertical">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        <ChevronDown className="w-4 h-4 text-white/30" />
      </motion.div>
    </section>
  );
}
