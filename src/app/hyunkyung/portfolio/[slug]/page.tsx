import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HKPortfolioDetail from '@/components/hyunkyung/portfolio/HKPortfolioDetail';
import HKContactBanner from '@/components/hyunkyung/shared/HKContactBanner';

// 임시 데이터 (나중에 DB에서 가져옴)
const MOCK_DATA: Record<string, {
  title: string; slug: string; client: string; location: string;
  project_type: string; project_scale?: string; year: string; duration?: string;
  description: string; products?: string[]; thumbnail_url: string | null; gallery_urls: string[];
}> = {
  'project-1': {
    title: '○○ 아파트 단지 창호 납품',
    slug: 'project-1',
    client: '대형 건설사',
    location: '경상남도 창원시',
    project_type: '아파트',
    project_scale: '500세대',
    year: '2024',
    duration: '8개월',
    description: '경상남도 창원시에 위치한 대규모 아파트 단지의 전체 창호를 납품 및 시공한 프로젝트입니다.\n\n총 500세대에 PVC 이중창 및 시스템 창호를 적용하였으며, 에너지 효율 등급 1등급을 달성하였습니다. 공기 준수율 100%를 기록하며 성공적으로 프로젝트를 완수하였습니다.',
    products: ['PVC 이중창', '시스템 창호', '방화문'],
    thumbnail_url: null,
    gallery_urls: [],
  },
  'project-2': {
    title: '△△ 주상복합 시스템창호',
    slug: 'project-2',
    client: '중견 건설사',
    location: '부산광역시',
    project_type: '주상복합',
    project_scale: '지상 35층',
    year: '2024',
    duration: '12개월',
    description: '부산광역시 해운대구에 위치한 주상복합 건물의 시스템 창호 및 커튼월을 시공한 프로젝트입니다.\n\n해안가 입지 특성을 고려한 내풍압 설계를 적용하였으며, 유럽 규격 프로파일을 사용하여 프리미엄 품질을 구현하였습니다.',
    products: ['시스템 창호', '알루미늄 커튼월'],
    thumbnail_url: null,
    gallery_urls: [],
  },
  'project-3': {
    title: '□□ 오피스텔 알루미늄 커튼월',
    slug: 'project-3',
    client: '건설사',
    location: '대구광역시',
    project_type: '오피스텔',
    year: '2023',
    duration: '6개월',
    description: '대구광역시 수성구에 위치한 오피스텔의 알루미늄 커튼월 시스템을 시공한 프로젝트입니다.\n\n슬림한 프레임 디자인과 높은 단열 성능을 동시에 달성하여 건축물의 미관과 에너지 효율을 극대화하였습니다.',
    products: ['알루미늄 커튼월', '알루미늄 창호'],
    thumbnail_url: null,
    gallery_urls: [],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = MOCK_DATA[slug];
  if (!data) return { title: '시공실적' };
  return {
    title: data.title,
    description: `${data.location} ${data.project_type} - ${data.client}`,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = MOCK_DATA[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <HKPortfolioDetail data={data} />
      <HKContactBanner />
    </>
  );
}
