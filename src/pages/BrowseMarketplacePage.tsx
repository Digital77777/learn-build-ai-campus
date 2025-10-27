import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronRight, Home, TrendingUp, BookOpen, User } from 'lucide-react';
import { useMarketplace, MarketplaceListing } from '@/hooks/useMarketplace';
import { ListingDetailsModal } from '@/components/marketplace/ListingDetailsModal';
import { useAuth } from '@/hooks/useAuth';
import { TierGate } from '@/components/tier/TierGate';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ToolCard } from '@/components/marketplace/ToolCard';
import { TopChartCard } from '@/components/marketplace/TopChartCard';
import { CategoryCard } from '@/components/marketplace/CategoryCard';

// Memoized category section component
const CategorySection = memo(({ 
  categoryName, 
  categoryListings, 
  onViewDetails 
}: { 
  categoryName: string; 
  categoryListings: MarketplaceListing[]; 
  onViewDetails: (listing: MarketplaceListing) => void;
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">{categoryName}</h2>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {categoryListings.slice(0, 10).map((listing, idx) => (
          <ToolCard
            key={listing.id}
            listing={listing}
            onClick={() => onViewDetails(listing)}
            colorIndex={idx}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
));

CategorySection.displayName = 'CategorySection';

export default function BrowseMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('for-you');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { listings, categories, fetchListings, getUserFavorites } = useMarketplace();
  const { user } = useAuth();
  const [userFavorites, setUserFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetchListings({ search: searchQuery });
  }, [searchQuery, fetchListings]);

  useEffect(() => {
    if (user) {
      getUserFavorites().then(setUserFavorites);
    }
  }, [user, getUserFavorites]);

  const handleViewDetails = useCallback((listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  }, []);

  // Memoize expensive computations
  const groupedListings = useMemo(() => {
    return categories.reduce((acc, category) => {
      const categoryListings = listings.filter(l => l.category_id === category.id);
      if (categoryListings.length > 0) {
        acc[category.name] = categoryListings;
      }
      return acc;
    }, {} as Record<string, MarketplaceListing[]>);
  }, [categories, listings]);

  const suggestedListings = useMemo(() => listings.slice(0, 6), [listings]);
  
  const topChartListings = useMemo(() => listings.slice(0, 20), [listings]);

  return (
    <TierGate feature="marketplace_buy">
      <div className="min-h-screen bg-background pb-20">
        {/* Top Navigation Tabs */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="container mx-auto px-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full justify-start h-12 bg-transparent border-0 rounded-none">
                <TabsTrigger value="for-you" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  For you
                </TabsTrigger>
                <TabsTrigger value="top-charts" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Top charts
                </TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Categories
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full bg-muted/50"
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4">
          {selectedTab === 'for-you' && (
            <div className="space-y-6">
              {/* Suggested for you */}
              {suggestedListings.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Suggested for you</h2>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-4 pb-4">
                      {suggestedListings.map((listing, idx) => (
                        <ToolCard
                          key={listing.id}
                          listing={listing}
                          onClick={() => handleViewDetails(listing)}
                          colorIndex={idx}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

              {/* Category Sections */}
              {Object.entries(groupedListings).map(([categoryName, categoryListings]) => (
                <CategorySection
                  key={categoryName}
                  categoryName={categoryName}
                  categoryListings={categoryListings}
                  onViewDetails={handleViewDetails}
                />
              ))}

              {listings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No tools found</p>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'top-charts' && (
            <div className="space-y-2">
              {topChartListings.map((listing, idx) => (
                <TopChartCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => handleViewDetails(listing)}
                  rank={idx + 1}
                  colorIndex={idx}
                />
              ))}
            </div>
          )}

          {selectedTab === 'categories' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, idx) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  colorIndex={idx}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-20">
          <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
            <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Top</span>
            </Button>
            <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
              <Search className="h-5 w-5" />
              <span className="text-xs">Search</span>
            </Button>
            <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Library</span>
            </Button>
            <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
              <User className="h-5 w-5" />
              <span className="text-xs">You</span>
            </Button>
          </div>
        </div>

        <ListingDetailsModal
          listing={selectedListing}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          isFavorited={selectedListing ? userFavorites.some(fav => fav.listing_id === selectedListing.id) : false}
        />
      </div>
    </TierGate>
  );
}