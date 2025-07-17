import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, FileText, Image, MessageSquare, Sparkles } from "lucide-react";

const aiTools = [
  {
    title: "AI Writing Assistant",
    description: "Generate essays, research papers, and creative content with advanced language models",
    icon: FileText,
    features: ["Essay generation", "Research assistance", "Grammar checking", "Citation help"],
    usage: "Free unlimited",
    gradient: "bg-gradient-learning"
  },
  {
    title: "Code Generator",
    description: "Generate, debug, and explain code in multiple programming languages",
    icon: Code,
    features: ["Code generation", "Bug fixing", "Code explanation", "Multiple languages"],
    usage: "Free unlimited",
    gradient: "bg-gradient-ai"
  },
  {
    title: "Research Assistant",
    description: "Analyze academic papers, summarize content, and find credible sources",
    icon: Brain,
    features: ["Paper analysis", "Source finding", "Content summarization", "Citation generation"],
    usage: "Free unlimited", 
    gradient: "bg-gradient-earn"
  },
  {
    title: "Image Creator",
    description: "Generate stunning visuals, diagrams, and illustrations for your projects",
    icon: Image,
    features: ["Image generation", "Diagram creation", "Style customization", "High resolution"],
    usage: "50 images/day",
    gradient: "bg-gradient-learning"
  },
  {
    title: "Study Buddy",
    description: "Interactive Q&A, flashcards, and personalized tutoring for any subject",
    icon: MessageSquare,
    features: ["Interactive Q&A", "Flashcard creation", "Subject tutoring", "Progress tracking"],
    usage: "Free unlimited",
    gradient: "bg-gradient-ai"
  }
];

const AITools = () => {
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
          {aiTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${tool.gradient}`} />
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${tool.gradient}`}>
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

                <Button className="w-full" variant="outline">
                  Try {tool.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ai" size="lg" className="px-8">
            Access All AI Tools Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AITools;