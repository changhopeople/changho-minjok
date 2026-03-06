import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HKContactBannerProps {
  title?: string;
  subtitle?: string;
}

export default function HKContactBanner({
  title = '프로젝트에 대해 상담받으세요',
  subtitle = '전문 상담원이 최적의 솔루션을 제안해 드립니다',
}: HKContactBannerProps) {
  return (
    <section className="bg-[var(--hk-navy)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="!text-white text-2xl md:text-3xl font-bold mb-3">
          {title}
        </h3>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          {subtitle}
        </p>
        <Link
          href="/hyunkyung/inquiry"
          className="inline-flex items-center gap-2 hk-btn-gold text-base"
        >
          문의하기
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
