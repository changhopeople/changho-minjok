'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_REVENUE_CHART } from '@/lib/constants/hyunkyung';

export default function HKGrowthChart() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const maxRevenue = Math.max(...HK_REVENUE_CHART.map((d) => d.revenue));

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 좌측 - 텍스트 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--hk-gold)]" />
              <span className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase">
                GROWTH
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--hk-navy)] mb-6 leading-tight">
              4년간 매출
              <br />
              <span className="text-[var(--hk-gold)]">428% 성장</span>
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-8">
              2020년 법인 설립 이래, 리모델링 시장을 중심으로 매년 꾸준한 성장을 기록하고 있습니다.
              스마트팩토리 구축과 전 공정 자동화를 통해 생산 효율과 품질을 동시에 확보하며,
              전국 5개 권역으로 공급 영역을 확대하고 있습니다.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-bold text-[var(--hk-navy)]">56.1<span className="text-lg text-[var(--hk-gold)]">억</span></p>
                <p className="text-xs text-[#94A3B8] mt-1">2024 매출</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-bold text-[var(--hk-navy)]">3.8<span className="text-lg text-[var(--hk-gold)]">억</span></p>
                <p className="text-xs text-[#94A3B8] mt-1">영업이익</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-bold text-[var(--hk-navy)]">6.8<span className="text-lg text-[var(--hk-gold)]">%</span></p>
                <p className="text-xs text-[#94A3B8] mt-1">영업이익률</p>
              </div>
            </div>
          </div>

          {/* 우측 - 차트 */}
          <div ref={ref} className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <p className="text-sm text-[#94A3B8] mb-2">연도별 매출 추이</p>
            <p className="text-xs text-[#CBD5E1] mb-8">(단위: 억원, 잡코리아 기업정보 기준)</p>

            <div className="space-y-5">
              {HK_REVENUE_CHART.map((item, i) => {
                const widthPercent = (item.revenue / maxRevenue) * 100;
                return (
                  <div key={item.year} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[var(--hk-navy)] w-12 flex-shrink-0">
                      {item.year}
                    </span>
                    <div className="flex-1 h-10 bg-[#F1F5F9] rounded-lg overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${widthPercent}%` } : {}}
                        transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                        className={`h-full rounded-lg flex items-center justify-end pr-3 ${
                          i === HK_REVENUE_CHART.length - 1
                            ? 'bg-gradient-to-r from-[var(--hk-navy)] to-[var(--hk-gold)]'
                            : 'bg-[var(--hk-navy)]'
                        }`}
                      >
                        <span className="text-white text-sm font-bold whitespace-nowrap">
                          {item.revenue}억
                        </span>
                      </motion.div>
                    </div>
                    {item.growth !== null && (
                      <span className={`text-xs font-semibold w-14 text-right flex-shrink-0 ${
                        item.growth >= 100 ? 'text-[var(--hk-gold)]' : 'text-green-600'
                      }`}>
                        +{item.growth}%
                      </span>
                    )}
                    {item.growth === null && (
                      <span className="text-xs text-[#CBD5E1] w-14 text-right flex-shrink-0">설립</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#94A3B8]">
              <span>출처: 잡코리아 기업정보</span>
              <span className="text-[var(--hk-navy)] font-semibold">동종업계 77위 / 신용등급 양호</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
