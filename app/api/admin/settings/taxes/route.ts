import { NextResponse } from "next/server";
import { getAdminUser } from '@/lib/auth/admin';

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      taxEnabled: true,
      taxRate: 20,
      taxLabel: "VAT",
      pricesIncludeTax: true,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/settings/taxes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PUT /api/admin/settings/taxes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
