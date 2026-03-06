import type { Metadata } from 'next';
import HKHeader from '@/components/hyunkyung/layout/HKHeader';
import HKFooter from '@/components/hyunkyung/layout/HKFooter';

export const metadata: Metadata = {
  title: {
    default: '현경시스템 | 창호 제조 및 건설 전문기업',
    template: '%s | 현경시스템',
  },
  description: '주식회사 현경시스템 - 3,500평 스마트 팩토리 기반 창호 제조 및 건설 전문기업. PVC, 알루미늄, 시스템 창호 제조·시공.',
  keywords: ['현경시스템', '창호 제조', '건설', '스마트팩토리', 'PVC창호', '알루미늄창호', '시스템창호'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '현경시스템',
    title: '현경시스템 | 창호 제조 및 건설 전문기업',
    description: '신뢰와 기술로 짓는 내일. 3,500평 스마트 팩토리 기반 창호 제조 및 건설 전문기업.',
  },
};

export default function HyunkyungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-site="hyunkyung">
      <HKHeader />
      <main className="min-h-screen">{children}</main>
      <HKFooter />
    </div>
  );
}
