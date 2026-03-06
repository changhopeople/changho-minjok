import { getAllHKInquiries, getHKInquiryStats } from '@/lib/hyunkyung-inquiry-db';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Phone,
  Building2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: '대기중', color: 'bg-amber-50 text-amber-700', icon: Clock },
  in_progress: { label: '처리중', color: 'bg-blue-50 text-blue-700', icon: Eye },
  completed: { label: '완료', color: 'bg-green-50 text-green-700', icon: CheckCircle2 },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', icon: XCircle },
};

export default async function HKInquiriesAdminPage() {
  const [inquiries, stats] = await Promise.all([
    getAllHKInquiries(),
    getHKInquiryStats(),
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">HK 문의 관리</h1>
        <p className="text-gray-500 mt-1">현경시스템 B2B 문의를 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">전체</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">대기중</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">처리중</p>
          <p className="text-2xl font-bold text-blue-600">{stats.in_progress}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">완료</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* 테이블 */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">아직 접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">회사명</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">담당자</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">연락처</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">프로젝트 유형</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">상태</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">접수일</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => {
                  const config = statusConfig[inquiry.status] || statusConfig.pending;
                  const StatusIcon = config.icon;
                  return (
                    <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 font-medium text-gray-900">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          {inquiry.company_name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{inquiry.contact_name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {inquiry.phone}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{inquiry.project_type || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
