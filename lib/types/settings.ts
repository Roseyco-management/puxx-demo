/**
 * TypeScript types for Settings and Admin features
 * PUXX Ireland Admin Dashboard
 */

import { z } from "zod";

// ============================================================================
// General Settings Types
// ============================================================================

export const generalSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteLogo: z.string().optional(),
  favicon: z.string().optional(),
  contactEmail: z.string().email("Invalid email address"),
  supportEmail: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  minOrderQuantity: z.number().int().min(1, "Minimum is 1"),
  freeShippingThreshold: z.number().min(0, "Minimum is 0"),
});

export type GeneralSettings = z.infer<typeof generalSettingsSchema>;

// ============================================================================
// Payment Settings Types
// ============================================================================

export const paymentSettingsSchema = z.object({
  testMode: z.boolean(),
  stripeLivePublishableKey: z.string().optional(),
  stripeLiveSecretKey: z.string().optional(),
  stripeTestPublishableKey: z.string().optional(),
  stripeTestSecretKey: z.string().optional(),
  webhookSecret: z.string().optional(),
  acceptedCurrencies: z.array(z.string()).min(1, "At least one currency required"),
  paymentMethods: z.array(z.string()).min(1, "At least one payment method required"),
  worldpayMerchantCode: z.string().optional(),
  worldpayInstallationId: z.string().optional(),
  worldpayXmlPassword: z.string().optional(),
});

export type PaymentSettings = z.infer<typeof paymentSettingsSchema>;

// ============================================================================
// Shipping Settings Types
// ============================================================================

export const shippingMethodSchema = z.object({
  name: z.string().min(1, "Method name is required"),
  cost: z.number().min(0, "Cost must be 0 or greater"),
  freeThreshold: z.number().nullable().optional(),
  estimatedDays: z.string().min(1, "Estimated days is required"),
});

export const shippingZoneSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Zone name is required"),
  countries: z.array(z.string()).min(1, "At least one country required"),
  methods: z.array(shippingMethodSchema).min(1, "At least one method required"),
  isActive: z.boolean(),
});

export type ShippingMethod = z.infer<typeof shippingMethodSchema>;
export type ShippingZone = z.infer<typeof shippingZoneSchema>;

// ============================================================================
// Tax Settings Types
// ============================================================================

export const taxSettingsSchema = z.object({
  enabled: z.boolean(),
  name: z.string().min(1, "Tax name is required"),
  rate: z.number().min(0).max(100, "Rate must be between 0 and 100"),
  display: z.enum(["inclusive", "exclusive"]),
  vatNumber: z.string().optional(),
});

export type TaxSettings = z.infer<typeof taxSettingsSchema>;

// ============================================================================
// Email Template Types
// ============================================================================

export const emailTemplateSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  htmlContent: z.string().min(1, "HTML content is required"),
  textContent: z.string().optional(),
  variables: z.array(z.string()),
  isActive: z.boolean(),
});

export type EmailTemplate = z.infer<typeof emailTemplateSchema>;

// ============================================================================
// User & Role Types
// ============================================================================

export type Role = "admin" | "manager" | "support";

export interface AdminUser {
  id: number;
  email: string;
  name: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date | null;
}

export const adminUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "manager", "support"]),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
});

export type AdminUserInput = z.infer<typeof adminUserSchema>;

// ============================================================================
// Activity Log Types
// ============================================================================

export interface ActivityEntry {
  id: number;
  userId: number | null;
  userName: string;
  action: string;
  timestamp: Date;
  ipAddress?: string | null;
  details?: string;
}

// ============================================================================
// Settings Database Types
// ============================================================================

export interface SettingRecord {
  id: number;
  key: string;
  value: any; // JSONB
  description: string | null;
  updatedAt: Date;
  updatedBy: number | null;
}

// ============================================================================
// Account Settings Types
// ============================================================================

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type PasswordChange = z.infer<typeof passwordChangeSchema>;

export const twoFactorSchema = z.object({
  enabled: z.boolean(),
  method: z.enum(["app", "sms"]).optional(),
  phoneNumber: z.string().optional(),
});

export type TwoFactorSettings = z.infer<typeof twoFactorSchema>;
