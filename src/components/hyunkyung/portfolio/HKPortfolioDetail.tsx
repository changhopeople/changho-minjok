import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Building2, User, Clock } from 'lucide-react';

export interface HKPortfolioDetailData {
  title: string;
  slug: string;
  client: string;
  location: string;
  project_type: string;
  project_scale?: string;
  year: string;
  duration?: string;
  description: string;
  products?: string[];
  thumbnail_url: string | null;
  gallery_urls: string[];
}

interface Props {
  data: HKPortfolioDetailData;
}

export default function HKPortfolioDetail({ data }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* 뒤로가기 */}
      <Link href="/hyunkyung/portfolio" className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[var(--hk-navy)] text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        시공실적 목록
      </Link>

      {/* 제목 */}
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--hk-navy)] mb-6">{data.title}</h1>

      {/* 메타 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-[#F8FAFC] rounded-lg">
        <div className="flex items-start gap-2">
          <User className="w-4 h-4 text-[var(--hk-gold)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#94A3B8]">발주처</p>
            <p className="text-sm font-medium text-[var(--hk-navy)]">{data.client}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[var(--hk-gold)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#94A3B8]">위치</p>
            <p className="text-sm font-medium text-[var(--hk-navy)]">{data.location}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Building2 className="w-4 h-4 text-[var(--hk-gold)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#94A3B8]">유형</p>
            <p className="text-sm font-medium text-[var(--hk-navy)]">{data.project_type}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-[var(--hk-gold)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#94A3B8]">시공연도</p>
            <p className="text-sm font-medium text-[var(--hk-navy)]">{data.year}</p>
          </div>
        </div>
      </div>

      {data.project_scale && (
        <div className="flex items-center gap-2 mb-4 text-sm text-[#475569]">
          <Clock className="w-4 h-4 text-[var(--hk-gold)]" />
          <span>규모: {data.project_scale}</span>
          {data.duration && <span>| 공사기간: {data.duration}</span>}
        </div>
      )}

      {/* 이미지 */}
      {data.thumbnail_url && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={data.thumbnail_url} alt={data.title} className="w-full" />
        </div>
      )}

      {/* 설명 */}
      <div className="prose max-w-none mb-8">
        <p className="text-[#475569] leading-relaxed whitespace-pre-line">{data.description}</p>
      </div>

      {/* 적용 제품 */}
      {data.products && data.products.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[var(--hk-navy)] mb-3">적용 제품</h3>
          <div className="flex flex-wrap gap-2">
            {data.products.map((p) => (
              <span key={p} className="px-3 py-1.5 bg-[var(--hk-gold-light)] text-[#92610E] text-sm rounded-md font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 갤러리 */}
      {data.gallery_urls.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-[var(--hk-navy)] mb-4">시공 갤러리</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.gallery_urls.map((url, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={url} alt={`${data.title} 갤러리 ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
