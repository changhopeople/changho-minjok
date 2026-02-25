import Link from 'next/link';
import { getAllColumns } from '@/lib/column-db';
import { deleteColumnAction } from './actions';
import { Plus, Edit, Eye, EyeOff, FileText, ExternalLink, Star } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminColumnsPage() {
  const columns = await getAllColumns();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">칼럼 관리</h1>
          <p className="text-gray-500 mt-1">블로그/칼럼 글을 관리합니다.</p>
        </div>
        <Link
          href="/admin/columns/new"
          className="inline-flex items-center gap-2 bg-[#EF4444] text-white px-4 py-2.5 rounded-xl hover:bg-[#DC2626] transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 칼럼
        </Link>
      </div>

      {/* Content */}
      {columns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">등록된 칼럼이 없습니다.</p>
          <Link
            href="/admin/columns/new"
            className="inline-flex items-center gap-2 bg-[#EF4444] text-white px-6 py-3 rounded-xl hover:bg-[#DC2626] transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 칼럼 작성하기
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">제목</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">카테고리</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">작성자</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">추천</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">조회</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {columns.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-[#E0F7F6] text-[#2AC1BC]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                  <td className="px-6 py-4">
                    {item.is_featured ? (
                      <Star className="w-4 h-4 fill-[#FF6F0F] text-[#FF6F0F]" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_published ? (
                      <span className="inline-flex items-center gap-1 text-[#2AC1BC] text-sm">
                        <Eye className="w-4 h-4" />
                        공개
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                        <EyeOff className="w-4 h-4" />
                        비공개
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.view_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/columns/${item.id}`}
                        className="p-2 text-gray-500 hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/column/${item.slug}`}
                        target="_blank"
                        className="p-2 text-gray-500 hover:text-[#2AC1BC] hover:bg-[#E0F7F6] rounded-lg transition-colors"
                        title="미리보기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <DeleteButton action={deleteColumnAction} id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
