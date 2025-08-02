import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Star } from 'lucide-react';
import { useMarketplace } from '@/hooks/useMarketplace';
import { useAuth } from '@/hooks/useAuth';

export default function BrowseMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const { listings, categories, fetchListings, addToFavorites, removeFromFavorites } = useMarketplace();
  const { user } = useAuth();

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
      priceMin: priceRange.includes('-') ? parseInt(priceRange.split('-')[0]) : undefined,
      priceMax: priceRange.includes('-') && priceRange.split('-')[1] !== '+' ? parseInt(priceRange.split('-')[1]) : undefined
    });
  }, [searchQuery, selectedCategory, priceRange, fetchListings]);

  const handleFavorite = async (listingId: string, isFavorited: boolean) => {
    if (!user) return;
    
    if (isFavorited) {
      await removeFromFavorites(listingId);
    } else {
      await addToFavorites(listingId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
            <Card key={listing.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{listing.listing_type}</Badge>
                  {user && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(listing.id, false)} // This would need proper favorite state
                      className="h-8 w-8 p-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {listing.images && listing.images.length > 0 && (
                  <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                
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
                  <div className="text-lg font-semibold text-primary">
                    ${listing.price} {listing.currency}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.8</span>
                  </div>
                </div>
                
                <Button className="w-full mt-3" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
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
      </div>
    </div>
  );
}