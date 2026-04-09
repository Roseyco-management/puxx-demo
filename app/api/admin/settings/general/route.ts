import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generalSettingsSchema } from "@/lib/types/settings";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch general settings
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "general")
      .single();

    if (error) {
      console.error("Error fetching settings:", error);
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }

    return NextResponse.json(data.value);
  } catch (error) {
    console.error("Error in GET /api/admin/settings/general:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validatedData = generalSettingsSchema.parse(body);

    // Update settings
    const { error } = await supabase
      .from("settings")
      .update({
        value: validatedData,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("key", "general");

    if (error) {
      console.error("Error updating settings:", error);
      return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PUT /api/admin/settings/general:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
