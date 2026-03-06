import { supabase } from './supabase';

export interface HKCertRecord {
  id: string;
  title: string;
  category: 'certification' | 'patent' | 'award';
  issuer: string;
  issue_date: string | null;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface HKCertInput {
  title: string;
  category: 'certification' | 'patent' | 'award';
  issuer: string;
  issue_date?: string;
  description?: string;
  image_url?: string | null;
  display_order?: number;
}

export async function getAllHKCerts(): Promise<HKCertRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hk_certifications')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching HK certifications:', error);
    return [];
  }
  return data || [];
}

export async function createHKCert(input: HKCertInput): Promise<HKCertRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_certifications')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating HK certification:', error);
    return null;
  }
  return data;
}

export async function updateHKCert(id: string, input: Partial<HKCertInput>): Promise<HKCertRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_certifications')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating HK certification:', error);
    return null;
  }
  return data;
}

export async function deleteHKCert(id: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('hk_certifications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting HK certification:', error);
    return false;
  }
  return true;
}
