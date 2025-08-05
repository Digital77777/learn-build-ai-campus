import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: 'tech' | 'office' | 'nature' | 'design' | 'ai' | 'default';
  fallbackSrc?: string;
  showLoader?: boolean;
  onImageClick?: () => void;
}

const categoryPlaceholders = {
  tech: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop',
  office: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&auto=format&fit=crop',
  nature: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop',
  design: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop',
  ai: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop'
};

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  category = 'default',
  fallbackSrc,
  showLoader = true,
  onImageClick,
  className,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackLevel === 0 && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setFallbackLevel(1);
      setHasError(false);
      setIsLoading(true);
    } else if (fallbackLevel <= 1) {
      const placeholder = categoryPlaceholders[category];
      setCurrentSrc(placeholder);
      setFallbackLevel(2);
      setHasError(false);
      setIsLoading(true);
    }
  }, [fallbackSrc, category, fallbackLevel]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleClick = useCallback(() => {
    if (onImageClick && !hasError) {
      onImageClick();
    }
  }, [onImageClick, hasError]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading Skeleton */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        onClick={handleClick}
        className={cn(
          "transition-all duration-300",
          isLoading ? "opacity-0" : "opacity-100 animate-fade-in",
          onImageClick && !hasError && "cursor-pointer hover:scale-105 hover:brightness-110",
          className
        )}
        {...props}
      />

      {/* Click to expand indicator */}
      {onImageClick && !hasError && !isLoading && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20 flex items-center justify-center">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Click to expand
          </div>
        </div>
      )}
    </div>
  );
};