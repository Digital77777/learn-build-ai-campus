import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, CheckCircle, DollarSign, Clock, Tag, FileText, Sparkles } from 'lucide-react';
import { ProductFormData } from './SellingModal';

interface ReviewStepProps {
  data: ProductFormData;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onSubmit,
  onPrevious,
  isSubmitting,
}) => {
  const currencies = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
  };

  const currentCurrency = currencies[data.currency as keyof typeof currencies] || '$';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Review Your Listing</h2>
        <p className="text-muted-foreground text-sm">
          Please review your listing details before publishing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Product Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={data.listing_type === 'product' ? 'default' : 'secondary'}>
                    {data.listing_type === 'product' ? 'Digital Product' : 'AI Service'}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{data.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>

              {data.tags && data.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {data.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {data.requirements && (
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Requirements
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {data.requirements}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Pricing & Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {currentCurrency}{data.price}
                  </div>
                  <div className="text-xs text-muted-foreground">Price</div>
                </div>
                
                {data.delivery_time && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent">
                      {data.delivery_time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Day{data.delivery_time > 1 ? 's' : ''} Delivery
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product Price:</span>
                  <span className="font-medium">{currentCurrency}{data.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (5%):</span>
                  <span>-{currentCurrency}{(data.price! * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Processing (3%):</span>
                  <span>-{currentCurrency}{(data.price! * 0.03).toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-green-600">
                  <span>You Earn:</span>
                  <span>{currentCurrency}{(data.price! * 0.92).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                Ready to Publish!
              </h3>
              <ul className="text-xs text-green-600 space-y-1">
                <li>✅ Product details completed</li>
                <li>✅ Pricing configured</li>
                <li>✅ All requirements met</li>
                <li>✅ Ready for marketplace</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm">📋 What Happens Next?</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Your listing will be published immediately</li>
                <li>• Buyers can discover and purchase your product</li>
                <li>• You'll receive notifications for new orders</li>
                <li>• Payments are processed securely</li>
                <li>• You can edit your listing anytime</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Publishing...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Listing
            </>
          )}
        </Button>
      </div>
    </div>
  );
};