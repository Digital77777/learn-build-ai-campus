
import Navigation from "@/components/Navigation";
import { tools, categories, featureHighlights } from "@/pages/ai/data";
import AIToolsGrid from "@/pages/ai/AIToolsGrid";
import FeatureHighlightCard from "@/components/ai/FeatureHighlightCard";
import AIToolsHero from "@/components/ai-tools/AIToolsHero";
import CategoryFilter from "@/components/ai-tools/CategoryFilter";

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

      <AIToolsHero onTryTools={handleTryTools} onViewPricing={handleViewPricing} />

      <CategoryFilter categories={categories} />

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
