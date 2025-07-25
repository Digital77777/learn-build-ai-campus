import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/marketplace/HeroSection";
import StatsSection from "@/components/marketplace/StatsSection";
import CategoriesSection from "@/components/marketplace/CategoriesSection";
import FeaturedListingsSection from "@/components/marketplace/FeaturedListingsSection";
import HowItWorksSection from "@/components/marketplace/HowItWorksSection";
import SecurityTrustSection from "@/components/marketplace/SecurityTrustSection";

const MarketplacePage = () => {
  const [marketplaceCategories, setMarketplaceCategories] = useState<any[]>([]);
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from("marketplace_categories")
        .select("*");
      if (categoriesError) console.error("Error fetching categories:", categoriesError);
      else setMarketplaceCategories(categories);

      const { data: listings, error: listingsError } = await supabase
        .from("featured_listings")
        .select("*");
      if (listingsError) console.error("Error fetching listings:", listingsError);

      const { data: creations, error: creationsError } = await supabase
        .from("user_creations")
        .select("*");
      if (creationsError) console.error("Error fetching creations:", creationsError);

      if (listings && creations) {
        setFeaturedListings([...listings, ...creations]);
      } else if (listings) {
        setFeaturedListings(listings);
      } else if (creations) {
        setFeaturedListings(creations);
      }

      const { data: statsData, error: statsError } = await supabase
        .from("marketplace_stats")
        .select("*");
      if (statsError) console.error("Error fetching stats:", statsError);
      else setStats(statsData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection stats={stats} />
      <CategoriesSection categories={marketplaceCategories} />
      <FeaturedListingsSection listings={featuredListings} />
      <HowItWorksSection />
      <SecurityTrustSection />
    </div>
  );
};

export default MarketplacePage;