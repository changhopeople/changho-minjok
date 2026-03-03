import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/** 클라이언트에서 Supabase Storage에 직접 업로드 (Vercel 4.5MB body 제한 우회) */
export async function uploadImageClient(file: File, folder: string): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file);

  if (error) {
    throw new Error(`이미지 업로드 실패: ${error.message}`);
  }

  const { data } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
