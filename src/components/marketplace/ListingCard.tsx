// Updated component using current MarketplaceListing interface

import React from 'react';
import { MarketplaceListing } from '@/hooks/useMarketplace';

interface ListingCardProps {
  listing: MarketplaceListing;
  onFavorite?: (listingId: string) => void;
  onContact?: (listing: MarketplaceListing) => void;
  isFavorited?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{listing.title}</h3>
      <p className="text-sm text-muted-foreground">{listing.description}</p>
      <p className="text-lg font-bold">${listing.price || 0}</p>
    </div>
  );
};