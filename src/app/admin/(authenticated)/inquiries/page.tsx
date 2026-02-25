import Link from 'next/link';
import { getAllInquiries, getInquiryStats } from '@/lib/inquiry-db';
import { getCustomerFunnelsByInquiryIds } from '@/lib/funnel-db';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Eye,
  Zap,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusConfig = {
  pending: { label: '대기중', color: 'bg-[#FFF3E8] text-[#FF6F0F]', icon: Clock },
  in_progress: { label: '처리중', color: 'bg-[#FEF2F2] text-[#EF4444]', icon: Eye },
  completed: { label: '완료', color: 'bg-[#E0F7F6] text-[#2AC1BC]', icon: CheckCircle2 },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', icon: XCircle },
};

const inquiryTypeLabels: Record<string, string> = {
  estimate: '견적 문의',
  product: '제품 문의',
  installation: '시공 문의',
  as: 'A/S 문의',
  other: '기타',
};

export default async function AdminInquiriesPage() {
  const [inquiries, stats] = await Promise.all([
    getAllInquiries(),
    getInquiryStats(),
  ]);

  const inquiryIds = inquiries.map(i => i.id);
  const funnelMap = await getCustomerFunnelsByInquiryIds(inquiryIds);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">상담신청 관리</h1>
        <p className="text-gray-500 mt-1">고객 상담신청을 관리합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">전체</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-[#FFF3E8] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#FF6F0F]">대기중</p>
          <p className="text-2xl font-bold text-[#FF6F0F]">{stats.pending}</p>
        </div>
        <div className="bg-[#FEF2F2] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#EF4444]">처리중</p>
          <p className="text-2xl font-bold text-[#EF4444]">{stats.in_progress}</p>
        </div>
        <div className="bg-[#E0F7F6] rounded-xl p-4 shadow-sm">
          <p className="text-sm text-[#2AC1BC]">완료</p>
          <p className="text-2xl font-bold text-[#2AC1BC]">{stats.completed}</p>
        </div>
      </div>

      {/* Content */}
      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">접수된 상담신청이 없습니다.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">신청일시</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">이름</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">연락처</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">문의유형</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">퍼널</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((item) => {
                const status = statusConfig[item.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                const funnel = funnelMap[item.id];
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      {item.address && (
                        <div className="text-sm text-gray-500 truncate max-w-[150px]">{item.address}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${item.phone}`} className="flex items-center gap-1 text-sm text-gray-900 hover:text-[#EF4444]">
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </a>
                        {item.email && (
                          <a href={`mailto:${item.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#EF4444]">
                            <Mail className="w-3 h-3" />
                            {item.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {inquiryTypeLabels[item.inquiry_type] || item.inquiry_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {funnel ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          funnel.status === 'active'
                            ? 'bg-[#FEF2F2] text-[#EF4444]'
                            : funnel.status === 'paused'
                            ? 'bg-[#FFF3E8] text-[#FF6F0F]'
                            : funnel.status === 'completed'
                            ? 'bg-[#E0F7F6] text-[#2AC1BC]'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          <Zap className="w-3 h-3" />
                          {funnel.status === 'active' && `진행중 ${funnel.current_step}/${funnel.total_steps}`}
                          {funnel.status === 'paused' && '일시정지'}
                          {funnel.status === 'completed' && '완료'}
                          {funnel.status === 'stopped' && '중지'}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <Link
                          href={`/admin/inquiries/${item.id}`}
                          className="px-3 py-1.5 text-sm text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        >
                          상세보기
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
