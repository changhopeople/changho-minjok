import HKHeroSection from '@/components/hyunkyung/home/HKHeroSection';
import HKStatsSection from '@/components/hyunkyung/home/HKStatsSection';
import HKBusinessAreas from '@/components/hyunkyung/home/HKBusinessAreas';
import HKCoreValues from '@/components/hyunkyung/home/HKCoreValues';
import HKPortfolioPreview from '@/components/hyunkyung/home/HKPortfolioPreview';
import HKPartnersSection from '@/components/hyunkyung/home/HKPartnersSection';
import HKCTASection from '@/components/hyunkyung/home/HKCTASection';

export default function HyunkyungHomePage() {
  return (
    <>
      <HKHeroSection />
      <HKStatsSection />
      <HKBusinessAreas />
      <HKCoreValues />
      <HKPortfolioPreview />
      <HKPartnersSection />
      <HKCTASection />
    </>
  );
}
