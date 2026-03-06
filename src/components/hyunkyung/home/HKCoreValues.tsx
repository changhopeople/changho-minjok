'use client';

import { useInView } from 'react-intersection-observer';
import { HK_CORE_VALUES } from '@/lib/constants/hyunkyung';

export default function HKCoreValues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            CORE VALUES
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--hk-navy)] leading-tight">
            현경시스템이 추구하는 가치
          </h2>
        </div>

        {/* 수평 1열 배치 + 구분선 */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HK_CORE_VALUES.map((value, i) => (
            <div
              key={value.title}
              className={`relative px-6 md:px-8 py-10 lg:py-0 ${
                i < HK_CORE_VALUES.length - 1 ? 'lg:border-r border-[#E2E8F0]' : ''
              } ${i < 2 ? 'sm:border-b lg:border-b-0 border-[#E2E8F0]' : ''} ${
                i >= 2 ? 'sm:border-b-0' : ''
              }`}
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* 초대형 배경 번호 */}
              <span className="absolute top-2 lg:top-0 right-6 text-[100px] md:text-[120px] font-black text-[var(--hk-navy)]/[0.04] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* 영문 라벨 */}
              <p className="text-[var(--hk-gold)] text-[10px] tracking-[0.2em] uppercase mb-3 relative">
                {value.titleEn}
              </p>

              {/* 제목 */}
              <h3 className="text-xl md:text-2xl font-black text-[var(--hk-navy)] mb-4 relative">
                {value.title}
              </h3>

              {/* 구분선 */}
              <div className="w-8 h-[2px] bg-[var(--hk-gold)] mb-5" />

              {/* 설명 */}
              <p className="text-[#64748B] text-sm leading-[1.8] relative">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
