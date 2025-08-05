import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { EnhancedImage } from './EnhancedImage';

interface MediaGalleryProps {
  images: string[];
  videos?: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  title?: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  videos = [],
  isOpen,
  onClose,
  initialIndex = 0,
  title
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const allMedia = [...images, ...videos];
  const totalCount = allMedia.length;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCount);
  }, [totalCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
  }, [totalCount]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrevious, onClose]);

  if (!isOpen || totalCount === 0) return null;

  const currentMedia = allMedia[currentIndex];
  const isVideo = currentIndex >= images.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="text-white">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-white/70">
                {currentIndex + 1} of {totalCount}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Media Display */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              {isVideo ? (
                <video
                  src={currentMedia}
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <EnhancedImage
                  src={currentMedia}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg animate-fade-in"
                  category="tech"
                />
              )}
            </div>

            {/* Navigation Arrows */}
            {totalCount > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {totalCount > 1 && (
            <div className="p-4 bg-black/50 backdrop-blur-sm">
              <div className="flex gap-2 justify-center overflow-x-auto max-w-full">
                {allMedia.map((media, index) => {
                  const isVideoThumb = index >= images.length;
                  return (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-primary scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      {isVideoThumb ? (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[6px] border-l-gray-700 border-y-[4px] border-y-transparent ml-0.5" />
                          </div>
                        </div>
                      ) : (
                        <EnhancedImage
                          src={media}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          category="tech"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};