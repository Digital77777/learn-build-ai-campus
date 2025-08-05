import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Star } from 'lucide-react';
import { useMarketplace, MarketplaceListing } from '@/hooks/useMarketplace';
import { SimpleListingCard } from '@/components/marketplace/SimpleListingCard';
import { ListingDetailsModal } from '@/components/marketplace/ListingDetailsModal';
import { useAuth } from '@/hooks/useAuth';

export default function BrowseMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { listings, categories, fetchListings, addToFavorites, removeFromFavorites, getUserFavorites } = useMarketplace();
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState<any[]>([]);

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-200', label: '$50 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: '500+', label: '$500+' }
  ];

  useEffect(() => {
    fetchListings({
      search: searchQuery,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      minPrice: priceRange.includes('-') ? parseInt(priceRange.split('-')[0]) : undefined,
      maxPrice: priceRange.includes('-') && priceRange.split('-')[1] !== '+' ? parseInt(priceRange.split('-')[1]) : undefined
    });
  }, [searchQuery, selectedCategory, priceRange, fetchListings]);

  useEffect(() => {
    if (user) {
      getUserFavorites().then(setUserFavorites);
    }
  }, [user, getUserFavorites]);

  const handleFavorite = async (listingId: string) => {
    if (!user) return;
    
    const isFavorited = userFavorites.some(fav => fav.listing_id === listingId);
    if (isFavorited) {
      await removeFromFavorites(listingId);
    } else {
      await addToFavorites(listingId);
    }
    // Refresh favorites
    getUserFavorites().then(setUserFavorites);
  };

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Browse Marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing AI tools, digital products, and services from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={priceRange === range.value ? 'default' : 'outline'}
                  onClick={() => setPriceRange(range.value)}
                  size="sm"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <SimpleListingCard 
              key={listing.id} 
              listing={listing}
              onFavorite={user ? handleFavorite : undefined}
              isFavorited={userFavorites.some(fav => fav.listing_id === listing.id)}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No listings found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}

        <ListingDetailsModal
          listing={selectedListing}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onFavorite={user ? handleFavorite : undefined}
          isFavorited={selectedListing ? userFavorites.some(fav => fav.listing_id === selectedListing.id) : false}
        />
      </div>
    </div>
  );
}