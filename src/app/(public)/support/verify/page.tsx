'use client';

import { useState } from 'react';
import { Search, ShieldCheck, ShieldX, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { searchStaff, StaffMember } from '@/lib/constants/staff';
import { COMPANY_INFO } from '@/lib/constants/navigation';

type SearchResult =
  | { status: 'idle' }
  | { status: 'found'; member: StaffMember }
  | { status: 'not_found' };

export default function VerifyPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult>({ status: 'idle' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const member = searchStaff(query);
    if (member) {
      setResult({ status: 'found', member });
    } else {
      setResult({ status: 'not_found' });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              전문 <span className="text-[#EF4444]">어드바이저</span> 조회
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              상담 중인 담당자가 <strong>창호의 민족 본사 정식 소속</strong>인지
              <br />
              이름 또는 전화번호로 바로 확인하세요.
            </p>
          </AnimatedSection>

          {/* Search Form */}
          <AnimatedSection delay={0.1}>
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="이름 또는 전화번호 (뒷 4자리 가능)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 h-12 sm:h-14 text-sm sm:text-base bg-white border-2 border-gray-200 focus:border-[#EF4444] rounded-xl px-4"
                />
                <Button
                  type="submit"
                  className="h-12 sm:h-14 px-5 sm:px-8 bg-[#EF4444] hover:bg-[#DC2626] rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                  조회
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2 text-center">
                예) 홍길동, 010-1234-5678, 5678
              </p>
            </div>
          </AnimatedSection>

          {/* Result */}
          <AnimatedSection delay={0.2}>
            <div className="max-w-lg mx-auto mt-8">
              {result.status === 'found' && (
                <div className="bg-white rounded-2xl border-2 border-[#EF4444] p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-7 h-7 text-[#EF4444]" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-[#FEF2F2] text-[#EF4444] rounded-full text-xs font-bold mb-3">
                      본사 정식 소속 확인됨
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      {result.member.name}
                    </h3>
                  </div>

                  <div className="space-y-3 bg-gray-50 rounded-xl p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500">직위</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {result.member.position}
                      </span>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        연락처
                      </span>
                      <a
                        href={`tel:${result.member.displayPhone}`}
                        className="text-sm sm:text-base font-bold text-[#EF4444]"
                      >
                        {result.member.displayPhone}
                      </a>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        이메일
                      </span>
                      <a
                        href={`mailto:${result.member.email}`}
                        className="text-sm sm:text-base font-bold text-[#EF4444]"
                      >
                        {result.member.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 p-4 bg-[#FEF2F2] rounded-xl text-center">
                    <p className="text-xs sm:text-sm text-gray-700">
                      <span className="font-bold text-[#EF4444]">창호의 민족</span> 본사 소속
                      전문 어드바이저로 확인되었습니다.
                      <br />
                      안심하고 상담을 진행하세요.
                    </p>
                  </div>
                </div>
              )}

              {result.status === 'not_found' && (
                <div className="bg-white rounded-2xl border-2 border-[#EF4444] p-6 sm:p-8 text-center">
                  <div className="w-14 h-14 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldX className="w-7 h-7 text-[#EF4444]" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#FEF2F2] text-[#EF4444] rounded-full text-xs font-bold mb-4">
                    등록되지 않은 담당자
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    등록되지 않은 담당자입니다
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                    검색하신 정보와 일치하는 본사 소속 어드바이저가 없습니다.
                    <br />
                    사칭 피해 방지를 위해 본사로 직접 문의해주세요.
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#2AC1BC] text-white rounded-xl font-bold text-sm hover:bg-[#1FA9A5] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    본사 대표번호: {COMPANY_INFO.phone}
                  </a>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Info Section */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-lg mx-auto mt-10">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-3">
                  왜 어드바이저 조회가 필요한가요?
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold mt-0.5">01</span>
                    <span>
                      최근 타 업체 직원이 &quot;창호의 민족&quot; 소속을 사칭하는 사례가 보고되고
                      있습니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold mt-0.5">02</span>
                    <span>
                      본사 정식 소속 어드바이저만이 정품 자재와 공식 보증을 제공할 수 있습니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold mt-0.5">03</span>
                    <span>
                      확인이 되지 않는 경우, 대표번호{' '}
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#EF4444] font-bold">
                        {COMPANY_INFO.phone}
                      </a>
                      으로 문의해주세요.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
