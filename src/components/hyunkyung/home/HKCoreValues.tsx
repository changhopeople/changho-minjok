'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Cpu, Handshake, TrendingUp } from 'lucide-react';
import HKSectionHeader from '../shared/HKSectionHeader';
import { HK_CORE_VALUES } from '@/lib/constants/hyunkyung';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  cpu: Cpu,
  handshake: Handshake,
  trending: TrendingUp,
};

export default function HKCoreValues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 md:py-32 bg-[var(--hk-navy)] relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(196,146,42,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,146,42,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            CORE VALUES
          </p>
          <h2 className="!text-white text-3xl md:text-4xl font-bold mb-4">
            현경시스템이 추구하는 가치
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            모든 프로젝트에 적용되는 핵심 원칙입니다
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HK_CORE_VALUES.map((value, i) => {
            const Icon = iconMap[value.icon] || Shield;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 h-full hover:border-[var(--hk-gold)]/30 transition-all duration-500 hover:bg-white/[0.07]">
                  {/* 상단 넘버 */}
                  <span className="text-[var(--hk-gold)]/20 text-6xl font-bold absolute top-4 right-5 leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="w-12 h-12 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[var(--hk-gold)]" />
                  </div>

                  <p className="text-[var(--hk-gold)]/60 text-[10px] tracking-[0.2em] uppercase mb-1">
                    {value.titleEn}
                  </p>
                  <h3 className="!text-white text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
