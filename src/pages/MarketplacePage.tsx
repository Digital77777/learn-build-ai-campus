import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Store, Briefcase, Users, Code, DollarSign, ArrowRight, Star, MapPin, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const MarketplacePage = () => {
  const [marketplaceCategories, setMarketplaceCategories] = useState<any[]>([]);
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  const icons: { [key: string]: React.ComponentType<any> } = {
    Store,
    Briefcase,
    Users,
    Code,
    DollarSign,
    TrendingUp,
  };

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
      else setFeaturedListings(listings);

      const { data: statsData, error: statsError } = await supabase
        .from("marketplace_stats")
        .select("*");
      if (statsError) console.error("Error fetching stats:", statsError);
      else setStats(statsData);
    };

    fetchData();
  }, []);

  const renderIcon = (iconName: string) => {
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-8 w-8" /> : null;
  };

  const renderStatIcon = (iconName: string) => {
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-success/10 rounded-full">
              <Store className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">AI Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-earn bg-clip-text text-transparent">
                AI Marketplace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Buy, sell, and hire in the world's largest AI marketplace. Connect with experts, showcase your skills, and grow your business
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/sell">
                <Button size="lg" className="bg-gradient-earn text-white hover:opacity-90">
                  <Store className="h-5 w-5 mr-2" />
                  Start Selling
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Browse Marketplace
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-primary">{renderStatIcon(stat.icon)}</div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Categories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Marketplace Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover opportunities to monetize your AI skills and connect with the global AI community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketplaceCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-ai transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white mb-4`}>
                    {renderIcon(category.icon)}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-bold text-success">
                      {category.feature}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button className="w-full group/btn">
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore top-rated products, services, and job opportunities in the AI marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {listing.category}
                    </Badge>
                    {listing.type === "product" && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{listing.rating}</span>
                      </div>
                    )}
                    {listing.type === "service" && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{listing.rating}</span>
                      </div>
                    )}
                    {listing.type === "job" && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2">{listing.title}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {listing.type === "job" ? listing.company : `by ${listing.seller || listing.company}`}
                    </span>
                    <span className="font-bold text-primary">
                      {listing.price || listing.salary}
                    </span>
                  </div>
                  
                  {(listing.sales || listing.reviews) && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {listing.sales ? `${listing.sales} sales` : `${listing.reviews} reviews`}
                    </p>
                  )}
                  
                  <Button size="sm" variant="outline" className="w-full">
                    {listing.type === "job" ? "Apply Now" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start selling, buying, or hiring in the AI marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Set up your profile, showcase your skills, and build your reputation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">List or Browse</h3>
              <p className="text-muted-foreground">
                Create listings for your services or browse available opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Transact</h3>
              <p className="text-muted-foreground">
                Secure transactions with built-in protection and payment processing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Shield className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure & Trusted</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your transactions are protected with secure payment processing, verified profiles, and comprehensive dispute resolution
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;