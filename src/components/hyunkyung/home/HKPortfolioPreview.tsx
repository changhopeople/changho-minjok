'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PREVIEW_PROJECTS = [
  {
    slug: 'project-1',
    title: '대규모 아파트 단지 창호 납품',
    client: '종합건설사',
    location: '경상남도 창원시',
    year: '2024',
    type: '아파트',
    scale: '500세대',
  },
  {
    slug: 'project-2',
    title: '주상복합 시스템창호 시공',
    client: '중견 건설사',
    location: '부산광역시',
    year: '2024',
    type: '주상복합',
    scale: '지상 35층',
  },
  {
    slug: 'project-3',
    title: '오피스텔 알루미늄 커튼월',
    client: '건설사',
    location: '대구광역시',
    year: '2023',
    type: '오피스텔',
    scale: '지상 25층',
  },
];

export default function HKPortfolioPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              PORTFOLIO
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--hk-navy)]">
              대표 시공실적
            </h2>
          </div>
          <Link
            href="/hyunkyung/portfolio"
            className="text-[var(--hk-navy)] font-semibold text-sm hover:text-[var(--hk-gold)] transition-colors border-b border-[var(--hk-navy)] hover:border-[var(--hk-gold)] pb-0.5 inline-block"
          >
            모든 실적 보기
          </Link>
        </div>

        <div ref={ref}>
          {/* 1행: 대형 카드 1개 (풀폭) */}
          <Link
            href={`/hyunkyung/portfolio/${PREVIEW_PROJECTS[0].slug}`}
            className="group block relative overflow-hidden mb-4"
            style={{
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <div className="aspect-[21/9] relative bg-gradient-to-br from-[#0C1B3A]/10 to-[#1E3A5F]/20 overflow-hidden">
              {/* 플레이스홀더 배경 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C1B3A] to-[#1E3A5F]" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 101px)`,
                }}
              />

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />

              {/* 스케일 표시 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-white/10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                  </svg>
                  <span className="text-white/15 text-sm">{PREVIEW_PROJECTS[0].scale}</span>
                </div>
              </div>

              {/* 정보 오버레이 */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[var(--hk-gold)] text-xs tracking-[0.2em] uppercase font-semibold">
                      {PREVIEW_PROJECTS[0].type} · {PREVIEW_PROJECTS[0].year}
                    </span>
                    <h3 className="!text-white text-2xl md:text-3xl font-black mt-2 group-hover:text-[var(--hk-gold)] transition-colors">
                      {PREVIEW_PROJECTS[0].title}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                      {PREVIEW_PROJECTS[0].location} · {PREVIEW_PROJECTS[0].client}
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-[var(--hk-gold)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            </div>
          </Link>

          {/* 2행: 중형 카드 2개 (각 50%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREVIEW_PROJECTS.slice(1).map((project, i) => (
              <Link
                key={project.slug}
                href={`/hyunkyung/portfolio/${project.slug}`}
                className="group block relative overflow-hidden"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.2 + i * 0.15}s`,
                }}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  {/* 플레이스홀더 배경 */}
                  <div className={`absolute inset-0 ${
                    i === 0
                      ? 'bg-gradient-to-br from-[#1E3A5F] to-[#0C1B3A]'
                      : 'bg-gradient-to-br from-[#0A1628] to-[#0F2240]'
                  }`} />

                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />

                  {/* 스케일 표시 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 text-sm">{project.scale}</span>
                  </div>

                  {/* 정보 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <span className="text-[var(--hk-gold)] text-xs tracking-[0.2em] uppercase font-semibold">
                      {project.type} · {project.year}
                    </span>
                    <h3 className="!text-white text-lg md:text-xl font-black mt-1 group-hover:text-[var(--hk-gold)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">
                      {project.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
