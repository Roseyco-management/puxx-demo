import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit, Package } from 'lucide-react';
import { getSupabaseClient } from '@/lib/db/supabase';

export const metadata = {
  title: 'Product Details | PUXX Admin',
  description: 'View product details',
};

export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  const productId = parseInt(id);
  if (isNaN(productId)) return null;

  const supabase = getSupabaseClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .limit(1)
    .single();

  if (error || !product) return null;

  const { data: productCategoryRel } = await supabase
    .from('product_categories')
    .select('categories (slug, name)')
    .eq('product_id', productId)
    .limit(1)
    .single();

  const categoryData = Array.isArray(productCategoryRel?.categories)
    ? productCategoryRel.categories[0]
    : productCategoryRel?.categories;

  return {
    ...product,
    categorySlug: categoryData?.slug || null,
    categoryName: categoryData?.name || null,
  };
}

function formatCurrency(value: string | number | null | undefined) {
  if (value == null) return '—';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(num)) return '—';
  return `€${num.toFixed(2)}`;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku || '—'}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          <Edit size={16} />
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Image
            </h2>
            <div className="w-full aspect-square max-w-md bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={512}
                  height={512}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <Package size={64} />
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {product.description || 'No description provided.'}
            </p>
          </div>

          {product.ingredients && (
            <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ingredients
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {product.ingredients}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                <dd>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.is_active
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                <dd className="text-gray-900 dark:text-white capitalize">
                  {product.categoryName || product.categorySlug || '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Flavor</dt>
                <dd className="text-gray-900 dark:text-white capitalize">
                  {product.flavor || '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Strength</dt>
                <dd className="text-gray-900 dark:text-white">
                  {product.nicotine_strength || '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Pouches per can</dt>
                <dd className="text-gray-900 dark:text-white">
                  {product.pouches_per_can ?? '—'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pricing
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Price</dt>
                <dd className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(product.price)}
                </dd>
              </div>
              {product.compare_at_price && (
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Compare at</dt>
                  <dd className="text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(product.compare_at_price)}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inventory
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Stock</dt>
                <dd
                  className={`font-medium ${
                    (product.stock_quantity ?? 0) === 0
                      ? 'text-red-600 dark:text-red-400'
                      : (product.stock_quantity ?? 0) <= 10
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {product.stock_quantity ?? 0}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Reorder point</dt>
                <dd className="text-gray-900 dark:text-white">
                  {product.reorder_point ?? '—'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
