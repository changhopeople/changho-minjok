import type { Metadata } from 'next';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKPortfolioGrid from '@/components/hyunkyung/portfolio/HKPortfolioGrid';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '시공실적',
  description: '현경시스템의 주요 시공실적을 소개합니다.',
};

export default function PortfolioPage() {
  return (
    <>
      <HKPageHero
        title="시공실적"
        subtitle="다양한 규모의 프로젝트를 성공적으로 수행하였습니다"
        breadcrumb="PORTFOLIO"
      />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <HKPortfolioGrid />
        </div>
      </section>
      <HKContactBanner />
    </>
  );
}
