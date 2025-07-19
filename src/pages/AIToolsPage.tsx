
import Navigation from "@/components/Navigation";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools, categories, featureHighlights } from "@/pages/ai/data";
import AIToolsGrid from "@/pages/ai/AIToolsGrid";
import FeatureHighlightCard from "@/components/ai/FeatureHighlightCard";

const AIToolsPage = () => {
  const handleTryTools = () => {
    console.log("Try tools free clicked");
  };

  const handleViewPricing = () => {
    console.log("View pricing clicked");
  };

  const handleTryTool = (toolId: number) => {
    console.log(`Try tool ${toolId} clicked`);
  };

  const handleLearnMore = (toolId: number) => {
    console.log(`Learn more about tool ${toolId} clicked`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
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
              <Button size="lg" className="bg-gradient-ai text-white hover:opacity-90" onClick={handleTryTools}>
                <Zap className="h-5 w-5 mr-2" />
                Try Tools Free
              </Button>
              <Button size="lg" variant="outline" onClick={handleViewPricing}>
                View Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <AIToolsGrid tools={tools} onTryTool={handleTryTool} onLearnMore={handleLearnMore} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of productivity with our carefully curated collection of AI-powered tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureHighlights.map((feature, index) => (
              <FeatureHighlightCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIToolsPage;
