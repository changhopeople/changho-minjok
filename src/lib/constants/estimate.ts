import { BuildingType, FrameType, GlassType, SpacerType, OpeningType } from '@/types';

// 건물 유형 옵션
export const BUILDING_TYPES: { value: BuildingType; label: string; icon: string; description: string }[] = [
  { value: 'apartment', label: '아파트', icon: '🏢', description: '공동주택' },
  { value: 'villa', label: '빌라/다세대', icon: '🏘️', description: '저층 공동주택' },
  { value: 'house', label: '단독주택', icon: '🏠', description: '단독/타운하우스' },
  { value: 'commercial', label: '상가/사무실', icon: '🏬', description: '상업시설' },
  { value: 'factory', label: '공장/창고', icon: '🏭', description: '산업시설' },
];

// 평형대 옵션
export const FLOOR_SIZES = [
  { value: '10', label: '10평 이하', windows: 5 },
  { value: '10_20', label: '10~20평', windows: 6 },
  { value: '20_30', label: '20~30평', windows: 8 },
  { value: '30_40', label: '30~40평', windows: 10 },
  { value: '40', label: '40평 이상', windows: 12 },
];

// 프레임 종류
export const FRAME_TYPES: { value: FrameType; label: string; description: string; priceLevel: number }[] = [
  { value: 'pvc_standard', label: 'PVC 일반', description: '가성비 기본 사양', priceLevel: 1 },
  { value: 'pvc_premium', label: 'PVC 고급', description: '단열 성능 강화', priceLevel: 2 },
  { value: 'aluminum', label: '알루미늄 창호', description: '내구성+슬림 디자인', priceLevel: 3 },
  { value: 'system', label: '시스템창호', description: '최고급 기밀·단열', priceLevel: 4 },
];

// 유리 종류
export const GLASS_TYPES: { value: GlassType; label: string; description: string; badge?: string }[] = [
  { value: 'double_22', label: '복층유리 22mm', description: '기본 단열' },
  { value: 'double_24', label: '복층유리 24mm', description: '향상된 단열' },
  { value: 'lowe_24', label: '로이유리 24mm', description: '냉난방비 절감', badge: '추천' },
  { value: 'triple_39', label: '삼중유리 39mm', description: '최고 단열', badge: '프리미엄' },
];

// 간봉 타입
export const SPACER_TYPES: { value: SpacerType; label: string; description: string }[] = [
  { value: 'aluminum', label: '알루미늄 간봉', description: '일반 사양' },
  { value: 'tps', label: 'TPS 단열 간봉', description: '결로 방지 + 단열↑' },
];

// 개폐 방식
export const OPENING_TYPES: { value: OpeningType; label: string; description: string }[] = [
  { value: 'sliding', label: '미닫이 (슬라이딩)', description: '발코니, 거실' },
  { value: 'casement', label: '여닫이 (스윙)', description: '방, 욕실' },
  { value: 'project', label: '프로젝트창 (틸트)', description: '환기용' },
  { value: 'fixed', label: '고정창 (픽스)', description: '채광용' },
  { value: 'tilt_turn', label: '틸트앤턴', description: '다기능' },
];

// 위치 옵션
export const WINDOW_LOCATIONS = [
  '거실',
  '안방',
  '방1',
  '방2',
  '방3',
  '주방',
  '욕실1',
  '욕실2',
  '베란다',
  '기타',
];

// 가격표 (원/㎡ 또는 원/개)
export const PRICE_TABLE = {
  frame: {
    pvc_standard: 85000,
    pvc_premium: 120000,
    aluminum: 180000,
    system: 250000,
  },
  glass: {
    double_22: 35000,
    double_24: 42000,
    lowe_24: 58000,
    triple_39: 85000,
  },
  spacer: {
    aluminum: 0,
    tps: 15000,
  },
  options: {
    screen_standard: 15000,
    screen_micro: 25000,
    safety_lock: 20000,
    fall_prevention: 45000,
    blind_builtin: 120000,
  },
  installation: {
    self: 0,
    standard: 80000,
    premium: 120000,
    demolition: 30000,
  },
};

// 평형대별 기본 창문 구성
export const DEFAULT_WINDOWS_BY_SIZE: Record<string, { location: string; openingType: OpeningType; count: number }[]> = {
  '10': [
    { location: '거실', openingType: 'sliding', count: 1 },
    { location: '방1', openingType: 'casement', count: 1 },
    { location: '방2', openingType: 'casement', count: 1 },
    { location: '주방', openingType: 'casement', count: 1 },
    { location: '욕실1', openingType: 'project', count: 1 },
  ],
  '10_20': [
    { location: '거실', openingType: 'sliding', count: 1 },
    { location: '방1', openingType: 'casement', count: 1 },
    { location: '방2', openingType: 'casement', count: 1 },
    { location: '방3', openingType: 'casement', count: 1 },
    { location: '주방', openingType: 'casement', count: 1 },
    { location: '욕실1', openingType: 'project', count: 1 },
  ],
  '20_30': [
    { location: '거실', openingType: 'sliding', count: 2 },
    { location: '안방', openingType: 'casement', count: 1 },
    { location: '방1', openingType: 'casement', count: 1 },
    { location: '방2', openingType: 'casement', count: 1 },
    { location: '방3', openingType: 'casement', count: 1 },
    { location: '주방', openingType: 'casement', count: 1 },
    { location: '욕실1', openingType: 'project', count: 1 },
  ],
  '30_40': [
    { location: '거실', openingType: 'sliding', count: 2 },
    { location: '안방', openingType: 'casement', count: 1 },
    { location: '방1', openingType: 'casement', count: 1 },
    { location: '방2', openingType: 'casement', count: 1 },
    { location: '방3', openingType: 'casement', count: 1 },
    { location: '방4', openingType: 'casement', count: 1 },
    { location: '주방', openingType: 'casement', count: 1 },
    { location: '욕실1', openingType: 'project', count: 1 },
    { location: '욕실2', openingType: 'project', count: 1 },
  ],
  '40': [
    { location: '거실', openingType: 'sliding', count: 3 },
    { location: '안방', openingType: 'casement', count: 2 },
    { location: '방1', openingType: 'casement', count: 1 },
    { location: '방2', openingType: 'casement', count: 1 },
    { location: '방3', openingType: 'casement', count: 1 },
    { location: '방4', openingType: 'casement', count: 1 },
    { location: '주방', openingType: 'casement', count: 1 },
    { location: '욕실1', openingType: 'project', count: 1 },
    { location: '욕실2', openingType: 'project', count: 1 },
  ],
};

// 기본 창문 사이즈 (mm)
export const DEFAULT_WINDOW_SIZES: Record<OpeningType, { width: number; height: number }> = {
  sliding: { width: 2400, height: 2100 },
  casement: { width: 1000, height: 1200 },
  project: { width: 600, height: 600 },
  fixed: { width: 1200, height: 1500 },
  tilt_turn: { width: 800, height: 1400 },
};
