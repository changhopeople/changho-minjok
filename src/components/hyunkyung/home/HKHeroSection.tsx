'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HKHeroSection() {
  return (
    <section className="relative bg-[var(--hk-navy)] min-h-screen flex items-center overflow-hidden">
      {/* 풀스크린 배경 - 다크 시네마틱 그라데이션 */}
      <div className="absolute inset-0">
        {/* 메인 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050D1A] via-[#0C1B3A] to-[#0A1628]" />

        {/* 그리드 패턴 오버레이 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,146,42,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,146,42,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* 글로우 이펙트 */}
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-[var(--hk-blue)]/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[var(--hk-gold)]/5 rounded-full blur-[100px]" />

        {/* 대각선 라인 장식 */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <line x1="800" y1="0" x2="1440" y2="600" stroke="#C4922A" strokeWidth="1" />
          <line x1="900" y1="0" x2="1440" y2="400" stroke="#C4922A" strokeWidth="0.5" />
          <line x1="1000" y1="0" x2="1440" y2="300" stroke="#C4922A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 좌측 텍스트 */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* 뱃지 */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-[var(--hk-gold)]" />
                <span className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.2em] uppercase">
                  Since 2020 &mdash; PVC 창호 &amp; 복층유리 스마트 제조
                </span>
              </div>

              {/* 메인 타이틀 */}
              <h1 className="!text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                신뢰와 기술로
                <br />
                <span className="relative">
                  <span className="text-[var(--hk-gold)]">짓는 내일</span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-2 left-0 h-[3px] bg-[var(--hk-gold)]/40"
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              대지 3,300평, 전 공정 자동화 스마트팩토리 기반 PVC 창호 조립 및 기능성 복층유리 가공 전문기업.
              <br />
              <span className="text-gray-300">4년간 매출 428% 성장</span>, 전국 5개 권역에 공급합니다.
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/hyunkyung/inquiry"
                className="group inline-flex items-center justify-center gap-3 bg-[var(--hk-gold)] hover:bg-[#D4A233] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-base"
              >
                프로젝트 문의
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/hyunkyung/about"
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-base"
              >
                기업소개 보기
              </Link>
            </motion.div>

            {/* 하단 미니 통계 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t border-white/10"
            >
              {[
                { label: '매출액', value: '56.1억', sub: '2024' },
                { label: '4년 성장', value: '428%', sub: '\'21→\'24' },
                { label: '영업이익률', value: '6.8%', sub: '2024' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-white font-bold text-xl md:text-2xl">{item.value}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.label}
                    {item.sub && <span className="text-gray-600 ml-1">{item.sub}</span>}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 우측 - 키 비주얼 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* 메인 이미지 플레이스홀더 */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1E3A5F]/50 to-[#0C1B3A]">
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 border-2 border-[var(--hk-gold)]/30 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-[var(--hk-gold)] font-bold text-2xl">HK</span>
                  </div>
                  <p className="text-white/60 text-sm">스마트 팩토리</p>
                  <p className="text-white font-bold text-lg mt-1">대지 3,300평</p>
                  <div className="w-16 h-px bg-[var(--hk-gold)]/30 my-4" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    TPS간봉 자동부착·CNC 절단<br />전 공정 자동화 생산
                  </p>
                </div>
              </div>

              {/* 플로팅 카드 */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 min-w-[180px]">
                <p className="text-[var(--hk-gold)] font-bold text-2xl">428%</p>
                <p className="text-white/60 text-xs">4년간 매출 성장률</p>
                <p className="text-white/40 text-[10px] mt-0.5">13.1억 → 56.1억</p>
              </div>

              {/* 우상단 인증 뱃지 */}
              <div className="absolute -top-3 -right-3 bg-[var(--hk-gold)] text-[var(--hk-navy)] rounded-lg px-3 py-2 text-xs font-bold">
                KS 인증
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  );
}
