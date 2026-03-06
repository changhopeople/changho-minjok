export interface HKNavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

export const HK_NAV: HKNavItem[] = [
  {
    title: '회사소개',
    href: '/hyunkyung/about',
  },
  {
    title: '사업영역',
    href: '/hyunkyung/business',
    children: [
      { title: '사업영역 개요', href: '/hyunkyung/business' },
      { title: '창호사업', href: '/hyunkyung/business/windows' },
      { title: '건설사업', href: '/hyunkyung/business/construction' },
    ],
  },
  {
    title: '시공실적',
    href: '/hyunkyung/portfolio',
  },
  {
    title: '인증/특허',
    href: '/hyunkyung/certification',
  },
  {
    title: '채용',
    href: '/hyunkyung/careers',
  },
  {
    title: '오시는 길',
    href: '/hyunkyung/contact',
  },
];

export const HK_COMPANY = {
  name: '현경시스템',
  nameEn: 'HYUNKYUNG SYSTEM',
  fullName: '주식회사 현경시스템',
  ceo: '허자현',
  established: '2020',
  businessNumber: '268-86-01889',
  address: '경상북도 청도군 청도읍 청매로 86-29',
  phone: '054-373-9092',
  fax: '054-373-9093',
  email: 'hksystem@naver.com',
  description: '창호 제조·시공 및 건설 전문기업',
  slogan: '신뢰와 기술로 짓는 내일',
  revenue: '49.6억',
  revenueYear: '2023',
  revenueGrowth: '116%',
  capital: '5,000만원',
  industries: ['창호 제조', '유리 가공', '건설 시공', '태양광 발전'],
};

// 숫자 카운트업용 통계
export const HK_STATS = [
  { label: '누적 매출', value: 200, suffix: '억+', prefix: '' },
  { label: '누적 시공', value: 500, suffix: '건+', prefix: '' },
  { label: '스마트 팩토리', value: 3500, suffix: '평', prefix: '' },
  { label: '매출 성장률', value: 116, suffix: '%', prefix: '' },
];

export const HK_BUSINESS_AREAS = [
  {
    title: '창호사업',
    subtitle: 'Window & Door Systems',
    description: 'PVC, 알루미늄, 시스템 창호 제조 및 시공. 3,500평 규모 스마트 팩토리에서 최신 자동화 설비를 통해 KS 인증 고품질 창호를 생산합니다.',
    href: '/hyunkyung/business/windows',
    icon: 'window',
    stats: '연간 10,000세트+ 생산',
  },
  {
    title: '건설사업',
    subtitle: 'Construction & Installation',
    description: '아파트, 주상복합, 오피스텔 등 대규모 건축물의 창호 납품 및 시공. 체계적인 프로젝트 관리와 안전 시공으로 무사고 기록을 유지합니다.',
    href: '/hyunkyung/business/construction',
    icon: 'building',
    stats: '누적 500건+ 시공 완료',
  },
  {
    title: '태양광 발전',
    subtitle: 'Solar Energy',
    description: '친환경 에너지 사업으로 태양광 발전 설비 설치 및 운영. 지속 가능한 미래를 위한 신재생 에너지 사업을 확장하고 있습니다.',
    href: '/hyunkyung/business',
    icon: 'solar',
    stats: '친환경 에너지 사업 확장',
  },
];

export const HK_TIMELINE = [
  { year: '2024', events: ['창호의민족 B2C 브랜드 런칭', '스마트 팩토리 3,500평 확장 완료', '태양광 발전 사업 진출'] },
  { year: '2023', events: ['연매출 49.6억 달성 (전년대비 116% 성장)', '품질경영시스템 강화', '알루미늄 창호 라인 증설'] },
  { year: '2022', events: ['시스템창호 제조라인 도입', '대형 건설사 협력사 등록', '경남권 영업 확대'] },
  { year: '2021', events: ['스마트 팩토리 설비 자동화 투자', 'PVC 창호 생산능력 확대'] },
  { year: '2020', events: ['주식회사 현경시스템 법인 설립', '본사/공장 경북 청도 설립', 'KS 인증 취득'] },
];

export const HK_CORE_VALUES = [
  {
    title: '품질 최우선',
    titleEn: 'QUALITY FIRST',
    description: 'KS 인증 기반 철저한 품질 관리 시스템. 원자재 입고부터 출하까지 전 공정 품질 검사를 실시합니다.',
    icon: 'shield',
  },
  {
    title: '기술 혁신',
    titleEn: 'INNOVATION',
    description: '3,500평 스마트 팩토리의 자동화 생산 설비로 정밀하고 균일한 품질의 창호를 생산합니다.',
    icon: 'cpu',
  },
  {
    title: '고객 신뢰',
    titleEn: 'TRUST',
    description: '납기 준수율 99%, 시공 후 체계적인 A/S 관리로 고객과의 장기적 신뢰 관계를 구축합니다.',
    icon: 'handshake',
  },
  {
    title: '지속 성장',
    titleEn: 'GROWTH',
    description: '전년 대비 116% 매출 성장. 창호, 건설, 태양광까지 사업 영역을 확장하고 있습니다.',
    icon: 'trending',
  },
];

export const HK_PARTNERS = [
  '한화건설', 'KCC', 'LX하우시스', 'LG하우시스',
  'YKK AP', '삼성물산', '현대건설', '대림산업',
];

export const HK_FOOTER_LINKS = {
  company: [
    { title: '회사소개', href: '/hyunkyung/about' },
    { title: '사업영역', href: '/hyunkyung/business' },
    { title: '시공실적', href: '/hyunkyung/portfolio' },
  ],
  support: [
    { title: '인증/특허', href: '/hyunkyung/certification' },
    { title: '채용', href: '/hyunkyung/careers' },
    { title: '오시는 길', href: '/hyunkyung/contact' },
  ],
  inquiry: [
    { title: '문의하기', href: '/hyunkyung/inquiry' },
  ],
};
