import { z } from 'zod';

// Customer Info Schema
export const customerInfoSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  ageVerified: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must be 18 or older to purchase nicotine products',
    }),
  createAccount: z.boolean(),
  password: z.string().optional(),
}).refine(
  (data) => {
    // If createAccount is true, password must be provided and at least 8 characters
    if (data.createAccount) {
      return data.password && data.password.length >= 8;
    }
    return true;
  },
  {
    message: 'Password must be at least 8 characters',
    path: ['password'],
  }
);

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

// Shipping Address Schema
export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  addressLine1: z
    .string()
    .min(1, 'Address is required')
    .min(3, 'Address must be at least 3 characters'),
  addressLine2: z.string().optional(),
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters'),
  county: z.string().optional(),
  eircode: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        // Irish Eircode format: A65 F4E2 (optional space)
        return /^[A-Z0-9]{3}\s?[A-Z0-9]{4}$/i.test(val);
      },
      {
        message: 'Invalid Eircode format (e.g., D02 XY45)',
      }
    ),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^(\+353|0)?[1-9]\d{8}$/,
      'Invalid Irish phone number (e.g., +353 87 123 4567)'
    ),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;

// Coupon Code Schema
export const couponCodeSchema = z.object({
  code: z
    .string()
    .min(1, 'Coupon code is required')
    .regex(/^[A-Z0-9]+$/, 'Invalid coupon code format'),
});

export type CouponCodeFormData = z.infer<typeof couponCodeSchema>;
