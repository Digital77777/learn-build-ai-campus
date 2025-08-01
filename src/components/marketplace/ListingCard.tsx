import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MapPin, Clock, Star, Eye } from "lucide-react";
import { MarketplaceListing } from "@/hooks/useMarketplace";
import { useState } from "react";

interface ListingCardProps {
  listing: MarketplaceListing;
  onFavorite?: (listingId: string) => void;
  onContact?: (listing: MarketplaceListing) => void;
  isFavorited?: boolean;
}

export const ListingCard = ({ listing, onFavorite, onContact, isFavorited = false }: ListingCardProps) => {
  const [favorited, setFavorited] = useState(isFavorited);

  const handleFavorite = () => {
    setFavorited(!favorited);
    onFavorite?.(listing.id);
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'service':
        return 'bg-green-100 text-green-800';
      case 'job':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge className={`text-xs ${getTypeColor(listing.listing_type)}`}>
            {listing.listing_type}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className="p-1 h-auto"
          >
            <Heart
              className={`h-4 w-4 ${
                favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </Button>
        </div>

        {listing.images && listing.images.length > 0 && (
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Seller Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={listing.user_profiles?.avatar_url} />
            <AvatarFallback>
              {listing.user_profiles?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {listing.user_profiles?.full_name || listing.user_profiles?.username}
            </p>
            {listing.user_profiles?.seller_rating && listing.user_profiles.seller_rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {listing.user_profiles.seller_rating.toFixed(1)} ({listing.user_profiles.total_reviews})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price and Details */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {listing.price && (
              <div className="text-lg font-bold text-primary">
                {formatPrice(listing.price, listing.currency)}
                {listing.listing_type === 'service' && '/hr'}
              </div>
            )}
            {listing.listing_type === 'job' && listing.metadata?.salary && (
              <div className="text-lg font-bold text-primary">
                {listing.metadata.salary}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {listing.views_count > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {listing.views_count}
              </div>
            )}
          </div>
        </div>

        {/* Location and Remote */}
        {(listing.location || listing.is_remote) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {listing.is_remote ? 'Remote' : listing.location}
          </div>
        )}

        {/* Delivery Time */}
        {listing.delivery_time && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {listing.delivery_time}
          </div>
        )}

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {listing.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {listing.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{listing.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          className="w-full"
          onClick={() => onContact?.(listing)}
        >
          {listing.listing_type === 'job' ? 'Apply Now' : 
           listing.listing_type === 'service' ? 'Contact Seller' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};