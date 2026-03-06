import Link from 'next/link';
import { HK_COMPANY, HK_NAV } from '@/lib/constants/hyunkyung';

export default function HKFooter() {
  return (
    <footer className="bg-[#050D1A] text-white">
      {/* 1단: 연락처 풀폭 */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <p className="text-[var(--hk-gold)] text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
                TELEPHONE
              </p>
              <a
                href={`tel:${HK_COMPANY.phone}`}
                className="text-white text-2xl md:text-3xl font-black hover:text-[var(--hk-gold)] transition-colors tracking-tight"
              >
                {HK_COMPANY.phone}
              </a>
            </div>
            <div>
              <p className="text-[var(--hk-gold)] text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
                EMAIL
              </p>
              <a
                href={`mailto:${HK_COMPANY.email}`}
                className="text-white text-2xl md:text-3xl font-black hover:text-[var(--hk-gold)] transition-colors tracking-tight"
              >
                {HK_COMPANY.email}
              </a>
            </div>
            <div>
              <p className="text-[var(--hk-gold)] text-[10px] tracking-[0.2em] uppercase font-semibold mb-3">
                ADDRESS
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                {HK_COMPANY.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2단: 사이트맵 */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* 각 네비 항목을 사이트맵 칼럼으로 */}
            {HK_NAV.map((item) => (
              <div key={item.href}>
                <h4 className="!text-white font-black text-sm mb-5 tracking-wide">
                  {item.title}
                </h4>
                {item.children ? (
                  <ul className="space-y-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm text-gray-500 hover:text-[var(--hk-gold)] transition-colors"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-[var(--hk-gold)] transition-colors"
                  >
                    바로가기
                  </Link>
                )}
              </div>
            ))}

            {/* 인증 칼럼 추가 */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="!text-white font-black text-sm mb-5 tracking-wide">
                인증
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 border border-[var(--hk-gold)]/30 text-[var(--hk-gold)] text-xs font-semibold tracking-wider">
                  KS 인증
                </span>
                <span className="px-3 py-1.5 border border-white/10 text-gray-500 text-xs font-semibold tracking-wider">
                  스마트팩토리
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3단: 하단바 */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 좌: 법인정보 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
            <span>&copy; {new Date().getFullYear()} {HK_COMPANY.fullName}</span>
            <span className="w-px h-3 bg-white/10 hidden md:block" />
            <span>사업자등록번호: {HK_COMPANY.businessNumber}</span>
            <span className="w-px h-3 bg-white/10 hidden md:block" />
            <span>대표: {HK_COMPANY.ceo}</span>
          </div>

          {/* 우: 패밀리사이트 */}
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              className="text-gray-500 hover:text-[var(--hk-gold)] transition-colors font-medium"
            >
              창호의민족
            </Link>
            <span className="w-px h-3 bg-white/10" />
            <Link
              href="/hyunkyung/inquiry"
              className="text-[var(--hk-gold)] hover:text-[var(--hk-gold-light)] transition-colors font-medium"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
