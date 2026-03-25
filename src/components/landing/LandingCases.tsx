'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
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
    color: '#EF4444',
    before: [
      { src: '/images/landing/cases/changho/before/1.jpg', alt: '창호의민족 시공 전 1' },
      { src: '/images/landing/cases/changho/before/2.jpg', alt: '창호의민족 시공 전 2' },
      { src: '/images/landing/cases/changho/before/3.jpg', alt: '창호의민족 시공 전 3' },
      { src: '/images/landing/cases/changho/before/4.jpg', alt: '창호의민족 시공 전 4' },
    ],
    after: [
      { src: '/images/landing/cases/changho/after/1.jpg', alt: '창호의민족 시공 후 1' },
      { src: '/images/landing/cases/changho/after/2.jpg', alt: '창호의민족 시공 후 2' },
      { src: '/images/landing/cases/changho/after/3.jpg', alt: '창호의민족 시공 후 3' },
      { src: '/images/landing/cases/changho/after/4.jpg', alt: '창호의민족 시공 후 4' },
    ],
  },
  {
    id: 'kcc',
    name: 'KCC',
    color: '#2AC1BC',
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
  {
    id: 'huggreen',
    name: '휴그린',
    color: '#FF6F0F',
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
];

export default function LandingCases() {
  const [activeBrand, setActiveBrand] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ src: string; alt: string }[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const brand = brands[activeBrand];
  const maxIndex = Math.min(brand.before.length, brand.after.length) - 1;

  const handleBrandChange = (idx: number) => {
    setActiveBrand(idx);
    setImageIndex(0);
  };

  const handlePrev = () => {
    setImageIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const openModal = (images: { src: string; alt: string }[], index: number) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const prevModal = () => {
    setModalIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const nextModal = () => {
    setModalIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
  };

  const allImages = [...brand.before, ...brand.after];

  return (
    <>
      <section className="py-12 sm:py-16 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 sm:px-4 py-2 bg-[#FFF3EB] text-[#FF6F0F] rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              Before & After
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-4 sm:mb-6 tracking-tight">
              <span className="text-[#FF6F0F]">이렇게</span> 달라집니다
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#767676]">
              브랜드별 실제 시공 사례를 비교해보세요
            </p>
          </AnimatedSection>

          {/* Brand Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center gap-3 mb-8">
              {brands.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => handleBrandChange(idx)}
                  className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all"
                  style={{
                    backgroundColor: activeBrand === idx ? b.color : '#F3F4F6',
                    color: activeBrand === idx ? '#fff' : '#767676',
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Before & After Comparison */}
          <AnimatedSection delay={0.15}>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-gray-800 text-white rounded-full text-xs sm:text-sm font-bold">
                      시공 전
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {imageIndex + 1} / {maxIndex + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(brand.before, imageIndex)}
                    className="group relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={brand.before[imageIndex].src}
                      alt={brand.before[imageIndex].alt}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white"
                      style={{ backgroundColor: brand.color }}
                    >
                      시공 후
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {imageIndex + 1} / {maxIndex + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => openModal(brand.after, imageIndex)}
                    className="group relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={brand.after[imageIndex].src}
                      alt={brand.after[imageIndex].alt}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 50vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Navigation & View All */}
              <div className="flex items-center justify-between mt-4 sm:mt-6">
                <button
                  onClick={() => openModal(allImages, 0)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#767676] hover:text-[#1E1E1E] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  전체 {allImages.length}장 보기
                </button>

                {maxIndex > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail dots */}
              {maxIndex > 0 && (
                <div className="flex justify-center gap-2 mt-4">
                  {brand.before.slice(0, maxIndex + 1).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className="w-2.5 h-2.5 rounded-full transition-colors"
                      style={{
                        backgroundColor: idx === imageIndex ? brand.color : '#D1D5DB',
                      }}
                    />
                  ))}
                </div>
              )}
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
                quality={90}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            )}
          </div>

          {modalImages.length > 1 && (
            <>
              <button
                onClick={prevModal}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextModal}
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
