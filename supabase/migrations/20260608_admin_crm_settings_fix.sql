-- Admin CRM/settings schema guard
-- Safe to run on existing projects; it only creates missing objects/columns.

CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS settings_key_unique_idx ON settings (key);

ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS contract_status VARCHAR(20) DEFAULT 'inquiry',
  ADD COLUMN IF NOT EXISTS contract_date DATE,
  ADD COLUMN IF NOT EXISTS construction_date DATE,
  ADD COLUMN IF NOT EXISTS construction_status VARCHAR(20),
  ADD COLUMN IF NOT EXISTS total_amount DECIMAL(12,0),
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'settings'
      AND policyname = 'Enable all for settings'
  ) THEN
    CREATE POLICY "Enable all for settings"
      ON settings
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

INSERT INTO settings (key, value) VALUES
  ('company_name', '창호의민족'),
  ('phone', '1588-0000'),
  ('email', 'info@changho.co.kr'),
  ('address', '서울특별시 강남구 테헤란로 123'),
  ('kakao_channel', ''),
  ('instagram', ''),
  ('youtube', ''),
  ('business_hours', '평일 09:00 - 18:00')
ON CONFLICT (key) DO NOTHING;
