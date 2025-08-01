import Navigation from "@/components/Navigation";
import { Search, Filter, Grid, List, Star, Clock, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const BrowseMarketplacePage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const listings = [
    {
      id: 1,
      title: "GPT-4 Prompt Templates Pack",
      seller: "AI_Expert_Pro",
      price: "$29",
      rating: 4.9,
      sales: "1.2k",
      type: "product",
      category: "Templates",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Machine Learning Consulting",
      seller: "DataScience_Guru",
      price: "$150/hr",
      rating: 4.8,
      reviews: "89",
      type: "service",
      category: "Consulting"
    },
    {
      id: 3,
      title: "Senior AI Engineer - Remote",
      company: "TechInnovate Co.",
      salary: "$120k-180k",
      location: "Remote",
      type: "job",
      category: "Full-time"
    },
    {
      id: 4,
      title: "AI Chatbot Development",
      seller: "ChatBot_Masters",
      price: "$500",
      rating: 4.7,
      sales: "324",
      type: "service",
      category: "Development"
    },
    {
      id: 5,
      title: "Computer Vision Course",
      seller: "VisionAI_Academy",
      price: "$199",
      rating: 4.9,
      sales: "856",
      type: "product",
      category: "Education"
    },
    {
      id: 6,
      title: "AI Product Manager",
      company: "StartupXYZ",
      salary: "$100k-150k",
      location: "San Francisco",
      type: "job",
      category: "Full-time"
    }
  ];

  const categories = ["All", "Templates", "Consulting", "Development", "Education", "Full-time"];
  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Highest Rated", "Most Popular"];

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                    {option}
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
            <Badge variant="secondary">Products (450)</Badge>
            <Badge variant="secondary">Services (280)</Badge>
            <Badge variant="secondary">Jobs (120)</Badge>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredListings.length} results
          </p>
        </div>

        {/* Listings Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
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
                
                <h3 className="font-semibold mb-2 line-clamp-2">{listing.title}</h3>
                
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
                
                <Button size="sm" className="w-full">
                  {listing.type === "job" ? "Apply Now" : "View Details"}
                </Button>
              </CardContent>
            </Card>
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