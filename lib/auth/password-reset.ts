import { randomBytes } from 'crypto';
import { db } from '@/lib/db/drizzle';
import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { eq, and, gt } from 'drizzle-orm';

// Password reset tokens table schema
// Note: This table needs to be added to your schema.ts and migrated
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  usedAt: timestamp('used_at'),
});

/**
 * Generate a secure password reset token
 * @param userId - The user ID for whom to generate the token
 * @returns The generated token string
 */
export async function generatePasswordResetToken(userId: number): Promise<string> {
  // Generate a random token
  const token = randomBytes(32).toString('hex');

  // Token expires in 1 hour
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // Store token in database
  // Note: This requires the passwordResetTokens table to be created
  // await db.insert(passwordResetTokens).values({
  //   userId,
  //   token,
  //   expiresAt,
  // });

  return token;
}

/**
 * Verify a password reset token
 * @param token - The token to verify
 * @returns The user ID if valid, null otherwise
 */
export async function verifyPasswordResetToken(token: string): Promise<number | null> {
  // Find the token in the database
  // Note: This requires the passwordResetTokens table to be created
  // const result = await db
  //   .select()
  //   .from(passwordResetTokens)
  //   .where(
  //     and(
  //       eq(passwordResetTokens.token, token),
  //       gt(passwordResetTokens.expiresAt, new Date()),
  //       eq(passwordResetTokens.usedAt, null)
  //     )
  //   )
  //   .limit(1);

  // if (result.length === 0) {
  //   return null;
  // }

  // return result[0].userId;
  return null;
}

/**
 * Mark a password reset token as used
 * @param token - The token to mark as used
 */
export async function markTokenAsUsed(token: string): Promise<void> {
  // Mark token as used
  // Note: This requires the passwordResetTokens table to be created
  // await db
  //   .update(passwordResetTokens)
  //   .set({ usedAt: new Date() })
  //   .where(eq(passwordResetTokens.token, token));
}

/**
 * Delete expired password reset tokens
 * This should be run periodically as a cleanup task
 */
export async function cleanupExpiredTokens(): Promise<void> {
  // Delete expired tokens
  // Note: This requires the passwordResetTokens table to be created
  // await db
  //   .delete(passwordResetTokens)
  //   .where(lt(passwordResetTokens.expiresAt, new Date()));
}

/**
 * Send password reset email
 * @param email - The recipient email
 * @param token - The reset token
 */
export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  // TODO: Implement email sending
  // This would typically use a service like SendGrid, Resend, or Nodemailer
  // For now, just log the reset URL
  console.log(`Password reset email would be sent to ${email}`);
  console.log(`Reset URL: ${resetUrl}`);

  // Example with a hypothetical email service:
  // await sendEmail({
  //   to: email,
  //   subject: 'Reset your PUXX Ireland password',
  //   html: `
  //     <h1>Reset your password</h1>
  //     <p>You requested a password reset for your PUXX Ireland account.</p>
  //     <p>Click the link below to reset your password:</p>
  //     <a href="${resetUrl}">Reset Password</a>
  //     <p>This link will expire in 1 hour.</p>
  //     <p>If you didn't request this, please ignore this email.</p>
  //   `,
  // });
}
