import { z } from 'zod';

// Product categories
export const productCategories = ['mint', 'fruit', 'specialty'] as const;

// Nicotine strengths
export const nicotineStrengths = ['3mg', '6mg', '9mg', '12mg', '16mg', '20mg', '30mg'] as const;

// Flavor profiles
export const flavorProfiles = [
  'Sweet',
  'Minty',
  'Fresh',
  'Fruity',
  'Bold',
  'Citrus',
  'Berry',
  'Tropical',
  'Cool',
  'Smooth'
] as const;

// Product form validation schema
export const productSchema = z.object({
  // Basic Info
  name: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(200, 'Product name must not exceed 200 characters'),

  sku: z.string()
    .min(3, 'SKU must be at least 3 characters')
    .max(50, 'SKU must not exceed 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must not exceed 5000 characters'),

  category: z.enum(productCategories, {
    errorMap: () => ({ message: 'Please select a valid category' })
  }),

  // Pricing & Inventory
  price: z.number()
    .min(0.01, 'Price must be greater than 0')
    .max(9999.99, 'Price must not exceed €9,999.99'),

  compareAtPrice: z.number()
    .min(0, 'Compare at price must be 0 or greater')
    .max(9999.99, 'Compare at price must not exceed €9,999.99')
    .optional()
    .nullable(),

  stockQuantity: z.number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(99999, 'Stock must not exceed 99,999'),

  reorderPoint: z.number()
    .int('Reorder point must be a whole number')
    .min(0, 'Reorder point cannot be negative')
    .max(9999, 'Reorder point must not exceed 9,999')
    .optional()
    .nullable(),

  // Product Attributes
  nicotineStrength: z.enum(nicotineStrengths, {
    errorMap: () => ({ message: 'Please select a valid nicotine strength' })
  }).optional().nullable(),

  flavor: z.string()
    .min(2, 'Flavor must be at least 2 characters')
    .max(100, 'Flavor must not exceed 100 characters')
    .optional()
    .nullable(),

  flavorProfile: z.array(z.enum(flavorProfiles))
    .min(1, 'Select at least one flavor profile')
    .optional()
    .nullable(),

  pouchesPerCan: z.number()
    .int('Pouches per can must be a whole number')
    .min(1, 'Must have at least 1 pouch per can')
    .max(100, 'Pouches per can must not exceed 100')
    .optional()
    .nullable(),

  ingredients: z.string()
    .max(1000, 'Ingredients must not exceed 1000 characters')
    .optional()
    .nullable(),

  usageInstructions: z.string()
    .max(1000, 'Usage instructions must not exceed 1000 characters')
    .optional()
    .nullable(),

  // Images
  imageUrl: z.string()
    .url('Main image must be a valid URL')
    .optional()
    .nullable(),

  imageGallery: z.array(z.string().url('Gallery images must be valid URLs'))
    .max(4, 'Maximum 4 gallery images allowed')
    .optional()
    .nullable(),

  // SEO
  slug: z.string()
    .min(3, 'URL slug must be at least 3 characters')
    .max(200, 'URL slug must not exceed 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  metaTitle: z.string()
    .max(60, 'Meta title must not exceed 60 characters')
    .optional()
    .nullable(),

  metaDescription: z.string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional()
    .nullable(),

  // Settings
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

// Type inference from schema
export type ProductFormData = z.infer<typeof productSchema>;

// Helper function to generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to generate SKU
export function generateSKU(name: string, strength?: string): string {
  const namePart = name
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .split(' ')
    .map(word => word.slice(0, 3))
    .join('')
    .slice(0, 6);

  const strengthPart = strength ? strength.replace('mg', '') : '';
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${namePart}${strengthPart ? `-${strengthPart}` : ''}-${randomPart}`;
}

// Helper function to generate meta title from product name
export function generateMetaTitle(name: string, strength?: string): string {
  const strengthText = strength ? ` ${strength}` : '';
  return `${name}${strengthText} | PUXX Nicotine Pouches Ireland`;
}

// Helper function to generate meta description
export function generateMetaDescription(name: string, description: string): string {
  const descPreview = description.slice(0, 120).trim();
  return `Buy ${name} nicotine pouches online. ${descPreview}... Free delivery on orders over €30.`;
}
