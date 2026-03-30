'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { saveSettingsAction } from './actions';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Youtube,
  Clock,
  Save,
  Loader2,
} from 'lucide-react';

interface SettingsFormProps {
  settings: Record<string, string>;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await saveSettingsAction(formData);

    setIsLoading(false);

    if (result.success) {
      toast.success('설정이 저장되었습니다.');
      router.refresh();
    } else {
      toast.error(result.error || '저장에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 회사 정보 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">회사 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4" />
              회사명
            </label>
            <input
              type="text"
              name="company_name"
              defaultValue={settings.company_name || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="회사명을 입력하세요"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              주소
            </label>
            <input
              type="text"
              name="address"
              defaultValue={settings.address || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="회사 주소를 입력하세요"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4" />
              영업시간
            </label>
            <input
              type="text"
              name="business_hours"
              defaultValue={settings.business_hours || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="예: 평일 09:00 - 18:00"
            />
          </div>
        </div>
      </div>

      {/* 연락처 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">연락처</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              전화번호
            </label>
            <input
              type="text"
              name="phone"
              defaultValue={settings.phone || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="예: 1588-0000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              이메일
            </label>
            <input
              type="email"
              name="email"
              defaultValue={settings.email || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="예: info@example.com"
            />
          </div>
        </div>
      </div>

      {/* SNS */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SNS 계정</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="w-4 h-4" />
              카카오톡 채널
            </label>
            <input
              type="text"
              name="kakao_channel"
              defaultValue={settings.kakao_channel || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="카카오톡 채널 URL"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Instagram className="w-4 h-4" />
              인스타그램
            </label>
            <input
              type="text"
              name="instagram"
              defaultValue={settings.instagram || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="인스타그램 URL"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Youtube className="w-4 h-4" />
              유튜브
            </label>
            <input
              type="text"
              name="youtube"
              defaultValue={settings.youtube || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none"
              placeholder="유튜브 채널 URL"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-[#EF4444] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#DC2626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        설정 저장
      </button>
    </form>
  );
}
