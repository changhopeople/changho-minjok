'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function HKCTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="bg-[var(--hk-navy)]">
      <div
        className="max-w-[1400px] mx-auto px-6 py-16 md:py-20"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="!text-white text-2xl md:text-3xl lg:text-4xl font-black text-center md:text-left">
            프로젝트를 함께 하실 준비가 되셨나요?
          </h2>
          <Link
            href="/hyunkyung/inquiry"
            className="group inline-flex items-center gap-3 bg-[var(--hk-gold)] hover:bg-[#D4A233] text-white font-semibold px-10 py-4 transition-all duration-300 text-sm tracking-wide flex-shrink-0"
          >
            프로젝트 문의
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
