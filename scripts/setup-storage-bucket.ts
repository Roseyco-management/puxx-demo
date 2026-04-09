/**
 * Script to create the product-images storage bucket in Supabase
 *
 * Usage: pnpm tsx scripts/setup-storage-bucket.ts
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorageBucket() {
  console.log('🗂️  Setting up Supabase Storage bucket...\n');

  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      process.exit(1);
    }

    const bucketExists = buckets?.some(b => b.name === 'product-images');

    if (bucketExists) {
      console.log('✅ Bucket "product-images" already exists\n');
    } else {
      console.log('📦 Creating bucket "product-images"...');

      const { data, error } = await supabase.storage.createBucket('product-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      });

      if (error) {
        console.error('❌ Error creating bucket:', error.message);
        process.exit(1);
      }

      console.log('✅ Bucket "product-images" created successfully!\n');
    }

    console.log('🎉 Storage setup complete!');
    console.log('\nNext step: Run image upload script');
    console.log('  pnpm tsx scripts/upload-product-images.ts\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

setupStorageBucket();
