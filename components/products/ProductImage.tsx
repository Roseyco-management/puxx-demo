'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageProps {
  imageUrl: string;
  imageGallery?: string[];
  productName: string;
}

export function ProductImage({
  imageUrl,
  imageGallery = [],
  productName,
}: ProductImageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Combine main image and gallery
  const allImages = imageUrl ? [imageUrl, ...imageGallery] : imageGallery;

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group">
        <div
          className={`relative w-full h-full cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : ''
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={allImages[currentImage]}
            alt={`${productName} nicotine pouches - Premium tobacco-free product view ${currentImage + 1}`}
            fill
            className="object-contain p-8"
            priority={currentImage === 0}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Navigation Arrows (if multiple images) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentImage + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                currentImage === idx
                  ? 'border-green-600 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} nicotine pouches view ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
                loading="lazy"
                quality={75}
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Hint */}
      <p className="text-xs text-gray-500 text-center">
        Click image to zoom in/out
      </p>
    </div>
  );
}
