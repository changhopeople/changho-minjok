'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone } from 'lucide-react';
import { HK_NAV, HK_COMPANY } from '@/lib/constants/hyunkyung';
import { useEffect } from 'react';

interface HKMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HKMobileMenu({ open, onClose }: HKMobileMenuProps) {
  const pathname = usePathname();

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

  // 경로 변경 시 자동 닫기
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 패널 */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
          <span className="font-bold text-[var(--hk-navy)]">{HK_COMPANY.name}</span>
          <button onClick={onClose} className="p-2 text-[#64748B] hover:text-[var(--hk-navy)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 overflow-y-auto py-4">
          {HK_NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-6 py-3 font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--hk-navy)] bg-[#F0F4F8] border-l-4 border-[var(--hk-gold)]'
                      : 'text-[#475569] hover:bg-[#F0F4F8]'
                  }`}
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="bg-[#F8FAFC]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-10 py-2.5 text-sm text-[#64748B] hover:text-[var(--hk-navy)] transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 하단 */}
        <div className="p-4 border-t border-[#E2E8F0] space-y-3">
          <a
            href={`tel:${HK_COMPANY.phone}`}
            className="flex items-center gap-2 text-[var(--hk-navy)] font-medium"
          >
            <Phone className="w-4 h-4" />
            {HK_COMPANY.phone}
          </a>
          <Link
            href="/hyunkyung/inquiry"
            className="block text-center hk-btn w-full"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
