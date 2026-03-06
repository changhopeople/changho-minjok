import Link from 'next/link';
import { getHKPortfolios } from '@/lib/hyunkyung-portfolio-db';
import { FolderOpen, MapPin, Calendar, Eye, EyeOff } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HKPortfolioAdminPage() {
  const portfolios = await getHKPortfolios();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HK 시공실적 관리</h1>
          <p className="text-gray-500 mt-1">현경시스템 시공실적을 관리합니다.</p>
        </div>
      </div>

      {/* 테이블 */}
      {portfolios.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-1">등록된 시공실적이 없습니다.</p>
          <p className="text-sm text-gray-400">Supabase에 hk_portfolio 테이블을 생성하고 데이터를 추가해 주세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">프로젝트</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">발주처</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">위치</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">유형</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">연도</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{item.title}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.client}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.project_type}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.year}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                          <Eye className="w-3 h-3" /> 공개
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                          <EyeOff className="w-3 h-3" /> 비공개
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
