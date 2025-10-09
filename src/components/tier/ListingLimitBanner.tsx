import { useTier } from '@/contexts/TierContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Store, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ListingLimitBanner = () => {
  const { tierName, maxListings } = useTier();
  const navigate = useNavigate();

  if (tierName === 'career') {
    return null; // Career tier has unlimited listings
  }

  return (
    <div className="mb-6">
      <Alert className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <Store className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          {tierName === 'starter' && 'Starter Tier - Limited Listings'}
          {tierName === 'creator' && 'Creator Tier - Extended Listings'}
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between mt-2">
          <span>
            You can create up to <strong>{maxListings} marketplace listing{maxListings !== 1 ? 's' : ''}</strong>.
            {tierName === 'starter' && ' Upgrade to Creator for 10 listings or Career for unlimited listings.'}
            {tierName === 'creator' && ' Upgrade to Career for unlimited listings.'}
          </span>
          {tierName !== 'career' && (
            <Button
              size="sm"
              variant="default"
              className="ml-4"
              onClick={() => navigate('/subscription')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};
