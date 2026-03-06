import Link from 'next/link';
import { HK_COMPANY, HK_FOOTER_LINKS } from '@/lib/constants/hyunkyung';

export default function HKFooter() {
  return (
    <footer className="bg-[#050D1A] text-white">
      {/* 메인 풋터 */}
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--hk-gold)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--hk-navy)] font-bold text-sm">HK</span>
              </div>
              <div>
                <span className="font-bold text-lg block leading-none">{HK_COMPANY.name}</span>
                <span className="text-xs text-gray-500 tracking-[0.1em] uppercase">{HK_COMPANY.nameEn}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              {HK_COMPANY.slogan}
              <br />
              창호 제조·시공 및 건설 전문기업
            </p>
            {/* 인증 뱃지 */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 border border-[var(--hk-gold)]/30 text-[var(--hk-gold)] text-xs rounded font-medium">
                KS 인증
              </span>
              <span className="px-2.5 py-1 border border-white/10 text-gray-400 text-xs rounded font-medium">
                스마트 팩토리
              </span>
            </div>
          </div>

          {/* 회사 */}
          <div className="lg:col-span-2">
            <h4 className="!text-white font-semibold mb-5 text-xs tracking-[0.15em] uppercase">회사</h4>
            <ul className="space-y-3">
              {HK_FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[var(--hk-gold)] transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객지원 */}
          <div className="lg:col-span-2">
            <h4 className="!text-white font-semibold mb-5 text-xs tracking-[0.15em] uppercase">고객지원</h4>
            <ul className="space-y-3">
              {HK_FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[var(--hk-gold)] transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/hyunkyung/inquiry" className="text-sm text-[var(--hk-gold)] hover:text-[var(--hk-gold-light)] transition-colors font-medium">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="lg:col-span-4">
            <h4 className="!text-white font-semibold mb-5 text-xs tracking-[0.15em] uppercase">연락처</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-gray-600 w-12 flex-shrink-0">주소</span>
                <span className="text-gray-400">{HK_COMPANY.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-600 w-12 flex-shrink-0">TEL</span>
                <a href={`tel:${HK_COMPANY.phone}`} className="text-gray-400 hover:text-[var(--hk-gold)] transition-colors">{HK_COMPANY.phone}</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-600 w-12 flex-shrink-0">FAX</span>
                <span className="text-gray-400">{HK_COMPANY.fax}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-600 w-12 flex-shrink-0">EMAIL</span>
                <a href={`mailto:${HK_COMPANY.email}`} className="text-gray-400 hover:text-[var(--hk-gold)] transition-colors">{HK_COMPANY.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {HK_COMPANY.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>사업자등록번호: {HK_COMPANY.businessNumber}</span>
            <span className="w-px h-3 bg-white/10" />
            <span>대표: {HK_COMPANY.ceo}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
