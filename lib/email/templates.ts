/**
 * Email Templates for PUXX Ireland
 * Professional HTML email templates with brand colors
 */

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}

/**
 * Contact form submission email template (sent to admin)
 */
export function generateContactEmail(data: ContactEmailData): string {
  const { firstName, lastName, email, phone, message, timestamp } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - PUXX Ireland</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #22c55e, #16a34a); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                PUXX Ireland
              </h1>
              <p style="margin: 10px 0 0; color: #f0fdf4; font-size: 16px;">
                New Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Introduction -->
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.5;">
                You've received a new contact form submission from your website.
              </p>

              <!-- Customer Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                    <h2 style="margin: 0 0 15px; color: #16a34a; font-size: 18px; font-weight: 600;">
                      Customer Details
                    </h2>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">
                          <strong>Name:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                          ${firstName} ${lastName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                          <strong>Email:</strong>
                        </td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${email}" style="color: #16a34a; text-decoration: none; font-size: 14px;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                      ${
                        phone
                          ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                          <strong>Phone:</strong>
                        </td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${phone.replace(/\s/g, '')}" style="color: #16a34a; text-decoration: none; font-size: 14px;">
                            ${phone}
                          </a>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                          <strong>Submitted:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                          ${timestamp}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 20px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px;">
                    <h2 style="margin: 0 0 15px; color: #16a34a; font-size: 18px; font-weight: 600;">
                      Message
                    </h2>
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 14px;">
                      Reply to this customer directly:
                    </p>
                    <a href="mailto:${email}?subject=Re: Your inquiry to PUXX Ireland"
                       style="display: inline-block; padding: 12px 30px; background-color: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                      Reply to ${firstName}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px; color: #6b7280; font-size: 12px;">
                PUXX Ireland - Premium Nicotine Pouches
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This email was generated automatically from your contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Auto-reply email template (sent to customer)
 */
export function generateAutoReplyEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting PUXX Ireland</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #22c55e, #16a34a); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                PUXX Ireland
              </h1>
              <p style="margin: 10px 0 0; color: #f0fdf4; font-size: 16px;">
                Premium Nicotine Pouches
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">

              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 600;">
                Thank You, ${firstName}!
              </h2>

              <p style="margin: 0 0 15px; color: #374151; font-size: 16px; line-height: 1.6;">
                We've received your message and appreciate you taking the time to reach out to us.
              </p>

              <p style="margin: 0 0 15px; color: #374151; font-size: 16px; line-height: 1.6;">
                Our team will review your inquiry and get back to you within <strong style="color: #16a34a;">24 hours</strong> during business days (Monday - Friday, 9:00 AM - 6:00 PM IST).
              </p>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="padding: 20px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px;">
                    <p style="margin: 0 0 10px; color: #16a34a; font-size: 14px; font-weight: 600;">
                      What happens next?
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.6;">
                      <li style="margin-bottom: 5px;">Our team will carefully review your message</li>
                      <li style="margin-bottom: 5px;">We'll respond to your inquiry via email</li>
                      <li>You'll receive personalized assistance from our experts</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 15px; color: #374151; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our range of premium nicotine pouches on our website.
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px; color: #111827; font-size: 16px; font-weight: 600;">
                      Need immediate assistance?
                    </p>
                    <p style="margin: 0 0 5px; color: #6b7280; font-size: 14px;">
                      Email: <a href="mailto:hello@puxxnicotine.ie" style="color: #16a34a; text-decoration: none;">hello@puxxnicotine.ie</a>
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                      Phone: <a href="tel:+35312345678" style="color: #16a34a; text-decoration: none;">+353 1 234 5678</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; font-weight: 600;">
                PUXX Ireland
              </p>
              <p style="margin: 0 0 5px; color: #9ca3af; font-size: 12px;">
                Premium Nicotine Pouches | Fast Delivery Across Ireland
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This is an automated confirmation email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
