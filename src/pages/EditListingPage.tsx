import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ListingForm } from '@/components/marketplace/ListingForm';
import { useMarketplace, MarketplaceListing } from '@/hooks/useMarketplace';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateListing } = useMarketplace();
  const [listing, setListing] = useState<MarketplaceListing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchListing();
  }, [user, id]);

  const fetchListing = async () => {
    if (!id || !user) return;

    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setListing(data as MarketplaceListing);
    } catch (error) {
      console.error('Error fetching listing:', error);
      toast.error('Failed to load listing');
      navigate('/marketplace/my-listings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<MarketplaceListing>) => {
    if (!id) return;

    setIsLoading(true);
    try {
      await updateListing(id, data);
      toast.success('Listing updated successfully!');
      navigate('/marketplace/my-listings');
    } catch (error) {
      toast.error('Failed to update listing');
      console.error('Error updating listing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/marketplace/my-listings');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to edit your marketplace listing.
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading listing...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The listing you're trying to edit doesn't exist or you don't have permission to edit it.
            </p>
            <button
              onClick={() => navigate('/marketplace/my-listings')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Back to My Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Edit Listing</h1>
          <p className="text-muted-foreground">Update your marketplace listing</p>
        </div>
        <ListingForm
          initialData={listing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditListingPage;