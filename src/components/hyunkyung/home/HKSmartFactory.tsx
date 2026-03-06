'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_FACTORY_EQUIPMENT } from '@/lib/constants/hyunkyung';
import { Cog, Zap, Monitor } from 'lucide-react';

export default function HKSmartFactory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-[var(--hk-navy)] relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(196,146,42,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,146,42,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--hk-gold)]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            SMART FACTORY
          </p>
          <h2 className="!text-white text-3xl md:text-4xl font-bold mb-4">
            전 공정 자동화 스마트팩토리
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            대지 11,000㎡ · 건물 3,300㎡ + 350평 스마트팩토리 증축.
            원판 입고부터 완제품 생산까지 컴퓨터 자동화 프로그램으로 연동 운영합니다.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PVC 창호 라인 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-[var(--hk-gold)]/30 transition-all"
          >
            <div className="w-12 h-12 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center mb-5">
              <Cog className="w-6 h-6 text-[var(--hk-gold)]" />
            </div>
            <h3 className="!text-white text-lg font-bold mb-1">PVC 창호 조립 라인</h3>
            <p className="text-[var(--hk-gold)]/60 text-xs tracking-wider uppercase mb-4">PVC WINDOW LINE</p>
            <ul className="space-y-2.5">
              {HK_FACTORY_EQUIPMENT.pvcLine.map((eq) => (
                <li key={eq.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{eq.name}</span>
                  <span className="text-white font-medium text-xs bg-white/10 px-2 py-0.5 rounded">{eq.quantity}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 복층유리 라인 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 backdrop-blur-sm border border-[var(--hk-gold)]/20 rounded-xl p-7 relative"
          >
            <div className="absolute -top-3 right-4 bg-[var(--hk-gold)] text-[var(--hk-navy)] text-xs font-bold px-3 py-1 rounded-full">
              신규 증축
            </div>
            <div className="w-12 h-12 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-[var(--hk-gold)]" />
            </div>
            <h3 className="!text-white text-lg font-bold mb-1">복층유리 자동 생산라인</h3>
            <p className="text-[var(--hk-gold)]/60 text-xs tracking-wider uppercase mb-4">INSULATED GLASS LINE</p>
            <ul className="space-y-2.5">
              {HK_FACTORY_EQUIPMENT.glassLine.slice(0, 6).map((eq) => (
                <li key={eq.name} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-[var(--hk-gold)] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-gray-400">{eq.name}</span>
                </li>
              ))}
              <li className="text-xs text-gray-500 pl-3.5">외 {HK_FACTORY_EQUIPMENT.glassLine.length - 6}개 설비</li>
            </ul>
          </motion.div>

          {/* 시스템 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-[var(--hk-gold)]/30 transition-all"
          >
            <div className="w-12 h-12 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center mb-5">
              <Monitor className="w-6 h-6 text-[var(--hk-gold)]" />
            </div>
            <h3 className="!text-white text-lg font-bold mb-1">디지털 운영 체계</h3>
            <p className="text-[var(--hk-gold)]/60 text-xs tracking-wider uppercase mb-4">DIGITAL OPERATIONS</p>
            <ul className="space-y-3">
              {HK_FACTORY_EQUIPMENT.systems.map((sys) => (
                <li key={sys} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-[var(--hk-gold)] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-gray-400">{sys}</span>
                </li>
              ))}
            </ul>

            {/* 효율성 */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-3">자동화 효과</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-[var(--hk-gold)] font-bold text-xl">8→4</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">명으로 인력 절감</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-[var(--hk-gold)] font-bold text-xl">100%</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">전 공정 자동화</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 카피 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm italic">
            &ldquo;초기 8명으로 운영하던 공장을, 스마트팩토리 구축 이후 3~4명으로도 충분히 가동할 수 있게 되었습니다.&rdquo;
          </p>
          <p className="text-gray-600 text-xs mt-2">— 허자현 대표 (유리건장 인터뷰, 2025)</p>
        </motion.div>
      </div>
    </section>
  );
}
