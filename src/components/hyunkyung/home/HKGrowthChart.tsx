'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_REVENUE_CHART } from '@/lib/constants/hyunkyung';

const TIMELINE_EVENTS: Record<string, string> = {
  '2021': '법인 설립 · 자동화 설비 투자',
  '2022': '설비 증설 · 영남권 확대',
  '2023': '전년 대비 116% 성장',
  '2024': '전국 5개 권역 공급 체계',
};

export default function HKGrowthChart() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const maxRevenue = Math.max(...HK_REVENUE_CHART.map((d) => d.revenue));

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            GROWTH
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--hk-navy)] leading-tight">
            4년간 매출 <span className="text-[var(--hk-gold)]">428%</span> 성장
          </h2>
        </div>

        <div ref={ref}>
          {/* 가로 타임라인 */}
          <div className="relative mb-16">
            {/* 타임라인 라인 */}
            <div className="absolute top-4 left-0 right-0 h-px bg-[#E2E8F0]" />

            <div className="grid grid-cols-4 gap-4">
              {HK_REVENUE_CHART.map((item, i) => (
                <div
                  key={item.year}
                  className="relative pt-10 text-center"
                  style={{
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 0.15}s`,
                  }}
                >
                  {/* 타임라인 도트 */}
                  <div className={`absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                    i === HK_REVENUE_CHART.length - 1
                      ? 'bg-[var(--hk-gold)] border-[var(--hk-gold)]'
                      : 'bg-white border-[var(--hk-navy)]'
                  }`} />
                  <p className="text-[var(--hk-navy)] font-black text-lg mb-1">{item.year}</p>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">
                    {TIMELINE_EVENTS[item.year]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 세로 바 차트 */}
          <div className="flex items-end justify-center gap-6 md:gap-12 h-[300px] md:h-[400px] relative">
            {HK_REVENUE_CHART.map((item, i) => {
              const heightPercent = (item.revenue / maxRevenue) * 85;
              const isLast = i === HK_REVENUE_CHART.length - 1;
              return (
                <div key={item.year} className="flex flex-col items-center flex-1 max-w-[120px] h-full justify-end">
                  {/* 매출액 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                    className={`text-sm md:text-base font-black mb-2 ${
                      isLast ? 'text-[var(--hk-gold)]' : 'text-[var(--hk-navy)]'
                    }`}
                  >
                    {item.revenue}억
                  </motion.p>

                  {/* 바 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${heightPercent}%` } : {}}
                    transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                    className={`w-full rounded-t-sm ${
                      isLast
                        ? 'bg-gradient-to-t from-[var(--hk-navy)] to-[var(--hk-gold)]'
                        : 'bg-[var(--hk-navy)]'
                    }`}
                  />

                  {/* 연도 */}
                  <p className="text-[#94A3B8] text-sm font-semibold mt-3">{item.year}</p>

                  {/* 성장률 */}
                  {item.growth !== null && (
                    <p className={`text-xs font-semibold mt-1 ${
                      item.growth >= 100 ? 'text-[var(--hk-gold)]' : 'text-[#94A3B8]'
                    }`}>
                      +{item.growth}%
                    </p>
                  )}
                </div>
              );
            })}

            {/* 우측 대형 텍스트 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="hidden lg:flex flex-col items-start justify-center ml-12 flex-shrink-0"
            >
              <p className="text-6xl xl:text-7xl font-black text-[var(--hk-gold)] leading-none">
                428<span className="text-4xl xl:text-5xl">%</span>
              </p>
              <p className="text-[var(--hk-navy)] font-black text-lg mt-2">매출 성장</p>
              <p className="text-[#94A3B8] text-xs mt-1">2021 → 2024</p>
            </motion.div>
          </div>

          {/* 하단 출처 */}
          <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#94A3B8]">
            <span>출처: 잡코리아 기업정보</span>
            <span className="text-[var(--hk-navy)] font-semibold">동종업계 77위 / 신용등급 양호</span>
          </div>
        </div>
      </div>
    </section>
  );
}
