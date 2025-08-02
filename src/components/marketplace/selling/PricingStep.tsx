import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { ProductFormData } from './SellingModal';

interface PricingStepProps {
  data: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PricingStep: React.FC<PricingStepProps> = ({
  data,
  onChange,
  onNext,
  onPrevious,
}) => {
  const currencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'EUR', label: 'EUR (€)', symbol: '€' },
    { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  ];

  const deliveryTimes = [
    { value: 1, label: '1 day', description: 'Instant download' },
    { value: 3, label: '3 days', description: 'Quick delivery' },
    { value: 7, label: '1 week', description: 'Standard delivery' },
    { value: 14, label: '2 weeks', description: 'Custom work' },
    { value: 30, label: '1 month', description: 'Complex projects' },
  ];

  const pricingTiers = [
    { range: '$5-15', type: 'Simple Templates', description: 'Basic prompts, small assets' },
    { range: '$20-50', type: 'Premium Content', description: 'Comprehensive guides, quality tools' },
    { range: '$75-200', type: 'Professional Products', description: 'Advanced models, courses' },
    { range: '$250+', type: 'Enterprise Solutions', description: 'Custom development, datasets' },
  ];

  const currentCurrency = currencies.find(c => c.value === data.currency)?.symbol || '$';
  const isValid = data.price !== undefined && data.price > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Set Your Price & Terms</h2>
        <p className="text-muted-foreground text-sm">
          Choose competitive pricing and delivery terms for your AI creation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Pricing */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      {currentCurrency}
                    </span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={data.price || ''}
                      onChange={(e) => onChange({ price: parseFloat(e.target.value) || undefined })}
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={data.currency}
                    onValueChange={(value) => onChange({ currency: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {data.listing_type === 'service' && (
                <div>
                  <Label htmlFor="delivery">Delivery Time</Label>
                  <Select
                    value={data.delivery_time?.toString()}
                    onValueChange={(value) => onChange({ delivery_time: parseInt(value) })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryTimes.map((time) => (
                        <SelectItem key={time.value} value={time.value.toString()}>
                          <div>
                            <div className="font-medium">{time.label}</div>
                            <div className="text-xs text-muted-foreground">{time.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Preview */}
          {data.price && (
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-sm">💰 Earnings Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Product Price:</span>
                    <span className="font-medium">{currentCurrency}{data.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (5%):</span>
                    <span>-{currentCurrency}{(data.price * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Processing (3%):</span>
                    <span>-{currentCurrency}{(data.price * 0.03).toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>You Earn:</span>
                    <span>{currentCurrency}{(data.price * 0.92).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Guidance */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Pricing Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pricingTiers.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium text-sm">{tier.type}</div>
                      <div className="text-xs text-muted-foreground">{tier.description}</div>
                    </div>
                    <Badge variant="outline">{tier.range}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                💡 Pricing Tips
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Research similar products to price competitively</li>
                <li>• Start slightly lower to build reviews and reputation</li>
                <li>• Consider bundling related items for higher value</li>
                <li>• You can always adjust pricing later</li>
                <li>• Factor in your time and expertise value</li>
              </ul>
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
            {isValid ? '✅ Pricing set' : '⏳ Set your price'}
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