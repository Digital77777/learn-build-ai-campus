import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Zap } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
          <Zap className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">Free for University Students</span>
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Learn, Build & 
          <span className="bg-gradient-ai bg-clip-text text-transparent"> Earn</span>
          <br />with AI
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Master artificial intelligence through structured learning paths, 
          build industry-ready projects with professional AI tools, and 
          advance your career in the growing AI field.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="hero" size="lg" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Start Learning Free
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Explore AI Tools
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;