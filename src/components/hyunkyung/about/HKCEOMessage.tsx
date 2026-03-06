'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HKCEOMessage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 md:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-[#0C1B3A]/5 to-[#1E3A5F]/10 rounded-2xl overflow-hidden border border-[#E2E8F0]">
              <div className="w-full h-full flex flex-col items-center justify-center text-[#94A3B8] p-8">
                <div className="w-24 h-24 border-2 border-[var(--hk-gold)]/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm text-[#94A3B8]">대표이사 허자현</p>
              </div>
            </div>
            {/* 플로팅 카드 */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--hk-navy)] text-white rounded-xl p-5 shadow-xl max-w-[200px]">
              <p className="text-[var(--hk-gold)] font-bold text-2xl mb-1">116%</p>
              <p className="text-xs text-gray-400">전년 대비 매출 성장</p>
              <p className="text-xs text-gray-500 mt-1">2023년 기준</p>
            </div>
          </motion.div>

          {/* 인사말 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--hk-gold)]" />
              <span className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase">CEO MESSAGE</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--hk-navy)] mb-8 leading-tight">
              고객과 함께
              <br />
              성장하는 기업
            </h2>

            <div className="space-y-5 text-[#475569] leading-relaxed">
              <p>
                안녕하십니까, 주식회사 현경시스템 대표이사 허자현입니다.
              </p>
              <p>
                현경시스템은 2020년 법인 설립 이래, <strong className="text-[var(--hk-navy)]">&quot;신뢰와 기술로 짓는 내일&quot;</strong>이라는
                경영 철학 아래 대한민국 건설 산업의 발전에 기여하고 있습니다.
              </p>
              <p>
                경상북도 청도에 위치한 3,500평 규모의 스마트 팩토리를 기반으로 PVC, 알루미늄, 시스템 창호를 제조하며,
                철저한 품질 관리 체계와 체계적인 시공 프로세스를 통해 고객의 신뢰를 얻어왔습니다.
              </p>
              <p>
                2023년에는 전년 대비 <strong className="text-[var(--hk-navy)]">116% 매출 성장</strong>을 기록하며 빠르게 성장하고 있으며,
                창호 사업에서 건설, 태양광 발전까지 사업 영역을 확장하며 지속 가능한 성장을 추구하고 있습니다.
              </p>
              <p>
                앞으로도 끊임없는 기술 혁신과 품질 개선을 통해 고객 여러분의 기대에 부응하는 기업이 되겠습니다.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E2E8F0] flex items-center gap-4">
              <div>
                <p className="text-[var(--hk-navy)] font-bold text-xl">허자현</p>
                <p className="text-sm text-[#94A3B8]">주식회사 현경시스템 대표이사</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
