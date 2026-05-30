-- Remove Yang Rayoon advisor records from existing Supabase projects.
DELETE FROM advisors
WHERE name = '양라윤'
   OR phone = '01063739563'
   OR email = 'didalsdk12@naver.com';
