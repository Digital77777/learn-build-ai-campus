import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // Load immediately without lazy loading
  quality?: number; // 1-100
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  showLoader?: boolean;
  blurDataURL?: string; // Optional blur placeholder
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  className,
  onLoad,
  onError,
  objectFit = 'cover',
  showLoader = true,
  blurDataURL,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Generate WebP and JPEG URLs with quality optimization
  const getOptimizedUrl = (url: string, format: 'webp' | 'jpeg') => {
    // Handle Unsplash URLs
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      let optimizedUrl = `${url}${separator}auto=format&fm=${format}&q=${quality}`;
      if (width) optimizedUrl += `&w=${width}`;
      if (height) optimizedUrl += `&h=${height}`;
      return optimizedUrl;
    }

    // Handle Supabase Storage URLs
    if (url.includes('supabase.co/storage')) {
      // Supabase doesn't support format conversion, return as-is
      return url;
    }

    // For other URLs or data URLs, return as-is
    return url;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (format: 'webp' | 'jpeg') => {
    if (!width) return undefined;
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((scale) => {
        const scaledWidth = Math.round(width * scale);
        const url = getOptimizedUrl(src, format);
        if (url.includes('unsplash.com')) {
          return `${url}&w=${scaledWidth} ${scaledWidth}w`;
        }
        return `${url} ${scaledWidth}w`;
      })
      .join(', ');
  };

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const webpUrl = getOptimizedUrl(src, 'webp');
  const jpegUrl = getOptimizedUrl(src, 'jpeg');

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full blur-xl scale-110"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Loading skeleton */}
      {showLoader && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Optimized image with WebP and fallback */}
      {isInView && !hasError && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            type="image/webp"
            srcSet={generateSrcSet('webp') || webpUrl}
            sizes={width ? `(max-width: ${width}px) 100vw, ${width}px` : '100vw'}
          />
          
          {/* JPEG fallback for older browsers */}
          <source
            type="image/jpeg"
            srcSet={generateSrcSet('jpeg') || jpegUrl}
            sizes={width ? `(max-width: ${width}px) 100vw, ${width}px` : '100vw'}
          />

          <img
            src={jpegUrl}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              objectFit === 'cover' && 'object-cover',
              objectFit === 'contain' && 'object-contain',
              objectFit === 'fill' && 'object-fill',
              objectFit === 'none' && 'object-none',
              objectFit === 'scale-down' && 'object-scale-down'
            )}
            {...props}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function to generate blur placeholder data URL
export const generateBlurDataURL = (width: number = 8, height: number = 8): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient as placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e5e7eb');
    gradient.addColorStop(1, '#d1d5db');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};
