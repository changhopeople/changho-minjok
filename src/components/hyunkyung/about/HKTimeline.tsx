'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_TIMELINE } from '@/lib/constants/hyunkyung';

export default function HKTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-3">HISTORY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--hk-navy)] mb-4">연혁</h2>
          <p className="text-[#64748B] max-w-md mx-auto">설립 이래 빠르게 성장해 온 현경시스템의 발자취</p>
        </div>

        <div ref={ref} className="relative">
          {/* 중앙선 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--hk-gold)] via-[#E2E8F0] to-[#E2E8F0]" />

          {HK_TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative flex items-start mb-12 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* 도트 */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                <div className={`w-4 h-4 rounded-full ring-4 ring-[#F8FAFC] ${
                  i === 0 ? 'bg-[var(--hk-gold)]' : 'bg-[var(--hk-navy)]'
                }`} />
              </div>

              {/* 카드 */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                  <span className={`text-2xl font-bold ${i === 0 ? 'text-[var(--hk-gold)]' : 'text-[var(--hk-navy)]'}`}>
                    {item.year}
                  </span>
                  <ul className="mt-3 space-y-2">
                    {item.events.map((event) => (
                      <li key={event} className="flex items-start gap-2 text-[#475569] text-sm">
                        <span className="w-1.5 h-1.5 bg-[var(--hk-gold)] rounded-full mt-1.5 flex-shrink-0" />
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
