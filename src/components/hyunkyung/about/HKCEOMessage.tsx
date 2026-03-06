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
              <p className="text-[var(--hk-gold)] font-bold text-2xl mb-1">428%</p>
              <p className="text-xs text-gray-400">4년간 매출 성장</p>
              <p className="text-xs text-gray-500 mt-1">13.1억→56.1억</p>
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
                경영 철학 아래, 리모델링 시장을 중심으로 꾸준히 성장해 왔습니다.
              </p>
              <p>
                경상북도 청도에 위치한 <strong className="text-[var(--hk-navy)]">대지 11,000㎡(약 3,300평)</strong> 규모의 공장에서
                PVC 창호 조립과 기능성 복층유리 가공을 수행하고 있으며, 최근에는 350평 규모의 스마트팩토리를
                증축하여 TPS간봉 자동부착 어플리케이터를 포함한 복층유리 자동 생산라인을 구축했습니다.
              </p>
              <p>
                판유리 원판의 입고부터 CNC 자동 절단, 복층유리 완제품 생산까지 <strong className="text-[var(--hk-navy)]">전 공정을 자동화</strong>하여
                최소 인원으로도 안정적인 생산이 가능하며, ERP 시스템을 통해 공정 전반을 디지털화했습니다.
              </p>
              <p>
                그 결과, 2021년 13.1억에서 2024년 56.1억으로 <strong className="text-[var(--hk-navy)]">4년간 매출 428% 성장</strong>을 달성했으며,
                수도권·충청·호남·영남·강원 등 전국 주요 지역에 제품을 공급하고 있습니다.
              </p>
              <p>
                앞으로 알루미늄 창호 시장 진출과 관공서 조달시장 진출을 통해, 독자적인 경쟁력을 갖춘 리모델링 전문 기업으로
                자리매김하겠습니다.
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
