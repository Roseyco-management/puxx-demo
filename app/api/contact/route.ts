import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { generateContactEmail, generateAutoReplyEmail } from '@/lib/email/templates';

// Lazy initialize Resend only when needed
let resend: Resend | null = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Contact form schema validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((val) => val === true, 'Consent is required'),
});

// Rate limiting: Simple in-memory store (consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 submissions per 15 minutes

/**
 * Simple rate limiting function
 */
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // First request or reset time passed
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return { allowed: false, resetTime: userLimit.resetTime };
  }

  // Increment count
  userLimit.count += 1;
  return { allowed: true };
}

/**
 * POST /api/contact
 * Handles contact form submissions and sends emails
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      const resetTime = rateLimitCheck.resetTime || Date.now();
      const minutesRemaining = Math.ceil((resetTime - Date.now()) / 60000);

      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, message } = validationResult.data;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact support.',
        },
        { status: 500 }
      );
    }

    // Generate timestamp
    const timestamp = new Date().toLocaleString('en-IE', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Europe/Dublin',
    });

    // Prepare email data
    const emailData = {
      firstName,
      lastName,
      email,
      phone,
      message,
      timestamp,
    };

    // Admin email address (fallback to environment variable or default)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@puxx.ie';

    // Get Resend client
    const resendClient = getResend();
    if (!resendClient) {
      console.error('Failed to initialize Resend client');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact support.',
        },
        { status: 500 }
      );
    }

    // Send email to admin
    const adminEmailResult = await resendClient.emails.send({
      from: 'PUXX Ireland Contact Form <noreply@puxx.ie>',
      to: [adminEmail],
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: generateContactEmail(emailData),
    });

    if (adminEmailResult.error) {
      console.error('Failed to send admin email:', adminEmailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Send auto-reply to customer (optional, but recommended)
    try {
      await resendClient.emails.send({
        from: 'PUXX Ireland <hello@puxx.ie>',
        to: [email],
        subject: 'Thank you for contacting PUXX Ireland',
        html: generateAutoReplyEmail(firstName),
      });
    } catch (autoReplyError) {
      // Log error but don't fail the request
      console.error('Failed to send auto-reply email:', autoReplyError);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We\'ll get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
