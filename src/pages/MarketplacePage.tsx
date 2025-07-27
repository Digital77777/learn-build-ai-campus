import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/marketplace/HeroSection";
import StatsSection from "@/components/marketplace/StatsSection";
import CategoriesSection from "@/components/marketplace/CategoriesSection";
import HowItWorksSection from "@/components/marketplace/HowItWorksSection";
import SecurityTrustSection from "@/components/marketplace/SecurityTrustSection";
import FiltersSidebar from "@/components/marketplace/FiltersSidebar";
import Listings from "@/components/marketplace/Listings";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MarketplacePage = () => {
  const [marketplaceCategories, setMarketplaceCategories] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from("marketplace_categories")
        .select("*");
      if (categoriesError) console.error("Error fetching categories:", categoriesError);
      else setMarketplaceCategories(categories);

      const { data: listingsData, error: listingsError } = await supabase
        .from("featured_listings")
        .select("*");
      if (listingsError) console.error("Error fetching listings:", listingsError);
      else setListings(listingsData);

      const { data: statsData, error: statsError } = await supabase
        .from("marketplace_stats")
        .select("*");
      if (statsError) console.error("Error fetching stats:", statsError);
      else setStats(statsData);
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection stats={stats} />
      <CategoriesSection categories={marketplaceCategories} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FiltersSidebar />
          </div>
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for listings..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Listings listings={filteredListings} />
          </div>
        </div>
      </div>
      <HowItWorksSection />
      <SecurityTrustSection />
    </div>
  );
};

export default MarketplacePage;