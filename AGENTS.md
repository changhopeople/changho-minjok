# AGENTS.md

## Project
- Next.js App Router project for `changho-minjok`.
- Main source lives under `src/app`, shared components under `src/components`, DB helpers under `src/lib`.
- Supabase schema/setup files live in root SQL files and `supabase/migrations`.
- Package manager appears to be npm (`package-lock.json` is committed).

## Commands
- Install dependencies: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`

## Admin Auth Notes
- Admin login route: `src/app/admin/page.tsx`
- Login action: `src/app/admin/actions.ts`
- Auth helpers: `src/lib/auth.ts`
- Protected admin layout: `src/app/admin/(authenticated)/layout.tsx`
- Current auth implementation does not query Supabase for credentials. It checks:
  - `ADMIN_USERNAME`, default `admin`
  - `ADMIN_PASSWORD`, default `admin123`
- Successful login sets `admin_session` cookie to a base64 token derived from `ADMIN_PASSWORD`.
- If login appears broken after submit, also check whether `/admin/dashboard` fails during Supabase data loading after the redirect.

## Supabase Notes
- Client: `src/lib/supabase.ts`
- Required public env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Root setup files:
  - `supabase-setup.sql`
  - `supabase-inquiries.sql`
- Migrations include admin feature tables, funnel tables, Hyunkyung tables, advisors, and recent advisor staff updates.
- Code references a `columns` table and `increment_column_view_count` RPC in `src/lib/column-db.ts`, but no committed SQL file currently creates them. This is a likely DB drift candidate for admin/public column pages.

## Current Investigation Hints
- Recent commits include Supabase/admin-related changes:
  - `9117558 feat: 관리자페이지 어드바이저 관리 기능 추가 (Supabase DB 기반)`
  - `d526381 fix: update advisor staff info`
- Local build passes without Supabase env vars, but logs `Supabase not configured`.
- `npm run lint` currently fails on existing non-admin lint errors; see final investigation notes before treating lint as a regression.
- Some Korean text appears mojibake in several files when viewed from PowerShell, and `src/app/admin/page.tsx` should be syntax-checked carefully.
- Before changing auth behavior, confirm whether the failure is:
  - credential comparison failure in `verifyCredentials`
  - cookie/token mismatch after login
  - redirect succeeds but an authenticated admin page crashes because of Supabase schema/env issues

## Editing Guidelines
- Keep changes scoped; avoid broad formatting churn.
- Do not commit secrets. Use `.env.local` locally and keep `.env.example` generic.
- Prefer adding small diagnostics around admin auth/Supabase failures before changing the login model.
