import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingForm } from '@/components/marketplace/ListingForm';
import { useMarketplace, type MarketplaceListing } from '@/hooks/useMarketplace';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { TierGate } from '@/components/tier/TierGate';
import { ListingLimitBanner } from '@/components/tier/ListingLimitBanner';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, createListing } = useMarketplace();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<MarketplaceListing>) => {
    if (!user) {
      toast.error('Please sign in to create a listing');
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    try {
      await createListing({
        ...data,
        user_id: user.id,
        status: 'active',
        title: data.title || '',
        description: data.description || '',
        listing_type: data.listing_type || 'product',
      } as Omit<MarketplaceListing, 'id' | 'created_at' | 'updated_at'>);
      toast.success('Listing created successfully!');
      navigate('/marketplace/browse');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating listing:', error);
      }
      toast.error('Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/marketplace');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to create a marketplace listing.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TierGate feature="marketplace_sell">
      <div className="min-h-screen bg-background">
        
        <div className="container mx-auto px-6 pt-24 pb-12">
          <ListingLimitBanner />
          <ListingForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </TierGate>
  );
};

export default CreateListingPage;