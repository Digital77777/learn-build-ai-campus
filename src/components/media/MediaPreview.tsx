import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, Play } from 'lucide-react';
import { EnhancedImage } from './EnhancedImage';
import { VideoPlayer } from './VideoPlayer';
import { MediaGallery } from './MediaGallery';
import { cn } from '@/lib/utils';

interface MediaPreviewProps {
  images?: string[];
  videos?: string[];
  title?: string;
  category?: 'tech' | 'office' | 'nature' | 'design' | 'ai' | 'default';
  className?: string;
  showCount?: boolean;
  maxVisible?: number;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  images = [],
  videos = [],
  title = 'Media',
  category = 'default',
  className,
  showCount = true,
  maxVisible = 4
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const totalMedia = images.length + videos.length;
  const hasMultipleMedia = totalMedia > 1;
  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = Math.max(0, totalMedia - maxVisible);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  if (totalMedia === 0) {
    return (
      <div className={cn(
        "aspect-video bg-muted rounded-lg flex items-center justify-center",
        className
      )}>
        <div className="text-center text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-2 opacity-50">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm">No media available</p>
        </div>
      </div>
    );
  }

  // Single media display
  if (totalMedia === 1) {
    if (images.length === 1) {
      return (
        <div className={cn("relative", className)}>
          <EnhancedImage
            src={images[0]}
            alt={title}
            category={category}
            className="w-full aspect-video object-cover rounded-lg"
            onImageClick={() => openGallery(0)}
          />
          <MediaGallery
            images={images}
            videos={videos}
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            initialIndex={galleryIndex}
            title={title}
          />
        </div>
      );
    } else {
      return (
        <div className={cn("relative", className)}>
          <VideoPlayer
            src={videos[0]}
            className="w-full aspect-video"
          />
        </div>
      );
    }
  }

  // Multiple media grid display
  const getGridLayout = () => {
    if (visibleImages.length === 2) return 'grid-cols-2';
    if (visibleImages.length === 3) return 'grid-cols-3';
    return 'grid-cols-2';
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Media Count Badge */}
      {showCount && (
        <div className="flex gap-2">
          {images.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {images.length} Image{images.length !== 1 ? 's' : ''}
            </Badge>
          )}
          {videos.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {videos.length} Video{videos.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      )}

      {/* Main Media Display */}
      {visibleImages.length > 0 && (
        <div className={cn("grid gap-2", getGridLayout())}>
          {visibleImages.map((image, index) => (
            <div key={index} className="relative">
              <EnhancedImage
                src={image}
                alt={`${title} - Image ${index + 1}`}
                category={category}
                className={cn(
                  "w-full object-cover rounded-lg transition-all duration-200",
                  visibleImages.length === 1 ? "aspect-video" : "aspect-square",
                  "hover:scale-105 cursor-pointer"
                )}
                onImageClick={() => openGallery(index)}
              />
              
              {/* Remaining count overlay */}
              {index === visibleImages.length - 1 && remainingCount > 0 && (
                <div
                  className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                  onClick={() => openGallery(index)}
                >
                  <div className="text-white text-center">
                    <ZoomIn className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-lg font-semibold">+{remainingCount}</p>
                    <p className="text-sm">more</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Video Previews */}
      {videos.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Demo Videos</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {videos.slice(0, 2).map((video, index) => (
              <div key={index} className="relative">
                <VideoPlayer
                  src={video}
                  className="w-full aspect-video"
                />
              </div>
            ))}
          </div>
          {videos.length > 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openGallery(images.length)}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              View all {videos.length} videos
            </Button>
          )}
        </div>
      )}

      {/* Media Gallery Modal */}
      <MediaGallery
        images={images}
        videos={videos}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
        title={title}
      />
    </div>
  );
};