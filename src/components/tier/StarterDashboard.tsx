import { BookOpen, Brain, Users, Sparkles, GraduationCap, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TierHero } from './shared/TierHero';
import { FeatureCard } from './shared/FeatureCard';
import { BenefitsList } from './shared/BenefitsList';
import { QuickStats } from './shared/QuickStats';

export const StarterDashboard = () => {
  const navigate = useNavigate();

  const benefits = [
    "Access to 3 essential AI learning tools",
    "Foundation-level courses and tutorials",
    "Community discussion forums",
    "Basic learning path recommendations",
    "Progress tracking dashboard",
    "Email support within 48 hours"
  ];

  const stats = [
    { value: "3", label: "AI Tools", icon: <Brain className="h-6 w-6 text-primary" /> },
    { value: "10+", label: "Free Courses", icon: <GraduationCap className="h-6 w-6 text-primary" /> },
    { value: "1,000+", label: "Community Members", icon: <Users className="h-6 w-6 text-primary" /> }
  ];

  return (
    <div className="space-y-8">
      <TierHero 
        title="Start Your AI Journey"
        subtitle="Perfect for beginners ready to explore the world of artificial intelligence"
        icon={<Sparkles className="h-16 w-16 text-primary" />}
        gradient="learning"
      />

      <QuickStats stats={stats} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">What You Get</h2>
        <BenefitsList benefits={benefits} columns={2} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Start Learning Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10 text-primary" />}
            title="Learning Paths"
            description="Begin with curated courses designed for AI beginners"
            buttonText="Explore Courses"
            onClick={() => navigate('/learning-paths')}
            variant="highlighted"
          />

          <FeatureCard
            icon={<Brain className="h-10 w-10 text-primary" />}
            title="Basic AI Tools"
            description="Get hands-on with 3 powerful AI tools"
            buttonText="Try Tools"
            onClick={() => navigate('/ai-tools')}
            variant="highlighted"
          />

          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Join Community"
            description="Connect with fellow learners and share experiences"
            buttonText="Join Now"
            onClick={() => navigate('/community')}
            variant="default"
          />
        </div>
      </div>

      <div className="bg-gradient-learning p-8 rounded-lg text-center text-primary-foreground">
        <PlayCircle className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ready to Level Up?</h3>
        <p className="mb-4 opacity-90">Upgrade to Creator or Career tier for more tools and earning opportunities</p>
      </div>
    </div>
  );
};
