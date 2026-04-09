import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    // Fetch activity logs with user information
    const { data, error } = await supabase
      .from("activity_logs")
      .select(
        `
        id,
        action,
        timestamp,
        ip_address,
        user_id,
        users:user_id (
          name,
          email
        )
      `
      )
      .order("timestamp", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching activity logs:", error);
      return NextResponse.json({ error: "Failed to fetch activity logs" }, { status: 500 });
    }

    // Transform data to match ActivityEntry interface
    const entries = data.map((log: any) => ({
      id: log.id,
      userId: log.user_id,
      userName: log.users?.name || log.users?.email || "Unknown User",
      action: log.action,
      timestamp: log.timestamp,
      ipAddress: log.ip_address,
      details: "", // Extract from action if needed
    }));

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error in GET /api/admin/activity:", error);
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
    const { action, details } = body;

    // Get user's team_id (assuming first team for now)
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id)
      .single();

    if (!teamMember) {
      return NextResponse.json({ error: "No team found" }, { status: 400 });
    }

    // Create activity log entry
    const { error } = await supabase.from("activity_logs").insert({
      team_id: teamMember.team_id,
      user_id: user.id,
      action: details ? `${action}: ${details}` : action,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
    });

    if (error) {
      console.error("Error creating activity log:", error);
      return NextResponse.json({ error: "Failed to create activity log" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/admin/activity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
