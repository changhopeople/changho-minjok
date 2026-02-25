'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createColumn, updateColumn, deleteColumn } from '@/lib/column-db';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[가-힣]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '')
    || `column-${Date.now()}`;
}

export async function createColumnAction(formData: FormData): Promise<void> {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const author = formData.get('author') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string;
  const isPublished = formData.get('isPublished') === 'true';
  const isFeatured = formData.get('isFeatured') === 'true';

  const slug = generateSlug(title) + '-' + Date.now().toString().slice(-6);

  const result = await createColumn({
    title,
    slug,
    content,
    excerpt,
    thumbnail_url: thumbnailUrl || null,
    category,
    author,
    is_published: isPublished,
    is_featured: isFeatured,
  });

  if (!result) {
    redirect('/admin/columns?error=create-failed');
  }

  revalidatePath('/admin/columns');
  revalidatePath('/column');
  redirect('/admin/columns');
}

export async function updateColumnAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const author = formData.get('author') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string;
  const isPublished = formData.get('isPublished') === 'true';
  const isFeatured = formData.get('isFeatured') === 'true';

  const result = await updateColumn(id, {
    title,
    content,
    excerpt,
    thumbnail_url: thumbnailUrl || null,
    category,
    author,
    is_published: isPublished,
    is_featured: isFeatured,
  });

  if (!result) {
    redirect('/admin/columns?error=update-failed');
  }

  revalidatePath('/admin/columns');
  revalidatePath('/column');
  redirect('/admin/columns');
}

export async function deleteColumnAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  const result = await deleteColumn(id);

  if (!result) {
    redirect('/admin/columns?error=delete-failed');
  }

  revalidatePath('/admin/columns');
  revalidatePath('/column');
  redirect('/admin/columns');
}
