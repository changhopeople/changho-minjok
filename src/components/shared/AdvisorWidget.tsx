'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldX, Search, X } from 'lucide-react';
import { searchStaff, StaffMember } from '@/lib/constants/staff';

type SearchResult =
  | { status: 'idle' }
  | { status: 'found'; member: StaffMember }
  | { status: 'not_found' };

export default function AdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResult({ status: 'idle' });
  };

  return (
    <div className="fixed bottom-20 left-4 md:bottom-8 md:left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2AC1BC]" />
                <span className="text-sm font-bold text-gray-900">
                  어드바이저 조회
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="p-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="이름 또는 전화번호"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 h-9 text-sm bg-gray-50 border border-gray-200 focus:border-[#2AC1BC] focus:outline-none rounded-lg px-3"
                />
                <button
                  type="submit"
                  className="h-9 px-3 bg-[#2AC1BC] hover:bg-[#24ADA8] rounded-lg text-white text-sm font-bold transition-colors flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  조회
                </button>
              </form>
            </div>

            {/* Result */}
            <AnimatePresence mode="wait">
              {result.status === 'found' && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3"
                >
                  <div className="bg-[#E8F8F7] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#2AC1BC]" />
                      <span className="text-xs font-bold text-[#2AC1BC]">
                        본사 정식 소속 확인됨
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {result.member.name}{' '}
                      <span className="font-normal text-gray-500">
                        / {result.member.position}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.member.displayPhone}
                    </div>
                  </div>
                </motion.div>
              )}

              {result.status === 'not_found' && (
                <motion.div
                  key="not_found"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-3"
                >
                  <div className="bg-red-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldX className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold text-red-500">
                        등록되지 않은 담당자
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      일치하는 본사 소속 어드바이저가 없습니다.
                      본사로 직접 문의해주세요.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border-2 border-[#2AC1BC] rounded-full shadow-lg hover:bg-[#E8F8F7] transition-colors text-sm font-bold text-[#2AC1BC]"
      >
        <ShieldCheck className="w-4 h-4" />
        어드바이저 조회
      </motion.button>
    </div>
  );
}
