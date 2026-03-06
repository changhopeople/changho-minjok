'use client';

import { useInView } from 'react-intersection-observer';
import { useMotionValue, useTransform, animate } from 'framer-motion';
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
        duration: 2.5,
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
    <section className="relative bg-[#050D1A] overflow-hidden">
      {/* 풀블리드 다크 배경 */}
      <div ref={ref} className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* 라벨 */}
          <div className="text-center mb-16">
            <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              KEY FIGURES
            </p>
          </div>

          {/* 초대형 숫자 그리드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {HK_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center px-4 py-8 lg:py-0 ${
                  i < HK_STATS.length - 1 ? 'lg:border-r lg:border-white/10' : ''
                } ${i < 2 ? 'border-b lg:border-b-0 border-white/10' : ''}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none">
                  {stat.prefix}
                  <CountUp target={stat.value} inView={inView} />
                  <span className="text-[var(--hk-gold)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ml-1">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-white/40 text-sm mt-4 tracking-[0.1em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 골드 라인 */}
      <div className="h-px bg-[var(--hk-gold)]/30" />
    </section>
  );
}
