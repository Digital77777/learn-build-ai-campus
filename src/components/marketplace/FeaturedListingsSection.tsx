import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

const FeaturedListingsSection = ({ listings }: { listings: any[] }) => (
  <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore top-rated products, services, and job opportunities in the AI marketplace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
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
);

export default FeaturedListingsSection;
