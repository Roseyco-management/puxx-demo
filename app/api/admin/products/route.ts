import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { productSchema } from '@/lib/validations/product';

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data: allProducts, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: allProducts.length,
      total: allProducts.length,
      products: allProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products
 * Creates a new product
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();
  try {
    const body = await request.json();

    // Validate input
    const result = productSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if SKU already exists
    if (data.sku) {
      const { data: existingSKU } = await supabase
        .from('products')
        .select('id')
        .eq('sku', data.sku)
        .limit(1)
        .single();

      if (existingSKU) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 409 }
        );
      }
    }

    // Check if slug already exists
    const { data: existingSlug } = await supabase
      .from('products')
      .select('id')
      .eq('slug', data.slug)
      .limit(1)
      .single();

    if (existingSlug) {
      return NextResponse.json(
        { error: 'A product with this URL slug already exists' },
        { status: 409 }
      );
    }

    // Create product
    const { data: newProduct, error: productError } = await supabase
      .from('products')
      .insert({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price.toString(),
        compare_at_price: data.compareAtPrice ? data.compareAtPrice.toString() : null,
        sku: data.sku,
        nicotine_strength: data.nicotineStrength,
        flavor: data.flavor,
        flavor_profile: data.flavorProfile,
        pouches_per_can: data.pouchesPerCan,
        reorder_point: data.reorderPoint,
        ingredients: data.ingredients,
        usage_instructions: data.usageInstructions,
        image_url: data.imageUrl,
        image_gallery: data.imageGallery,
        stock_quantity: data.stockQuantity,
        is_active: data.isActive,
        is_featured: data.isFeatured,
        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
      })
      .select()
      .single();

    if (productError || !newProduct) {
      console.error('Error creating product:', productError);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    // Add to category
    if (data.category) {
      const { data: categoryRecord } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', data.category)
        .limit(1)
        .single();

      if (categoryRecord) {
        await supabase.from('product_categories').insert({
          product_id: newProduct.id,
          category_id: categoryRecord.id,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
