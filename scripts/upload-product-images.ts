/**
 * Script to upload product images to Supabase Storage
 * Uploads all 14 product images from assets/oldweb-images/products
 *
 * Usage: pnpm tsx scripts/upload-product-images.ts
 *
 * Requirements:
 * - NEXT_PUBLIC_SUPABASE_URL must be set in .env
 * - SUPABASE_SERVICE_ROLE_KEY must be set in .env
 * - Supabase Storage bucket 'product-images' must exist
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Product images to upload
const productImages = [
  'puxxcoolmint22mg.jpg',
  'puxxspearmint22mg.jpg',
  'puxxperpermint22mg.jpg',
  'puxcherry16mg.jpg',
  'puxxwatermelon16mg.jpg',
  'puxxcola16mg.jpg',
  'UK-Citrus-16mg.jpg',
  'Strawberry.jpg',
  'Raspberry.jpg',
  'Blueberry.jpg',
  'Grape.jpg',
  'Peach.jpg',
  'wintergreen.jpg',
  'Medium-Puxx-Applemint-6mg.jpg',
];

async function uploadProductImages() {
  console.log('📤 Starting product image upload to Supabase Storage...\n');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Total images to upload: ${productImages.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const imageName of productImages) {
    try {
      // Construct path to image
      const imagePath = path.join(
        process.cwd(),
        'assets/oldweb-images/products',
        imageName
      );

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        console.error(`  ❌ File not found: ${imageName}`);
        errorCount++;
        continue;
      }

      // Read the file
      const fileBuffer = fs.readFileSync(imagePath);
      const stats = fs.statSync(imagePath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);

      // Determine content type
      const contentType = imageName.endsWith('.png')
        ? 'image/png'
        : imageName.endsWith('.webp')
          ? 'image/webp'
          : 'image/jpeg';

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(imageName, fileBuffer, {
          contentType: contentType,
          upsert: true,
        });

      if (error) {
        console.error(`  ❌ Error uploading ${imageName}:`, error.message);
        errorCount++;
      } else {
        console.log(`  ✅ Uploaded: ${imageName} (${fileSizeKB} KB)`);
        successCount++;
      }
    } catch (err) {
      console.error(`  ❌ Exception uploading ${imageName}:`, err);
      errorCount++;
    }
  }

  // Display summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📤 Upload Summary');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${errorCount}`);
  console.log(`📊 Total: ${productImages.length}`);
  console.log('═══════════════════════════════════════════════════════════\n');

  if (errorCount > 0) {
    console.log('⚠️  Some uploads failed. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('🎉 All product images uploaded successfully!');
    console.log('\nImage URLs will be in the format:');
    console.log(
      `${supabaseUrl}/storage/v1/object/public/product-images/[image-name]\n`
    );
    console.log('Example:');
    console.log(
      `${supabaseUrl}/storage/v1/object/public/product-images/puxxcoolmint22mg.jpg\n`
    );
  }
}

uploadProductImages();
