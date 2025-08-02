import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Shield, Zap, TrendingUp, Star } from 'lucide-react';

interface SellerOnboardingStepProps {
  onNext: () => void;
}

export const SellerOnboardingStep: React.FC<SellerOnboardingStepProps> = ({ onNext }) => {
  const benefits = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "No Listing Fees",
      description: "List unlimited products with zero upfront costs"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Global Audience",
      description: "Reach AI enthusiasts worldwide"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Payments",
      description: "Protected transactions with instant payouts"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Easy Setup",
      description: "Launch in under 10 minutes"
    }
  ];

  const productTypes = [
    { type: "AI Prompt Templates", price: "$15-50", popularity: "High" },
    { type: "AI Models & Datasets", price: "$100-500", popularity: "Very High" },
    { type: "AI Tools & Scripts", price: "$25-100", popularity: "Medium" },
    { type: "Design Assets", price: "$10-75", popularity: "Medium" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">Welcome to AI Marketplace Selling!</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of creators monetizing their AI expertise. Here's what you need to know:
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border-2 border-dashed border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Product Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Product Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productTypes.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium text-sm">{product.type}</div>
                  <div className="text-xs text-muted-foreground">Average price: {product.price}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium">{product.popularity}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 text-sm">💡 Quick Tips for Success:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use clear, descriptive titles with relevant keywords</li>
            <li>• Include high-quality preview images or demos</li>
            <li>• Write detailed descriptions explaining the value</li>
            <li>• Price competitively based on market research</li>
            <li>• Respond quickly to customer inquiries</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} size="lg">
          Let's Get Started
        </Button>
      </div>
    </div>
  );
};