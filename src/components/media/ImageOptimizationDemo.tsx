import { OptimizedImage } from './OptimizedImage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Demo component showing how to use OptimizedImage
 * This component demonstrates best practices for image optimization
 */
export const ImageOptimizationDemo = () => {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Optimized Image Component</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Automatically serves WebP format with JPEG fallback, implements lazy loading,
          and generates responsive srcsets for optimal performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority loading example */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Loading (Hero)</CardTitle>
            <CardDescription>
              Loads immediately without lazy loading - use for above-the-fold images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OptimizedImage
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
              alt="AI Technology"
              width={800}
              height={600}
              priority={true}
              quality={90}
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Lazy loading example */}
        <Card>
          <CardHeader>
            <CardTitle>Lazy Loading</CardTitle>
            <CardDescription>
              Loads when entering viewport - use for below-the-fold images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OptimizedImage
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
              alt="Coding"
              width={800}
              height={600}
              priority={false}
              quality={85}
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Different object fit example */}
        <Card>
          <CardHeader>
            <CardTitle>Object Fit: Contain</CardTitle>
            <CardDescription>
              Image maintains aspect ratio and fits within container
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg overflow-hidden">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800"
                alt="Technology"
                width={800}
                height={600}
                objectFit="contain"
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cover example */}
        <Card>
          <CardHeader>
            <CardTitle>Object Fit: Cover (Default)</CardTitle>
            <CardDescription>
              Image fills container, may crop to maintain aspect ratio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg overflow-hidden">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
                alt="Code"
                width={800}
                height={600}
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage guide */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guide</CardTitle>
          <CardDescription>Best practices for using OptimizedImage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Basic Usage</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<OptimizedImage
  src="your-image-url.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={false}
  quality={85}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Automatically serves WebP with JPEG fallback</li>
              <li>Lazy loading with Intersection Observer</li>
              <li>Responsive srcsets for different screen sizes</li>
              <li>Progressive loading with shimmer effect</li>
              <li>Built-in error handling</li>
              <li>Priority loading for above-the-fold images</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Props</h3>
            <div className="space-y-2 text-sm">
              <div><code className="bg-muted px-2 py-1 rounded">priority</code> - Load immediately (use for hero images)</div>
              <div><code className="bg-muted px-2 py-1 rounded">quality</code> - Image quality 1-100 (default: 85)</div>
              <div><code className="bg-muted px-2 py-1 rounded">objectFit</code> - How image fills container</div>
              <div><code className="bg-muted px-2 py-1 rounded">showLoader</code> - Display loading skeleton</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
