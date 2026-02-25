import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getColumnById } from '@/lib/column-db';
import { updateColumnAction, deleteColumnAction } from '../actions';
import ColumnForm from '@/components/admin/ColumnForm';
import DeleteButton from '@/components/admin/DeleteButton';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditColumnPage({ params }: PageProps) {
  const { id } = await params;
  const column = await getColumnById(id);

  if (!column) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/columns"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">칼럼 수정</h1>
          <p className="text-gray-500 mt-1">칼럼 내용을 수정합니다.</p>
        </div>
        <DeleteButton
          action={deleteColumnAction}
          id={column.id}
          className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          삭제
        </DeleteButton>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <ColumnForm
          column={column}
          action={updateColumnAction}
          submitLabel="수정하기"
        />
      </div>
    </div>
  );
}
