import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Grid3x3 } from 'lucide-react';
import { MarketplaceCategory } from '@/hooks/useMarketplace';

interface CategoryCardProps {
  category: MarketplaceCategory;
  colorIndex: number;
}

const colorClasses = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];

export const CategoryCard = memo(({ category, colorIndex }: CategoryCardProps) => {
  const colorClass = colorClasses[colorIndex % colorClasses.length];

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 rounded-full ${colorClass} flex items-center justify-center mx-auto mb-3`}>
          <Grid3x3 className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-semibold">{category.name}</h3>
      </CardContent>
    </Card>
  );
});

CategoryCard.displayName = 'CategoryCard';
