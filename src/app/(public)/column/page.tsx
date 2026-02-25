import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, User, ArrowRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getPublishedColumns, getFeaturedColumns, getColumnCategories } from '@/lib/column-db';

export const metadata: Metadata = {
  title: '칼럼',
  description: '창호의 민족의 전문 칼럼입니다. 창호 선택 가이드, 시공 팁, 업계 동향 등 유용한 정보를 제공합니다.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ColumnListPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const columns = await getPublishedColumns(category);
  const featuredColumns = await getFeaturedColumns();
  const categories = await getColumnCategories();

  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-[#E0F7F6] text-[#2AC1BC] rounded-full text-sm font-bold mb-6">
              Column
            </span>
            <h1 className="page-hero-title">
              창호 전문 <span className="text-[#2AC1BC]">칼럼</span>
            </h1>
            <p className="page-hero-subtitle">
              창호 선택부터 시공까지, 전문가의 노하우를 공유합니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured */}
      {featuredColumns.length > 0 && !category && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <h2 className="text-xl font-bold text-[#1E1E1E]">추천 칼럼</h2>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredColumns.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.1}>
                  <Link href={`/column/${item.slug}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#2AC1BC]/20 hover:border-[#2AC1BC] transition-all hover:-translate-y-1">
                      {item.thumbnail_url && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={item.thumbnail_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 bg-[#2AC1BC] text-white text-xs font-bold rounded-lg">
                            추천
                          </div>
                        </div>
                      )}
                      <div className="p-5">
                        <span className="inline-block px-2 py-1 bg-[#E0F7F6] text-[#2AC1BC] text-xs font-bold rounded-md mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#767676] line-clamp-2 mb-3">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[#C4C4C4]">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.view_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + List */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          {categories.length > 0 && (
            <AnimatedSection className="mb-10">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/column"
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    !category
                      ? 'bg-[#2AC1BC] text-white'
                      : 'bg-white text-[#767676] hover:text-[#2AC1BC] border border-gray-200'
                  }`}
                >
                  전체
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/column?category=${encodeURIComponent(cat)}`}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      category === cat
                        ? 'bg-[#2AC1BC] text-white'
                        : 'bg-white text-[#767676] hover:text-[#2AC1BC] border border-gray-200'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Column Grid */}
          {columns.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#767676]">
                {category ? `'${category}' 카테고리에 등록된 칼럼이 없습니다.` : '등록된 칼럼이 없습니다.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {columns.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.05}>
                  <Link href={`/column/${item.slug}`} className="group block h-full">
                    <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#EEEEEE] hover:border-[#2AC1BC] transition-all hover:-translate-y-1 h-full flex flex-col">
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
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="inline-block self-start px-2 py-1 bg-[#E0F7F6] text-[#2AC1BC] text-xs font-bold rounded-md mb-2">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-[#1E1E1E] group-hover:text-[#2AC1BC] transition-colors mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#767676] line-clamp-2 mb-4 flex-1">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#C4C4C4]">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(item.created_at).toLocaleDateString('ko-KR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {item.view_count}
                            </span>
                          </div>
                          <span className="text-[#2AC1BC] font-bold flex items-center gap-1">
                            읽기
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
