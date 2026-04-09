import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { paymentSettingsSchema } from "@/lib/types/settings";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "payments")
      .single();

    if (error) {
      console.error("Error fetching settings:", error);
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }

    return NextResponse.json(data.value);
  } catch (error) {
    console.error("Error in GET /api/admin/settings/payments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = paymentSettingsSchema.parse(body);

    const { error } = await supabase
      .from("settings")
      .update({
        value: validatedData,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("key", "payments");

    if (error) {
      console.error("Error updating settings:", error);
      return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PUT /api/admin/settings/payments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
