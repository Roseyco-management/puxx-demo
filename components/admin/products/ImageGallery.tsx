"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { uploadImages, deleteImage } from '@/lib/supabase/storage';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageGalleryProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  disabled?: boolean;
}

interface SortableImageProps {
  url: string;
  index: number;
  onRemove: (url: string) => void;
  disabled?: boolean;
}

function SortableImage({ url, index, onRemove, disabled }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
    >
      <Image
        src={url}
        alt={`Gallery image ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
      />

      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        className="absolute top-2 left-2 p-1.5 bg-gray-900/70 text-white rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
      >
        <GripVertical size={16} />
      </button>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(url)}
        disabled={disabled}
        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        <X size={16} />
      </button>

      {/* Image number badge */}
      <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-900/70 text-white text-xs rounded">
        {index + 1}
      </div>
    </div>
  );
}

export function ImageGallery({
  value = [],
  onChange,
  maxImages = 4,
  label = 'Gallery Images',
  disabled = false,
}: ImageGalleryProps) {
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const remainingSlots = maxImages - value.length;
      if (remainingSlots <= 0) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }

      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      // Validate file sizes
      const oversizedFiles = filesToUpload.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error('All images must be less than 5MB');
        return;
      }

      setUploading(true);

      try {
        const urls = await uploadImages(filesToUpload, 'products');
        onChange([...value, ...urls]);
        toast.success(`${urls.length} image(s) uploaded successfully`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload images');
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    maxFiles: maxImages,
    disabled: disabled || uploading || value.length >= maxImages,
  });

  const handleRemove = async (url: string) => {
    try {
      await deleteImage(url, 'products');
      onChange(value.filter(u => u !== url));
      toast.success('Image removed');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove image');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as string);
      const newIndex = value.indexOf(over.id as string);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          <span className="text-gray-500 text-xs ml-2">
            ({value.length}/{maxImages})
          </span>
        </label>
      )}

      {/* Existing images with drag & drop reordering */}
      {value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={value} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {value.map((url, index) => (
                <SortableImage
                  key={url}
                  url={url}
                  index={index}
                  onRemove={handleRemove}
                  disabled={disabled}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Upload new images */}
      {value.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
            ${isDragActive
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
              : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
            }
            ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 size={32} className="text-emerald-600 animate-spin mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <Upload size={32} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {isDragActive ? 'Drop images here' : 'Add more images'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG, WEBP up to 5MB each
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Drag images to reorder them. The first image will be the primary gallery image.
      </p>
    </div>
  );
}
