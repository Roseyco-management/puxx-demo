"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/lib/supabase/storage';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label = 'Upload Image',
  required = false,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setUploading(true);

      try {
        const url = await uploadImage(file, 'products');
        onChange(url);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    maxFiles: 1,
    disabled: disabled || uploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${isDragActive
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
            : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
          }
          ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : ''}
          ${value ? 'border-solid' : ''}
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 size={40} className="text-emerald-600 animate-spin mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Uploading image...</p>
          </div>
        ) : value ? (
          <div className="relative group">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={disabled}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Upload size={40} className="text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {isDragActive ? 'Drop image here' : 'Drag & drop an image, or click to browse'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, WEBP up to 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
