
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import AIToolCard from "@/components/ai/AIToolCard";
import { aiTools } from "@/components/ai/data";

const AITools = () => {
  const handleToolAccess = () => {
    console.log("Accessing AI tools");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">5 Powerful AI Tools</span>
          </div>
          <h2 className="text-4xl font-bold">Embedded AI Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access cutting-edge AI tools directly in your learning environment. 
            No separate subscriptions, no limits - just powerful AI at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <AIToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ai" size="lg" className="px-8" onClick={handleToolAccess}>
            Access All AI Tools Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AITools;
