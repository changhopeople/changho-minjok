'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, Mail, ChevronDown } from 'lucide-react';
import { HK_NAV, HK_COMPANY } from '@/lib/constants/hyunkyung';
import { useEffect, useState } from 'react';

interface HKMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HKMobileMenu({ open, onClose }: HKMobileMenuProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* 풀스크린 네이비 오버레이 */}
      <div className="absolute inset-0 bg-[#050D1A]">
        {/* 장식 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,146,42,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,146,42,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* 상단: 로고 + 닫기 */}
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--hk-gold)] rounded flex items-center justify-center">
            <span className="text-[var(--hk-navy)] font-black text-xs">HK</span>
          </div>
          <span className="text-white font-black text-lg">{HK_COMPANY.name}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white transition-colors"
          aria-label="메뉴 닫기"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 중앙: 메뉴 항목 */}
      <nav className="relative flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm space-y-1">
          {HK_NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const isExpanded = expandedMenu === item.href;
            return (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`block py-4 text-2xl font-black tracking-tight transition-colors ${
                      isActive ? 'text-[var(--hk-gold)]' : 'text-white hover:text-[var(--hk-gold)]'
                    }`}
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setExpandedMenu(isExpanded ? null : item.href)}
                      className="p-2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* 아코디언 서브메뉴 */}
                {item.children && isExpanded && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-base text-white/50 hover:text-[var(--hk-gold)] transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* 하단: 연락처 + 패밀리사이트 */}
      <div className="relative px-6 pb-8">
        <div className="w-full max-w-sm mx-auto">
          <div className="border-t border-white/10 pt-6 space-y-4">
            <a
              href={`tel:${HK_COMPANY.phone}`}
              className="flex items-center gap-3 text-white/60 hover:text-[var(--hk-gold)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{HK_COMPANY.phone}</span>
            </a>
            <a
              href={`mailto:${HK_COMPANY.email}`}
              className="flex items-center gap-3 text-white/60 hover:text-[var(--hk-gold)] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{HK_COMPANY.email}</span>
            </a>
            <div className="pt-4">
              <Link
                href="/"
                className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase"
              >
                창호의민족 바로가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
