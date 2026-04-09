import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { shippingZoneSchema } from "@/lib/types/settings";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = shippingZoneSchema.parse(body);

    const { data, error } = await supabase
      .from("shipping_zones")
      .update({
        name: validatedData.name,
        countries: validatedData.countries,
        methods: validatedData.methods,
        is_active: validatedData.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating shipping zone:", error);
      return NextResponse.json({ error: "Failed to update shipping zone" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PUT /api/admin/settings/shipping/[id]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("shipping_zones").delete().eq("id", id);

    if (error) {
      console.error("Error deleting shipping zone:", error);
      return NextResponse.json({ error: "Failed to delete shipping zone" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/admin/settings/shipping/[id]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
