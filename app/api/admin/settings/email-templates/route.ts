import { NextResponse } from "next/server";
import { getAdminUser } from '@/lib/auth/admin';

const DEMO_TEMPLATES = [
  {
    id: "1",
    slug: "order-confirmation",
    name: "Order Confirmation",
    subject: "Your PUXX Order #{orderNumber}",
    htmlContent: "<h1>Order Confirmed</h1><p>Hi {customerName}, your order #{orderNumber} has been confirmed.</p>",
    textContent: "Order confirmed. Hi {customerName}, your order #{orderNumber} has been confirmed.",
    variables: ["orderNumber", "customerName"],
    isActive: true,
  },
  {
    id: "2",
    slug: "order-shipped",
    name: "Order Shipped",
    subject: "Your PUXX Order #{orderNumber} Has Shipped",
    htmlContent: "<h1>Order Shipped</h1><p>Hi {customerName}, your order #{orderNumber} is on its way.</p>",
    textContent: "Your order #{orderNumber} has shipped.",
    variables: ["orderNumber", "customerName", "trackingNumber"],
    isActive: true,
  },
  {
    id: "3",
    slug: "welcome",
    name: "Welcome Email",
    subject: "Welcome to PUXX Pouches",
    htmlContent: "<h1>Welcome to PUXX</h1><p>Hi {customerName}, thanks for joining us.</p>",
    textContent: "Welcome to PUXX. Hi {customerName}, thanks for joining us.",
    variables: ["customerName"],
    isActive: true,
  },
  {
    id: "4",
    slug: "password-reset",
    name: "Password Reset",
    subject: "Reset Your PUXX Password",
    htmlContent: "<h1>Password Reset</h1><p>Click {resetLink} to reset your password.</p>",
    textContent: "Reset your password: {resetLink}",
    variables: ["resetLink", "customerName"],
    isActive: true,
  },
];

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(DEMO_TEMPLATES);
  } catch (error) {
    console.error("Error in GET /api/admin/settings/email-templates:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
