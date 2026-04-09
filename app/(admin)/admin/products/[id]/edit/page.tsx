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

  // Transform database product to form data format
  const initialData = {
    name: product.name,
    sku: product.sku || '',
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
    compareAtPrice: product.compareAtPrice ? parseFloat(product.compareAtPrice) : null,
    stockQuantity: product.stockQuantity,
    reorderPoint: product.reorderPoint,
    nicotineStrength: product.nicotineStrength,
    flavor: product.flavor,
    flavorProfile: product.flavorProfile,
    pouchesPerCan: product.pouchesPerCan,
    ingredients: product.ingredients,
    usageInstructions: product.usageInstructions,
    imageUrl: product.imageUrl,
    imageGallery: product.imageGallery || [],
    slug: product.slug,
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    isFeatured: product.isFeatured,
    isActive: product.isActive,
  };

  return (
    <div className="p-6">
      <ProductForm mode="edit" productId={id} initialData={initialData} />
    </div>
  );
}
