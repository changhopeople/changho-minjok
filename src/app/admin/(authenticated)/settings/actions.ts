'use server';

import { revalidatePath } from 'next/cache';
import { updateSettings } from '@/lib/settings-db';

export async function saveSettingsAction(formData: FormData) {
  const settings: Record<string, string> = {};

  const keys = [
    'company_name',
    'phone',
    'email',
    'address',
    'kakao_channel',
    'instagram',
    'youtube',
    'business_hours',
  ];

  keys.forEach((key) => {
    const value = formData.get(key);
    if (value !== null) {
      settings[key] = value as string;
    }
  });

  const result = await updateSettings(settings);

  if (result.success) {
    revalidatePath('/admin/settings');
    return { success: true };
  }

  console.error('Error saving settings:', result.error);
  return { success: false, error: '설정 저장에 실패했습니다.' };
}
