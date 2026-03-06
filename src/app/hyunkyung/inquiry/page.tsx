'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import { HK_COMPANY } from '@/lib/constants/hyunkyung';

const projectTypes = ['아파트', '주상복합', '오피스텔', '상업시설', '공공시설', '기타'];

export default function InquiryPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      company_name: formData.get('company_name'),
      contact_name: formData.get('contact_name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      project_type: formData.get('project_type'),
      project_location: formData.get('project_location'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/hyunkyung/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('문의 접수에 실패했습니다. 전화로 문의해 주세요.');
      }
    } catch {
      alert('네트워크 오류가 발생했습니다. 전화로 문의해 주세요.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <HKPageHero
        title="문의하기"
        subtitle="프로젝트에 대해 상담받으세요"
        breadcrumb="INQUIRY"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 폼 */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--hk-navy)] mb-2">문의가 접수되었습니다</h3>
                  <p className="text-[#64748B]">담당자가 빠른 시일 내 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company_name" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        회사명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                        placeholder="회사명을 입력해 주세요"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact_name" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        담당자명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact_name"
                        name="contact_name"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                        placeholder="담당자명을 입력해 주세요"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                        placeholder="010-0000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="project_type" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        프로젝트 유형
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="">선택해 주세요</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="project_location" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                        프로젝트 위치
                      </label>
                      <input
                        type="text"
                        id="project_location"
                        name="project_location"
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all"
                        placeholder="예: 경상남도 창원시"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[var(--hk-navy)] mb-2">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E1E1E] placeholder-[#94A3B8] focus:border-[var(--hk-navy)] focus:bg-white focus:outline-none transition-all resize-none"
                      placeholder="프로젝트 규모, 필요 제품, 일정 등을 자유롭게 작성해 주세요"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="hk-btn w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '접수 중...' : '문의 접수하기'}
                  </button>
                </form>
              )}
            </div>

            {/* 사이드바 */}
            <div>
              <div className="bg-[var(--hk-navy)] rounded-lg p-6 text-white mb-6">
                <h3 className="!text-white font-bold text-lg mb-4">직접 연락하기</h3>
                <div className="space-y-4">
                  <a href={`tel:${HK_COMPANY.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[var(--hk-gold)] transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>{HK_COMPANY.phone}</span>
                  </a>
                  <a href={`mailto:${HK_COMPANY.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[var(--hk-gold)] transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>{HK_COMPANY.email}</span>
                  </a>
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{HK_COMPANY.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-lg p-6">
                <h3 className="font-bold text-[var(--hk-navy)] mb-3">영업시간</h3>
                <div className="space-y-2 text-sm text-[#475569]">
                  <div className="flex justify-between">
                    <span>평일</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>토요일</span>
                    <span className="font-medium text-red-500">휴무</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일요일/공휴일</span>
                    <span className="font-medium text-red-500">휴무</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
