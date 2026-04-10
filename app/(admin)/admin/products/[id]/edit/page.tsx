import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/products/ProductForm';

export const metadata = {
  title: 'Edit Product | PUXX Admin',
  description: 'Update product information',
};

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/products/${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // API returns snake_case Supabase columns plus a derived `category` field.
  // Transform to the camelCase shape ProductForm expects.
  const initialData = {
    name: product.name,
    sku: product.sku || '',
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price) : null,
    stockQuantity: product.stock_quantity,
    reorderPoint: product.reorder_point,
    nicotineStrength: product.nicotine_strength,
    flavor: product.flavor,
    flavorProfile: product.flavor_profile,
    pouchesPerCan: product.pouches_per_can,
    ingredients: product.ingredients,
    usageInstructions: product.usage_instructions,
    imageUrl: product.image_url,
    imageGallery: product.image_gallery || [],
    slug: product.slug,
    metaTitle: product.meta_title,
    metaDescription: product.meta_description,
    isFeatured: product.is_featured,
    isActive: product.is_active,
  };

  return (
    <div className="p-6">
      <ProductForm mode="edit" productId={id} initialData={initialData} />
    </div>
  );
}
