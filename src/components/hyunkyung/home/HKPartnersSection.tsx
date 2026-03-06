'use client';

import { useInView } from 'react-intersection-observer';
import { HK_PARTNERS } from '@/lib/constants/hyunkyung';

export default function HKPartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="border-y border-[#E2E8F0]">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
        <div
          className="text-center mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <p className="text-[#94A3B8] text-xs font-semibold tracking-[0.2em] uppercase">
            TRUSTED PARTNERS & SUPPLIERS
          </p>
        </div>

        {/* 4x2 로고 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0]">
          {HK_PARTNERS.map((partner, i) => (
            <div
              key={partner}
              className="bg-white flex items-center justify-center py-8 md:py-10 group cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.06}s`,
              }}
            >
              <span className="text-[#CBD5E1] group-hover:text-[var(--hk-navy)] font-black text-lg md:text-xl tracking-tight transition-colors duration-300 relative">
                {partner}
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-[var(--hk-navy)] transition-all duration-300" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
