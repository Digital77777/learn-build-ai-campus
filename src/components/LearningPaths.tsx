import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "foundation-path",
    title: "AI Basics for Everyone",
    description: "Foundation path covering AI fundamentals, mathematics, Python programming, and industry applications",
    duration: "8-12 weeks",
    students: "3,241",
    level: "Beginner",
    earnings: "$500-1,500",
    modules: ["Introduction to AI", "Mathematics for AI", "Python Programming", "AI in Industries"],
    gradient: "bg-gradient-learning"
  },
  {
    id: "practical-skills",
    title: "From Zero to Builder",
    description: "Practical AI skills including prompt engineering, AI tools, no-code platforms, and data handling",
    duration: "10-14 weeks", 
    students: "2,847",
    level: "Beginner",
    earnings: "$1,000-2,500",
    modules: ["Prompt Engineering", "Using AI Tools", "No-Code AI Building", "Data Handling"],
    gradient: "bg-gradient-ai"
  },
  {
    id: "technical-developer",
    title: "Future AI Engineer",
    description: "Technical development path covering machine learning, deep learning, NLP, and computer vision",
    duration: "16-20 weeks",
    students: "1,834",
    level: "Intermediate",
    earnings: "$2,500-5,000",
    modules: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Model Deployment"],
    gradient: "bg-gradient-earn"
  },
  {
    id: "business-careers",
    title: "AI for Work & Startups",
    description: "Business-focused path covering productivity, marketing, product management, and entrepreneurship",
    duration: "12-16 weeks",
    students: "1,487",
    level: "Intermediate",
    earnings: "$2,000-4,000",
    modules: ["AI for Business", "AI Marketing", "Product Management", "Freelancing", "Building Startups"],
    gradient: "bg-gradient-learning"
  }
];

// Memoized path card component
const PathCard = memo(({ path, onNavigate }: { path: typeof learningPaths[0]; onNavigate: (id: string) => void }) => (
  <Card className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Badge variant="secondary">{path.level}</Badge>
          <CardTitle className="text-xl">{path.title}</CardTitle>
        </div>
        <div className={`p-3 rounded-lg ${path.gradient}`}>
          <Trophy className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="text-muted-foreground">{path.description}</p>
    </CardHeader>
    
    <CardContent className="space-y-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{path.duration}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{path.students}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-success">{path.earnings}</div>
          <div className="text-xs text-muted-foreground">Potential earnings</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Key Modules:</h4>
        <div className="grid grid-cols-2 gap-2">
          {path.modules.map((module, idx) => (
            <div key={idx} className="text-sm text-muted-foreground bg-background p-2 rounded">
              {module}
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="w-full group" 
        variant="default"
        onClick={() => onNavigate(path.id)}
      >
        Start Learning Path
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardContent>
  </Card>
));

PathCard.displayName = 'PathCard';

const LearningPaths = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (id: string) => {
    navigate(`/course/${id}`);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Tier 1 Learning Paths</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beginner to Builder foundations - structured paths designed to take you from 
            complete beginner to confident AI builder with hands-on projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {learningPaths.map((path) => (
            <PathCard key={path.id} path={path} onNavigate={handleNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;