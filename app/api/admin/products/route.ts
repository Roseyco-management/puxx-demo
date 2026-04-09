import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { productSchema } from '@/lib/validations/product';

/**
 * GET /api/admin/products
 * Fetches all products (including inactive) with optional filtering for admin
 *
 * Query parameters:
 * - search: string - Search by name or SKU
 * - category: string - Filter by category
 * - status: string - Filter by active status (active, inactive, all)
 * - featured: boolean - Filter by featured status
 * - sort: string - Sort by field (name, price, stock, created)
 * - order: string - Sort order (asc, desc)
 * - page: number - Page number
 * - limit: number - Items per page
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const search = searchParams.get('search');
    const categorySlug = searchParams.get('category');
    const status = searchParams.get('status') || 'all';
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sort') || 'created';
    const sortOrder = (searchParams.get('order') || 'desc') as 'asc' | 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Calculate offset
    const offset = (page - 1) * limit;

    // Start building query
    let query = supabase.from('products').select('*', { count: 'exact' });

    // Status filter
    if (status === 'active') {
      query = query.eq('is_active', true);
    } else if (status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // Featured filter
    if (featured) {
      query = query.eq('is_featured', true);
    }

    // Search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    // Category filter
    if (categorySlug) {
      // For category filtering, we need to join through product_categories
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (categoryData) {
        const { data: productIds } = await supabase
          .from('product_categories')
          .select('product_id')
          .eq('category_id', categoryData.id);

        if (productIds && productIds.length > 0) {
          const ids = productIds.map((p: any) => p.product_id);
          query = query.in('id', ids);
        } else {
          // No products in this category
          return NextResponse.json({
            success: true,
            count: 0,
            total: 0,
            page,
            limit,
            totalPages: 0,
            products: [],
          });
        }
      }
    }

    // Determine sorting column
    let sortColumn: string;
    switch (sortBy) {
      case 'price':
        sortColumn = 'price';
        break;
      case 'stock':
        sortColumn = 'stock_quantity';
        break;
      case 'name':
        sortColumn = 'name';
        break;
      case 'created':
      default:
        sortColumn = 'created_at';
        break;
    }

    // Apply sorting and pagination
    query = query
      .order(sortColumn, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    // Execute query
    const { data: allProducts, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch products',
        },
        { status: 500 }
      );
    }

    const totalCount = count || 0;

    return NextResponse.json({
      success: true,
      count: allProducts?.length || 0,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      products: allProducts || [],
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
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
