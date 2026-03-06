import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import HKPageHero from '@/components/hyunkyung/shared/HKPageHero';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';
import { HK_COMPANY } from '@/lib/constants/hyunkyung';

export const metadata: Metadata = {
  title: '오시는 길',
  description: `현경시스템 본사/공장 - ${HK_COMPANY.address}`,
};

const contactInfo = [
  { icon: MapPin, label: '주소', value: HK_COMPANY.address },
  { icon: Phone, label: '전화', value: HK_COMPANY.phone },
  { icon: Mail, label: '이메일', value: HK_COMPANY.email },
  { icon: Building2, label: 'FAX', value: HK_COMPANY.fax },
  { icon: Clock, label: '영업시간', value: '평일 09:00 - 18:00 (주말/공휴일 휴무)' },
];

export default function ContactPage() {
  return (
    <>
      <HKPageHero
        title="오시는 길"
        subtitle="현경시스템 본사 및 공장 안내"
        breadcrumb="CONTACT"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 지도 */}
            <div className="lg:col-span-2">
              <div className="aspect-[16/10] bg-[#F0F4F8] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.5!2d128.73!3d35.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rK97IOB67aB64-EIOyyre2YhOq1sCDssq3rj4Tsnag!5e0!3m2!1sko!2skr!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="현경시스템 위치"
                />
              </div>
            </div>

            {/* 연락처 정보 */}
            <div>
              <h2 className="text-xl font-bold text-[var(--hk-navy)] mb-6">연락처 정보</h2>
              <div className="space-y-5">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[var(--hk-gold-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--hk-gold)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#94A3B8] mb-0.5">{info.label}</p>
                        <p className="text-[var(--hk-navy)] font-medium text-sm">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 교통 안내 */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <h3 className="font-bold text-[var(--hk-navy)] mb-3">교통 안내</h3>
                <div className="space-y-3 text-sm text-[#475569]">
                  <div>
                    <p className="font-semibold text-[var(--hk-navy)] mb-1">자가용</p>
                    <p>경부고속도로 청도IC에서 약 10분</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--hk-navy)] mb-1">대중교통</p>
                    <p>청도역에서 택시 약 15분</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HKContactBanner title="방문 전 미리 연락해 주세요" subtitle="공장 견학도 가능합니다" />
    </>
  );
}
