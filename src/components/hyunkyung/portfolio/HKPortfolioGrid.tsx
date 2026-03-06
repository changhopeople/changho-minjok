'use client';

import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface HKPortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  project_type: string;
  year: string;
  thumbnail_url: string | null;
}

// 임시 데이터
const MOCK_PORTFOLIOS: HKPortfolioItem[] = [
  { id: '1', title: '○○ 아파트 단지 창호 납품', slug: 'project-1', client: '대형 건설사', location: '경상남도 창원시', project_type: '아파트', year: '2024', thumbnail_url: null },
  { id: '2', title: '△△ 주상복합 시스템창호', slug: 'project-2', client: '중견 건설사', location: '부산광역시', project_type: '주상복합', year: '2024', thumbnail_url: null },
  { id: '3', title: '□□ 오피스텔 알루미늄 커튼월', slug: 'project-3', client: '건설사', location: '대구광역시', project_type: '오피스텔', year: '2023', thumbnail_url: null },
  { id: '4', title: '◇◇ 학교 창호 교체', slug: 'project-4', client: '공공기관', location: '경상북도 청도군', project_type: '공공시설', year: '2023', thumbnail_url: null },
  { id: '5', title: '▽▽ 호텔 시스템창호', slug: 'project-5', client: '호텔 그룹', location: '서울특별시', project_type: '상업시설', year: '2022', thumbnail_url: null },
  { id: '6', title: '☆☆ 아파트 500세대 창호', slug: 'project-6', client: '대형 건설사', location: '경상남도 김해시', project_type: '아파트', year: '2022', thumbnail_url: null },
];

export default function HKPortfolioGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PORTFOLIOS.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <Link href={`/hyunkyung/portfolio/${item.slug}`} className="block group">
            <div className="hk-card overflow-hidden">
              <div className="aspect-[4/3] bg-[#F0F4F8] relative overflow-hidden">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[var(--hk-navy)] text-white text-xs font-medium rounded">
                    {item.project_type}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[var(--hk-navy)] mb-2 group-hover:text-[var(--hk-blue)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748B] mb-2">{item.client}</p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.year}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
