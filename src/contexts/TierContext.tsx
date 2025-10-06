import { createContext, useContext, ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

interface TierContextType {
  tierName: string | null;
  maxToolsAccess: number;
  maxListings: number;
  canAccessFeature: (feature: string) => boolean;
  loading: boolean;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children }: { children: ReactNode }) => {
  const { subscription, loading } = useSubscription();

  const tierName = subscription?.tier?.name || null;
  const maxToolsAccess = subscription?.tier?.max_tools_access || 0;
  const maxListings = subscription?.tier?.max_listings || 0;

  const canAccessFeature = (feature: string): boolean => {
    if (!tierName) return false;
    
    const tierFeatures: Record<string, string[]> = {
      starter: ['basic_tools', 'learning_paths', 'community'],
      creator: ['basic_tools', 'learning_paths', 'community', 'advanced_tools', 'marketplace', 'referrals'],
      career: ['basic_tools', 'learning_paths', 'community', 'advanced_tools', 'marketplace', 'referrals', 'premium_support', 'analytics', 'priority_access']
    };

    return tierFeatures[tierName]?.includes(feature) || false;
  };

  return (
    <TierContext.Provider value={{ tierName, maxToolsAccess, maxListings, canAccessFeature, loading }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (context === undefined) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
};
