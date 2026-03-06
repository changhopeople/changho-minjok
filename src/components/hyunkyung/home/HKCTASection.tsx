'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_COMPANY } from '@/lib/constants/hyunkyung';

export default function HKCTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* 2-톤 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050D1A] via-[#0C1B3A] to-[#0A1628]" />

      {/* 장식 라인 */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(196,146,42,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,146,42,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--hk-gold)]/[0.03] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--hk-gold)]" />
              <span className="text-[var(--hk-gold)] text-sm font-semibold tracking-[0.15em] uppercase">
                CONTACT US
              </span>
            </div>

            <h2 className="!text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              프로젝트를 함께
              <br />
              하실 준비가 되셨나요?
            </h2>

            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              전문 상담원이 프로젝트 규모와 요구사항에 맞는 최적의 솔루션을 제안해 드립니다.
              평일 09:00~18:00 상담 가능합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/hyunkyung/inquiry"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--hk-gold)] hover:bg-[#D4A233] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
              >
                온라인 문의
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${HK_COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                전화 문의
              </a>
            </div>
          </motion.div>

          {/* 우측 - 연락처 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
              <h3 className="!text-white font-bold text-lg mb-8">연락처 정보</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[var(--hk-gold)]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">전화</p>
                    <a href={`tel:${HK_COMPANY.phone}`} className="text-white font-semibold text-lg hover:text-[var(--hk-gold)] transition-colors">
                      {HK_COMPANY.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[var(--hk-gold)]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">이메일</p>
                    <a href={`mailto:${HK_COMPANY.email}`} className="text-white font-medium hover:text-[var(--hk-gold)] transition-colors">
                      {HK_COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--hk-gold)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[var(--hk-gold)]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">본사/공장</p>
                    <p className="text-white/80 text-sm">{HK_COMPANY.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-500 text-xs">영업시간</p>
                <p className="text-white/80 text-sm mt-1">평일 09:00 ~ 18:00 (주말/공휴일 휴무)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
