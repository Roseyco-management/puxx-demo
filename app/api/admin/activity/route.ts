import { NextResponse } from "next/server";
import { getSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // activity_logs table doesn't exist in demo DB — return empty array
    return NextResponse.json([]);
  } catch (error) {
    console.error("Error in GET /api/admin/activity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/admin/activity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
