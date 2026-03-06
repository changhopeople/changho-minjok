'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HK_PARTNERS } from '@/lib/constants/hyunkyung';

export default function HKPartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
      <div ref={ref} className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[#94A3B8] text-sm font-medium tracking-[0.1em] uppercase">
            Trusted Partners & Suppliers
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {HK_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-[#94A3B8] hover:text-[var(--hk-navy)] transition-colors duration-300 cursor-default"
            >
              <span className="font-semibold text-base md:text-lg tracking-tight">{partner}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
