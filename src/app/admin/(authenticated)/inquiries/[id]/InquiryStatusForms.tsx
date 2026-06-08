'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CheckCircle2, Clock, Eye, Loader2, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { updateInquiryStatusAction } from '../actions';
import type { InquiryRecord } from '@/lib/supabase';

interface InquiryStatusFormsProps {
  inquiry: Pick<InquiryRecord, 'id' | 'status' | 'admin_note'>;
}

const statusButtons: Array<{
  value: InquiryRecord['status'];
  label: string;
  icon: LucideIcon;
  className: string;
}> = [
  {
    value: 'pending',
    label: '대기중',
    icon: Clock,
    className: 'bg-[#FFF3E8] text-[#FF6F0F] hover:bg-[#FF6F0F]/20',
  },
  {
    value: 'in_progress',
    label: '처리중',
    icon: Eye,
    className: 'bg-[#FEF2F2] text-[#EF4444] hover:bg-[#EF4444]/20',
  },
  {
    value: 'completed',
    label: '완료',
    icon: CheckCircle2,
    className: 'bg-[#E0F7F6] text-[#2AC1BC] hover:bg-[#2AC1BC]/20',
  },
  {
    value: 'cancelled',
    label: '취소',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
];

export default function InquiryStatusForms({ inquiry }: InquiryStatusFormsProps) {
  const router = useRouter();
  const [isMemoSaving, setIsMemoSaving] = useState(false);
  const [savingStatus, setSavingStatus] = useState<InquiryRecord['status'] | null>(null);

  const saveForm = async (formData: FormData, successMessage: string) => {
    try {
      const result = await updateInquiryStatusAction(formData);

      if (result?.success) {
        toast.success(successMessage);
        router.refresh();
        return;
      }

      toast.error(result?.error || '상담 상태 저장에 실패했습니다.');
    } catch (error) {
      console.error('Error saving inquiry status:', error);
      toast.error('상담 상태 저장에 실패했습니다.');
    }
  };

  const handleMemoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMemoSaving(true);

    try {
      const formData = new FormData(event.currentTarget);
      await saveForm(formData, '메모가 저장되었습니다.');
    } finally {
      setIsMemoSaving(false);
    }
  };

  const handleStatusSubmit = async (status: InquiryRecord['status']) => {
    setSavingStatus(status);

    try {
      const formData = new FormData();
      formData.set('id', inquiry.id);
      formData.set('status', status);

      await saveForm(formData, '상담 상태가 변경되었습니다.');
    } finally {
      setSavingStatus(null);
    }
  };

  return (
    <>
      <div className="px-6 pb-6">
        <form onSubmit={handleMemoSubmit}>
          <input type="hidden" name="id" value={inquiry.id} />
          <input type="hidden" name="status" value={inquiry.status} />
          <label className="text-sm text-gray-500 mb-2 block">관리자 메모</label>
          <textarea
            name="admin_note"
            rows={3}
            defaultValue={inquiry.admin_note || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none resize-none mb-2"
            placeholder="관리자 메모를 입력하세요"
          />
          <button
            type="submit"
            disabled={isMemoSaving}
            className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isMemoSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            메모 저장
          </button>
        </form>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex flex-wrap gap-3">
          {statusButtons.map(({ value, label, icon: Icon, className }) => (
            <button
              key={value}
              type="button"
              disabled={inquiry.status === value || savingStatus !== null}
              onClick={() => handleStatusSubmit(value)}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
            >
              {savingStatus === value ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
