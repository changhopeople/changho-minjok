'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HKSectionHeader from '../shared/HKSectionHeader';
import { Users, Wrench, Factory, ShieldCheck, Headphones } from 'lucide-react';

const departments = [
  { name: '경영관리', icon: Users, desc: '경영기획, 인사, 재무' },
  { name: '영업/마케팅', icon: Headphones, desc: '수주관리, 고객관리, 마케팅' },
  { name: '생산/제조', icon: Factory, desc: '스마트팩토리 운영, 생산관리' },
  { name: '시공/현장', icon: Wrench, desc: '현장관리, 시공, A/S' },
  { name: '품질/안전', icon: ShieldCheck, desc: '품질관리, 안전관리, 인증' },
];

export default function HKOrganization() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <HKSectionHeader
          badge="ORGANIZATION"
          title="조직도"
          subtitle="체계적인 조직 운영으로 프로젝트를 완수합니다"
        />

        <div ref={ref}>
          {/* CEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-[var(--hk-navy)] text-white px-8 py-4 rounded-lg">
              <p className="font-bold text-lg">대표이사</p>
              <p className="text-sm text-gray-300">CEO</p>
            </div>
          </motion.div>

          {/* 연결선 */}
          <div className="flex justify-center mb-8">
            <div className="w-0.5 h-8 bg-[#E2E8F0]" />
          </div>

          {/* 부서들 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="hk-card p-5 text-center"
                >
                  <div className="w-10 h-10 bg-[var(--hk-gold-light)] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[var(--hk-gold)]" />
                  </div>
                  <p className="font-bold text-[var(--hk-navy)] text-sm mb-1">{dept.name}</p>
                  <p className="text-xs text-[#64748B]">{dept.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
