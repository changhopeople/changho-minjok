'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants/navigation';

const stats = [
  { number: '200', unit: '만원+', label: '평균 절약 금액' },
  { number: '15,000', unit: '+', label: '세대 시공 완료' },
  { number: '10', unit: '년', label: '무상 A/S 보증' },
];

const trustBadges = [
  { icon: Shield, text: '1-day 시공 (하루 완료)' },
  { icon: Award, text: '발코니창호 공식 파트너' },
  { icon: Users, text: '무료 방문견적' },
];

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/trust/factory-aerial.jpg"
          alt="창호의 민족 스마트 팩토리"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Badge - 핵심 이득 강조 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6F0F] rounded-full text-white text-sm font-bold shadow-lg shadow-[#FF6F0F]/30">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              평균 200만원 절약 · 공장 직거래
            </div>
          </motion.div>

          {/* Main Headline - 고객 관점 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#1E1E1E] leading-[1.15] mb-4 md:mb-6 tracking-tight text-center lg:text-left"
          >
            창호 견적 받고
            <br />
            <span className="text-[#EF4444]">심장 떨어지셨죠?</span>
            <br />
            <span className="text-[#FF6F0F]">200만원 돌려드립니다</span>
          </motion.h1>

          {/* Sub Headline - 구체적 증거 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 max-w-2xl leading-relaxed text-center lg:text-left px-2 sm:px-0"
          >
            <span className="text-[#EF4444] font-semibold">발코니창호 정품</span>을 공장에서 직접 받으세요.
            <br />
            <span className="text-gray-500 text-sm sm:text-base md:text-lg">
              중간 유통상 빼고, 3,500평 공장에서 바로 고객님 집으로.
              <br className="hidden sm:block" />
              <span className="text-gray-900 font-semibold">15,000가구+</span>가 평균 <span className="text-[#FF6F0F] font-bold">203만원</span> 절약했습니다.
            </span>
          </motion.p>

          {/* Stats Row - 고객 이득 중심 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center lg:justify-start gap-3 sm:gap-6 md:gap-10 mb-6 md:mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1E1E1E] tracking-tight">
                  {stat.number}
                  <span className="text-sm sm:text-lg md:text-xl text-[#EF4444]">{stat.unit}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - 클릭 유도 강화 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 px-2 sm:px-0"
          >
            <Button
              asChild
              size="lg"
              className="h-14 sm:h-16 px-6 sm:px-10 bg-[#FF6F0F] hover:bg-[#E5630D] text-white rounded-2xl font-bold text-base sm:text-xl shadow-lg shadow-[#FF6F0F]/30 group relative overflow-hidden"
            >
              <a href="#contact-form" className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="relative z-10">내 집 견적 확인하기</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-14 sm:h-16 px-6 sm:px-10 bg-gray-100 border-2 border-gray-300 text-gray-900 hover:bg-gray-200 hover:text-[#1E1E1E] rounded-2xl font-bold text-base sm:text-xl"
            >
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center justify-center gap-2 sm:gap-3">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                지금 바로 상담
              </a>
            </Button>
          </motion.div>

          {/* Trust Badges - 신뢰 강화 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
              >
                <badge.icon className="w-4 h-4 text-[#EF4444]" />
                <span className="text-gray-600 text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 text-sm">아래로 스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
