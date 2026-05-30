UPDATE advisors
SET
  phone = '01092305136',
  position = '대리',
  updated_at = now()
WHERE name = '손민영';

INSERT INTO advisors (name, phone, email, position, is_active, display_order)
SELECT '손민영', '01092305136', '', '대리', true, 4
WHERE NOT EXISTS (
  SELECT 1 FROM advisors WHERE name = '손민영'
);
