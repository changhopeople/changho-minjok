'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, ChevronDown, Globe } from 'lucide-react';
import { HK_NAV, HK_COMPANY } from '@/lib/constants/hyunkyung';
import HKMobileMenu from './HKMobileMenu';

export default function HKHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [familySiteOpen, setFamilySiteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMegaEnter = useCallback((href: string) => {
    setMegaMenuOpen(href);
  }, []);

  const handleMegaLeave = useCallback(() => {
    setMegaMenuOpen(null);
  }, []);

  return (
    <>
      {/* 유틸리티바 */}
      <div className="bg-[#050D1A] text-white text-xs relative z-[60]">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors cursor-default">
              <Globe className="w-3 h-3" />
              KOR
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-gray-500">
              고객센터 <span className="text-gray-400 ml-1">{HK_COMPANY.phone}</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            {/* 패밀리사이트 */}
            <div className="relative">
              <button
                onClick={() => setFamilySiteOpen(!familySiteOpen)}
                onBlur={() => setTimeout(() => setFamilySiteOpen(false), 200)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
              >
                패밀리 사이트
                <ChevronDown className={`w-3 h-3 transition-transform ${familySiteOpen ? 'rotate-180' : ''}`} />
              </button>
              {familySiteOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[#0C1B3A] border border-white/10 rounded min-w-[160px] py-1 z-50">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-xs text-gray-400 hover:text-[var(--hk-gold)] hover:bg-white/5 transition-colors"
                  >
                    창호의민족
                  </Link>
                </div>
              )}
            </div>
            <span className="w-px h-3 bg-white/10 hidden md:block" />
            <Link
              href="/hyunkyung/inquiry"
              className="hidden md:inline text-gray-500 hover:text-[var(--hk-gold)] transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white border-b border-[#E2E8F0]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16 lg:h-[72px]">
          {/* 로고 */}
          <Link href="/hyunkyung" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--hk-navy)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--hk-gold)] font-black text-sm tracking-tight">HK</span>
            </div>
            <div className="leading-none">
              <span className="font-black text-[var(--hk-navy)] text-lg tracking-tight block">
                {HK_COMPANY.name}
              </span>
              <span className="text-[9px] text-[#94A3B8] tracking-[0.15em] uppercase">
                {HK_COMPANY.nameEn}
              </span>
            </div>
          </Link>

          {/* 데스크탑 메가메뉴 네비게이션 */}
          <nav className="hidden lg:flex items-center h-full">
            {HK_NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <div
                  key={item.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.children ? handleMegaEnter(item.href) : undefined}
                  onMouseLeave={handleMegaLeave}
                >
                  <Link
                    href={item.href}
                    className={`relative px-6 h-full flex items-center text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'text-[var(--hk-navy)]'
                        : 'text-[#64748B] hover:text-[var(--hk-navy)]'
                    }`}
                  >
                    {item.title}
                    {isActive && (
                      <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-[var(--hk-gold)]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* 우측 */}
          <div className="flex items-center gap-4">
            <Link
              href="/hyunkyung/inquiry"
              className="hidden lg:inline-flex items-center gap-2 bg-[var(--hk-navy)] hover:bg-[#0C1B3A] text-white font-semibold text-sm px-6 py-2.5 transition-colors tracking-wide"
            >
              프로젝트 문의
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--hk-navy)]"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 메가메뉴 드롭다운 */}
        {megaMenuOpen && (() => {
          const activeItem = HK_NAV.find(n => n.href === megaMenuOpen);
          if (!activeItem?.children) return null;
          return (
            <div
              className="absolute left-0 right-0 top-full bg-white border-t border-[#E2E8F0] shadow-2xl z-50"
              onMouseEnter={() => handleMegaEnter(megaMenuOpen)}
              onMouseLeave={handleMegaLeave}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-10">
                <div className="grid grid-cols-12 gap-12">
                  {/* 좌측: 카테고리 제목 */}
                  <div className="col-span-4">
                    <p className="text-[var(--hk-gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                      {activeItem.title}
                    </p>
                    <p className="text-[var(--hk-navy)] text-2xl font-black">
                      {activeItem.title === '사업영역' ? '사업영역 소개' : activeItem.title}
                    </p>
                    <div className="w-12 h-[2px] bg-[var(--hk-gold)] mt-4" />
                  </div>
                  {/* 우측: 서브링크 */}
                  <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-4">
                      {activeItem.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group block p-5 rounded hover:bg-[#F8FAFC] transition-colors"
                        >
                          <p className="text-[var(--hk-navy)] font-bold group-hover:text-[var(--hk-gold)] transition-colors">
                            {child.title}
                          </p>
                          <div className="w-0 group-hover:w-8 h-[1px] bg-[var(--hk-gold)] mt-2 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* 오버레이 */}
              <div className="fixed inset-0 bg-black/20 -z-10" onClick={handleMegaLeave} />
            </div>
          );
        })()}
      </header>

      <HKMobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
