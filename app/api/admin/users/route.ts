import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all users with admin roles
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, created_at, updated_at")
      .in("role", ["admin", "manager", "support"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    // Convert to camelCase
    const users = data.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role as "admin" | "manager" | "support",
      createdAt: u.created_at,
      updatedAt: u.updated_at,
      lastLogin: null, // TODO: Implement last login tracking
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in GET /api/admin/users:", error);
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

    // Check if user is admin
    const { data: currentUser } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (currentUser?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    // TODO: Implement user creation via Supabase admin API
    return NextResponse.json(
      { error: "User creation not yet implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error in POST /api/admin/users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
