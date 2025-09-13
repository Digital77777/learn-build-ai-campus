
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Blocks, Sliders, BarChart3, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AITool } from "@/types/aiTools";

const aiTools: AITool[] = [
  {
    id: 1,
    name: "AI SnapBuilder",
    title: "AI SnapBuilder",
    description: "Drag-and-drop AI blocks with visual training interface. Upload 5-10 examples and get instant mini models.",
    icon: Blocks,
    category: "Development",
    features: ["Drag-and-drop AI blocks", "Visual training interface", "Live preview window"],
    usage: "Free unlimited",
    pricing: "Free",
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
    usage: "Free unlimited",
    pricing: "Free",
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
    usage: "Free unlimited",
    pricing: "Free",
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
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "from-orange-500 to-red-500",
    route: "/tools/ai-tutorlab"
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
            <span className="text-sm font-medium text-accent-foreground">4 Beginner-Friendly Tools</span>
          </div>
          <h2 className="text-4xl font-bold">Tier 1 AI Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fun, simple tools that lower the barrier to entry. Build your first AI projects 
            with drag-and-drop interfaces and visual training tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {aiTools.map((tool) => (
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
