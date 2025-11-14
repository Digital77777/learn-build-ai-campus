import { ReactNode } from 'react';
import { useTier } from '@/contexts/TierContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TierGateProps {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export const TierGate = ({ feature, children, fallback }: TierGateProps) => {
  const { canAccessFeature, loading } = useTier();
  const navigate = useNavigate();

  if (loading) return <div className="animate-pulse">{children}</div>;

  if (!canAccessFeature(feature)) {
    return fallback || (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Premium Feature
          </CardTitle>
          <CardDescription>
            This feature requires a higher subscription tier.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/subscription')}>
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};
