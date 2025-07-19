import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRight } from "lucide-react";
import EarningOpportunityCard from "@/components/earnings/EarningOpportunityCard";
import SuccessStoryCard from "@/components/earnings/SuccessStoryCard";
import { successStories } from "@/components/earnings/data";
import { useEarningOpportunities } from "@/hooks/useEarningOpportunities";

const EarningsSection = () => {
  const { data: earningOpportunities, loading, error } = useEarningOpportunities();
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-earn px-4 py-2 rounded-full">
            <DollarSign className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Earn While Learning</span>
          </div>
          <h2 className="text-4xl font-bold">Turn Your AI Skills Into Income</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start earning money with your AI knowledge from day one. Our platform connects 
            you with real opportunities to monetize your skills while you study.
          </p>
        </div>

        {/* Earning Opportunities */}
        {loading ? (
          <div className="text-center py-12">Loading opportunities...</div>
        ) : error ? (
          <div className="text-center text-destructive py-12">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {earningOpportunities && earningOpportunities.length > 0 ? (
              earningOpportunities.map((opportunity, index) => (
                <EarningOpportunityCard key={index} opportunity={opportunity} />
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground">No earning opportunities found.</div>
            )}
          </div>
        )}

        {/* Success Stories */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Student Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <SuccessStoryCard key={index} story={story} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="earn" size="lg" className="px-8 group">
            Start Earning Today
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;