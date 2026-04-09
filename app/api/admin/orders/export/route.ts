import { NextResponse } from 'next/server';

// Demo stub — CSV export deferred to v1
export async function GET() {
  return NextResponse.json(
    { error: 'CSV export available in v1' },
    { status: 501 }
  );
}
