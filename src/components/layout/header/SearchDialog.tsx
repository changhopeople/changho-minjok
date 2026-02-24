'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SEARCH_DATA, CATEGORY_ICONS, type SearchItem } from '@/lib/constants/search-data';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return SEARCH_DATA.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of results) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [results]);

  const flatResults = results;

  const handleSelect = useCallback(
    (item: SearchItem) => {
      onOpenChange(false);
      setQuery('');
      router.push(item.href);
    },
    [onOpenChange, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(flatResults[selectedIndex]);
      }
    },
    [flatResults, selectedIndex, handleSelect]
  );

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector('[data-selected="true"]');
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Ctrl+K shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [open, onOpenChange]);

  let flatIndex = -1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[560px] p-0 gap-0 rounded-2xl border-2 border-[#EEEEEE] overflow-hidden top-[30%] translate-y-[-30%]"
      >
        <DialogTitle className="sr-only">사이트 검색</DialogTitle>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-[#EEEEEE]">
          <Search className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-[15px] bg-transparent outline-none placeholder:text-[#C4C4C4] text-[#1E1E1E]"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <X className="w-4 h-4 text-[#767676]" />
            </button>
          )}
          <button
            onClick={() => onOpenChange(false)}
            className="text-xs text-[#767676] bg-[#F5F5F5] rounded-md px-2 py-1 font-medium"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="px-5 py-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-[#EF4444]" />
              </div>
              <p className="text-[#767676] text-sm">
                페이지, 제품, FAQ 등을 검색해보세요
              </p>
              <p className="text-[#C4C4C4] text-xs mt-1">
                <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] rounded text-[10px] font-mono">Ctrl</kbd>
                {' + '}
                <kbd className="px-1.5 py-0.5 bg-[#F5F5F5] rounded text-[10px] font-mono">K</kbd>
                {' 로 빠르게 열기'}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[#767676] text-sm">
                &apos;{query}&apos;에 대한 검색 결과가 없습니다
              </p>
              <p className="text-[#C4C4C4] text-xs mt-1">
                다른 키워드로 검색해보세요
              </p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-5 py-2 text-xs font-bold text-[#767676] uppercase tracking-wider flex items-center gap-1.5">
                    <span>{CATEGORY_ICONS[category as SearchItem['category']]}</span>
                    {category}
                  </div>
                  {items.map((item) => {
                    flatIndex++;
                    const currentIndex = flatIndex;
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <button
                        key={`${item.href}-${item.title}`}
                        data-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          'w-full flex items-center gap-3 px-5 py-3 text-left transition-colors',
                          isSelected
                            ? 'bg-[#FEF2F2]'
                            : 'hover:bg-[#F5F5F5]'
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'text-sm font-medium truncate',
                              isSelected ? 'text-[#EF4444]' : 'text-[#1E1E1E]'
                            )}
                          >
                            {item.title}
                          </p>
                          <p className="text-xs text-[#767676] truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={cn(
                            'w-4 h-4 flex-shrink-0 transition-colors',
                            isSelected ? 'text-[#EF4444]' : 'text-[#C4C4C4]'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
