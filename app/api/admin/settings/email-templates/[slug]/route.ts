import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { emailTemplateSchema } from "@/lib/types/settings";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = emailTemplateSchema.parse(body);

    const { data, error } = await supabase
      .from("email_templates")
      .update({
        name: validatedData.name,
        subject: validatedData.subject,
        html_content: validatedData.htmlContent,
        text_content: validatedData.textContent,
        is_active: validatedData.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      console.error("Error updating email template:", error);
      return NextResponse.json({ error: "Failed to update email template" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PUT /api/admin/settings/email-templates/[slug]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
