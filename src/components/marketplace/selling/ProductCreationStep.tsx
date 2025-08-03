import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, X, Upload, Image, Video, Link, FileText, Code, BookOpen, Package, Palette, Briefcase } from 'lucide-react';
import { ProductFormData } from './SellingModal';
import { useMarketplace } from '@/hooks/useMarketplace';

interface ProductCreationStepProps {
  data: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ProductCreationStep: React.FC<ProductCreationStepProps> = ({
  data,
  onChange,
  onNext,
  onPrevious,
}) => {
  const [newTag, setNewTag] = useState('');
  const [imagePreview, setImagePreview] = useState<string[]>(data.images || []);
  const [videoPreview, setVideoPreview] = useState<string[]>([]);
  const { categories } = useMarketplace();

  const productTypes = [
    { value: 'ai-prompts', label: 'AI Prompt Templates', icon: <FileText className="h-4 w-4" />, description: 'Curated prompts for ChatGPT, Claude, and other AI models' },
    { value: 'ai-models', label: 'AI Models & Datasets', icon: <Code className="h-4 w-4" />, description: 'Pre-trained models, fine-tuned variations, and datasets' },
    { value: 'courses', label: 'AI Courses & Tutorials', icon: <BookOpen className="h-4 w-4" />, description: 'Educational content and step-by-step guides' },
    { value: 'tools', label: 'AI Tools & Scripts', icon: <Package className="h-4 w-4" />, description: 'Automation scripts, extensions, and productivity tools' },
    { value: 'designs', label: 'Design Assets', icon: <Palette className="h-4 w-4" />, description: 'AI-generated graphics, templates, and creative resources' },
    { value: 'research', label: 'Research & Reports', icon: <Briefcase className="h-4 w-4" />, description: 'Industry insights, market analysis, and documentation' },
  ];

  const addTag = () => {
    if (newTag.trim() && !data.tags?.includes(newTag.trim())) {
      onChange({
        tags: [...(data.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({
      tags: data.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleFileUpload = (type: 'image' | 'video', file: File) => {
    const url = URL.createObjectURL(file);
    if (type === 'image') {
      const newImages = [...imagePreview, url];
      setImagePreview(newImages);
      onChange({ images: newImages });
    } else {
      const newVideos = [...videoPreview, url];
      setVideoPreview(newVideos);
      onChange({ videos: newVideos });
    }
  };

  const removeFile = (type: 'image' | 'video', index: number) => {
    if (type === 'image') {
      const newImages = imagePreview.filter((_, i) => i !== index);
      setImagePreview(newImages);
      onChange({ images: newImages });
    } else {
      const newVideos = videoPreview.filter((_, i) => i !== index);
      setVideoPreview(newVideos);
      onChange({ videos: newVideos });
    }
  };

  const isValid = data.title.length >= 10 && data.description.length >= 50 && data.category_id;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Describe Your AI Creation</h2>
        <p className="text-muted-foreground text-sm">
          Provide detailed information to help buyers understand your product
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., GPT-4 Marketing Prompts Collection"
                  value={data.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                  className="mt-1"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {data.title.length}/100 characters (minimum 10)
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={data.category_id || ''}
                  onValueChange={(value) => onChange({ category_id: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-muted-foreground">{category.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Product Type *</Label>
                <Select
                  value={data.productType || ''}
                  onValueChange={(value) => onChange({ productType: value, listing_type: value.includes('service') ? 'service' : 'product' })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="creationLink">Link to Your Creation</Label>
                <div className="flex gap-2 mt-1">
                  <Link className="h-4 w-4 mt-3 text-muted-foreground" />
                  <Input
                    id="creationLink"
                    placeholder="https://your-creation-link.com"
                    value={data.creationLink || ''}
                    onChange={(e) => onChange({ creationLink: e.target.value })}
                    type="url"
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Link to GitHub, demo site, or download page
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your AI creation in detail. Include what it does, who it's for, and what makes it valuable..."
                  value={data.description}
                  onChange={(e) => onChange({ description: e.target.value })}
                  className="mt-1 min-h-[120px]"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {data.description.length}/1000 characters (minimum 50)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Additional Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Add relevant tags..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {data.tags && data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Add tags to help buyers find your product
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Requirements (Optional)</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any specific requirements or prerequisites for using your AI creation..."
                  value={data.requirements || ''}
                  onChange={(e) => onChange({ requirements: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Image className="h-5 w-5" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload product images or screenshots
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    Array.from(e.target.files || []).forEach(file => 
                      handleFileUpload('image', file)
                    );
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Choose Images
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 1200x800px, JPG or PNG
                </p>
              </div>
              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {imagePreview.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeFile('image', index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5" />
                Demo Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload demo videos of your AI creation
                </p>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => {
                    Array.from(e.target.files || []).forEach(file => 
                      handleFileUpload('video', file)
                    );
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('video-upload')?.click()}
                >
                  Choose Videos
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max 100MB per video, MP4 or WebM
                </p>
              </div>
              {videoPreview.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                  {videoPreview.map((url, index) => (
                    <div key={index} className="relative">
                      <video src={url} className="w-full h-32 object-cover rounded" controls />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeFile('video', index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {isValid ? '✅ Ready to continue' : '⏳ Complete required fields (title, description, category)'}
          </div>
        </div>
        
        <Button onClick={onNext} disabled={!isValid}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};