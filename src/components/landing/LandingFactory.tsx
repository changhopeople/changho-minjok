'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Eye, EyeOff, ZoomIn, ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const features = [
  '전 공정 자동화 시스템',
  '복층유리 자동화 및 TPS설비보유',
  '창짝 내외부 전체 가스켓 마감',
  '자체 프로그램 운영으로 품질 하자 감소 및 정확한 견적산출',
  '일일 30세대 생산 능력',
  'Human Error 제로',
];

const FACTORY_VIDEO_ID = 'Wie9aS4jxdQ';

const factoryImages = [
  {
    label: '공장 전경',
    thumbnail: '/images/factory/new-6.jpg',
    images: [
      { src: '/images/factory/new-6.jpg', alt: '3,500평 스마트 팩토리 전경' },
      { src: '/images/factory/new-8.jpg', alt: '공장 내부 생산 라인 전경' },
      { src: '/images/factory/interior-wide.jpg', alt: '공장 내부 전경' },
    ],
  },
  {
    label: '생산 현장',
    thumbnail: '/images/factory/new-1.jpg',
    images: [
      { src: '/images/factory/new-1.jpg', alt: '프로파일 자동 압출 라인' },
      { src: '/images/factory/new-9.jpg', alt: '프레임 조립 프레스' },
      { src: '/images/factory/new-5.jpg', alt: '창호 프레임 조립' },
      { src: '/images/factory/new-2.jpg', alt: '프로파일 용접 작업' },
      { src: '/images/factory/new-3.jpg', alt: '프로파일 가공 작업' },
      { src: '/images/factory/new-4.jpg', alt: '프로파일 절단 작업' },
      { src: '/images/factory/new-7.jpg', alt: 'PVC 프로파일 적재' },
      { src: '/images/factory/production-floor.jpg', alt: '생산 라인' },
      { src: '/images/factory/automation-line.jpg', alt: '자동화 설비' },
    ],
  },
  {
    label: '공장 외부',
    thumbnail: '/images/factory/exterior-view.jpg',
    images: [
      { src: '/images/factory/exterior-view.jpg', alt: '공장 외부 전경' },
      { src: '/images/factory/aerial-view.jpg', alt: '공장 항공 뷰' },
      { src: '/images/factory/products-storage.jpg', alt: '제품 보관 창고' },
    ],
  },
];

export default function LandingFactory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const openModal = (groupIdx: number) => {
    setCurrentGroup(groupIdx);
    setCurrentIndex(0);
    setModalOpen(true);
  };

  const allImages = factoryImages[currentGroup]?.images ?? [];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="py-12 sm:py-16 md:py-28 bg-[#1E1E1E] overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <AnimatedSection>
                {/* Comparison Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-8">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 rounded-full">
                    <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                    <span className="text-red-400 text-xs sm:text-sm font-bold">숨기는 업체</span>
                  </div>
                  <span className="text-white/50 text-sm">vs</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2AC1BC] rounded-full">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-xs sm:text-sm font-bold">보여주는 업체</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  공장 공개하는 창호업체,
                  <br />
                  <span className="text-[#2AC1BC]">전국에 몇 개나 될까요?</span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-4 max-w-xl">
                  저희가 자신 있게 공장 문을 여는 이유?
                  <br />
                  <span className="text-white font-semibold">
                    보시면 가격이 왜 이렇게 나오는지 이해되실 겁니다.
                  </span>
                </p>
                <p className="text-sm sm:text-base text-[#2AC1BC] font-bold mb-6 sm:mb-10">
                  숨길 게 없으니까 다 보여드립니다.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-10">
                  {features.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 bg-[#292929] rounded-lg sm:rounded-xl border border-[#3A3A3A]"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#2AC1BC] flex-shrink-0" />
                      <span className="text-white text-xs sm:text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Link
                  href="/support/tour"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#FF6F0F] rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base hover:bg-[#E5630D] transition-colors group shadow-lg shadow-[#FF6F0F]/30 w-full sm:w-auto"
                >
                  직접 눈으로 확인하러 가기
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 text-center sm:text-left">
                  * 사전 예약 시 공장 견학 무료
                </p>
              </AnimatedSection>
            </div>

            {/* Factory Media */}
            <AnimatedSection direction="right">
              <div className="relative mt-6 lg:mt-0 space-y-3 sm:space-y-4">
                {/* YouTube Video Card */}
                <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  {showVideo ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${FACTORY_VIDEO_ID}?autoplay=1`}
                      title="창호의 민족 공장 내부 영상"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="block w-full h-full group text-left"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${FACTORY_VIDEO_ID}/maxresdefault.jpg`}
                        alt="공장 내부 영상 썸네일"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center"
                        >
                          <Play className="w-7 h-7 sm:w-10 sm:h-10 text-[#2AC1BC] ml-1" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-bold text-sm sm:text-base">공장 내부 영상</p>
                        <p className="text-white/70 text-xs sm:text-sm">
                          클릭하여 영상 재생
                        </p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Image Group Cards */}
                {factoryImages.map((group, groupIdx) => (
                  <button
                    key={group.label}
                    onClick={() => openModal(groupIdx)}
                    className="block w-full group text-left"
                  >
                    <div className="relative aspect-[16/7] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={group.thumbnail}
                        alt={`창호의 민족 ${group.label}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center"
                        >
                          <ZoomIn className="w-5 h-5 sm:w-7 sm:h-7 text-[#2AC1BC]" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-bold text-sm sm:text-base">{group.label}</p>
                        <p className="text-white/70 text-xs sm:text-sm">
                          사진 {group.images.length}장 보기
                        </p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -12 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                  viewport={{ once: true }}
                  className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 bg-[#FF6F0F] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-extrabold text-xs sm:text-base shadow-lg z-10"
                >
                  언제든 방문 OK
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-[calc(100%-2rem)] sm:max-w-4xl p-0 bg-black border-none rounded-2xl overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {factoryImages[currentGroup]?.label} 사진
          </DialogTitle>
          {/* Close button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10]">
            {allImages[currentIndex] && (
              <Image
                src={allImages[currentIndex].src}
                alt={allImages[currentIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            )}
          </div>

          {/* Navigation */}
          {allImages.length > 1 && (
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

          {/* Caption & Dots */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-bold text-sm sm:text-base mb-1">
              {factoryImages[currentGroup]?.label}
            </p>
            <p className="text-white/70 text-xs sm:text-sm mb-3">
              {allImages[currentIndex]?.alt}
            </p>
            <div className="flex justify-center gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/40'
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
