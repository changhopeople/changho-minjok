'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    thumbnail: null,
  },
  {
    slug: 'project-2',
    title: '주상복합 시스템창호 시공',
    client: '중견 건설사',
    location: '부산광역시',
    year: '2024',
    type: '주상복합',
    scale: '지상 35층',
    thumbnail: null,
  },
  {
    slug: 'project-3',
    title: '오피스텔 알루미늄 커튼월',
    client: '건설사',
    location: '대구광역시',
    year: '2023',
    type: '오피스텔',
    scale: '지상 25층',
    thumbnail: null,
  },
];

export default function HKPortfolioPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              PORTFOLIO
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--hk-navy)]">
              대표 시공실적
            </h2>
          </div>
          <Link
            href="/hyunkyung/portfolio"
            className="inline-flex items-center gap-2 text-[var(--hk-navy)] font-semibold hover:text-[var(--hk-gold)] transition-colors group"
          >
            전체보기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREVIEW_PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={`/hyunkyung/portfolio/${project.slug}`} className="block group">
                <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:shadow-xl hover:border-[var(--hk-gold)]/30 transition-all duration-500">
                  {/* 썸네일 */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-[#0C1B3A]/5 to-[#1E3A5F]/10 relative overflow-hidden">
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#CBD5E1]">
                      <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                        <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                      </svg>
                      <span className="text-xs">{project.scale}</span>
                    </div>

                    {/* 카테고리 뱃지 */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-[var(--hk-navy)] text-white text-xs font-medium rounded">
                        {project.type}
                      </span>
                    </div>

                    {/* 호버 화살표 */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/0 group-hover:bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[var(--hk-navy)]" />
                    </div>
                  </div>

                  {/* 정보 */}
                  <div className="p-6">
                    <h3 className="font-bold text-[var(--hk-navy)] text-lg mb-2 group-hover:text-[var(--hk-gold)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] mb-4">{project.client}</p>
                    <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
