import { supabase } from './supabase';

export interface HKInquiryRecord {
  id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string | null;
  project_type: string | null;
  project_location: string | null;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface HKInquiryInput {
  company_name: string;
  contact_name: string;
  phone: string;
  email?: string;
  project_type?: string;
  project_location?: string;
  message: string;
}

export async function getAllHKInquiries(): Promise<HKInquiryRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hk_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching HK inquiries:', error);
    return [];
  }
  return data || [];
}

export async function getHKInquiryById(id: string): Promise<HKInquiryRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching HK inquiry:', error);
    return null;
  }
  return data;
}

export async function createHKInquiry(input: HKInquiryInput): Promise<{ data: HKInquiryRecord | null; error: string | null }> {
  if (!supabase) {
    return { data: null, error: 'Supabase가 설정되지 않았습니다.' };
  }

  const { data, error } = await supabase
    .from('hk_inquiries')
    .insert([{
      ...input,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating HK inquiry:', error);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export async function updateHKInquiryStatus(
  id: string,
  status: HKInquiryRecord['status'],
  admin_note?: string
): Promise<HKInquiryRecord | null> {
  if (!supabase) return null;

  const updateData: { status: string; admin_note?: string; updated_at: string } = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (admin_note !== undefined) {
    updateData.admin_note = admin_note;
  }

  const { data, error } = await supabase
    .from('hk_inquiries')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating HK inquiry:', error);
    return null;
  }
  return data;
}

export async function deleteHKInquiry(id: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('hk_inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting HK inquiry:', error);
    return false;
  }
  return true;
}

export async function getHKInquiryStats() {
  if (!supabase) return { total: 0, pending: 0, in_progress: 0, completed: 0 };

  const { data, error } = await supabase
    .from('hk_inquiries')
    .select('status');

  if (error || !data) return { total: 0, pending: 0, in_progress: 0, completed: 0 };

  return {
    total: data.length,
    pending: data.filter(d => d.status === 'pending').length,
    in_progress: data.filter(d => d.status === 'in_progress').length,
    completed: data.filter(d => d.status === 'completed').length,
  };
}
