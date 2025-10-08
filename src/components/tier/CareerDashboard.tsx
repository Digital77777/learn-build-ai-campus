import { Brain, Store, Gift, TrendingUp, Sparkles, Zap, Crown, HeadphonesIcon, Trophy, Target, Infinity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TierHero } from './shared/TierHero';
import { FeatureCard } from './shared/FeatureCard';
import { BenefitsList } from './shared/BenefitsList';
import { QuickStats } from './shared/QuickStats';

export const CareerDashboard = () => {
  const navigate = useNavigate();

  const benefits = [
    "Unlimited access to all AI tools and features",
    "Unlimited marketplace product listings",
    "Maximum referral commission rates (20%)",
    "Advanced analytics and business intelligence",
    "24/7 priority support with dedicated account manager",
    "Early access to beta features and new releases",
    "VIP community membership and exclusive events",
    "Professional creator certification program",
    "Custom branding and white-label options",
    "API access for custom integrations",
    "Monthly strategy consultation sessions",
    "Featured placement in marketplace"
  ];

  const stats = [
    { value: "∞", label: "AI Tools", icon: <Brain className="h-6 w-6 text-primary" /> },
    { value: "∞", label: "Listings", icon: <Store className="h-6 w-6 text-primary" /> },
    { value: "20%", label: "Commission", icon: <Trophy className="h-6 w-6 text-primary" /> }
  ];

  return (
    <div className="space-y-8">
      <TierHero 
        title="Maximize Your AI Career"
        subtitle="The ultimate platform for AI professionals to earn, scale, and dominate"
        icon={
          <div className="flex items-center gap-2">
            <Crown className="h-16 w-16 text-primary" />
            <Trophy className="h-16 w-16 text-accent-foreground" />
          </div>
        }
        gradient="earn"
      />

      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 rounded-lg text-center">
        <Target className="h-12 w-12 mx-auto mb-3 text-primary" />
        <h3 className="text-xl font-bold mb-2">Professional Growth Guaranteed</h3>
        <p className="text-muted-foreground">Everything you need to build a thriving AI career</p>
      </div>

      <QuickStats stats={stats} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Elite Career Features</h2>
        <BenefitsList benefits={benefits} columns={3} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Your Professional Command Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Infinity className="h-10 w-10 text-primary" />}
            title="Unlimited AI Tools"
            description="Full access to every tool, forever"
            buttonText="Access All Tools"
            onClick={() => navigate('/ai-tools')}
            variant="premium"
          />

          <FeatureCard
            icon={<Store className="h-10 w-10 text-primary" />}
            title="Unlimited Listings"
            description="Scale your marketplace presence without limits"
            buttonText="Manage Store"
            onClick={() => navigate('/marketplace')}
            variant="premium"
          />

          <FeatureCard
            icon={<Trophy className="h-10 w-10 text-primary" />}
            title="Premium Referrals"
            description="Earn 20% commission on every referral"
            buttonText="Maximize Earnings"
            onClick={() => navigate('/referral')}
            variant="premium"
          />

          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 text-primary" />}
            title="Advanced Analytics"
            description="Deep insights, forecasting, and business intelligence"
            buttonText="View Dashboard"
            onClick={() => navigate('/dashboard')}
            variant="highlighted"
          />

          <FeatureCard
            icon={<HeadphonesIcon className="h-10 w-10 text-primary" />}
            title="Priority Support"
            description="24/7 dedicated support with personal account manager"
            buttonText="Contact Support"
            onClick={() => navigate('/dashboard')}
            variant="highlighted"
          />

          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Early Access"
            description="Be first to try new features and beta releases"
            buttonText="Explore Beta"
            onClick={() => navigate('/ai-tools')}
            variant="highlighted"
          />

          <FeatureCard
            icon={<Crown className="h-10 w-10 text-primary" />}
            title="VIP Community"
            description="Exclusive access to elite AI professionals network"
            buttonText="Join VIP"
            onClick={() => navigate('/community')}
            variant="default"
          />

          <FeatureCard
            icon={<Sparkles className="h-10 w-10 text-primary" />}
            title="Pro Creator Suite"
            description="White-label options and custom branding"
            buttonText="Customize"
            onClick={() => navigate('/ai-tools')}
            variant="default"
          />

          <FeatureCard
            icon={<Target className="h-10 w-10 text-primary" />}
            title="Strategy Sessions"
            description="Monthly consultations to optimize your career"
            buttonText="Schedule"
            onClick={() => navigate('/dashboard')}
            variant="default"
          />
        </div>
      </div>

      <div className="bg-gradient-earn p-8 rounded-lg text-center text-primary-foreground">
        <Crown className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">You're at the Top</h3>
        <p className="mb-4 opacity-90">Join the elite community of AI professionals earning serious income</p>
        <Button 
          variant="secondary" 
          size="lg"
          onClick={() => navigate('/referrals')}
          className="mt-4"
        >
          Share & Earn More
        </Button>
      </div>
    </div>
  );
};
