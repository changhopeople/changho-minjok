import Link from 'next/link';
import { createColumnAction } from '../actions';
import ColumnForm from '@/components/admin/ColumnForm';
import { ArrowLeft } from 'lucide-react';

export default function NewColumnPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/columns"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">새 칼럼 작성</h1>
        <p className="text-gray-500 mt-1">새로운 칼럼을 작성합니다.</p>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <ColumnForm action={createColumnAction} submitLabel="등록하기" />
      </div>
    </div>
  );
}
