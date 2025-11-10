import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import AITools from "@/components/AITools";
import EarningsSection from "@/components/EarningsSection";
import Footer from "@/components/Footer";
import { WhatsAppReferralButton } from "@/components/WhatsAppReferralButton";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/contexts/TierContext";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { user } = useAuth();
  const { tierName, loading } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to their tier-specific dashboard
    if (user && !loading && tierName) {
      navigate('/dashboard');
    }
  }, [user, tierName, loading, navigate]);

  // Show loading state while checking authentication
  if (user && loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  // Show standard landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="preload" as="image" href="/hero-ai-education-optimized-889x500.jpg" fetchPriority="high" />
      </Helmet>
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <LearningPaths />
        <AITools />
        <EarningsSection />
      </main>
      <Footer />
      <WhatsAppReferralButton />
    </div>
  );
};

export default Index;
