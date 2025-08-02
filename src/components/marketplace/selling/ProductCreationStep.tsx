import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, X, Upload, Image } from 'lucide-react';
import { ProductFormData } from './SellingModal';

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

  const productTypes = [
    { value: 'product', label: 'Digital Product', description: 'Downloadable files, templates, tools' },
    { value: 'service', label: 'AI Service', description: 'Custom AI development, consulting' }
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

  const isValid = data.title.length >= 10 && data.description.length >= 50;

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
                <Label htmlFor="type">Product Type *</Label>
                <Select
                  value={data.listing_type}
                  onValueChange={(value: 'product' | 'service') => onChange({ listing_type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload product images or screenshots
                </p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 1200x800px, JPG or PNG
                </p>
              </div>
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
            {isValid ? '✅ Ready to continue' : '⏳ Complete required fields'}
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