import type { Metadata } from 'next';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKCEOMessage from '@/components/hyunkyung/about/HKCEOMessage';
import HKTimeline from '@/components/hyunkyung/about/HKTimeline';
import HKOrganization from '@/components/hyunkyung/about/HKOrganization';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '회사소개',
  description: '주식회사 현경시스템 - 2014년 설립, 3,500평 스마트 팩토리 기반 창호 제조 및 건설 전문기업.',
};

export default function AboutPage() {
  return (
    <>
      <HKPageHero
        title="회사소개"
        subtitle="신뢰와 기술로 짓는 내일, 현경시스템을 소개합니다"
        breadcrumb="ABOUT US"
      />
      <HKCEOMessage />
      <HKTimeline />
      <HKOrganization />
      <HKContactBanner />
    </>
  );
}
