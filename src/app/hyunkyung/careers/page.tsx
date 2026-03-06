import type { Metadata } from 'next';
import { Briefcase, Heart, TrendingUp, Users } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

export const metadata: Metadata = {
  title: '채용',
  description: '현경시스템과 함께 성장할 인재를 찾습니다.',
};

const benefits = [
  { icon: TrendingUp, title: '성장 기회', desc: '지속 성장하는 기업에서 커리어를 개발하세요' },
  { icon: Users, title: '팀워크', desc: '서로 존중하고 협력하는 조직 문화' },
  { icon: Heart, title: '복지 제도', desc: '4대 보험, 퇴직금, 경조사 지원 등' },
  { icon: Briefcase, title: '안정적 근무', desc: '탄탄한 재무 구조와 꾸준한 수주' },
];

const positions = [
  {
    title: '생산관리 담당자',
    department: '생산/제조',
    type: '정규직',
    description: '스마트 팩토리 생산라인 관리 및 품질 관리 업무를 담당합니다.',
    requirements: ['관련 경력 2년 이상', '생산관리 또는 품질관리 경험', '스마트팩토리 시스템 이해'],
  },
  {
    title: '현장 시공 관리자',
    department: '시공/현장',
    type: '정규직',
    description: '건설 현장의 창호 시공 관리 및 품질 감독 업무를 수행합니다.',
    requirements: ['건설 현장 관리 경력 3년 이상', '창호 시공 경험 우대', '관련 자격증 보유자 우대'],
  },
  {
    title: '영업 담당자',
    department: '영업/마케팅',
    type: '정규직',
    description: '건설사 및 시행사 대상 B2B 영업 활동을 수행합니다.',
    requirements: ['B2B 영업 경력 2년 이상', '건설/건자재 업계 경험 우대', '운전면허 소지자'],
  },
];

export default function CareersPage() {
  return (
    <>
      <HKPageHero
        title="채용"
        subtitle="현경시스템과 함께 성장할 인재를 찾습니다"
        breadcrumb="CAREERS"
      />

      {/* 복리후생 */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-3">함께 일하면 좋은 이유</h2>
            <p className="text-[#64748B]">현경시스템은 직원의 성장과 안정을 지원합니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 bg-[var(--hk-gold-light)] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[var(--hk-gold)]" />
                  </div>
                  <h3 className="font-bold text-[var(--hk-navy)] mb-1">{b.title}</h3>
                  <p className="text-sm text-[#64748B]">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 채용 공고 */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-3">채용 중인 포지션</h2>
            <p className="text-[#64748B]">아래 포지션에 지원하시거나, 이메일로 자유 지원해 주세요</p>
          </div>

          <div className="space-y-6">
            {positions.map((pos) => (
              <div key={pos.title} className="hk-card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--hk-navy)]">{pos.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[#64748B]">{pos.department}</span>
                      <span className="w-1 h-1 bg-[#CBD5E1] rounded-full" />
                      <span className="text-sm text-[var(--hk-gold)] font-medium">{pos.type}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:hksystem@naver.com?subject=[입사지원] ${pos.title}`}
                    className="hk-btn text-sm !py-2 !px-4"
                  >
                    지원하기
                  </a>
                </div>
                <p className="text-[#475569] mb-4">{pos.description}</p>
                <div>
                  <p className="text-sm font-semibold text-[var(--hk-navy)] mb-2">자격 요건</p>
                  <ul className="space-y-1">
                    {pos.requirements.map((r) => (
                      <li key={r} className="text-sm text-[#64748B] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--hk-gold)] rounded-full flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 p-8 bg-[#F8FAFC] rounded-lg">
            <p className="text-[#475569] mb-2">위 포지션 외에도 자유 지원을 환영합니다</p>
            <a href="mailto:hksystem@naver.com?subject=[자유지원] 현경시스템 입사지원" className="text-[var(--hk-gold)] font-semibold hover:underline">
              hksystem@naver.com
            </a>
          </div>
        </div>
      </section>

      <HKContactBanner title="현경시스템에 대해 더 궁금하신가요?" />
    </>
  );
}
