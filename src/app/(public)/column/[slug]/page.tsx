import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, User, ArrowLeft, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getColumnBySlug, getRelatedColumns, incrementColumnViewCount } from '@/lib/column-db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const column = await getColumnBySlug(slug);

  if (!column) {
    return { title: '칼럼을 찾을 수 없습니다' };
  }

  return {
    title: column.title,
    description: column.excerpt,
    openGraph: {
      title: column.title,
      description: column.excerpt,
      images: column.thumbnail_url ? [column.thumbnail_url] : [],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ColumnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const column = await getColumnBySlug(slug);

  if (!column) {
    notFound();
  }

  // Increment view count
  await incrementColumnViewCount(column.id);

  const relatedColumns = await getRelatedColumns(slug, column.category);

  return (
    <main>
      {/* Hero */}
      <section className="pt-8 pb-0 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <Link
              href="/column"
              className="inline-flex items-center gap-2 text-[#767676] hover:text-[#2AC1BC] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              칼럼 목록
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Article */}
      <article className="bg-[#F5F5F5]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <AnimatedSection>
            {/* Header */}
            <div className="pb-8">
              <span className="inline-block px-3 py-1 bg-[#E0F7F6] text-[#2AC1BC] text-sm font-bold rounded-lg mb-4">
                {column.category}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1E1E1E] mb-6 leading-tight">
                {column.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#767676]">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {column.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(column.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  조회 {column.view_count.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            {column.thumbnail_url && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
                <Image
                  src={column.thumbnail_url}
                  alt={column.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm mb-10">
              <div
                className="column-prose"
                dangerouslySetInnerHTML={{ __html: column.content }}
              />
            </div>
          </AnimatedSection>

          {/* Author Card */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 mb-10 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#E0F7F6] flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-[#2AC1BC]" />
              </div>
              <div>
                <p className="font-bold text-[#1E1E1E]">{column.author}</p>
                <p className="text-sm text-[#767676]">창호의 민족 전문 에디터</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>

      {/* Related Columns */}
      {relatedColumns.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <AnimatedSection>
              <h2 className="text-xl font-bold text-[#1E1E1E] mb-8">관련 칼럼</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedColumns.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.1}>
                  <Link href={`/column/${item.slug}`} className="group block">
                    <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden hover:shadow-md transition-all">
                      {item.thumbnail_url && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={item.thumbnail_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs font-bold text-[#2AC1BC]">{item.category}</span>
                        <h3 className="font-bold text-[#1E1E1E] text-sm group-hover:text-[#2AC1BC] transition-colors mt-1 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={0.3} className="text-center mt-10">
              <Link
                href="/column"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2AC1BC] text-white rounded-xl font-bold hover:bg-[#1FA9A5] transition-colors"
              >
                전체 칼럼 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </main>
  );
}
