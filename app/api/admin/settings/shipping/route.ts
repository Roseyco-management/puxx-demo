import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { shippingZoneSchema } from "@/lib/types/settings";

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
      .from("shipping_zones")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching shipping zones:", error);
      return NextResponse.json({ error: "Failed to fetch shipping zones" }, { status: 500 });
    }

    // Convert snake_case to camelCase
    const zones = data.map((zone) => ({
      id: zone.id,
      name: zone.name,
      countries: zone.countries,
      methods: zone.methods,
      isActive: zone.is_active,
    }));

    return NextResponse.json(zones);
  } catch (error) {
    console.error("Error in GET /api/admin/settings/shipping:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
      .insert({
        name: validatedData.name,
        countries: validatedData.countries,
        methods: validatedData.methods,
        is_active: validatedData.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating shipping zone:", error);
      return NextResponse.json({ error: "Failed to create shipping zone" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST /api/admin/settings/shipping:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
