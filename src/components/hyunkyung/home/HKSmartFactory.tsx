'use client';

import { useInView } from 'react-intersection-observer';
import { HK_FACTORY_EQUIPMENT } from '@/lib/constants/hyunkyung';

const SECTIONS = [
  {
    number: '01',
    title: 'PVC 창호 조립 라인',
    titleEn: 'PVC WINDOW LINE',
    items: HK_FACTORY_EQUIPMENT.pvcLine.map((eq) => `${eq.name} ${eq.quantity}`),
  },
  {
    number: '02',
    title: '복층유리 자동 생산라인',
    titleEn: 'INSULATED GLASS LINE',
    badge: '신규 증축 350평',
    items: HK_FACTORY_EQUIPMENT.glassLine.map((eq) => eq.name),
  },
  {
    number: '03',
    title: '디지털 운영 체계',
    titleEn: 'DIGITAL OPERATIONS',
    items: HK_FACTORY_EQUIPMENT.systems,
  },
];

export default function HKSmartFactory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F5F5F0] relative overflow-hidden">
      {/* 배경 패턴 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* 좌측 — 스티키 텍스트 */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                SMART FACTORY
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--hk-navy)] leading-tight mb-6">
                전 공정 자동화
                <br />
                스마트팩토리
              </h2>
              <p className="text-[#64748B] leading-[1.8] mb-10">
                대지 11,000㎡ · 건물 3,300㎡ + 350평 스마트팩토리 증축.
                원판 입고부터 완제품 생산까지 컴퓨터 자동화 프로그램으로 연동 운영합니다.
              </p>

              {/* 핵심 수치 */}
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-[var(--hk-gold)] pl-5">
                  <p className="text-4xl font-black text-[var(--hk-navy)]">8→4</p>
                  <p className="text-[#94A3B8] text-sm mt-1">명으로 인력 절감</p>
                </div>
                <div className="border-l-2 border-[var(--hk-gold)] pl-5">
                  <p className="text-4xl font-black text-[var(--hk-navy)]">100%</p>
                  <p className="text-[#94A3B8] text-sm mt-1">전 공정 자동화</p>
                </div>
              </div>

              {/* 인용 */}
              <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
                <p className="text-[#94A3B8] text-sm italic leading-relaxed">
                  &ldquo;초기 8명으로 운영하던 공장을, 스마트팩토리 구축 이후 3~4명으로도 충분히 가동할 수 있게 되었습니다.&rdquo;
                </p>
                <p className="text-[#CBD5E1] text-xs mt-3">— 허자현 대표</p>
              </div>
            </div>
          </div>

          {/* 우측 — 스크롤 컨텐츠 */}
          <div className="lg:col-span-7 space-y-12">
            {SECTIONS.map((section, i) => (
              <div
                key={section.number}
                className="relative"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${i * 0.2}s`,
                }}
              >
                {/* 번호 + 제목 */}
                <div className="flex items-start gap-6 mb-6">
                  <span className="text-6xl font-black text-[var(--hk-navy)]/10 leading-none select-none flex-shrink-0">
                    {section.number}
                  </span>
                  <div>
                    <p className="text-[var(--hk-gold)] text-[10px] tracking-[0.2em] uppercase mb-1">
                      {section.titleEn}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-[var(--hk-navy)] flex items-center gap-3">
                      {section.title}
                      {section.badge && (
                        <span className="text-[10px] font-semibold text-[var(--hk-gold)] border border-[var(--hk-gold)]/30 px-2 py-0.5 tracking-wider uppercase">
                          {section.badge}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* 설비 목록 */}
                <div className="ml-[calc(3.5rem+1.5rem)] space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 py-2 border-b border-[#E2E8F0]/50"
                    >
                      <div className="w-1 h-1 bg-[var(--hk-gold)] rounded-full flex-shrink-0" />
                      <span className="text-[#475569] text-sm leading-[1.8]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
