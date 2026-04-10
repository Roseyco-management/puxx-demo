import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/auth/admin';

// Demo stub — CSV export deferred to v1
export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'CSV export available in v1' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error in GET /api/admin/orders/export:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
