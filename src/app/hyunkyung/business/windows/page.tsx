import type { Metadata } from 'next';
import { CheckCircle2, Factory, Layers, Shield, Thermometer } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '창호사업',
  description: '현경시스템 창호사업 - PVC, 알루미늄, 시스템 창호 제조 및 시공.',
};

const products = [
  {
    name: 'PVC 창호',
    description: '단열 성능이 뛰어나고 유지 관리가 용이한 PVC 창호. 아파트, 빌라 등 주거시설에 최적화.',
    features: ['우수한 단열 성능', '뛰어난 기밀성', '다양한 색상 선택', '경제적 가격'],
  },
  {
    name: '알루미늄 창호',
    description: '내구성과 디자인이 우수한 알루미늄 창호. 상업시설, 고층 빌딩에 적합.',
    features: ['높은 내구성', '슬림한 프레임', '대형 개구부 가능', '다양한 표면 처리'],
  },
  {
    name: '시스템 창호',
    description: '유럽 기술 기반의 프리미엄 시스템 창호. 에너지 효율과 디자인을 동시에 만족.',
    features: ['최고급 단열 성능', '유럽 규격 프로파일', '3중 유리 적용', '프리미엄 하드웨어'],
  },
  {
    name: '커튼월',
    description: '대형 상업/오피스 건물을 위한 커튼월 시스템. 미적 완성도와 구조적 안전성을 보장.',
    features: ['구조 계산 설계', '열교 차단', '맞춤 설계', '고층 빌딩 적용'],
  },
];

const processSteps = [
  { icon: Layers, title: '설계/컨설팅', desc: '프로젝트에 최적화된 창호 설계' },
  { icon: Factory, title: '제조/생산', desc: '스마트 팩토리 자동화 생산' },
  { icon: Shield, title: '품질 검수', desc: 'KS 기준 철저한 품질 관리' },
  { icon: Thermometer, title: '시공/A/S', desc: '전문 시공팀의 정밀 시공' },
];

export default function WindowsBusinessPage() {
  return (
    <>
      <HKPageHero
        title="창호사업"
        subtitle="3,500평 스마트 팩토리에서 생산되는 고품질 창호"
        breadcrumb="BUSINESS > WINDOWS"
      />

      {/* 프로세스 */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="relative">
                    <div className="w-14 h-14 bg-[var(--hk-navy)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[var(--hk-gold)]" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--hk-gold)] rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto">
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

      {/* 제품 목록 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-3">제품 라인업</h2>
            <p className="text-[#64748B]">다양한 프로젝트에 최적화된 창호 솔루션</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.name} className="hk-card p-8">
                <h3 className="text-xl font-bold text-[var(--hk-navy)] mb-3">{product.name}</h3>
                <p className="text-[#64748B] mb-5 leading-relaxed">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--hk-gold)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HKContactBanner title="창호 프로젝트 상담이 필요하신가요?" />
    </>
  );
}
