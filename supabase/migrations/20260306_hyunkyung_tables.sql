-- 현경시스템 전용 테이블

-- 1. HK 시공실적
CREATE TABLE IF NOT EXISTS hk_portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  location TEXT NOT NULL,
  project_type TEXT NOT NULL,          -- '아파트', '주상복합', '오피스텔', '상업시설' 등
  project_scale TEXT,                  -- '500세대', '지상 30층' 등
  project_value TEXT,                  -- '계약금액 (비공개 가능)'
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  duration TEXT,                       -- '6개월', '1년' 등
  products TEXT[],                     -- 사용 제품 목록
  thumbnail_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HK 문의
CREATE TABLE IF NOT EXISTS hk_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_type TEXT,
  project_location TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HK 인증/특허/수상
CREATE TABLE IF NOT EXISTS hk_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('certification', 'patent', 'award')),
  issuer TEXT NOT NULL,
  issue_date TEXT,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE hk_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE hk_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE hk_certifications ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (published 항목만)
CREATE POLICY "hk_portfolio_public_read" ON hk_portfolio
  FOR SELECT USING (published = true);

CREATE POLICY "hk_certifications_public_read" ON hk_certifications
  FOR SELECT USING (true);

-- 문의 작성 정책
CREATE POLICY "hk_inquiries_public_insert" ON hk_inquiries
  FOR INSERT WITH CHECK (true);

-- 서비스 롤 전체 접근 (admin용)
CREATE POLICY "hk_portfolio_service_all" ON hk_portfolio
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "hk_inquiries_service_all" ON hk_inquiries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "hk_certifications_service_all" ON hk_certifications
  FOR ALL USING (auth.role() = 'authenticated');
