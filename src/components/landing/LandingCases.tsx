'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const brands = [
  {
    id: 'changho',
    name: '창호의민족',
    color: '#2AC1BC',
    before: [
      { src: '/images/landing/cases/changho/before/2.jpg', alt: '창호의민족 시공 전 1' },
      { src: '/images/landing/cases/changho/before/3.jpg', alt: '창호의민족 시공 전 2' },
    ],
    after: [
      { src: '/images/landing/cases/changho/after/1.jpg', alt: '창호의민족 시공 후 1' },
      { src: '/images/landing/cases/changho/after/2.jpg', alt: '창호의민족 시공 후 2' },
      { src: '/images/landing/cases/changho/after/3.jpg', alt: '창호의민족 시공 후 3' },
    ],
  },
  {
    id: 'huggreen',
    name: '휴그린',
    color: '#4CAF50',
    before: [
      { src: '/images/landing/cases/huggreen/before/1.jpg', alt: '휴그린 시공 전 1' },
      { src: '/images/landing/cases/huggreen/before/2.jpg', alt: '휴그린 시공 전 2' },
      { src: '/images/landing/cases/huggreen/before/3.jpg', alt: '휴그린 시공 전 3' },
    ],
    after: [
      { src: '/images/landing/cases/huggreen/after/1.jpg', alt: '휴그린 시공 후 1' },
      { src: '/images/landing/cases/huggreen/after/2.jpg', alt: '휴그린 시공 후 2' },
      { src: '/images/landing/cases/huggreen/after/3.jpg', alt: '휴그린 시공 후 3' },
    ],
  },
  {
    id: 'kcc',
    name: 'KCC',
    color: '#1976D2',
    before: [
      { src: '/images/landing/cases/kcc/before/1.jpg', alt: 'KCC 시공 전 1' },
      { src: '/images/landing/cases/kcc/before/2.jpg', alt: 'KCC 시공 전 2' },
      { src: '/images/landing/cases/kcc/before/3.jpg', alt: 'KCC 시공 전 3' },
    ],
    after: [
      { src: '/images/landing/cases/kcc/after/1.jpg', alt: 'KCC 시공 후 1' },
      { src: '/images/landing/cases/kcc/after/2.jpg', alt: 'KCC 시공 후 2' },
      { src: '/images/landing/cases/kcc/after/3.jpg', alt: 'KCC 시공 후 3' },
    ],
  },
];

export default function LandingCases() {
  const [activeBrand, setActiveBrand] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ src: string; alt: string }[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const brand = brands[activeBrand];

  const openModal = (images: { src: string; alt: string }[], index: number) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const prevImage = () => {
    setModalIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="py-12 sm:py-16 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 sm:px-4 py-2 bg-[#E8F8F7] text-[#2AC1BC] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              Before & After
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
              <span className="text-[#2AC1BC]">이렇게</span> 달라집니다
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#767676]">
              브랜드별 실제 시공 사례를 비교해보세요
            </p>
          </AnimatedSection>

          {/* Brand Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {brands.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(idx)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                    idx === activeBrand
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-[#767676] hover:bg-gray-200'
                  }`}
                  style={
                    idx === activeBrand
                      ? { backgroundColor: b.color }
                      : undefined
                  }
                >
                  {b.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Before / After Grid */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Before Row */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-xs sm:text-sm font-bold">
                        시공 전
                      </span>
                    </div>
                    <div className={`grid gap-2 sm:gap-4 ${brand.before.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {brand.before.map((img, idx) => (
                        <button
                          key={img.src}
                          onClick={() => openModal(brand.before, idx)}
                          className="group relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center my-3 sm:my-4">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: brand.color }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* After Row */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white"
                        style={{ backgroundColor: brand.color }}
                      >
                        시공 후
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      {brand.after.map((img, idx) => (
                        <button
                          key={img.src}
                          onClick={() => openModal(brand.after, idx)}
                          className="group relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 ring-2 ring-transparent hover:ring-offset-2"
                          style={
                            { '--tw-ring-color': brand.color } as React.CSSProperties
                          }
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.3} className="text-center mt-8 sm:mt-12">
            <Link
              href="/support/inquiry"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#FF6F0F] rounded-xl text-white font-bold text-sm sm:text-base hover:bg-[#E5630D] transition-colors group shadow-lg shadow-[#FF6F0F]/30"
            >
              무료 상담 신청하기
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 bg-black border-none rounded-2xl overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">시공 사진</DialogTitle>
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative aspect-[3/4] sm:aspect-[4/5]">
            {modalImages[modalIndex] && (
              <Image
                src={modalImages[modalIndex].src}
                alt={modalImages[modalIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            )}
          </div>

          {modalImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-center gap-2">
              {modalImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setModalIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === modalIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
