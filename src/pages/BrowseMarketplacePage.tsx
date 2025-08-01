import Navigation from "@/components/Navigation";
import { Search, Filter, Grid, List, Star, Clock, MapPin, DollarSign, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useMarketplace, MarketplaceFilters } from "@/hooks/useMarketplace";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { toast } from "sonner";

const BrowseMarketplacePage = () => {
  const { listings, categories, loading, error, fetchListings, addToFavorites, removeFromFavorites } = useMarketplace();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const filters: MarketplaceFilters = {
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      type: selectedType as any || undefined,
      sortBy: sortBy as any || 'newest',
    };
    fetchListings(filters);
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFavorite = async (listingId: string) => {
    try {
      if (favorites.has(listingId)) {
        await removeFromFavorites(listingId);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(listingId);
          return newSet;
        });
        toast.success("Removed from favorites");
      } else {
        await addToFavorites(listingId);
        setFavorites(prev => new Set(prev).add(listingId));
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  const handleContact = (listing: any) => {
    // TODO: Implement contact/messaging functionality
    toast.info("Contact functionality coming soon!");
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Marketplace</h1>
          <p className="text-muted-foreground text-lg">
            Discover thousands of AI products, services, and opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, services, or jobs..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="product">Products</SelectItem>
                <SelectItem value="service">Services</SelectItem>
                <SelectItem value="job">Jobs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Badge variant="secondary">
              {listings.filter(l => l.listing_type === 'product').length} Products
            </Badge>
            <Badge variant="secondary">
              {listings.filter(l => l.listing_type === 'service').length} Services
            </Badge>
            <Badge variant="secondary">
              {listings.filter(l => l.listing_type === 'job').length} Jobs
            </Badge>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {listings.length} results
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading listings...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading listings: {error}</p>
            <Button onClick={() => fetchListings()} className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onFavorite={handleFavorite}
                onContact={handleContact}
                isFavorited={favorites.has(listing.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No listings found</p>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Load More */}
        {!loading && !error && listings.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseMarketplacePage;
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseMarketplacePage;