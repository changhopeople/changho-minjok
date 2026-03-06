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
  establishedDate: '2020.09.08',
  businessNumber: '268-86-01889',
  address: '경상북도 청도군 청도읍 청매로 86-29',
  addressDetail: '(내호리)',
  phone: '054-373-9092',
  fax: '054-373-9093',
  email: 'hksystem@naver.com',
  description: 'PVC 창호 조립 및 기능성 복층유리 가공 전문기업',
  slogan: '신뢰와 기술로 짓는 내일',
  revenue: '56.1억',
  revenueYear: '2024',
  revenueGrowth: '13%',
  operatingProfit: '3.8억',
  netIncome: '4.2억',
  operatingMargin: '6.80%',
  capital: '3억 5,000만원',
  creditRating: '양호',
  industryRank: '동종업계 77위',
  industries: ['PVC 창호 제조', '기능성 복층유리 가공', '건설 시공', '태양광 발전'],
  // 공장 정보 (유리건장 기사 기반)
  factory: {
    landArea: '11,000㎡', // 대지
    landAreaPyeong: '약 3,300평',
    buildingArea: '3,300㎡', // 건물
    buildingAreaPyeong: '약 1,000평',
    smartFactoryExpansion: '350평', // 복층유리 스마트팩토리 증축
    totalArea: '약 1,350평', // 건물 합계
    coverageNationwide: ['수도권', '충청', '호남', '영남', '강원'],
  },
  // 매출 연도별 추이 (잡코리아 데이터)
  revenueHistory: [
    { year: '2021', amount: '13.1억' },
    { year: '2022', amount: '22.9억' },
    { year: '2023', amount: '49.6억' },
    { year: '2024', amount: '56.1억' },
  ],
};

// 숫자 카운트업용 통계
export const HK_STATS = [
  { label: '2024 매출액', value: 56, suffix: '억', prefix: '' },
  { label: '전국 공급 지역', value: 5, suffix: '개 권역', prefix: '' },
  { label: '공장 대지', value: 3300, suffix: '평', prefix: '' },
  { label: '4년 매출 성장', value: 428, suffix: '%', prefix: '' },
];

export const HK_BUSINESS_AREAS = [
  {
    title: 'PVC 창호 제조',
    subtitle: 'PVC Window Manufacturing',
    description: 'PVC 시스템창, 아파트 발코니 이중창 등을 자체 공장에서 직접 제조. 2포인트·4포인트 용접기, 밀링기 8대, 자동절단기 등 제반 설비를 보유하고 전국 리모델링 시장에 공급합니다.',
    href: '/hyunkyung/business/windows',
    icon: 'window',
    stats: '전국 5개 권역 공급',
  },
  {
    title: '복층유리 가공',
    subtitle: 'Insulated Glass Processing',
    description: 'TPS간봉 자동부착 어플리케이터, CNC 자동 절단기, 자동 적재·이송 시스템 등 스마트팩토리 설비로 고기능성 복층유리를 생산합니다. 원판 입고부터 완제품까지 전 공정 자동화.',
    href: '/hyunkyung/business/windows',
    icon: 'layers',
    stats: '전 공정 자동화 생산',
  },
  {
    title: '건설·시공',
    subtitle: 'Construction & Installation',
    description: '아파트 리모델링을 중심으로 수도권, 충청, 호남, 영남, 강원 등 전국 주요 지역에 창호 납품 및 시공. 관공서 조달시장 진출도 준비 중입니다.',
    href: '/hyunkyung/business/construction',
    icon: 'building',
    stats: '관공서 조달시장 진출 추진',
  },
  {
    title: '태양광 발전',
    subtitle: 'Solar Energy',
    description: '친환경 에너지 사업으로 태양광 발전 설비 설치 및 운영. 지속 가능한 미래를 위한 신재생 에너지 사업을 확장하고 있습니다.',
    href: '/hyunkyung/business',
    icon: 'solar',
    stats: '신재생에너지 사업 확장',
  },
];

export const HK_TIMELINE = [
  { year: '2025', events: [
    '프리미엄 B2C 브랜드 "창호의민족" 런칭',
    '350평 규모 스마트팩토리 증축 (고기능 복층유리 전용)',
    'TPS간봉 자동부착 어플리케이터 포함 복층유리 자동생산라인 구축',
    'ERP 시스템 도입, 전 공정 디지털화',
    '알루미늄 창호 시장 진출 준비',
    '관공서 조달시장 진출 추진 (단종 면허 취득)',
  ]},
  { year: '2024', events: [
    '연매출 56.1억 달성 (전년 대비 13% 성장)',
    '영업이익 3.8억, 당기순이익 4.2억 달성',
    '자본금 3억 5,000만원 증자',
    '전국 5개 권역 공급 체계 구축 (수도권·충청·호남·영남·강원)',
    '태양광 발전 사업 진출',
  ]},
  { year: '2023', events: [
    '연매출 49.6억 달성 (전년 대비 116% 성장)',
    '품질경영시스템 강화',
    'PVC 시스템창 생산라인 확대',
  ]},
  { year: '2022', events: [
    '연매출 22.9억 달성',
    'PVC 창호 조립 설비 증설 (용접기 4대, 밀링기 8대)',
    '경남권 영업 거점 확대',
  ]},
  { year: '2021', events: [
    '연매출 13.1억 달성',
    '자동화 설비 투자 본격화',
    'PVC 창호 생산능력 확대',
  ]},
  { year: '2020', events: [
    '주식회사 현경시스템 법인 설립 (2020.09.08)',
    '본사/공장 경북 청도 설립 (대지 11,000㎡)',
    'PVC 창호 조립 및 유리 가공 사업 개시',
  ]},
];

export const HK_CORE_VALUES = [
  {
    title: '스마트 제조',
    titleEn: 'SMART MANUFACTURING',
    description: 'TPS간봉 자동부착, CNC 자동 절단, 자동 적재·이송 시스템 등 전 공정 자동화. ERP 연동으로 사무실 명령이 현장 생산라인에 실시간 전송됩니다.',
    icon: 'cpu',
  },
  {
    title: '품질 최우선',
    titleEn: 'QUALITY FIRST',
    description: '컴퓨터 자동화 프로그램으로 공정별 기계를 연동 운영. Human Error를 제로화하고, 스템핑·히팅·코르크패드 자동 부착 등 정밀 품질을 확보합니다.',
    icon: 'shield',
  },
  {
    title: '고객 신뢰',
    titleEn: 'TRUST',
    description: '납기 준수와 체계적 A/S 관리로 장기적 신뢰 관계를 구축. 동종업계 77위(신용등급 양호), 4년 연속 성장으로 파트너사의 신뢰를 얻고 있습니다.',
    icon: 'handshake',
  },
  {
    title: '지속 성장',
    titleEn: 'GROWTH',
    description: '2021년 13.1억 → 2024년 56.1억, 4년간 매출 428% 성장. 창호 제조에서 복층유리 가공, 조달시장까지 사업 영역을 확장하고 있습니다.',
    icon: 'trending',
  },
];

export const HK_PARTNERS = [
  'KCC', 'KCC글라스', '금호석유화학 휴그린', 'LX하우시스',
  '내일엔지니어링', '한화건설', 'YKK AP', '삼성물산',
];

// 공장 설비 정보 (유리건장 기사 기반)
export const HK_FACTORY_EQUIPMENT = {
  pvcLine: [
    { name: '2포인트 용접기', quantity: '2대' },
    { name: '4포인트 용접기', quantity: '2대' },
    { name: '밀링기', quantity: '8대' },
    { name: 'PVC 프로파일 자동절단기', quantity: '보유' },
    { name: '45도 절단기', quantity: '보유' },
  ],
  glassLine: [
    { name: 'TPS간봉 자동부착 어플리케이터', quantity: '내일엔지니어링 제조' },
    { name: '판유리 CNC 자동 절단기', quantity: '보유' },
    { name: '판유리 자동 적재보관 렉 시스템', quantity: '보유' },
    { name: '판유리 자동 이송 시스템', quantity: '보유' },
    { name: 'TPS간봉 스템핑 장비', quantity: '보유' },
    { name: '가스 충전 및 압착 프레스', quantity: '보유' },
    { name: 'TPS간봉 히팅 장비', quantity: '보유' },
    { name: '코르크패드 자동 부착 로봇', quantity: '보유' },
  ],
  systems: [
    'ERP 전사적자원관리 시스템',
    '컴퓨터 자동화 프로그램 (전 공정 연동)',
    '실시간 생산라인 명령 전송 체계',
  ],
};

// 매출 성장 차트 데이터
export const HK_REVENUE_CHART = [
  { year: '2021', revenue: 13.1, growth: null },
  { year: '2022', revenue: 22.9, growth: 75 },
  { year: '2023', revenue: 49.6, growth: 116 },
  { year: '2024', revenue: 56.1, growth: 13 },
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
