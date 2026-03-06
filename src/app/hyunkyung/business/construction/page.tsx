import type { Metadata } from 'next';
import { CheckCircle2, HardHat, FileCheck, Truck, Wrench } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '건설사업',
  description: '현경시스템 건설사업 - 대규모 건축물 창호 납품 및 시공.',
};

const projectTypes = [
  {
    name: '공동주택',
    description: '아파트, 주상복합, 빌라 등 공동주택의 창호 납품 및 시공. 대규모 단지의 일괄 시공을 효율적으로 수행합니다.',
    features: ['대량 생산 체계', '공정별 체계적 관리', '하자보수 시스템', '입주 전 최종 검수'],
  },
  {
    name: '상업/업무시설',
    description: '오피스, 상가, 호텔 등 상업시설의 창호 및 커튼월 시공. 미적 완성도와 에너지 효율을 동시에 달성합니다.',
    features: ['커튼월 시스템', '맞춤 설계 가능', '에너지 효율 최적화', '디자인 다양성'],
  },
  {
    name: '공공시설',
    description: '학교, 관공서, 복지시설 등 공공시설의 창호 시공. 안전 기준과 규격을 철저히 준수합니다.',
    features: ['관련 법규 준수', '안전 시공 관리', '친환경 자재', '사후 유지관리'],
  },
];

const processSteps = [
  { icon: FileCheck, title: '수주/계약', desc: '프로젝트 검토 및 최적 견적' },
  { icon: HardHat, title: '설계/제작', desc: '현장 실측 후 맞춤 제조' },
  { icon: Truck, title: '납품/시공', desc: '체계적 물류 및 전문 시공' },
  { icon: Wrench, title: 'A/S 관리', desc: '체계적 하자보수 시스템' },
];

export default function ConstructionBusinessPage() {
  return (
    <>
      <HKPageHero
        title="건설사업"
        subtitle="체계적인 프로젝트 관리로 안전하고 정확한 시공"
        breadcrumb="BUSINESS > CONSTRUCTION"
      />

      {/* 프로세스 */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="relative inline-block">
                    <div className="w-14 h-14 bg-[var(--hk-navy)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[var(--hk-gold)]" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--hk-gold)] rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-[var(--hk-navy)] text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-[#64748B]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 프로젝트 유형 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-3">시공 분야</h2>
            <p className="text-[#64748B]">다양한 건축물에 대한 풍부한 시공 경험</p>
          </div>

          <div className="space-y-6">
            {projectTypes.map((type) => (
              <div key={type.name} className="hk-card p-8">
                <h3 className="text-xl font-bold text-[var(--hk-navy)] mb-3">{type.name}</h3>
                <p className="text-[#64748B] mb-5 leading-relaxed">{type.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {type.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--hk-gold)] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HKContactBanner title="건설 프로젝트 파트너를 찾고 계신가요?" />
    </>
  );
}
