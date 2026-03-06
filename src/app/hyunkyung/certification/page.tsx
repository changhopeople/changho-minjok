import type { Metadata } from 'next';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKCertGrid from '@/components/hyunkyung/certification/HKCertGrid';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '인증/특허',
  description: '현경시스템의 인증, 특허, 수상 내역을 소개합니다.',
};

export default function CertificationPage() {
  return (
    <>
      <HKPageHero
        title="인증/특허"
        subtitle="공인 기관이 검증한 기술력과 품질을 확인하세요"
        breadcrumb="CERTIFICATION"
      />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <HKCertGrid />
        </div>
      </section>
      <HKContactBanner />
    </>
  );
}
