import { NextRequest, NextResponse } from 'next/server';
import { createHKInquiry } from '@/lib/hyunkyung-inquiry-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { company_name, contact_name, phone, message } = body;

    if (!company_name || !contact_name || !phone || !message) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해 주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await createHKInquiry({
      company_name,
      contact_name,
      phone,
      email: body.email || undefined,
      project_type: body.project_type || undefined,
      project_location: body.project_location || undefined,
      message,
    });

    if (error) {
      return NextResponse.json(
        { error: '문의 접수에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
