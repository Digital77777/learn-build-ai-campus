import { useTier } from '@/contexts/TierContext';
import { StarterDashboard } from '@/components/tier/StarterDashboard';
import { CreatorDashboard } from '@/components/tier/CreatorDashboard';
import { CareerDashboard } from '@/components/tier/CareerDashboard';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage = () => {
  const { tierName, loading } = useTier();

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {tierName === 'starter' && <StarterDashboard />}
        {tierName === 'creator' && <CreatorDashboard />}
        {tierName === 'career' && <CareerDashboard />}
        {!tierName && <StarterDashboard />}
      </div>
    </div>
  );
};

export default DashboardPage;
