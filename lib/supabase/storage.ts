import { createClient } from './client';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'products')
 * @param folder - Optional folder path within the bucket
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'products',
  folder?: string
): Promise<string> {
  const supabase = createClient();

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload multiple images to Supabase Storage
 * @param files - Array of files to upload
 * @param bucket - The storage bucket name (default: 'products')
 * @param folder - Optional folder path within the bucket
 * @returns Array of public URLs
 */
export async function uploadImages(
  files: File[],
  bucket: string = 'products',
  folder?: string
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from Supabase Storage
 * @param url - Public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'products')
 */
export async function deleteImage(
  url: string,
  bucket: string = 'products'
): Promise<void> {
  const supabase = createClient();

  // Extract path from URL
  const urlParts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (urlParts.length < 2) {
    throw new Error('Invalid image URL');
  }

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

/**
 * Delete multiple images from Supabase Storage
 * @param urls - Array of public URLs to delete
 * @param bucket - The storage bucket name (default: 'products')
 */
export async function deleteImages(
  urls: string[],
  bucket: string = 'products'
): Promise<void> {
  const deletePromises = urls.map(url => deleteImage(url, bucket));
  await Promise.all(deletePromises);
}
