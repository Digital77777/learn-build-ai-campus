import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTier } from "@/contexts/TierContext";

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
    gradient: "bg-gradient-learning",
    tier: 1,
    tierName: "Starter"
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
    gradient: "bg-gradient-ai",
    tier: 1,
    tierName: "Starter"
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
    gradient: "bg-gradient-earn",
    tier: 2,
    tierName: "Creator"
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
    gradient: "bg-gradient-learning",
    tier: 3,
    tierName: "Career"
  }
];

// Memoized path card component
const PathCard = memo(({ path, onNavigate, isLocked }: { path: typeof learningPaths[0]; onNavigate: (id: string, isLocked: boolean) => void; isLocked: boolean }) => (
  <Card className={`hover:shadow-ai transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${isLocked ? 'opacity-75' : ''}`}>
    {isLocked && (
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
        <div className="text-center space-y-3 p-4">
          <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              {path.tierName} Tier Required
            </Badge>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Upgrade to unlock this path
            </p>
            <Button 
              size="sm"
              className="w-full sm:w-auto text-xs sm:text-sm"
              onClick={() => onNavigate(path.id, true)}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    )}
    
    <CardHeader className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">{path.level}</Badge>
            <Badge variant="outline" className="text-xs">Tier {path.tier}</Badge>
          </div>
          <CardTitle className="text-lg sm:text-xl">{path.title}</CardTitle>
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${path.gradient} flex-shrink-0`}>
          <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground">{path.description}</p>
    </CardHeader>
    
    <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{path.duration}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{path.students}</span>
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-semibold text-success">{path.earnings}</div>
          <div className="text-xs text-muted-foreground hidden sm:block">Potential earnings</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm sm:text-base">Key Modules:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {path.modules.map((module, idx) => (
            <div key={idx} className="text-xs sm:text-sm text-muted-foreground bg-background p-2 rounded">
              {module}
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="w-full group text-sm sm:text-base" 
        variant="default"
        onClick={() => onNavigate(path.id, false)}
        disabled={isLocked}
      >
        {isLocked ? (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Locked
          </>
        ) : (
          <>
            Start Learning Path
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </CardContent>
  </Card>
));

PathCard.displayName = 'PathCard';

const LearningPaths = () => {
  const navigate = useNavigate();
  const { tierName, loading } = useTier();
  
  // Determine user's tier level
  const getTierLevel = () => {
    if (tierName === 'career') return 3;
    if (tierName === 'creator') return 2;
    return 1; // starter
  };

  const userTierLevel = getTierLevel();

  // Filter paths based on user's tier
  const accessiblePaths = learningPaths.filter(path => path.tier <= userTierLevel);
  const lockedPaths = learningPaths.filter(path => path.tier > userTierLevel);
  
  const handleNavigate = (id: string, isLocked: boolean) => {
    if (isLocked) {
      navigate('/subscription');
    } else {
      navigate(`/course/${id}`);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">AI Learning Paths</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Structured paths designed to take you from complete beginner to confident AI builder with hands-on projects.
          </p>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {accessiblePaths.length} of {learningPaths.length} paths available in your tier
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {learningPaths.map((path) => {
            const isLocked = path.tier > userTierLevel;
            return (
              <PathCard 
                key={path.id} 
                path={path} 
                onNavigate={handleNavigate}
                isLocked={isLocked}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;