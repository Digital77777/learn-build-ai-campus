import { Button } from "@/components/ui/button";
import { Zap, Sparkles, ArrowRight } from "lucide-react";

interface AIToolsHeroProps {
  onTryTools: () => void;
  onViewPricing: () => void;
}

const AIToolsHero = ({ onTryTools, onViewPricing }: AIToolsHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Latest AI Tools</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-ai bg-clip-text text-transparent">
              AI Tools Hub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover and master the most powerful AI tools to accelerate your work and creativity
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-ai text-white hover:opacity-90" onClick={onTryTools}>
              <Zap className="h-5 w-5 mr-2" />
              Try Tools Free
            </Button>
            <Button size="lg" variant="outline" onClick={onViewPricing}>
              View Pricing
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsHero;