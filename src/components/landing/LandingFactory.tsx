'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, Eye, EyeOff, ZoomIn, ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

const stats = [
  { value: 3500, suffix: '평', label: '스마트 팩토리 규모' },
  { value: 30, suffix: '세대/일', label: '일일 생산 능력' },
  { value: 15000, suffix: '+', label: '누적 시공 세대' },
  { value: 4.9, suffix: '/5.0', label: '고객 만족도', decimals: 1 },
];

/* ── CountUp Hook ── */
function useCountUp(end: number, duration = 2000, decimals = 0, inView: boolean) {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, end, duration, decimals]);

  return current;
}

/* ── StatCard ── */
function StatCard({ stat }: { stat: typeof stats[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(stat.value, 2000, stat.decimals ?? 0, inView);

  return (
    <div
      ref={ref}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center backdrop-blur-sm"
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1">
        {stat.decimals ? count.toFixed(stat.decimals) : count.toLocaleString()}
        <span className="text-[#EF4444] text-lg sm:text-xl md:text-2xl ml-0.5">{stat.suffix}</span>
      </p>
      <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
    </div>
  );
}

/* ── ImageTabContent ── */
function ImageTabContent({
  group,
  groupIdx,
  onOpenModal,
}: {
  group: typeof factoryImages[number];
  groupIdx: number;
  onOpenModal: (groupIdx: number, imgIdx: number) => void;
}) {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroImage = group.images[heroIdx];

  return (
    <div className="space-y-3">
      {/* Hero image */}
      <button
        onClick={() => onOpenModal(groupIdx, heroIdx)}
        className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden group block"
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 900px"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-[#EF4444]" />
          </motion.div>
        </div>
      </button>

      {/* Thumbnail strip */}
      {group.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {group.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIdx(idx)}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === heroIdx
                  ? 'border-[#EF4444] ring-2 ring-[#EF4444]/30'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function LandingFactory() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const openModal = useCallback((groupIdx: number, imgIdx = 0) => {
    setCurrentGroup(groupIdx);
    setCurrentIndex(imgIdx);
    setModalOpen(true);
  }, []);

  const allImages = factoryImages[currentGroup]?.images ?? [];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section className="py-16 sm:py-20 md:py-28 bg-gray-900 overflow-hidden relative">
        {/* ── Background: dot pattern ── */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* ── Background: red gradient blobs ── */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#EF4444]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#EF4444]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          {/* ── Header ── */}
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              {/* Comparison Badge */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 rounded-full">
                  <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span className="text-red-400 text-xs sm:text-sm font-bold">숨기는 업체</span>
                </div>
                <span className="text-gray-500 text-sm">vs</span>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#EF4444] rounded-full">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-white text-xs sm:text-sm font-bold">보여주는 업체</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                공장 공개하는 창호업체,
                <br />
                <span className="text-[#EF4444]">전국에 몇 개나 될까요?</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-2">
                저희가 자신 있게 공장 문을 여는 이유?
                <br />
                <span className="text-white font-semibold">
                  보시면 가격이 왜 이렇게 나오는지 이해되실 겁니다.
                </span>
              </p>
              <p className="text-sm sm:text-base text-[#EF4444] font-bold">
                숨길 게 없으니까 다 보여드립니다.
              </p>
            </div>
          </AnimatedSection>

          {/* ── Tabs Gallery ── */}
          <AnimatedSection delay={0.15}>
            <Tabs defaultValue="video" className="max-w-4xl mx-auto mb-12 sm:mb-16">
              <TabsList className="bg-white/5 border border-white/10 h-11 sm:h-12 w-full sm:w-auto mx-auto flex overflow-x-auto scrollbar-hide rounded-xl p-1 gap-1">
                <TabsTrigger
                  value="video"
                  className="data-[state=active]:bg-[#EF4444] data-[state=active]:text-white text-gray-400 hover:text-white rounded-lg px-4 sm:px-6 text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  영상
                </TabsTrigger>
                {factoryImages.map((group, idx) => (
                  <TabsTrigger
                    key={group.label}
                    value={`gallery-${idx}`}
                    className="data-[state=active]:bg-[#EF4444] data-[state=active]:text-white text-gray-400 hover:text-white rounded-lg px-4 sm:px-6 text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0"
                  >
                    {group.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Video Tab */}
              <TabsContent value="video" className="mt-4 sm:mt-6">
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
                          <Play className="w-7 h-7 sm:w-10 sm:h-10 text-[#EF4444] ml-1" />
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
              </TabsContent>

              {/* Image Gallery Tabs */}
              {factoryImages.map((group, idx) => (
                <TabsContent key={group.label} value={`gallery-${idx}`} className="mt-4 sm:mt-6">
                  <ImageTabContent
                    group={group}
                    groupIdx={idx}
                    onOpenModal={openModal}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>

          {/* ── Stats Bar ── */}
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12 sm:mb-16">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </AnimatedSection>

          {/* ── Feature Grid ── */}
          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto mb-10 sm:mb-14">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444] flex-shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── CTA Button ── */}
          <AnimatedSection delay={0.5}>
            <div className="text-center">
              <Link
                href="/support/tour"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FF6F0F] rounded-xl text-white font-bold text-sm sm:text-base hover:bg-[#E5630D] transition-colors group shadow-lg shadow-[#FF6F0F]/30"
              >
                직접 눈으로 확인하러 가기
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">
                * 사전 예약 시 공장 견학 무료
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Image Modal (기존 유지) ── */}
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
