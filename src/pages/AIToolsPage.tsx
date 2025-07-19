
import Navigation from "@/components/Navigation";
import { Brain, Zap, Code, Image, MessageSquare, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AITool, AIToolCategory, FeatureHighlight } from "@/types/aiTools";

const AIToolsPage = () => {
  const tools: AITool[] = [
    {
      id: 1,
      name: "AI Code Assistant",
      title: "AI Code Assistant",
      description: "Intelligent code completion and debugging powered by advanced language models",
      icon: Code,
      category: "Development",
      features: ["Code completion", "Bug detection", "Refactoring"],
      pricing: "Free",
      usage: "Free unlimited",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Neural Image Generator",
      title: "Neural Image Generator",
      description: "Create stunning visuals and artwork using state-of-the-art image generation AI",
      icon: Image,
      category: "Creative",
      features: ["Text-to-image", "Style transfer", "Image editing"],
      pricing: "Premium",
      usage: "50 images/day",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Smart Analytics",
      title: "Smart Analytics",
      description: "Automated data analysis and insights generation for your business metrics",
      icon: BarChart3,
      category: "Analytics",
      features: ["Predictive analytics", "Report generation", "Data visualization"],
      pricing: "Pro",
      usage: "Pro plan",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 4,
      name: "Conversational AI",
      title: "Conversational AI",
      description: "Build intelligent chatbots and virtual assistants for customer support",
      icon: MessageSquare,
      category: "Communication",
      features: ["Natural language", "Multi-language", "Integration APIs"],
      pricing: "Enterprise",
      usage: "Enterprise plan",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "AI Research Lab",
      title: "AI Research Lab",
      description: "Experiment with cutting-edge AI models and research tools",
      icon: Brain,
      category: "Research",
      features: ["Model training", "Experiment tracking", "Collaboration"],
      pricing: "Academic",
      usage: "Academic plan",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      name: "AutoML Platform",
      title: "AutoML Platform",
      description: "Automated machine learning pipeline for rapid model development",
      icon: Zap,
      category: "Machine Learning",
      features: ["Auto feature engineering", "Model selection", "Deployment"],
      pricing: "Pro",
      usage: "Pro plan",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const categories: string[] = ["All", "Development", "Creative", "Analytics", "Communication", "Research", "Machine Learning"];

  const featureHighlights: FeatureHighlight[] = [
    {
      title: "Lightning Fast",
      description: "Optimized for speed and efficiency to boost your productivity",
      icon: Zap
    },
    {
      title: "Intelligent",
      description: "Powered by the latest AI models and machine learning algorithms",
      icon: Brain
    },
    {
      title: "Easy to Use",
      description: "Intuitive interfaces designed for both beginners and experts",
      icon: Sparkles
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-ai transition-all duration-300 border-border/50 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-white mb-4`}>
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                    <Badge variant={tool.pricing === "Free" ? "default" : "outline"} className="text-xs">
                      {tool.pricing}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 group/btn" onClick={() => handleTryTool(tool.id)}>
                      Try Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleLearnMore(tool.id)}>
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIToolsPage;
