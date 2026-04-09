import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { productSchema } from '@/lib/validations/product';

/**
 * GET /api/admin/products/[id]
 * Fetches a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const supabase = getSupabaseClient();

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .limit(1)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get category
    const { data: productCategoryRel } = await supabase
      .from('product_categories')
      .select(`
        categories (
          slug,
          name
        )
      `)
      .eq('product_id', productId)
      .limit(1)
      .single();

    const categoryData = Array.isArray(productCategoryRel?.categories)
      ? productCategoryRel.categories[0]
      : productCategoryRel?.categories;
    const category = categoryData?.slug || null;

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        category,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/products/[id]
 * Updates a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const supabase = getSupabaseClient();

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

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

    // Check if product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .limit(1)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if SKU is being changed and if it conflicts
    if (data.sku && data.sku !== existingProduct.sku) {
      const { data: existingSKU } = await supabase
        .from('products')
        .select('id')
        .eq('sku', data.sku)
        .limit(1)
        .single();

      if (existingSKU && existingSKU.id !== productId) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 409 }
        );
      }
    }

    // Check if slug is being changed and if it conflicts
    if (data.slug !== existingProduct.slug) {
      const { data: existingSlug } = await supabase
        .from('products')
        .select('id')
        .eq('slug', data.slug)
        .limit(1)
        .single();

      if (existingSlug && existingSlug.id !== productId) {
        return NextResponse.json(
          { error: 'A product with this URL slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update product
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)
      .select()
      .single();

    if (updateError || !updatedProduct) {
      console.error('Error updating product:', updateError);
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }

    // Update category if changed
    if (data.category) {
      // Remove existing category associations
      await supabase
        .from('product_categories')
        .delete()
        .eq('product_id', productId);

      // Add new category
      const { data: categoryRecord } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', data.category)
        .limit(1)
        .single();

      if (categoryRecord) {
        await supabase.from('product_categories').insert({
          product_id: productId,
          category_id: categoryRecord.id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Soft deletes a product (sets is_active to false)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const supabase = getSupabaseClient();

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .limit(1)
      .single();

    if (fetchError || !existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Soft delete (set is_active to false)
    const { error: deleteError } = await supabase
      .from('products')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId);

    if (deleteError) {
      console.error('Error deleting product:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
