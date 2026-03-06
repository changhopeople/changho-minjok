import { NextRequest, NextResponse } from 'next/server';

// 현경시스템 도메인 목록 (Vercel에서 추가한 도메인)
const HK_DOMAINS = [
  'hyunkyung.vercel.app',
  'hyunkyungsystem.com',
  'hyunkyungsystem.co.kr',
  'www.hyunkyungsystem.com',
  'www.hyunkyungsystem.co.kr',
];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // 현경시스템 도메인으로 접속한 경우
  const isHKDomain = HK_DOMAINS.some(
    (domain) => hostname === domain || hostname.startsWith(domain.split('.')[0])
  );

  if (isHKDomain) {
    // 이미 /hyunkyung 경로면 그대로 통과
    if (pathname.startsWith('/hyunkyung')) {
      return NextResponse.next();
    }

    // 정적 파일, API, _next 등은 리라이트하지 않음
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/favicon') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // / → /hyunkyung, /about → /hyunkyung/about 등으로 리라이트
    const url = request.nextUrl.clone();
    url.pathname = `/hyunkyung${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // 창호의민족 도메인: /hyunkyung 경로 접근 차단 (선택사항 - 주석 해제하여 활성화)
  // if (pathname.startsWith('/hyunkyung')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일과 _next를 제외한 모든 경로
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
