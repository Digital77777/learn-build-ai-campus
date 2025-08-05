import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  Link,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { EnhancedImage } from './EnhancedImage';
import { VideoPlayer } from './VideoPlayer';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  file?: File;
  isValid: boolean;
  error?: string;
}

interface MediaUploaderProps {
  images: string[];
  videos: string[];
  onImagesChange: (images: string[]) => void;
  onVideosChange: (videos: string[]) => void;
  maxImages?: number;
  maxVideos?: number;
  maxFileSize?: number; // in MB
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  images,
  videos,
  onImagesChange,
  onVideosChange,
  maxImages = 10,
  maxVideos = 5,
  maxFileSize = 50
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => [
    ...images.map((url, index) => ({
      id: `img-${index}`,
      url,
      type: 'image' as const,
      isValid: true
    })),
    ...videos.map((url, index) => ({
      id: `vid-${index}`,
      url,
      type: 'video' as const,
      isValid: true
    }))
  ]);
  
  const [urlInput, setUrlInput] = useState('');
  const [urlType, setUrlType] = useState<'image' | 'video'>('image');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const updateParentState = (items: MediaItem[]) => {
    const validImages = items
      .filter(item => item.type === 'image' && item.isValid)
      .map(item => item.url);
    const validVideos = items
      .filter(item => item.type === 'video' && item.isValid)
      .map(item => item.url);
    
    onImagesChange(validImages);
    onVideosChange(validVideos);
  };

  const validateUrl = async (url: string, type: 'image' | 'video'): Promise<boolean> => {
    return new Promise((resolve) => {
      if (type === 'image') {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      } else {
        const video = document.createElement('video');
        video.onloadedmetadata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = url;
      }
    });
  };

  const addUrlMedia = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    const currentCount = mediaItems.filter(item => item.type === urlType).length;
    const maxCount = urlType === 'image' ? maxImages : maxVideos;
    
    if (currentCount >= maxCount) {
      toast.error(`Maximum ${maxCount} ${urlType}s allowed`);
      return;
    }

    const newItem: MediaItem = {
      id: `${urlType}-${Date.now()}`,
      url: urlInput.trim(),
      type: urlType,
      isValid: false
    };

    const updatedItems = [...mediaItems, newItem];
    setMediaItems(updatedItems);
    setUrlInput('');

    // Validate URL
    const isValid = await validateUrl(newItem.url, urlType);
    const finalItems = updatedItems.map(item => 
      item.id === newItem.id 
        ? { ...item, isValid, error: isValid ? undefined : 'Failed to load media' }
        : item
    );
    
    setMediaItems(finalItems);
    updateParentState(finalItems);

    if (isValid) {
      toast.success(`${urlType} added successfully`);
    } else {
      toast.error(`Failed to load ${urlType} from URL`);
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'image' | 'video') => {
    if (!files) return;

    const currentCount = mediaItems.filter(item => item.type === type).length;
    const maxCount = type === 'image' ? maxImages : maxVideos;
    const remainingSlots = maxCount - currentCount;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxCount} ${type}s allowed`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    
    filesToProcess.forEach(file => {
      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast.error(`File "${file.name}" is too large. Maximum size is ${maxFileSize}MB`);
        return;
      }

      // Validate file type
      const isValidType = type === 'image' 
        ? file.type.startsWith('image/')
        : file.type.startsWith('video/');

      if (!isValidType) {
        toast.error(`Invalid file type for "${file.name}"`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const newItem: MediaItem = {
          id: `${type}-${Date.now()}-${Math.random()}`,
          url,
          type,
          file,
          isValid: true
        };

        const updatedItems = [...mediaItems, newItem];
        setMediaItems(updatedItems);
        updateParentState(updatedItems);
        toast.success(`${type} uploaded successfully`);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (id: string) => {
    const updatedItems = mediaItems.filter(item => item.id !== id);
    setMediaItems(updatedItems);
    updateParentState(updatedItems);
  };

  const getMediaStats = () => {
    const imageCount = mediaItems.filter(item => item.type === 'image' && item.isValid).length;
    const videoCount = mediaItems.filter(item => item.type === 'video' && item.isValid).length;
    return { imageCount, videoCount };
  };

  const { imageCount, videoCount } = getMediaStats();

  return (
    <div className="space-y-6">
      {/* Media Stats */}
      <div className="flex gap-2">
        <Badge variant="outline" className="text-sm">
          <ImageIcon className="h-3 w-3 mr-1" />
          {imageCount} / {maxImages} Images
        </Badge>
        <Badge variant="outline" className="text-sm">
          <Video className="h-3 w-3 mr-1" />
          {videoCount} / {maxVideos} Videos
        </Badge>
      </div>

      {/* URL Input */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <Label className="text-sm font-medium">Add Media from URL</Label>
            </div>
            
            <div className="flex gap-2">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant={urlType === 'image' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUrlType('image')}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Image
                </Button>
                <Button
                  type="button"
                  variant={urlType === 'video' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUrlType('video')}
                >
                  <Video className="h-4 w-4 mr-1" />
                  Video
                </Button>
              </div>
              
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={`Enter ${urlType} URL`}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addUrlMedia()}
              />
              
              <Button 
                type="button" 
                onClick={addUrlMedia}
                disabled={!urlInput.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload Images
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageCount >= maxImages}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, GIF up to {maxFileSize}MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'image')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Video Upload */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
                <Video className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload Videos
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                  disabled={videoCount >= maxVideos}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  MP4, WebM up to {maxFileSize}MB
                </p>
              </div>
              
              <input
                ref={videoInputRef}
                type="file"
                multiple
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'video')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Preview Grid */}
      {mediaItems.length > 0 && (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Media Preview</Label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <EnhancedImage
                      src={item.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      showLoader={false}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <VideoPlayer
                        src={item.url}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="absolute top-1 left-1">
                  {item.isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-500 bg-white rounded-full" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500 bg-white rounded-full" />
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeMedia(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>

                {/* File Info */}
                {item.file && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="bg-black/70 text-white text-xs p-1 rounded truncate">
                      {item.file.name}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium">Media Guidelines:</p>
              <ul className="space-y-1 text-xs">
                <li>• Use high-quality images (min 800x600px recommended)</li>
                <li>• Videos should be under {maxFileSize}MB for best performance</li>
                <li>• First image will be used as the main preview</li>
                <li>• Supported formats: JPG, PNG, GIF, MP4, WebM</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};