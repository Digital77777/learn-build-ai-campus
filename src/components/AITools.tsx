
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, FileText, Image, MessageSquare, Sparkles, BarChart3, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AITool } from "@/types/aiTools";

const aiTools: AITool[] = [
  {
    id: 1,
    name: "AI Code Assistant",
    title: "AI Code Assistant",
    description: "Intelligent code completion and debugging powered by advanced language models",
    icon: Code,
    category: "Development",
    features: ["Code completion", "Bug detection", "Refactoring"],
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "from-blue-500 to-cyan-500",
    route: "/tools/ai-code-assistant"
  },
  {
    id: 2,
    name: "Neural Image Generator",
    title: "Neural Image Generator",
    description: "Create stunning visuals and artwork using state-of-the-art image generation AI",
    icon: Image,
    category: "Creative",
    features: ["Text-to-image", "Style transfer", "Image editing"],
    usage: "50 images/day",
    pricing: "Premium",
    gradient: "from-purple-500 to-pink-500",
    route: "/tools/neural-image-generator"
  },
  {
    id: 3,
    name: "Smart Analytics",
    title: "Smart Analytics",
    description: "Automated data analysis and insights generation for your business metrics",
    icon: BarChart3,
    category: "Analytics",
    features: ["Predictive analytics", "Report generation", "Data visualization"],
    usage: "Pro plan",
    pricing: "Pro",
    gradient: "from-emerald-500 to-teal-500",
    route: "/tools/smart-analytics"
  },
  {
    id: 4,
    name: "Conversational AI",
    title: "Conversational AI",
    description: "Build intelligent chatbots and virtual assistants for customer support",
    icon: MessageSquare,
    category: "Communication",
    features: ["Natural language", "Multi-language", "Integration APIs"],
    usage: "Enterprise plan",
    pricing: "Enterprise",
    gradient: "from-orange-500 to-red-500",
    route: "/tools/conversational-ai"
  },
  {
    id: 5,
    name: "AI Research Lab",
    title: "AI Research Lab",
    description: "Experiment with cutting-edge AI models and research tools",
    icon: Brain,
    category: "Research",
    features: ["Model training", "Experiment tracking", "Collaboration"],
    usage: "Academic plan",
    pricing: "Academic",
    gradient: "from-indigo-500 to-purple-500",
    route: "/tools/ai-research-lab"
  },
  {
    id: 6,
    name: "AutoML Platform",
    title: "AutoML Platform",
    description: "Automated machine learning pipeline for rapid model development",
    icon: Zap,
    category: "Machine Learning",
    features: ["Auto feature engineering", "Model selection", "Deployment"],
    usage: "Pro plan",
    pricing: "Pro",
    gradient: "from-yellow-500 to-orange-500",
    route: "/tools/automl-platform"
  }
];

const AITools = () => {
  const navigate = useNavigate();

  const handleToolAccess = () => {
    navigate('/ai-tools');
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">6 Powerful AI Tools</span>
          </div>
          <h2 className="text-4xl font-bold">Embedded AI Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access cutting-edge AI tools directly in your learning environment. 
            No separate subscriptions, no limits - just powerful AI at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.slice(0, 6).map((tool) => (
            <Card key={tool.id} className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.gradient}`} />
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.gradient}`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.usage}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <div className="space-y-1">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline" onClick={() => navigate(tool.route || '/ai-tools')}>
                  Try {tool.name}
                </Button>
              </CardContent>
            </Card>
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
