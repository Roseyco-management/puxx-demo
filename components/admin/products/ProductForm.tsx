"use client";

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from './ImageUpload';
import { ImageGallery } from './ImageGallery';
import {
  productSchema,
  type ProductFormData,
  productCategories,
  nicotineStrengths,
  flavorProfiles,
  generateSlug,
  generateSKU,
  generateMetaTitle,
  generateMetaDescription,
} from '@/lib/validations/product';

interface ProductFormProps {
  mode: 'create' | 'edit';
  productId?: string;
  initialData?: Partial<ProductFormData>;
}

export function ProductForm({ mode, productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!initialData?.slug);
  const [autoGenerateSKU, setAutoGenerateSKU] = useState(!initialData?.sku);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      category: 'mint',
      price: 0,
      compareAtPrice: null,
      stockQuantity: 0,
      reorderPoint: 10,
      nicotineStrength: null,
      flavor: '',
      flavorProfile: null,
      pouchesPerCan: 20,
      ingredients: '',
      usageInstructions: '',
      imageUrl: '',
      imageGallery: [],
      slug: '',
      metaTitle: '',
      metaDescription: '',
      isFeatured: false,
      isActive: true,
      ...initialData,
    },
  });

  const watchName = watch('name');
  const watchDescription = watch('description');
  const watchNicotineStrength = watch('nicotineStrength');

  // Auto-generate slug from name
  useEffect(() => {
    if (autoGenerateSlug && watchName) {
      setValue('slug', generateSlug(watchName));
    }
  }, [watchName, autoGenerateSlug, setValue]);

  // Auto-generate SKU from name and strength
  useEffect(() => {
    if (autoGenerateSKU && watchName) {
      setValue('sku', generateSKU(watchName, watchNicotineStrength || undefined));
    }
  }, [watchName, watchNicotineStrength, autoGenerateSKU, setValue]);

  // Auto-generate meta title
  useEffect(() => {
    if (watchName) {
      setValue('metaTitle', generateMetaTitle(watchName, watchNicotineStrength || undefined));
    }
  }, [watchName, watchNicotineStrength, setValue]);

  // Auto-generate meta description
  useEffect(() => {
    if (watchName && watchDescription) {
      setValue('metaDescription', generateMetaDescription(watchName, watchDescription));
    }
  }, [watchName, watchDescription, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    setSubmitting(true);

    try {
      const url = mode === 'create'
        ? '/api/admin/products'
        : `/api/admin/products/${productId}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save product');
      }

      toast.success(
        mode === 'create' ? 'Product created successfully' : 'Product updated successfully'
      );

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'create' ? 'Create Product' : 'Edit Product'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {mode === 'create'
                ? 'Add a new product to your catalog'
                : 'Update product information'}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              {mode === 'create' ? 'Create Product' : 'Update Product'}
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="e.g., Velo Ice Cool"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* SKU */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setAutoGenerateSKU(!autoGenerateSKU)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    {autoGenerateSKU ? 'Manual' : 'Auto-generate'}
                  </button>
                </div>
                <input
                  type="text"
                  {...register('sku')}
                  disabled={autoGenerateSKU}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                  placeholder="e.g., VELO-16-ABC1"
                />
                {errors.sku && (
                  <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Describe the product, its benefits, and unique features..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white capitalize"
                >
                  {productCategories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price (EUR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Compare At Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Compare At Price (EUR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('compareAtPrice', {
                    setValueAs: v => v === '' || v === null ? null : parseFloat(v)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="0.00"
                />
                {errors.compareAtPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.compareAtPrice.message}</p>
                )}
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('stockQuantity', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="0"
                />
                {errors.stockQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
                )}
              </div>

              {/* Reorder Point */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reorder Point
                </label>
                <input
                  type="number"
                  {...register('reorderPoint', {
                    setValueAs: v => v === '' || v === null ? null : parseInt(v)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="10"
                />
                {errors.reorderPoint && (
                  <p className="text-red-500 text-sm mt-1">{errors.reorderPoint.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Attributes */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Attributes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nicotine Strength */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nicotine Strength
                </label>
                <select
                  {...register('nicotineStrength')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select strength</option>
                  {nicotineStrengths.map(strength => (
                    <option key={strength} value={strength}>
                      {strength}
                    </option>
                  ))}
                </select>
                {errors.nicotineStrength && (
                  <p className="text-red-500 text-sm mt-1">{errors.nicotineStrength.message}</p>
                )}
              </div>

              {/* Flavor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Flavor
                </label>
                <input
                  type="text"
                  {...register('flavor')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="e.g., Mint, Berry Blast"
                />
                {errors.flavor && (
                  <p className="text-red-500 text-sm mt-1">{errors.flavor.message}</p>
                )}
              </div>

              {/* Pouches Per Can */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pouches Per Can
                </label>
                <input
                  type="number"
                  {...register('pouchesPerCan', {
                    setValueAs: v => v === '' || v === null ? null : parseInt(v)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="20"
                />
                {errors.pouchesPerCan && (
                  <p className="text-red-500 text-sm mt-1">{errors.pouchesPerCan.message}</p>
                )}
              </div>
            </div>

            {/* Flavor Profile - Multi-select */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Flavor Profile
              </label>
              <Controller
                name="flavorProfile"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {flavorProfiles.map(profile => (
                      <label
                        key={profile}
                        className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <input
                          type="checkbox"
                          checked={field.value?.includes(profile) || false}
                          onChange={e => {
                            const currentValue = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...currentValue, profile]);
                            } else {
                              field.onChange(currentValue.filter(v => v !== profile));
                            }
                          }}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {profile}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.flavorProfile && (
                <p className="text-red-500 text-sm mt-1">{errors.flavorProfile.message}</p>
              )}
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ingredients
              </label>
              <textarea
                {...register('ingredients')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="List product ingredients..."
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Usage Instructions
              </label>
              <textarea
                {...register('usageInstructions')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="How to use this product..."
              />
              {errors.usageInstructions && (
                <p className="text-red-500 text-sm mt-1">{errors.usageInstructions.message}</p>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              SEO Settings
            </h2>

            <div className="space-y-4">
              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setAutoGenerateSlug(!autoGenerateSlug)}
                    className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    {autoGenerateSlug ? 'Manual' : 'Auto-generate'}
                  </button>
                </div>
                <input
                  type="text"
                  {...register('slug')}
                  disabled={autoGenerateSlug}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                  placeholder="product-name-slug"
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Title
                  <span className="text-gray-500 text-xs ml-2">
                    ({watch('metaTitle')?.length || 0}/60)
                  </span>
                </label>
                <input
                  type="text"
                  {...register('metaTitle')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Auto-generated from product name"
                />
                {errors.metaTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
                )}
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description
                  <span className="text-gray-500 text-xs ml-2">
                    ({watch('metaDescription')?.length || 0}/160)
                  </span>
                </label>
                <textarea
                  {...register('metaDescription')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Auto-generated from product details"
                />
                {errors.metaDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Images */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Images
            </h2>

            {/* Main Image */}
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ''}
                  onChange={field.onChange}
                  label="Main Image"
                  required
                />
              )}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
            )}

            {/* Gallery Images */}
            <div className="mt-6">
              <Controller
                name="imageGallery"
                control={control}
                render={({ field }) => (
                  <ImageGallery
                    value={field.value || []}
                    onChange={field.onChange}
                    maxImages={4}
                    label="Gallery Images"
                  />
                )}
              />
              {errors.imageGallery && (
                <p className="text-red-500 text-sm mt-1">{errors.imageGallery.message}</p>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h2>

            <div className="space-y-4">
              {/* Featured Product */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured Product
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Show on homepage and featured sections
                  </p>
                </div>
              </label>

              {/* Active */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Make product visible in store
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
