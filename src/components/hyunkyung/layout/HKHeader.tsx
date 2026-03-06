'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Phone, Mail, Menu } from 'lucide-react';
import { HK_NAV, HK_COMPANY } from '@/lib/constants/hyunkyung';
import HKMobileMenu from './HKMobileMenu';

export default function HKHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 탑바 (네이비) */}
      <div className="bg-[#050D1A] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Phone className="w-3 h-3" />
              {HK_COMPANY.phone}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-gray-400">
              <Mail className="w-3 h-3" />
              {HK_COMPANY.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 hidden md:inline">
              {HK_COMPANY.nameEn}
            </span>
            <Link
              href="/hyunkyung/inquiry"
              className="text-[var(--hk-gold)] hover:text-[var(--hk-gold-light)] font-medium transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md border-b border-transparent' : 'border-b border-[#E2E8F0]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-[72px]">
          {/* 로고 */}
          <Link href="/hyunkyung" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--hk-navy)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--hk-gold)] font-bold text-sm">HK</span>
            </div>
            <div className="leading-none">
              <span className="font-bold text-[var(--hk-navy)] text-lg tracking-tight block">{HK_COMPANY.name}</span>
              <span className="text-[10px] text-[#94A3B8] tracking-[0.08em] uppercase">{HK_COMPANY.nameEn}</span>
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden lg:flex items-center">
            {HK_NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative px-5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[var(--hk-navy)]'
                        : 'text-[#64748B] hover:text-[var(--hk-navy)]'
                    }`}
                  >
                    {item.title}
                    {isActive && (
                      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-[var(--hk-gold)]" />
                    )}
                  </Link>
                  {item.children && (
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] py-2 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-[#475569] hover:text-[var(--hk-navy)] hover:bg-[#F8FAFC] transition-colors"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 우측 */}
          <div className="flex items-center gap-3">
            <Link
              href="/hyunkyung/inquiry"
              className="hidden lg:inline-flex items-center gap-2 bg-[var(--hk-navy)] hover:bg-[var(--hk-navy-light)] text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              프로젝트 문의
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--hk-navy)] hover:bg-[#F0F4F8] rounded-lg"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <HKMobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
