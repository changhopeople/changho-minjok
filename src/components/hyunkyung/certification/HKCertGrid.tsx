'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, FileCheck, Shield } from 'lucide-react';

export interface HKCertItem {
  id: string;
  title: string;
  category: 'certification' | 'patent' | 'award';
  issuer: string;
  issue_date?: string;
  description?: string;
  image_url?: string | null;
}

const categoryConfig = {
  certification: { label: '인증', icon: Shield, color: 'bg-blue-50 text-blue-700' },
  patent: { label: '특허', icon: FileCheck, color: 'bg-green-50 text-green-700' },
  award: { label: '수상', icon: Award, color: 'bg-amber-50 text-amber-700' },
};

// 임시 데이터
const MOCK_CERTS: HKCertItem[] = [
  { id: '1', title: 'KS F 4112 PVC 창호', category: 'certification', issuer: '한국표준협회', issue_date: '2020', description: 'PVC 창호 KS 인증' },
  { id: '2', title: 'ISO 9001:2015', category: 'certification', issuer: '국제표준화기구', issue_date: '2023', description: '품질경영시스템 인증' },
  { id: '3', title: '건설업 면허', category: 'certification', issuer: '국토교통부', issue_date: '2016', description: '창호·유리 공사업 면허' },
  { id: '4', title: '에너지 절약형 창호 기술', category: 'patent', issuer: '특허청', issue_date: '2022', description: '단열 성능 개선 프레임 구조' },
  { id: '5', title: '우수 중소기업 표창', category: 'award', issuer: '경상북도', issue_date: '2023', description: '지역 경제 기여 우수 중소기업' },
  { id: '6', title: '스마트팩토리 우수 기업', category: 'award', issuer: '중소벤처기업부', issue_date: '2024', description: '스마트 제조 혁신 우수 사례' },
];

export default function HKCertGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_CERTS.map((cert, i) => {
        const config = categoryConfig[cert.category];
        const Icon = config.icon;
        return (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="hk-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[var(--hk-gold-light)] rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-[var(--hk-gold)]" />
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-medium ${config.color}`}>
                {config.label}
              </span>
            </div>
            <h3 className="font-bold text-[var(--hk-navy)] mb-1">{cert.title}</h3>
            <p className="text-sm text-[#64748B] mb-2">{cert.issuer}</p>
            {cert.description && (
              <p className="text-sm text-[#94A3B8]">{cert.description}</p>
            )}
            {cert.issue_date && (
              <p className="text-xs text-[#94A3B8] mt-3">{cert.issue_date}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
