'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { HK_BUSINESS_AREAS } from '@/lib/constants/hyunkyung';

const GRADIENTS = [
  'from-[#0C1B3A] via-[#1E3A5F] to-[#0A1628]',
  'from-[#1A0E05] via-[#3D2B1F] to-[#0A1628]',
  'from-[#050D1A] via-[#0F2240] to-[#1E3A5F]',
  'from-[#0A1628] via-[#0C1B3A] to-[#050D1A]',
];

export default function HKBusinessAreas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // 처음 3개 사업영역만 대형 카드로 표시 (3칼럼)
  const mainAreas = HK_BUSINESS_AREAS.slice(0, 3);

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              BUSINESS AREAS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--hk-navy)] leading-tight">
              사업영역
            </h2>
          </div>
          <p className="text-[#64748B] max-w-md md:text-right leading-[1.8]">
            PVC 창호 조립부터 고기능 복층유리 가공, 건설 시공까지
            <br className="hidden md:block" />
            수직 통합 솔루션을 제공합니다
          </p>
        </div>

        {/* 풀높이 이미지 카드 3칼럼 */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainAreas.map((area, i) => (
            <Link
              key={area.title}
              href={area.href}
              className="group block relative overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="aspect-[3/4] relative">
                {/* 배경 그라데이션 (이미지 없을 시) */}
                <div className={`absolute inset-0 bg-gradient-to-b ${GRADIENTS[i]}`} />

                {/* 기하학 패턴 */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(196,146,42,0.3) 40px, rgba(196,146,42,0.3) 41px)`,
                  }}
                />

                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-700" />

                {/* 상단 라벨 */}
                <div className="absolute top-6 left-6">
                  <span className="text-[var(--hk-gold)] text-xs tracking-[0.2em] uppercase font-semibold">
                    {area.subtitle}
                  </span>
                </div>

                {/* 하단 텍스트 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="transform group-hover:-translate-y-4 transition-transform duration-500">
                    <h3 className="!text-white text-2xl md:text-3xl font-black mb-2">
                      {area.title}
                    </h3>
                    <p className="text-white/50 text-xs mb-4">{area.stats}</p>

                    {/* 호버 시 나타나는 설명 */}
                    <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                      <p className="text-white/70 text-sm leading-[1.8] mb-4">
                        {area.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[var(--hk-gold)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      자세히 보기
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* 하단 그라데이션 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
            </Link>
          ))}
        </div>

        {/* 4번째 사업영역 (태양광) — 하단 풀폭 밴드 */}
        {HK_BUSINESS_AREAS[3] && (
          <Link
            href={HK_BUSINESS_AREAS[3].href}
            className="group block mt-4 relative overflow-hidden"
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 0.6s ease 0.5s`,
            }}
          >
            <div className={`relative py-8 px-8 md:px-12 bg-gradient-to-r ${GRADIENTS[3]}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[var(--hk-gold)] text-xs tracking-[0.2em] uppercase font-semibold">
                    {HK_BUSINESS_AREAS[3].subtitle}
                  </span>
                  <h3 className="!text-white text-xl md:text-2xl font-black mt-1">
                    {HK_BUSINESS_AREAS[3].title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[var(--hk-gold)] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
