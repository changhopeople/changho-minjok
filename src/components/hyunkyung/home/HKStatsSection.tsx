'use client';

import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HK_STATS } from '@/lib/constants/hyunkyung';

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [display, setDisplay] = useState('0');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (target >= 1000) {
      return v.toLocaleString('ko-KR', { maximumFractionDigits: 0 });
    }
    return Math.round(v).toString();
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [inView, target, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return <>{display}</>;
}

export default function HKStatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative bg-white overflow-hidden">
      {/* 탑 골드 라인 */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--hk-gold)] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        {/* 상단 라벨 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-2">
            KEY FIGURES
          </p>
          <p className="text-[#94A3B8] text-sm">현경시스템의 핵심 수치</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#E2E8F0]">
          {HK_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center px-4"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--hk-navy)] tracking-tight leading-none">
                {stat.prefix}
                <CountUp target={stat.value} inView={inView} />
                <span className="text-[var(--hk-gold)] text-2xl sm:text-3xl md:text-4xl font-semibold ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <div className="w-8 h-0.5 bg-[var(--hk-gold)]/30 mx-auto my-4" />
              <p className="text-[#64748B] font-medium text-sm md:text-base tracking-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
