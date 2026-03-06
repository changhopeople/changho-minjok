import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, DoorOpen, Factory, Shield, TrendingUp, Users } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '사업영역',
  description: '현경시스템의 사업영역 - 창호사업, 건설사업을 통해 통합 솔루션을 제공합니다.',
};

const areas = [
  {
    title: '창호사업',
    description: 'PVC, 알루미늄, 시스템 창호 제조 및 시공. 3,500평 규모 스마트 팩토리에서 최신 자동화 설비를 통한 고품질 창호를 생산합니다.',
    href: '/hyunkyung/business/windows',
    icon: DoorOpen,
    features: ['PVC 창호', '알루미늄 창호', '시스템 창호', '커튼월'],
  },
  {
    title: '건설사업',
    description: '아파트, 주상복합, 오피스텔 등 대규모 건축물의 창호 납품 및 시공. 체계적인 프로젝트 관리와 안전 시공을 수행합니다.',
    href: '/hyunkyung/business/construction',
    icon: Building2,
    features: ['공동주택', '상업시설', '공공시설', 'A/S 관리'],
  },
];

const strengths = [
  { icon: Factory, title: '스마트 팩토리', desc: '3,500평 최신 자동화 생산시설' },
  { icon: Shield, title: '품질 인증', desc: 'KS, ISO 9001 인증 기업' },
  { icon: TrendingUp, title: '지속 성장', desc: '매년 꾸준한 매출 성장' },
  { icon: Users, title: '전문 인력', desc: '50명 이상 숙련 전문가' },
];

export default function BusinessPage() {
  return (
    <>
      <HKPageHero
        title="사업영역"
        subtitle="창호 제조부터 건설 시공까지, 통합 솔루션을 제공합니다"
        breadcrumb="BUSINESS"
      />

      {/* 사업영역 카드 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <Link key={area.title} href={area.href} className="group block">
                  <div className="hk-card p-8 md:p-10 h-full">
                    <div className="w-14 h-14 bg-[var(--hk-gold-light)] rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[var(--hk-gold)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--hk-navy)] mb-3">{area.title}</h2>
                    <p className="text-[#64748B] leading-relaxed mb-6">{area.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {area.features.map((f) => (
                        <span key={f} className="px-3 py-1 bg-[#F0F4F8] text-[#475569] text-sm rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[var(--hk-gold)] font-semibold text-sm group-hover:gap-3 transition-all">
                      자세히 보기 <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 강점 */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-3">핵심 경쟁력</h2>
            <p className="text-[#64748B]">현경시스템만의 차별화된 경쟁력을 소개합니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {strengths.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="w-14 h-14 bg-[var(--hk-navy)] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[var(--hk-gold)]" />
                  </div>
                  <h3 className="font-bold text-[var(--hk-navy)] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#64748B]">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <HKContactBanner />
    </>
  );
}
