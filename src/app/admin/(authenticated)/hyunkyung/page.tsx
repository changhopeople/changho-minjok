import Link from 'next/link';
import { getHKInquiryStats } from '@/lib/hyunkyung-inquiry-db';
import {
  Building2,
  MessageSquare,
  Clock,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig = {
  pending: { label: '대기중', color: 'bg-amber-50 text-amber-700' },
  in_progress: { label: '처리중', color: 'bg-blue-50 text-blue-700' },
  completed: { label: '완료', color: 'bg-green-50 text-green-700' },
};

export default async function HKDashboardPage() {
  const stats = await getHKInquiryStats();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-[#0C1B3A]" />
          <h1 className="text-2xl font-bold text-gray-900">현경시스템 대시보드</h1>
        </div>
        <p className="text-gray-500">현경시스템 B2B 사이트 관리</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#0C1B3A] rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#C4922A]" />
            </div>
            <span className="text-sm text-gray-500">전체 문의</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">대기중</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">처리중</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.in_progress}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">완료</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
        </div>
      </div>

      {/* 빠른 링크 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/hyunkyung/portfolio" className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#0C1B3A] transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0C1B3A] rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-[#C4922A]" />
              </div>
              <span className="font-semibold text-gray-900">시공실적 관리</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0C1B3A] transition-colors" />
          </div>
        </Link>
        <Link href="/admin/hyunkyung/inquiries" className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#0C1B3A] transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0C1B3A] rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#C4922A]" />
              </div>
              <span className="font-semibold text-gray-900">문의 관리</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0C1B3A] transition-colors" />
          </div>
        </Link>
        <a href="/hyunkyung" target="_blank" className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#0C1B3A] transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0C1B3A] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#C4922A]" />
              </div>
              <span className="font-semibold text-gray-900">사이트 바로가기</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0C1B3A] transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
}
