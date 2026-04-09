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

    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .order("slug", { ascending: true });

    if (error) {
      console.error("Error fetching email templates:", error);
      return NextResponse.json({ error: "Failed to fetch email templates" }, { status: 500 });
    }

    // Convert snake_case to camelCase
    const templates = data.map((template) => ({
      id: template.id,
      slug: template.slug,
      name: template.name,
      subject: template.subject,
      htmlContent: template.html_content,
      textContent: template.text_content,
      variables: template.variables,
      isActive: template.is_active,
    }));

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error in GET /api/admin/settings/email-templates:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
