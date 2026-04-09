import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/products/[slug]
 * Fetches a single product by slug with category information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug is required',
        },
        { status: 400 }
      );
    }

    // Fetch product with categories
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(
          categories(*)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (productError || !productData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Extract categories from the nested structure
    const categories = productData.product_categories?.map((pc: any) => pc.categories).filter(Boolean) || [];

    // Transform snake_case to camelCase for frontend
    const transformedProduct = {
      id: productData.id,
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      compareAtPrice: productData.compare_at_price,
      sku: productData.sku,
      nicotineStrength: productData.nicotine_strength,
      flavor: productData.flavor,
      pouchesPerCan: productData.pouches_per_can,
      ingredients: productData.ingredients,
      usageInstructions: productData.usage_instructions,
      imageUrl: productData.image_url,
      imageGallery: productData.image_gallery,
      stockQuantity: productData.stock_quantity,
      isActive: productData.is_active,
      isFeatured: productData.is_featured,
      metaTitle: productData.meta_title,
      metaDescription: productData.meta_description,
      createdAt: productData.created_at,
      updatedAt: productData.updated_at,
      categories,
    };

    return NextResponse.json({
      success: true,
      product: transformedProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
