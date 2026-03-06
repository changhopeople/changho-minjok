'use client';

import Link from 'next/link';
import { ArrowRight, Building2, DoorOpen, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_BUSINESS_AREAS } from '@/lib/constants/hyunkyung';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  window: DoorOpen,
  building: Building2,
  solar: Sun,
};

export default function HKBusinessAreas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              BUSINESS AREAS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--hk-navy)]">
              사업영역
            </h2>
          </div>
          <p className="text-[#64748B] max-w-md md:text-right">
            창호 제조부터 건설 시공, 태양광 발전까지<br className="hidden md:block" />
            통합 솔루션을 제공합니다
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HK_BUSINESS_AREAS.map((area, i) => {
            const Icon = iconMap[area.icon] || Building2;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link href={area.href} className="block group h-full">
                  <div className="relative bg-white border border-[#E2E8F0] rounded-xl overflow-hidden h-full hover:border-[var(--hk-gold)] hover:shadow-xl transition-all duration-500">
                    {/* 탑 컬러 바 */}
                    <div className="h-1 bg-gradient-to-r from-[var(--hk-navy)] to-[var(--hk-gold)] group-hover:h-1.5 transition-all duration-300" />

                    <div className="p-8 md:p-9">
                      {/* 아이콘 + 영문 서브타이틀 */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-[var(--hk-navy)] rounded-xl flex items-center justify-center group-hover:bg-[var(--hk-gold)] transition-colors duration-500">
                          <Icon className="w-7 h-7 text-[var(--hk-gold)] group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--hk-navy)]">{area.title}</h3>
                          <p className="text-xs text-[#94A3B8] tracking-wider uppercase">{area.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-[#64748B] leading-relaxed mb-6 text-sm">
                        {area.description}
                      </p>

                      {/* 하이라이트 통계 */}
                      <div className="pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-xs text-[#94A3B8] font-medium">{area.stats}</span>
                        <span className="inline-flex items-center gap-1 text-[var(--hk-gold)] font-semibold text-sm group-hover:gap-2 transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
