import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { MarketplaceListing } from '@/hooks/useMarketplace';
import { MediaPreview } from '@/components/media/MediaPreview';
import { JobListingCard } from './JobListingCard';

interface SimpleListingCardProps {
  listing: MarketplaceListing;
  onFavorite?: (listingId: string) => void;
  isFavorited?: boolean;
  onViewDetails?: (listing: MarketplaceListing) => void;
}

export const SimpleListingCard: React.FC<SimpleListingCardProps> = ({
  listing,
  onFavorite,
  isFavorited = false,
  onViewDetails
}) => {
  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Use specialized job card for job listings
  if (listing.listing_type === 'job') {
    return (
      <JobListingCard
        listing={listing}
        onApply={(listingId) => console.log('Apply to job:', listingId)}
        onViewDetails={onViewDetails}
      />
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'service':
        return 'bg-green-100 text-green-800';
      case 'job':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(listing.listing_type)}>
            {listing.listing_type}
          </Badge>
          {onFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFavorite(listing.id)}
              className="h-8 w-8 p-0"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          )}
        </div>
        
        <MediaPreview
          images={listing.images || []}
          videos={[]} // Do not display demo videos on the marketplace grid
          title={listing.title}
          category="tech"
          className="mb-3"
          maxVisible={1}
        />
        
        <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        {listing.tags && listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {listing.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {listing.price && (
            <div className="text-lg font-semibold text-primary">
              {formatPrice(listing.price, listing.currency)}
            </div>
          )}
        </div>
        
        <Button 
          className="w-full mt-3" 
          variant="outline"
          onClick={() => onViewDetails?.(listing)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
