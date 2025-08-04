import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface MarketplaceListing {
  id: string;
  user_id: string;
  category_id?: string;
  title: string;
  description: string;
  listing_type: 'product' | 'service' | 'job';
  status: 'draft' | 'active' | 'paused' | 'sold' | 'expired';
  price?: number;
  currency?: string;
  images?: string[];
  videos?: string[];
  creation_link?: string;
  tags?: string[];
  requirements?: string;
  delivery_time?: number;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface MarketplaceFilters {
  category?: string;
  type?: 'product' | 'service' | 'job';
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  isRemote?: boolean;
  search?: string;
  sortBy?: 'newest' | 'price_low' | 'price_high' | 'rating' | 'popular';
}

export const useMarketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [categories, setCategories] = useState<MarketplaceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_categories')
        .select('id, name, description, icon')
        .eq('is_active', true);

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch listings with filters
  const fetchListings = async (filters: MarketplaceFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('marketplace_listings')
        .select('*')
        .eq('status', 'active');

      // Apply filters
      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      if (filters.type) {
        query = query.eq('listing_type', filters.type);
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings((data || []) as MarketplaceListing[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new listing
  const createListing = async (listingData: any) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      // Map camelCase fields to snake_case database columns and ensure required fields
      const dbData = {
        title: listingData.title || '',
        description: listingData.description || '',
        listing_type: listingData.listing_type || 'product',
        user_id: user.id,
        status: 'active',
        category_id: listingData.category_id,
        price: listingData.price,
        currency: listingData.currency || 'USD',
        images: listingData.images || [],
        videos: listingData.videos || [],
        creation_link: listingData.creationLink || listingData.creation_link,
        tags: listingData.tags || [],
        requirements: listingData.requirements,
        delivery_time: listingData.delivery_time,
        is_featured: false,
      };

      const { data, error } = await supabase
        .from('marketplace_listings')
        .insert([dbData])
        .select()
        .single();

      if (error) throw error;
      return data as MarketplaceListing;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Update a listing
  const updateListing = async (id: string, updates: Partial<MarketplaceListing>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a listing
  const deleteListing = async (id: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('marketplace_listings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Get user's listings
  const getUserListings = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  // Add to favorites
  const addToFavorites = async (listingId: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('marketplace_favorites')
        .insert([{ user_id: user.id, listing_id: listingId }]);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (listingId: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('marketplace_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', listingId);

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Get user's favorites
  const getUserFavorites = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('marketplace_favorites')
        .select(`
          listing_id,
          marketplace_listings(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data?.map(fav => fav.marketplace_listings).filter(Boolean) || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    listings,
    categories,
    loading,
    error,
    fetchListings,
    createListing,
    updateListing,
    deleteListing,
    getUserListings,
    addToFavorites,
    removeFromFavorites,
    getUserFavorites,
  };
};