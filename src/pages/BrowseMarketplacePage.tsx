import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, ChevronRight, Star, Home, TrendingUp, Grid3x3, BookOpen, User, Download } from 'lucide-react';
import { useMarketplace, MarketplaceListing } from '@/hooks/useMarketplace';
import { ListingDetailsModal } from '@/components/marketplace/ListingDetailsModal';
import { useAuth } from '@/hooks/useAuth';
import { TierGate } from '@/components/tier/TierGate';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsDetailsModalOpen(true);
  };

  // Group listings by category for "For You" tab
  const groupedListings = categories.reduce((acc, category) => {
    const categoryListings = listings.filter(l => l.category_id === category.id);
    if (categoryListings.length > 0) {
      acc[category.name] = categoryListings;
    }
    return acc;
  }, {} as Record<string, MarketplaceListing[]>);

  // Add "Suggested for you" section with random selection
  const suggestedListings = listings.slice(0, 6);

  const getIconColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
    return colors[index % colors.length];
  };

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
                        <Card 
                          key={listing.id} 
                          className="inline-block w-[320px] cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => handleViewDetails(listing)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <div className={`w-14 h-14 rounded-lg ${getIconColor(idx)} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-2xl font-bold text-white">{listing.title.charAt(0)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-base truncate">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs ml-1">4.5</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">{listing.listing_type}</Badge>
                                  {listing.price && <span className="text-xs font-semibold">${listing.price}</span>}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}

              {/* Category Sections */}
              {Object.entries(groupedListings).map(([categoryName, categoryListings]) => (
                <div key={categoryName}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{categoryName}</h2>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-4 pb-4">
                      {categoryListings.slice(0, 10).map((listing, idx) => (
                        <Card 
                          key={listing.id} 
                          className="inline-block w-[320px] cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => handleViewDetails(listing)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <div className={`w-14 h-14 rounded-lg ${getIconColor(idx)} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-2xl font-bold text-white">{listing.title.charAt(0)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-base truncate">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs ml-1">4.5</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">{listing.listing_type}</Badge>
                                  {listing.price && <span className="text-xs font-semibold">${listing.price}</span>}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
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
              {listings.slice(0, 20).map((listing, idx) => (
                <Card 
                  key={listing.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewDetails(listing)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-muted-foreground w-8">{idx + 1}</span>
                      <div className={`w-12 h-12 rounded-lg ${getIconColor(idx)} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl font-bold text-white">{listing.title.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{listing.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.5</span>
                          {listing.price && <span className="text-xs">• ${listing.price}</span>}
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-1" />
                        Install
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'categories' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, idx) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${getIconColor(idx)} flex items-center justify-center mx-auto mb-3`}>
                      <Grid3x3 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
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