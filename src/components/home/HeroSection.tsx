'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Factory, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Factory, number: '3,500', unit: '평', label: '스마트 팩토리' },
  { icon: Award, number: '10', unit: '년 이상', label: '제조 경력' },
  { icon: Users, number: '15,000', unit: '+', label: '시공 완료' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/trust/factory-aerial.jpg"
          alt="창호의민족 스마트 팩토리 전경"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            3,500평 스마트 팩토리 직영
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            창호 교체,
            <br />
            <span className="text-[#EF4444]">공장에서 직접</span>
            <br />
            만들어 드립니다
          </h1>

          {/* Sub Headline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed mx-auto">
            중간 유통 없이 공장에서 고객님께 바로.
            <br />
            <span className="text-white font-semibold">품질은 높이고, 가격은 낮추고.</span>
          </p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {stat.number}<span className="text-xl md:text-2xl text-white/60">{stat.unit}</span>
                </div>
                <div className="text-sm text-white/60 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button
              asChild
              size="lg"
              className="h-14 md:h-16 px-8 md:px-10 bg-[#FF6F0F] hover:bg-[#E5630D] text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg shadow-[#FF6F0F]/30"
            >
              <Link href="/estimate" className="flex items-center gap-3">
                무료 상담 신청
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-sm">스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
