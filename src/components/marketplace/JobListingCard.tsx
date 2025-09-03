import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Building, Users } from 'lucide-react';
import { MarketplaceListing } from '@/hooks/useMarketplace';

interface JobListingCardProps {
  listing: MarketplaceListing;
  onApply?: (listingId: string) => void;
  onViewDetails?: (listing: MarketplaceListing) => void;
}

export const JobListingCard: React.FC<JobListingCardProps> = ({
  listing,
  onApply,
  onViewDetails
}) => {
  // For now, we'll use empty metadata since it's not in the current schema
  const metadata: any = {};
  
  const formatSalary = (min: number, max: number) => {
    if (!min && !max) return 'Salary not specified';
    if (!max) return `$${min.toLocaleString()}+`;
    if (!min) return `Up to $${max.toLocaleString()}`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'freelance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-purple-100 text-purple-800">
            Job Opportunity
          </Badge>
          {metadata.employment_type && (
            <Badge className={getEmploymentTypeColor(metadata.employment_type)}>
              {metadata.employment_type}
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {listing.title}
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {metadata.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{metadata.location}</span>
            </div>
          )}
          {metadata.is_remote && (
            <Badge variant="outline" className="text-xs">
              Remote
            </Badge>
          )}
          {metadata.experience_level && (
            <Badge variant="outline" className="text-xs">
              {metadata.experience_level}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {listing.description}
        </p>
        
        {/* Salary */}
        {(metadata.salary_min || metadata.salary_max) && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-success" />
            <span className="font-semibold text-success">
              {formatSalary(metadata.salary_min, metadata.salary_max)}
            </span>
            <span className="text-xs text-muted-foreground">per year</span>
          </div>
        )}
        
        {/* Skills */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Required Skills:</div>
            <div className="flex flex-wrap gap-1">
              {listing.tags.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {listing.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{listing.tags.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Application Deadline */}
        {metadata.application_deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Apply by {new Date(metadata.application_deadline).toLocaleDateString()}</span>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1"
            onClick={() => onApply?.(listing.id)}
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onViewDetails?.(listing)}
          >
            View Details
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Posted: {new Date(listing.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};