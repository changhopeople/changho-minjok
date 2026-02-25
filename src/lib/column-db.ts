import { supabase, ColumnRecord, ColumnInput } from './supabase';

export async function getAllColumns(): Promise<ColumnRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching columns:', error);
    return [];
  }

  return data || [];
}

export async function getPublishedColumns(category?: string): Promise<ColumnRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  let query = supabase
    .from('columns')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching columns:', error);
    return [];
  }

  return data || [];
}

export async function getFeaturedColumns(): Promise<ColumnRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured columns:', error);
    return [];
  }

  return data || [];
}

export async function getColumnById(id: string): Promise<ColumnRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching column:', error);
    return null;
  }

  return data;
}

export async function getColumnBySlug(slug: string): Promise<ColumnRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching column:', error);
    return null;
  }

  return data;
}

export async function createColumn(input: ColumnInput): Promise<ColumnRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('columns')
    .insert([{
      ...input,
      view_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating column:', error);
    return null;
  }

  return data;
}

export async function updateColumn(id: string, input: Partial<ColumnInput>): Promise<ColumnRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('columns')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating column:', error);
    return null;
  }

  return data;
}

export async function deleteColumn(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('columns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting column:', error);
    return false;
  }

  return true;
}

export async function incrementColumnViewCount(id: string): Promise<void> {
  if (!supabase) return;

  try {
    const { error: rpcError } = await supabase.rpc('increment_column_view_count', { column_id: id });
    if (rpcError) {
      // Fallback: direct update
      const { data } = await supabase
        .from('columns')
        .select('view_count')
        .eq('id', id)
        .single();

      if (data) {
        await supabase
          .from('columns')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', id);
      }
    }
  } catch {
    // Silently fail
  }
}

export async function uploadColumnImage(file: File): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `columns/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading column image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function getColumnCategories(): Promise<string[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('columns')
    .select('category')
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = [...new Set((data || []).map((d: { category: string }) => d.category))];
  return categories.filter(Boolean);
}

export async function getRelatedColumns(slug: string, category: string): Promise<ColumnRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .neq('slug', slug)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching related columns:', error);
    return [];
  }

  return data || [];
}
