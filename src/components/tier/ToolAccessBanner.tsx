import { useTier } from '@/contexts/TierContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ToolAccessBanner = () => {
  const { tierName, maxToolsAccess } = useTier();
  const navigate = useNavigate();

  if (tierName === 'career') {
    return null; // Career tier has unlimited access
  }

  return (
    <div className="container mx-auto px-6 py-4">
      <Alert className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <Lock className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          {tierName === 'starter' && 'Starter Tier - Limited Tool Access'}
          {tierName === 'creator' && 'Creator Tier - Extended Tool Access'}
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between mt-2">
          <span>
            You can access up to <strong>{maxToolsAccess} AI tools</strong>.
            {tierName === 'starter' && ' Upgrade to Creator for 10 tools or Career for unlimited access.'}
            {tierName === 'creator' && ' Upgrade to Career for unlimited access to all tools.'}
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
