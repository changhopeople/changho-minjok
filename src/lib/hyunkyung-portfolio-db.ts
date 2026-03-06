import { supabase } from './supabase';

export interface HKPortfolioRecord {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  project_type: string;
  project_scale: string | null;
  project_value: string | null;
  description: string;
  year: string;
  duration: string | null;
  products: string[];
  thumbnail_url: string | null;
  gallery_urls: string[];
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface HKPortfolioInput {
  title: string;
  slug: string;
  client: string;
  location: string;
  project_type: string;
  project_scale?: string;
  project_value?: string;
  description: string;
  year: string;
  duration?: string;
  products?: string[];
  thumbnail_url?: string | null;
  gallery_urls?: string[];
  published?: boolean;
  display_order?: number;
}

export async function getHKPortfolios(): Promise<HKPortfolioRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hk_portfolio')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching HK portfolios:', error);
    return [];
  }
  return data || [];
}

export async function getPublishedHKPortfolios(): Promise<HKPortfolioRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hk_portfolio')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching HK portfolios:', error);
    return [];
  }
  return data || [];
}

export async function getHKPortfolioBySlug(slug: string): Promise<HKPortfolioRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_portfolio')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching HK portfolio:', error);
    return null;
  }
  return data;
}

export async function getHKPortfolioById(id: string): Promise<HKPortfolioRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_portfolio')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching HK portfolio:', error);
    return null;
  }
  return data;
}

export async function createHKPortfolio(input: HKPortfolioInput): Promise<HKPortfolioRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_portfolio')
    .insert([{
      ...input,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating HK portfolio:', error);
    return null;
  }
  return data;
}

export async function updateHKPortfolio(id: string, input: Partial<HKPortfolioInput>): Promise<HKPortfolioRecord | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hk_portfolio')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating HK portfolio:', error);
    return null;
  }
  return data;
}

export async function deleteHKPortfolio(id: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('hk_portfolio')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting HK portfolio:', error);
    return false;
  }
  return true;
}
