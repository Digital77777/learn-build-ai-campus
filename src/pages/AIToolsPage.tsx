

import { Brain, Zap, Sparkles, ArrowRight, Blocks, Sliders, BarChart3, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AITool } from "@/types/aiTools";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToolCard } from "@/components/ai-tools/ToolCard";
import { FeatureHighlight } from "@/components/ai-tools/FeatureHighlight";
import { CategoryFilter } from "@/components/ai-tools/CategoryFilter";

const AIToolsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const tools: AITool[] = [
    {
      id: 1,
      name: "AI SnapBuilder",
      title: "AI SnapBuilder",
      description: "Drag-and-drop AI blocks with visual training interface. Upload 5-10 examples and get instant mini models.",
      icon: Blocks,
      category: "Development",
      features: ["Drag-and-drop AI blocks", "Visual training interface", "Live preview window"],
      pricing: "Free",
      usage: "Free unlimited",
      gradient: "from-blue-500 to-cyan-500",
      route: "/tools/ai-snapbuilder"
    },
    {
      id: 2,
      name: "PromptPlayground",
      title: "PromptPlayground",
      description: "Sliders and dropdowns for creativity, tone, style instead of raw prompt writing. Side-by-side results comparison.",
      icon: Sliders,
      category: "Creative",
      features: ["Creativity sliders", "Tone controls", "Built-in prompt library"],
      pricing: "Free",
      usage: "Free unlimited",
      gradient: "from-purple-500 to-pink-500",
      route: "/tools/prompt-playground"
    },
    {
      id: 3,
      name: "Data2App",
      title: "Data2App",
      description: "Upload spreadsheet and instantly get charts, dashboards, and search bars. Export as a simple web app.",
      icon: BarChart3,
      category: "Analytics",
      features: ["Instant dashboards", "No-code filters", "Web app export"],
      pricing: "Free",
      usage: "Free unlimited",
      gradient: "from-emerald-500 to-teal-500",
      route: "/tools/data2app"
    },
    {
      id: 4,
      name: "AI TutorLab",
      title: "AI TutorLab",
      description: "Students type questions, AI explains concepts in plain language. Interactive sandbox for learning.",
      icon: GraduationCap,
      category: "Research",
      features: ["Plain language explanations", "Practice problems", "Interactive sandbox"],
      pricing: "Free",
      usage: "Free unlimited",
      gradient: "from-orange-500 to-red-500",
      route: "/tools/ai-tutorlab"
    }
  ];

  const categories: string[] = ["All", "Development", "Creative", "Analytics", "Communication", "Research", "Machine Learning"];

  const featureHighlights = [
    { title: "Lightning Fast", description: "Optimized for speed and efficiency to boost your productivity", icon: Zap },
    { title: "Intelligent", description: "Powered by the latest AI models and machine learning algorithms", icon: Brain },
    { title: "Easy to Use", description: "Intuitive interfaces designed for both beginners and experts", icon: Sparkles }
  ];

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const handleTryTools = () => {
    console.log("Try tools free clicked");
  };

  const handleViewPricing = () => {
    console.log("View pricing clicked");
  };

  const handleTryTool = (tool: AITool) => {
    if (tool.route) {
      navigate(tool.route);
    } else {
      console.log(`Try tool ${tool.id} clicked`);
    }
  };

  const handleLearnMore = (toolId: number) => {
    console.log(`Learn more about tool ${toolId} clicked`);
  };

  return (
    <div className="min-h-screen bg-background">
      
      
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
                Tier 1 AI Tools
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Beginner-friendly AI tools that lower the barrier to entry. Build your first AI projects with simple, intuitive interfaces.
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

      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                {...tool}
                onTryTool={() => handleTryTool(tool)}
                onLearnMore={() => handleLearnMore(tool.id)}
              />
            ))}
          </div>
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
              <FeatureHighlight key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIToolsPage;
