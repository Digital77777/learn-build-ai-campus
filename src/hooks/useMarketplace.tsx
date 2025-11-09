import { useState, useEffect, useCallback } from 'react';
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
  page?: number;
  limit?: number;
}

export const useMarketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [suggestedListings, setSuggestedListings] = useState<MarketplaceListing[]>([]);
  const [topChartListings, setTopChartListings] = useState<MarketplaceListing[]>([]);
  const [categoryListings, setCategoryListings] = useState<Record<string, MarketplaceListing[]>>({});
  const [categories, setCategories] = useState<MarketplaceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch categories - memoized
  const fetchCategories = useCallback(async () => {
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
  }, []);

  // Fetch listings with filters - memoized
  const fetchListings = useCallback(async (filters: MarketplaceFilters = {}, reset = false) => {
    setLoading(true);
    setError(null);

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    try {
      let query = supabase
        .from('marketplace_listings')
        .select('*', { count: 'exact' })
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

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const newLen = data?.length || 0;
      setHasMore(newLen === limit);

      if (reset) {
        if (filters.sortBy === 'rating') {
          setTopChartListings((data || []) as MarketplaceListing[]);
        } else {
          setListings((data || []) as MarketplaceListing[]);
        }
      } else {
        if (filters.sortBy === 'rating') {
            setTopChartListings(prev => [...prev, ...(data || [])] as MarketplaceListing[]);
        } else {
            setListings(prev => [...prev, ...(data || [])] as MarketplaceListing[]);
        }
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch listings';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new listing - memoized
  const createListing = useCallback(async (listingData: Omit<MarketplaceListing, 'id' | 'created_at' | 'updated_at'>) => {
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
        creation_link: listingData.creation_link,
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create listing';
      setError(errorMessage);
      throw err;
    }
  }, [user]);

  // Update a listing - memoized
  const updateListing = useCallback(async (id: string, updates: Partial<MarketplaceListing>) => {
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
  }, [user]);

  // Delete a listing - memoized
  const deleteListing = useCallback(async (id: string) => {
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
  }, [user]);

  // Get user's listings - memoized
  const getUserListings = useCallback(async () => {
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
  }, [user]);

  // Add to favorites - memoized
  const addToFavorites = useCallback(async (listingId: string) => {
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
  }, [user]);

  // Remove from favorites - memoized
  const removeFromFavorites = useCallback(async (listingId: string) => {
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
  }, [user]);

  // Get user's favorites - memoized
  const getUserFavorites = useCallback(async () => {
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
  }, [user]);

  const fetchSuggestedListings = useCallback(async () => {
    fetchListings({ sortBy: 'popular', limit: 6 }).then(data => setSuggestedListings((data || []) as MarketplaceListing[]));
  }, [fetchListings]);

  const fetchTopChartListings = useCallback(async () => {
    fetchListings({ sortBy: 'rating', limit: 20 }).then(data => setTopChartListings((data || []) as MarketplaceListing[]));
  }, [fetchListings]);

  const fetchCategoryListings = useCallback(async () => {
    const { data: allListings } = await supabase.from('marketplace_listings').select('*, marketplace_categories(name)').eq('status', 'active');
    if (!allListings) return;

    const listingsPerCategory = allListings.reduce((acc, listing) => {
      const categoryName = listing.marketplace_categories.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(listing as MarketplaceListing);
      return acc;
    }, {} as Record<string, MarketplaceListing[]>);

    setCategoryListings(listingsPerCategory);
  }, []);


  useEffect(() => {
    fetchCategories();
    fetchSuggestedListings();
    fetchTopChartListings();
    fetchCategoryListings();
  }, [fetchCategories, fetchSuggestedListings, fetchTopChartListings, fetchCategoryListings]);

  return {
    listings,
    suggestedListings,
    topChartListings,
    categoryListings,
    categories,
    loading,
    error,
    hasMore,
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