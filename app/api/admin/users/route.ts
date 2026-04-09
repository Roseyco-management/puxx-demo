import { NextResponse } from "next/server";
import { getSession } from '@/lib/auth/session';
import { getSupabaseClient } from '@/lib/db/supabase';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, created_at, updated_at")
      .in("role", ["admin", "manager", "support"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const users = (data || []).map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role as "admin" | "manager" | "support",
      createdAt: u.created_at,
      updatedAt: u.updated_at,
      lastLogin: null,
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error in GET /api/admin/users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Implement user creation
    return NextResponse.json(
      { error: "User creation not yet implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error in POST /api/admin/users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
